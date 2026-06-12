import { useMemo, useState } from 'react';
import type { Card, LangCode } from '../types';
import { LANGS } from '../types';
import { useStore, cardsForLang } from '../store';

export function Browser() {
  const { state, dispatch } = useStore();
  const [filter, setFilter] = useState('');
  const [showForm, setShowForm] = useState(false);

  const lang = state.settings.activeLang;
  const cards = useMemo(() => {
    const base = cardsForLang(state, lang);
    const q = filter.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (c) =>
        c.front.toLowerCase().includes(q) ||
        c.back.toLowerCase().includes(q) ||
        (c.tags ?? []).some((t) => t.toLowerCase().includes(q)),
    );
  }, [state, lang, filter]);

  return (
    <div className="browser">
      <div className="browser-toolbar">
        <input
          className="search"
          placeholder="カードを検索…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button className="btn primary" onClick={() => setShowForm((s) => !s)}>
          {showForm ? '閉じる' : '＋ カード追加'}
        </button>
      </div>

      {showForm && <AddCardForm onDone={() => setShowForm(false)} />}

      <div className="muted count-line">{cards.length} 枚</div>
      <ul className="card-list">
        {cards.map((c) => {
          const r = state.reviews[c.id];
          const meta = LANGS.find((l) => l.code === c.lang);
          return (
            <li key={c.id} className="card-row card-surface">
              <div className="cr-main">
                <div className="cr-front">{meta?.flag} {c.front}</div>
                <div className="cr-back muted">{c.back}</div>
              </div>
              <div className="cr-side">
                {r ? (
                  <span className="chip subtle">
                    {r.intervalDays >= 21 ? '定着' : r.reps > 0 ? `${r.intervalDays}d` : '学習中'}
                  </span>
                ) : (
                  <span className="chip subtle">未学習</span>
                )}
                {c.custom && (
                  <button
                    className="btn ghost sm"
                    title="削除"
                    onClick={() => dispatch({ type: 'deleteCard', cardId: c.id })}
                  >
                    🗑
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function AddCardForm({ onDone }: { onDone: () => void }) {
  const { state, dispatch } = useStore();
  const defaultLang: LangCode = state.settings.activeLang === 'all' ? 'en' : state.settings.activeLang;
  const [lang, setLang] = useState<LangCode>(defaultLang);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [note, setNote] = useState('');
  const [example, setExample] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!front.trim() || !back.trim()) return;
    const card: Card = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      lang,
      deckId: `${lang}-core`,
      front: front.trim(),
      back: back.trim(),
      note: note.trim() || undefined,
      example: example.trim() || undefined,
      tags: ['custom'],
      custom: true,
    };
    dispatch({ type: 'addCard', card });
    onDone();
  }

  return (
    <form className="add-form card-surface" onSubmit={submit}>
      <div className="form-row">
        <label>言語</label>
        <select value={lang} onChange={(e) => setLang(e.target.value as LangCode)}>
          {LANGS.map((l) => (
            <option key={l.code} value={l.code}>{l.flag} {l.label}</option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label>表（語・問い）*</label>
        <input value={front} onChange={(e) => setFront(e.target.value)} required />
      </div>
      <div className="form-row">
        <label>裏（意味・答え）*</label>
        <input value={back} onChange={(e) => setBack(e.target.value)} required />
      </div>
      <div className="form-row">
        <label>例文</label>
        <input value={example} onChange={(e) => setExample(e.target.value)} />
      </div>
      <div className="form-row">
        <label>メモ</label>
        <input value={note} onChange={(e) => setNote(e.target.value)} />
      </div>
      <div className="form-actions">
        <button type="button" className="btn ghost" onClick={onDone}>キャンセル</button>
        <button type="submit" className="btn primary">追加</button>
      </div>
    </form>
  );
}
