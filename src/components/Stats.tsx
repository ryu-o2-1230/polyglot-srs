import { useRef } from 'react';
import { useStore } from '../store';
import { exportState, importState } from '../storage';
import { todayISO, addDays } from '../srs';

export function Stats() {
  const { state, dispatch } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);

  // Reviews per day over the last 14 days.
  const days: { date: string; count: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const date = addDays(todayISO(), -i);
    days.push({ date, count: 0 });
  }
  const byDate = new Map(days.map((d) => [d.date, d]));
  for (const log of state.logs) {
    const d = byDate.get(log.ts.slice(0, 10));
    if (d) d.count += 1;
  }
  const max = Math.max(1, ...days.map((d) => d.count));

  const totalReviews = state.logs.length;
  const totalCards = Object.keys(state.cards).length;
  const mature = Object.values(state.reviews).filter((r) => r.intervalDays >= 21).length;
  const streak = computeStreak(state.logs);

  function doExport() {
    const blob = new Blob([exportState(state)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `polyglot-srs-backup-${todayISO()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function doImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const next = importState(String(reader.result));
        dispatch({ type: 'replaceState', state: next });
        alert('インポートしました。');
      } catch (err) {
        alert('インポート失敗: ' + (err as Error).message);
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="stats">
      <div className="stat-grid">
        <Stat label="累計レビュー" value={totalReviews} />
        <Stat label="連続学習日数" value={`${streak}日`} />
        <Stat label="定着カード" value={mature} />
        <Stat label="総カード数" value={totalCards} />
      </div>

      <h3 className="section-title">過去14日のレビュー数</h3>
      <div className="bars card-surface">
        {days.map((d) => (
          <div key={d.date} className="bar-col" title={`${d.date}: ${d.count}`}>
            <div className="bar-v" style={{ height: `${(d.count / max) * 100}%` }} />
            <span className="bar-x">{d.date.slice(8)}</span>
          </div>
        ))}
      </div>

      <h3 className="section-title">データ管理</h3>
      <div className="data-actions card-surface">
        <button className="btn" onClick={doExport}>エクスポート (JSON)</button>
        <button className="btn" onClick={() => fileRef.current?.click()}>インポート</button>
        <input ref={fileRef} type="file" accept="application/json" hidden onChange={doImport} />
        <button
          className="btn danger"
          onClick={() => {
            if (confirm('学習の進捗をすべてリセットしますか？（カード自体は残ります）')) {
              dispatch({ type: 'resetProgress' });
            }
          }}
        >
          進捗をリセット
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="stat card-surface">
      <div className="stat-value">{value}</div>
      <div className="stat-label muted">{label}</div>
    </div>
  );
}

function computeStreak(logs: { ts: string }[]): number {
  const days = new Set(logs.map((l) => l.ts.slice(0, 10)));
  let streak = 0;
  let cursor = todayISO();
  // If nothing today, allow the streak to count up to yesterday.
  if (!days.has(cursor)) cursor = addDays(cursor, -1);
  while (days.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}
