import { LANGS } from '../types';
import type { LangCode } from '../types';
import { useStore, buildQueue, cardsForLang } from '../store';
import { todayISO } from '../srs';

export function Dashboard({ onStudy }: { onStudy: () => void }) {
  const { state } = useStore();
  const lang = state.settings.activeLang;
  const { counts } = buildQueue(state, lang);
  const studyable = counts.due + counts.fresh;

  const reviewedToday = state.logs.filter((l) => l.ts.slice(0, 10) === todayISO()).length;

  return (
    <div className="dashboard">
      <section className="hero card-surface">
        <div className="hero-counts">
          <div className="big-count">{studyable}</div>
          <div className="hero-sub">
            <div>復習待ち <strong>{counts.due}</strong> ・ 新規 <strong>{counts.fresh}</strong></div>
            <div className="muted">今日の学習: {reviewedToday} 枚</div>
          </div>
        </div>
        <button className="btn primary lg" disabled={studyable === 0} onClick={onStudy}>
          {studyable === 0 ? '今日のノルマ達成 🎉' : '学習を開始'}
        </button>
      </section>

      <h3 className="section-title">言語別の進捗</h3>
      <div className="lang-grid">
        {LANGS.map((l) => (
          <LangCardStat key={l.code} code={l.code} />
        ))}
      </div>
    </div>
  );
}

function LangCardStat({ code }: { code: LangCode }) {
  const { state } = useStore();
  const meta = LANGS.find((l) => l.code === code)!;
  const cards = cardsForLang(state, code);
  const total = cards.length;
  const today = todayISO();
  let due = 0;
  let learned = 0;
  let mature = 0; // interval >= 21 days
  for (const c of cards) {
    const r = state.reviews[c.id];
    if (!r) continue;
    learned += 1;
    if (r.due <= today && !r.suspended) due += 1;
    if (r.intervalDays >= 21) mature += 1;
  }
  const pct = total ? Math.round((learned / total) * 100) : 0;

  return (
    <div className="lang-card card-surface">
      <div className="lang-head">
        <span className="lang-flag">{meta.flag}</span>
        <span className="lang-name">{meta.label}</span>
        {due > 0 && <span className="due-badge">{due}</span>}
      </div>
      <div className="bar"><div className="bar-fill" style={{ width: `${pct}%` }} /></div>
      <div className="lang-stats muted">
        学習 {learned}/{total} ・ 定着 {mature}
      </div>
    </div>
  );
}
