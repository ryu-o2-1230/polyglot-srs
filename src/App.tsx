import { useState } from 'react';
import { LANGS } from './types';
import type { LangCode } from './types';
import { useStore } from './store';
import { Dashboard } from './components/Dashboard';
import { StudySession } from './components/StudySession';
import { Browser } from './components/Browser';
import { Stats } from './components/Stats';

type View = 'home' | 'study' | 'browse' | 'stats';

export function App() {
  const { state, dispatch } = useStore();
  const [view, setView] = useState<View>('home');
  const active = state.settings.activeLang;

  function setLang(lang: LangCode | 'all') {
    dispatch({ type: 'setSettings', settings: { activeLang: lang } });
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand" onClick={() => setView('home')}>
          <span className="brand-mark">◆</span> Polyglot<span className="brand-accent">SRS</span>
        </div>
        <nav className="lang-tabs">
          <button className={`lang-tab ${active === 'all' ? 'on' : ''}`} onClick={() => setLang('all')}>
            すべて
          </button>
          {LANGS.map((l) => (
            <button
              key={l.code}
              className={`lang-tab ${active === l.code ? 'on' : ''}`}
              onClick={() => setLang(l.code)}
              title={l.label}
            >
              {l.flag}
            </button>
          ))}
        </nav>
      </header>

      <main className="content">
        {view === 'home' && <Dashboard onStudy={() => setView('study')} />}
        {view === 'study' && <StudySession onExit={() => setView('home')} />}
        {view === 'browse' && <Browser />}
        {view === 'stats' && <Stats />}
      </main>

      {view !== 'study' && (
        <nav className="bottom-nav">
          <button className={view === 'home' ? 'on' : ''} onClick={() => setView('home')}>
            <span>🏠</span>ホーム
          </button>
          <button className={view === 'browse' ? 'on' : ''} onClick={() => setView('browse')}>
            <span>🗂</span>カード
          </button>
          <button className={view === 'stats' ? 'on' : ''} onClick={() => setView('stats')}>
            <span>📊</span>統計
          </button>
        </nav>
      )}
    </div>
  );
}
