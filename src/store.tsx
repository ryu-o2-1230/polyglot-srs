import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { AppState, Card, LangCode, Rating, Settings } from './types';
import { loadState, saveState } from './storage';
import { freshState, schedule, todayISO } from './srs';

type Action =
  | { type: 'review'; cardId: string; rating: Rating }
  | { type: 'addCard'; card: Card }
  | { type: 'updateCard'; card: Card }
  | { type: 'deleteCard'; cardId: string }
  | { type: 'setSettings'; settings: Partial<Settings> }
  | { type: 'replaceState'; state: AppState }
  | { type: 'resetProgress' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'review': {
      const prev = state.reviews[action.cardId] ?? freshState(action.cardId);
      const next = schedule(prev, action.rating);
      const card = state.cards[action.cardId];
      return {
        ...state,
        reviews: { ...state.reviews, [action.cardId]: next },
        logs: [
          ...state.logs,
          {
            cardId: action.cardId,
            lang: card?.lang ?? 'en',
            ts: new Date().toISOString(),
            rating: action.rating,
            intervalDays: next.intervalDays,
          },
        ],
      };
    }
    case 'addCard':
      return { ...state, cards: { ...state.cards, [action.card.id]: action.card } };
    case 'updateCard':
      return { ...state, cards: { ...state.cards, [action.card.id]: action.card } };
    case 'deleteCard': {
      const cards = { ...state.cards };
      const reviews = { ...state.reviews };
      delete cards[action.cardId];
      delete reviews[action.cardId];
      return { ...state, cards, reviews };
    }
    case 'setSettings':
      return { ...state, settings: { ...state.settings, ...action.settings } };
    case 'replaceState':
      return action.state;
    case 'resetProgress':
      return { ...state, reviews: {}, logs: [] };
    default:
      return state;
  }
}

interface StoreValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

// ---- Selectors -------------------------------------------------------------

export function cardsForLang(state: AppState, lang: LangCode | 'all'): Card[] {
  const all = Object.values(state.cards);
  return lang === 'all' ? all : all.filter((c) => c.lang === lang);
}

export interface QueueCounts {
  due: number;
  fresh: number;
  total: number;
}

/** Cards to study now: due reviews + up to newPerDay unseen cards. */
export function buildQueue(state: AppState, lang: LangCode | 'all'): { cards: Card[]; counts: QueueCounts } {
  const pool = cardsForLang(state, lang);
  const today = todayISO();
  const due: Card[] = [];
  const fresh: Card[] = [];
  for (const c of pool) {
    const r = state.reviews[c.id];
    if (!r) fresh.push(c);
    else if (!r.suspended && r.due <= today) due.push(c);
  }
  const newToday = countNewToday(state, lang);
  const allowance = Math.max(0, state.settings.newPerDay - newToday);
  const queue = [...due, ...fresh.slice(0, allowance)];
  return {
    cards: shuffle(queue),
    counts: { due: due.length, fresh: Math.min(fresh.length, allowance), total: pool.length },
  };
}

function countNewToday(state: AppState, lang: LangCode | 'all'): number {
  const today = todayISO();
  const langCards = new Set(cardsForLang(state, lang).map((c) => c.id));
  const seen = new Set<string>();
  for (const log of state.logs) {
    if (log.ts.slice(0, 10) !== today) continue;
    if (!langCards.has(log.cardId)) continue;
    seen.add(log.cardId);
  }
  // Approximate "new today" as cards first reviewed today with reps starting from 0.
  let n = 0;
  for (const id of seen) {
    const r = state.reviews[id];
    if (r && r.reps <= 1 && r.lapses === 0) n += 1;
  }
  return n;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
