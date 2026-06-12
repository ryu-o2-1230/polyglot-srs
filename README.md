# ◆ Polyglot SRS

多言語の語彙と文法を **間隔反復（Spaced Repetition）** で身につける学習アプリ。
英語・イタリア語・フランス語・ロシア語に対応し、単なる正誤だけでなく
**「なぜそうなるか」の言語学的メモ**（統語・アスペクト・格・中間構文など）を
カードに添えています。多言語を横断して学ぶ人のために設計しました。

> Built with Claude Code. A spaced-repetition trainer for English, Italian,
> French and Russian, with linguistic notes baked into the cards.

## 特長

- **Anki 風の間隔反復アルゴリズム**（SM-2 ベース、`again / hard / good / easy` の4段階評価）
- **4言語の厳選シードデッキ** — 上級語彙＋つまずきやすい文法（接続法、格変化、相、中間構文 …）
- **言語学的メモ付き** — 例: 英語の middle construction、ロシア語のアスペクト対、イタリア語の性の例外
- **進捗ダッシュボード**と**統計**（連続学習日数・定着カード数・過去14日のヒートマップ）
- **自分のカードを追加・管理**できる
- **localStorage に保存**（サーバー不要・APIキー不要）＋ **JSON エクスポート/インポート**
- **GitHub Pages へ自動デプロイ**（`main` への push で公開）

## 開発

```bash
npm install
npm run dev      # 開発サーバー
npm run build    # 型チェック + 本番ビルド (dist/)
npm run preview  # ビルド結果をプレビュー
```

技術スタック: **Vite + React 18 + TypeScript**（依存は最小限）。

## デプロイ（GitHub Pages）

1. リポジトリの **Settings → Pages → Build and deployment → Source** を
   **GitHub Actions** に設定する。
2. `main` ブランチに push すると `.github/workflows/deploy.yml` が走り、
   `https://<ユーザー名>.github.io/polyglot-srs/` に公開されます。

別パスで公開する場合は `VITE_BASE` 環境変数で base パスを上書きできます。

## カードの構造

```ts
interface Card {
  id: string;
  lang: 'en' | 'it' | 'fr' | 'ru';
  front: string;   // 語・問い（学習対象言語）
  back: string;    // 意味・答え
  ipa?: string;    // 発音
  pos?: string;    // 品詞
  gender?: string; // 文法性
  example?: string;
  note?: string;   // 言語学的メモ
  tags?: string[];
}
```

シードデッキは [`src/data/`](src/data) にあります。各言語ファイルを編集すれば
コンテンツを増やせます。学習の進捗はカード内容と分離して保存されるため、
デッキを更新しても既存の進捗は失われません。

## ライセンス

[MIT](LICENSE)
