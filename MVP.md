# MVP 開発タスクボード

> 凡例: ✅ 完了 | 🔄 進行中 | ⏳ 待機中 | 🔒 ブロック中

---

## 全体進捗

```
Phase 0 基盤     ████████████████████ 100%  ✅
Phase 1 コア     ░░░░░░░░░░░░░░░░░░░░   0%  ⏳
Phase 2 シェア   ░░░░░░░░░░░░░░░░░░░░   0%  ⏳
Phase 3 課金     ░░░░░░░░░░░░░░░░░░░░   0%  ⏳
```

---

## ユーザーフロー（MVPの核）

```
① どんなメッセージを書きたい？
   → 自由入力 or シチュエーション選択
        誕生日 / お礼 / 記念日 / お祝い / 季節 ...

② 誰に向けて？
   → 相手を選ぶ
        友人 / 恋人 / 家族 / 同僚 / 上司 ...

③ 用途は？
   → カード種類を選ぶ
        メッセージカード / 招待状 / お礼状 / ポストカード ...

④ デザインは？
   → スタイル選択（2ステップ）
        [シチュエーション別テンプレ一覧] → [スタイル: かわいい/エレガント/クール/シンプル/ポップ]

⑤ AIがメッセージ候補を3つ提案
   → ワンクリックで適用 or 自分で編集

⑥ 微調整（テキスト / 色 / フォント）

⑦ アニメーション付きプレビュー → シェア or 印刷
```

---

## Phase 0: 基盤構築 ✅ 完了

| # | タスク | ファイル | 状態 |
|---|--------|---------|------|
| 0-1 | Next.js 14 + TS + Tailwind セットアップ | `package.json` | ✅ |
| 0-2 | shadcn/ui 初期化 + コンポーネント追加 | `src/components/ui/` | ✅ |
| 0-3 | 全依存パッケージ install | `package.json` | ✅ |
| 0-4 | 型定義: card / template / user / ai | `src/types/` | ✅ |
| 0-5 | 定数: plans / animations / templates | `src/constants/` | ✅ |
| 0-6 | Supabase クライアント (browser/server) | `src/lib/supabase/` | ✅ |
| 0-7 | Gemini クライアント + message.ts | `src/lib/gemini/` | ✅ |
| 0-8 | Stripe クライアント | `src/lib/stripe/` | ✅ |
| 0-9 | middleware.ts ルート保護 | `src/middleware.ts` | ✅ |
| 0-10 | Supabase DBスキーマ + RLS SQL | `supabase/schema.sql` | ✅ |
| 0-11 | .env.example 整備 | `.env.example` | ✅ |
| 0-12 | CLAUDE.md + docs 3点 | `docs/` | ✅ |
| 0-13 | GitHub リポジトリ作成 & push | — | 🔒 `gh auth login` 待ち |
| 0-14 | Supabase プロジェクト作成 | dashboard | ⏳ |
| 0-15 | schema.sql を Supabase に適用 | SQL Editor | ⏳ |
| 0-16 | Google OAuth 設定 (Supabase + GCP) | dashboard | ⏳ |
| 0-17 | .env.local に認証情報を記入 | `.env.local` | ⏳ |

---

## Phase 1: カード作成コア ⏳ 未着手

### 1-A. 認証画面

| # | タスク | ファイル | 状態 |
|---|--------|---------|------|
| 1-A1 | ログインページ UI | `src/app/(auth)/login/page.tsx` | ⏳ |
| 1-A2 | OAuth Callback Route | `src/app/auth/callback/route.ts` | ⏳ |
| 1-A3 | ログアウト処理 | — | ⏳ |

### 1-B. テンプレート選択（2ステップUI）

| # | タスク | ファイル | 状態 |
|---|--------|---------|------|
| 1-B1 | Step1: シチュエーション選択画面 | `src/app/(app)/editor/page.tsx` | ⏳ |
| 1-B2 | Step2: スタイル × テンプレ一覧 | `src/components/editor/TemplateSelector.tsx` | ⏳ |
| 1-B3 | テンプレートデータ 5種 登録 | `supabase/seeds/templates.sql` | ⏳ |
| 1-B4 | `GET /api/templates` Route Handler | `src/app/api/templates/route.ts` | ⏳ |
| 1-B5 | テンプレートサムネイル画像作成 | `public/templates/` | ⏳ |

### 1-C. カードエディタ（Konva）

| # | タスク | ファイル | 状態 |
|---|--------|---------|------|
| 1-C1 | Konva Stage / Layer 基礎セットアップ | `src/components/card/CardCanvas.tsx` | ⏳ |
| 1-C2 | テキスト要素: 選択・編集・移動 | `src/components/card/` | ⏳ |
| 1-C3 | 背景色変更 | `src/components/editor/EditorPanel.tsx` | ⏳ |
| 1-C4 | フォント選択（日本語フォント5種） | `src/components/editor/EditorPanel.tsx` | ⏳ |
| 1-C5 | カラーピッカー | `src/components/editor/EditorPanel.tsx` | ⏳ |
| 1-C6 | CanvasData シリアライザ | `src/lib/canvas/serializer.ts` | ⏳ |
| 1-C7 | Zustand editorStore | `src/store/editorStore.ts` | ⏳ |
| 1-C8 | エディタページ (`/editor/[cardId]`) | `src/app/(app)/editor/[cardId]/page.tsx` | ⏳ |

### 1-D. カード保存・ダッシュボード

| # | タスク | ファイル | 状態 |
|---|--------|---------|------|
| 1-D1 | `POST /api/cards` — カード作成 | `src/app/api/cards/route.ts` | ⏳ |
| 1-D2 | `PUT /api/cards/[cardId]` — 自動保存 | `src/app/api/cards/[cardId]/route.ts` | ⏳ |
| 1-D3 | `DELETE /api/cards/[cardId]` | `src/app/api/cards/[cardId]/route.ts` | ⏳ |
| 1-D4 | ダッシュボード UI (カード一覧) | `src/app/(app)/dashboard/page.tsx` | ⏳ |
| 1-D5 | カードサムネイル生成 (Canvas→PNG) | `src/lib/canvas/exporter.ts` | ⏳ |
| 1-D6 | お気に入りトグル | — | ⏳ |

---

## Phase 2: シェア + AI ⏳ 未着手

### 2-A. AIメッセージ生成

| # | タスク | ファイル | 状態 |
|---|--------|---------|------|
| 2-A1 | `POST /api/ai/message` Route Handler | `src/app/api/ai/message/route.ts` | ⏳ |
| 2-A2 | 使用回数チェック (Free: 月5回) | — | ⏳ |
| 2-A3 | AI使用ログ保存 (`ai_usage_logs`) | — | ⏳ |
| 2-A4 | AIアシストパネル UI | `src/components/editor/AIAssistPanel.tsx` | ⏳ |
| 2-A5 | 3候補 → ワンクリック適用 | — | ⏳ |
| 2-A6 | useAI hook | `src/hooks/useAI.ts` | ⏳ |

### 2-B. シェアURL

| # | タスク | ファイル | 状態 |
|---|--------|---------|------|
| 2-B1 | `POST /api/cards/[cardId]/publish` | `src/app/api/cards/[cardId]/publish/route.ts` | ⏳ |
| 2-B2 | share_id 生成 (nanoid) | — | ⏳ |
| 2-B3 | 公開閲覧ページ | `src/app/(public)/card/[shareId]/page.tsx` | ⏳ |
| 2-B4 | OGP メタタグ (og:image, og:title) | — | ⏳ |
| 2-B5 | シェアダイアログ UI (URL/SNS) | `src/components/share/ShareDialog.tsx` | ⏳ |

### 2-C. アニメーション

| # | タスク | ファイル | 状態 |
|---|--------|---------|------|
| 2-C1 | confetti (canvas-confetti) | `src/components/card/animations/` | ⏳ |
| 2-C2 | fade_in / slide_up (Framer Motion) | `src/components/card/animations/` | ⏳ |
| 2-C3 | アニメーション選択 UI | `src/components/editor/EditorPanel.tsx` | ⏳ |
| 2-C4 | アニメーション付き全画面プレビュー | `src/components/card/CardPreview.tsx` | ⏳ |

### 2-D. PDF/PNG エクスポート

| # | タスク | ファイル | 状態 |
|---|--------|---------|------|
| 2-D1 | PNG エクスポート (html2canvas) | `src/lib/canvas/exporter.ts` | ⏳ |
| 2-D2 | PDF エクスポート (jsPDF) | `src/lib/canvas/exporter.ts` | ⏳ |
| 2-D3 | エクスポートパネル UI | `src/components/share/ExportPanel.tsx` | ⏳ |

---

## Phase 3: 収益化 ⏳ 未着手

### 3-A. Stripe 課金

| # | タスク | ファイル | 状態 |
|---|--------|---------|------|
| 3-A1 | Stripe Product / Price 作成 (Dashboard) | — | ⏳ |
| 3-A2 | `POST /api/stripe/checkout` — Checkout Session | `src/app/api/stripe/checkout/route.ts` | ⏳ |
| 3-A3 | `POST /api/stripe/webhook` — Webhook 処理 | `src/app/api/stripe/webhook/route.ts` | ⏳ |
| 3-A4 | Webhook: subscription 更新 → profiles.plan | — | ⏳ |
| 3-A5 | Webhook: credits 購入 → credit_transactions | — | ⏳ |
| 3-A6 | 料金ページ UI | `src/app/(app)/billing/page.tsx` | ⏳ |
| 3-A7 | PricingCard コンポーネント | `src/components/billing/PricingCard.tsx` | ⏳ |
| 3-A8 | CreditBalance バッジ | `src/components/billing/CreditBalance.tsx` | ⏳ |

### 3-B. プランゲーティング

| # | タスク | ファイル | 状態 |
|---|--------|---------|------|
| 3-B1 | useCredits hook | `src/hooks/useCredits.ts` | ⏳ |
| 3-B2 | 月次カード作成数チェック (Free: 3枚) | — | ⏳ |
| 3-B3 | アップグレード促進モーダル | `src/components/billing/UpgradePrompt.tsx` | ⏳ |
| 3-B4 | プレミアムテンプレートにロック表示 | — | ⏳ |
| 3-B5 | 月次リセット cron (Supabase Edge Function) | — | ⏳ |

---

## Phase 4: 品質向上 ⏳ 未着手

| # | タスク | 状態 |
|---|--------|------|
| 4-1 | AIデザイン提案 (`/api/ai/design`) | ⏳ |
| 4-2 | AI画像生成 (`/api/ai/image`, Imagen 3) | ⏳ |
| 4-3 | LINE/Instagram OGP 最適化 | ⏳ |
| 4-4 | モバイル UI 最適化 | ⏳ |
| 4-5 | LP (`src/app/page.tsx`) 完成 | ⏳ |
| 4-6 | Vercel 本番デプロイ | ⏳ |

---

## 今すぐやること（Next Actions）

```
1. gh auth login                        # GitHub認証
2. gh repo create message-card-app \
     --public --source=. \
     --remote=origin --push             # GitHub push

3. Supabase Dashboard でプロジェクト作成
   → SQL Editor で supabase/schema.sql を実行
   → Authentication → Providers → Google を有効化
   → GCP OAuth クライアントID/シークレットを設定

4. .env.local に環境変数を記入

5. npm run dev で動作確認 → Phase 1 へ
```

---

## 技術的な意思決定ログ

| 日付 | 決定事項 | 理由 |
|------|---------|------|
| 2026-03-29 | Supabase を採用 (Turso不採用) | Auth + DB + Storage + RLS 一元管理が必須。Tursoはauth/storageが別途必要でコスト・複雑さが増す |
| 2026-03-29 | Konva.js を採用 | React親和性・Canvas操作の実績。Fabric.jsより軽量 |
| 2026-03-29 | Gemini Flash をデフォルトモデルに | コスト効率。高品質が必要なケースのみ Pro にフォールバック |
