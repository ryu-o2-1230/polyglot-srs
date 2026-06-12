import type { AppState, Card, Deck } from './types';
import { SEED_DECKS, SEED_CARDS } from './data';

const KEY = 'polyglot-srs:v1';
export const SCHEMA_VERSION = 1;

function indexById<T extends { id: string }>(items: T[]): Record<string, T> {
  return Object.fromEntries(items.map((it) => [it.id, it]));
}

export function initialState(): AppState {
  return {
    schemaVersion: SCHEMA_VERSION,
    cards: indexById<Card>(SEED_CARDS),
    decks: indexById<Deck>(SEED_DECKS),
    reviews: {},
    logs: [],
    settings: { newPerDay: 12, activeLang: 'all' },
  };
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seedMissing(initialState());
    const parsed = JSON.parse(raw) as AppState;
    if (parsed.schemaVersion !== SCHEMA_VERSION) return migrate(parsed);
    // Merge in any newly shipped seed cards/decks the user hasn't seen yet.
    return seedMissing(parsed);
  } catch (err) {
    console.warn('Failed to load saved state, starting fresh.', err);
    return initialState();
  }
}

/** Add seed decks/cards that aren't already present, preserving user data. */
function seedMissing(state: AppState): AppState {
  const cards = { ...state.cards };
  const decks = { ...state.decks };
  for (const d of SEED_DECKS) if (!decks[d.id]) decks[d.id] = d;
  for (const c of SEED_CARDS) if (!cards[c.id]) cards[c.id] = c;
  return { ...state, cards, decks };
}

function migrate(old: Partial<AppState>): AppState {
  // Only v1 exists today; future versions transform `old` here.
  const base = initialState();
  return {
    ...base,
    reviews: old.reviews ?? {},
    logs: old.logs ?? [],
    settings: { ...base.settings, ...(old.settings ?? {}) },
  };
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('Failed to save state.', err);
  }
}

export function exportState(state: AppState): string {
  return JSON.stringify(state, null, 2);
}

export function importState(json: string): AppState {
  const parsed = JSON.parse(json) as AppState;
  if (!parsed.cards || !parsed.decks) throw new Error('Invalid backup file');
  return seedMissing({ ...initialState(), ...parsed, schemaVersion: SCHEMA_VERSION });
}
