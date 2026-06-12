import type { Rating, ReviewState } from './types';

const MIN_EASE = 1.3;
const STARTING_EASE = 2.5;
const EASY_BONUS = 1.3;
const HARD_INTERVAL_MULT = 1.2;

export function todayISO(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function addDays(dateISO: string, days: number): string {
  const d = new Date(dateISO + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function daysBetween(aISO: string, bISO: string): number {
  const a = new Date(aISO + 'T00:00:00Z').getTime();
  const b = new Date(bISO + 'T00:00:00Z').getTime();
  return Math.round((b - a) / 86_400_000);
}

export function freshState(cardId: string, now = new Date()): ReviewState {
  return {
    cardId,
    ease: STARTING_EASE,
    intervalDays: 0,
    reps: 0,
    lapses: 0,
    due: todayISO(now),
  };
}

/**
 * Compute the next scheduling state for a card given a rating.
 * An SM-2 variant with Anki-style hard/easy handling. `again` lapses the
 * card (it is re-queued within the session and falls due today), the other
 * ratings grow the interval by the ease factor.
 */
export function schedule(prev: ReviewState, rating: Rating, now = new Date()): ReviewState {
  let { ease, intervalDays, reps, lapses } = prev;
  const today = todayISO(now);

  if (rating === 'again') {
    ease = Math.max(MIN_EASE, ease - 0.2);
    return {
      ...prev,
      ease,
      reps: 0,
      lapses: lapses + 1,
      intervalDays: 0,
      due: today, // resurfaces today; the session queue re-shows it
      lastReviewed: now.toISOString(),
    };
  }

  if (rating === 'hard') ease = Math.max(MIN_EASE, ease - 0.15);
  if (rating === 'easy') ease = ease + 0.15;

  reps += 1;
  let interval: number;
  if (reps === 1) {
    interval = rating === 'easy' ? 4 : 1;
  } else if (reps === 2) {
    interval = rating === 'hard' ? 3 : 6;
  } else {
    const base = Math.max(1, intervalDays);
    const mult = rating === 'hard' ? HARD_INTERVAL_MULT : ease * (rating === 'easy' ? EASY_BONUS : 1);
    interval = Math.round(base * mult);
  }
  interval = Math.max(1, interval);

  return {
    ...prev,
    ease,
    reps,
    lapses,
    intervalDays: interval,
    due: addDays(today, interval),
    lastReviewed: now.toISOString(),
  };
}

export function isDue(state: ReviewState | undefined, now = new Date()): boolean {
  if (!state || state.suspended) return false;
  return state.due <= todayISO(now);
}

/** Human-friendly preview of the next interval for each rating button. */
export function previewIntervals(prev: ReviewState, now = new Date()): Record<Rating, string> {
  const fmt = (s: ReviewState): string => {
    if (s.intervalDays === 0) return '<10m';
    if (s.intervalDays === 1) return '1d';
    if (s.intervalDays < 30) return `${s.intervalDays}d`;
    if (s.intervalDays < 365) return `${Math.round(s.intervalDays / 30)}mo`;
    return `${(s.intervalDays / 365).toFixed(1)}y`;
  };
  return {
    again: fmt(schedule(prev, 'again', now)),
    hard: fmt(schedule(prev, 'hard', now)),
    good: fmt(schedule(prev, 'good', now)),
    easy: fmt(schedule(prev, 'easy', now)),
  };
}
