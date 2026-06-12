import { useMemo, useState } from 'react';
import type { Card, Rating } from '../types';
import { LANGS } from '../types';
import { useStore, buildQueue } from '../store';
import { freshState, previewIntervals } from '../srs';

const RATINGS: { key: Rating; label: string; cls: string }[] = [
  { key: 'again', label: 'もう一度', cls: 'again' },
  { key: 'hard', label: '難しい', cls: 'hard' },
  { key: 'good', label: 'できた', cls: 'good' },
  { key: 'easy', label: '簡単', cls: 'easy' },
];

export function StudySession({ onExit }: { onExit: () => void }) {
  const { state, dispatch } = useStore();
  const lang = state.settings.activeLang;

  // Snapshot the queue once when the session starts so it doesn't reshuffle
  // on every keystroke; `again` re-queues within local session state.
  const initial = useMemo(() => buildQueue(state, lang).cards, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [queue, setQueue] = useState<Card[]>(initial);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(0);

  const card = queue[idx];

  if (!card) {
    return (
      <div className="session-done card-surface">
        <h2>🎉 セッション完了</h2>
        <p>{done} 枚を復習しました。</p>
        <button className="btn primary" onClick={onExit}>ダッシュボードへ戻る</button>
      </div>
    );
  }

  const review = state.reviews[card.id] ?? freshState(card.id);
  const previews = previewIntervals(review);
  const langMeta = LANGS.find((l) => l.code === card.lang);

  function rate(rating: Rating) {
    dispatch({ type: 'review', cardId: card.id, rating });
    setDone((d) => d + 1);
    if (rating === 'again') {
      // Re-queue this card near the end of the remaining session.
      setQueue((q) => {
        const rest = q.filter((_, i) => i !== idx);
        const insertAt = Math.min(rest.length, idx + 3);
        return [...rest.slice(0, insertAt), card, ...rest.slice(insertAt)];
      });
      setRevealed(false);
      return;
    }
    setIdx((i) => i + 1);
    setRevealed(false);
  }

  return (
    <div className="study">
      <div className="study-top">
        <button className="btn ghost" onClick={onExit}>✕ 中断</button>
        <div className="progress-pill">
          {langMeta?.flag} 残り {queue.length - idx} ・ 完了 {done}
        </div>
      </div>

      <div className="flashcard card-surface" onClick={() => !revealed && setRevealed(true)}>
        <div className="fc-meta">
          {card.pos && <span className="chip">{card.pos}</span>}
          {card.gender && <span className="chip">{card.gender}</span>}
          {(card.tags ?? []).map((t) => <span key={t} className="chip subtle">{t}</span>)}
        </div>
        <div className="fc-front">{card.front}</div>
        {card.ipa && <div className="fc-ipa">{card.ipa}</div>}

        {!revealed ? (
          <button className="btn primary reveal" onClick={() => setRevealed(true)}>答えを表示</button>
        ) : (
          <div className="fc-back">
            <div className="fc-answer">{card.back}</div>
            {card.example && (
              <p className="fc-example">
                “{card.example}”
                {card.exampleTranslation && <span className="fc-ex-tr"> — {card.exampleTranslation}</span>}
              </p>
            )}
            {card.note && <p className="fc-note">📝 {card.note}</p>}
          </div>
        )}
      </div>

      {revealed && (
        <div className="rating-row">
          {RATINGS.map((r) => (
            <button key={r.key} className={`btn rate ${r.cls}`} onClick={() => rate(r.key)}>
              <span className="rate-label">{r.label}</span>
              <span className="rate-interval">{previews[r.key]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
