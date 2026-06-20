# 贈りことば — Design System

claude.ai/design 同期用のデザインシステム定義。`src/styles/lp.css` の `--lp-*` トークンが正本で、ここはそのプレビュー（HTML + `_brand.css`）。

## 構成
- `_brand.css` — トークン・フォント・共通クラス（lp.css :root をミラー）
- `foundations/colors.html` — 和モダン配色（紺 / 生成り / 朱 / 金 ほか）
- `foundations/typography.html` — Shippori Mincho / DM Sans / Cormorant Garamond
- `components/logo.html` — 贈の印（はんこ）ロックアップ
- `components/buttons.html` — Primary 朱 / Ink 紺 / Ghost
- `components/cards.html` — ガラスカード・特徴ブロック
- `components/pricing.html` — Free / Pro（紺 Featured）
- `components/hero.html` — 奥行きヒーロー＋水引一本線

各HTMLの先頭行 `<!-- @dsCard ... -->` が Design System ペインのカードになる。

## 更新フロー
トークンを変えたら `src/styles/lp.css` と `_brand.css` の両方を合わせ、`/design-sync` で再同期する。
