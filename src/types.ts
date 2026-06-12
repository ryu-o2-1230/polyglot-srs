export type LangCode = 'en' | 'it' | 'fr' | 'ru';

export const LANGS: { code: LangCode; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
];

export type Rating = 'again' | 'hard' | 'good' | 'easy';

/** A single study item. Content is separate from scheduling state so seed
 *  decks can ship without polluting a learner's personal progress. */
export interface Card {
  id: string;
  lang: LangCode;
  deckId: string;
  front: string; // prompt — usually the target-language term
  back: string; // answer — meaning / translation
  ipa?: string;
  pos?: string; // part of speech
  gender?: string; // grammatical gender, where relevant
  example?: string;
  exampleTranslation?: string;
  note?: string; // linguistic / usage note
  tags?: string[];
  custom?: boolean; // true for user-created cards
}

export interface Deck {
  id: string;
  lang: LangCode;
  name: string;
  description?: string;
}

/** Per-card scheduling state (Anki-inspired SM-2 variant). */
export interface ReviewState {
  cardId: string;
  ease: number; // ease factor, starts at 2.5
  intervalDays: number;
  reps: number; // consecutive successful reviews
  lapses: number;
  due: string; // ISO date (YYYY-MM-DD) the card is next due
  lastReviewed?: string; // ISO timestamp
  suspended?: boolean;
}

export interface ReviewLog {
  cardId: string;
  lang: LangCode;
  ts: string; // ISO timestamp
  rating: Rating;
  intervalDays: number;
}

export interface Settings {
  newPerDay: number;
  activeLang: LangCode | 'all';
}

export interface AppState {
  schemaVersion: number;
  cards: Record<string, Card>;
  decks: Record<string, Deck>;
  reviews: Record<string, ReviewState>;
  logs: ReviewLog[];
  settings: Settings;
}
