import type { Card, Deck } from '../types';
import { englishDeck, englishCards } from './english';
import { italianDeck, italianCards } from './italian';
import { frenchDeck, frenchCards } from './french';
import { russianDeck, russianCards } from './russian';

export const SEED_DECKS: Deck[] = [englishDeck, italianDeck, frenchDeck, russianDeck];

export const SEED_CARDS: Card[] = [
  ...englishCards,
  ...italianCards,
  ...frenchCards,
  ...russianCards,
];
