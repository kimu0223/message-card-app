# MVP 開発タスクボード

> 凡例: ✅ 完了 | 🔄 進行中 | ⏳ 未着手 | ⚠️ 要確認

---

## 全体進捗

```
Phase 0 基盤     ████████████████████ 100%  ✅
Phase 1 コア     ████████████████████ 100%  ✅
Phase 2 シェア   ████████████████████ 100%  ✅
Phase 3 課金     ████████████████░░░░  80%  🔄
Phase 4 品質     ████████████░░░░░░░░  60%  🔄
追加実装         ████████████████████ 100%  ✅
```

---

## ⚠️ 最優先: 本番確認（必ずやること）

| # | タスク | 状態 |
|---|--------|------|
| ! | Vercel の `STRIPE_WEBHOOK_SECRET` を本番用 signing secret に戻す（現在サンドボックス用） | ⚠️ |
| ! | 本番で自分が Pro プラン課金 → Supabase `profiles.plan` が `pro` に変わることを確認 | ⚠️ |

---

## 🎨 やりたいこと

| # | タスク | 状態 |
|---|--------|------|
| A | デザイン変更（箇所は都度指示） | ⏳ |
| B | テンプレート追加（現在5件 → 増やしたい） | ⏳ |

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
| 0-9 | ルート保護（(app)グループ layout で認証ガード） | `src/app/(app)/layout.tsx` | ✅ |
| 0-10 | Supabase DB スキーマ + RLS SQL | Supabase SQL Editor | ✅ |
| 0-11 | .env.example 整備 | `.env.example` | ✅ |
| 0-12 | CLAUDE.md + docs | `docs/` | ✅ |
| 0-13 | GitHub リポジトリ作成 & push | — | ✅ |
| 0-14 | Supabase プロジェクト作成 | dashboard | ✅ |
| 0-15 | schema.sql を Supabase に適用 | SQL Editor | ✅ |
| 0-16 | Google OAuth 設定 (Supabase + GCP) | dashboard | ✅ |
| 0-17 | .env.local に認証情報を記入 | `.env.local` | ✅ |

---

## Phase 1: カード作成コア ✅ 完了

### 1-A. 認証画面

| # | タスク | ファイル | 状態 |
|---|--------|---------|------|
| 1-A1 | ログインページ UI | `src/app/(auth)/login/page.tsx` | ✅ |
| 1-A2 | OAuth Callback Route | `src/app/auth/callback/route.ts` | ✅ |
| 1-A3 | ログアウト処理 | `src/components/layout/AppHeader.tsx` | ✅ |

### 1-B. テンプレート選択

| # | タスク | ファイル | 状態 |
|---|--------|---------|------|
| 1-B1 | Step1: シチュエーション選択画面 | `src/app/(app)/editor/page.tsx` | ✅ |
| 1-B2 | Step2: スタイル × テンプレ一覧 | `src/components/editor/TemplateSelector.tsx` | ✅ |
| 1-B3 | テンプレートデータ 5種 登録 | Supabase | ✅ |
| 1-B4 | `GET /api/templates` Route Handler | `src/app/api/templates/route.ts` | ✅ |
| 1-B5 | テンプレートサムネイル | 自動生成（CanvasData から） | ✅ |

### 1-C. カードエディタ（Konva）

| # | タスク | ファイル | 状態 |
|---|--------|---------|------|
| 1-C1 | Konva Stage / Layer 基礎セットアップ | `src/components/card/CardCanvas.tsx` | ✅ |
| 1-C2 | テキスト要素: 選択・編集・移動 | `src/components/card/CardCanvas.tsx` | ✅ |
| 1-C3 | 背景色変更 | `src/components/editor/EditorPanel.tsx` | ✅ |
| 1-C4 | フォント選択 | `src/components/editor/EditorPanel.tsx` | ✅ |
| 1-C5 | カラーピッカー | `src/components/editor/EditorPanel.tsx` | ✅ |
| 1-C6 | CanvasData シリアライザ | `src/lib/canvas/serializer.ts` | ✅ |
| 1-C7 | Zustand editorStore | `src/store/editorStore.ts` | ✅ |
| 1-C8 | エディタページ (`/editor/[cardId]`) | `src/app/(app)/editor/[cardId]/page.tsx` | ✅ |

### 1-D. カード保存・ダッシュボード

| # | タスク | ファイル | 状態 |
|---|--------|---------|------|
| 1-D1 | `POST /api/cards` — カード作成 | `src/app/api/cards/route.ts` | ✅ |
| 1-D2 | `PUT /api/cards/[cardId]` — 自動保存 | `src/app/api/cards/[cardId]/route.ts` | ✅ |
| 1-D3 | `DELETE /api/cards/[cardId]` | `src/app/api/cards/[cardId]/route.ts` | ✅ |
| 1-D4 | ダッシュボード UI (カード一覧) | `src/app/(app)/dashboard/page.tsx` | ✅ |
| 1-D5 | カードサムネイル生成 (Canvas→PNG) | `src/lib/canvas/exporter.ts` | ✅ |
| 1-D6 | お気に入りトグル | `src/components/dashboard/DashboardClient.tsx` | ✅ |

---

## Phase 2: シェア + AI ✅ 完了

### 2-A. AI メッセージ生成

| # | タスク | ファイル | 状態 |
|---|--------|---------|------|
| 2-A1 | `POST /api/ai/message` Route Handler | `src/app/api/ai/message/route.ts` | ✅ |
| 2-A2 | 使用回数チェック (Free: 月5回) | API 内で実装 | ✅ |
| 2-A3 | AI 使用ログ保存 (`ai_usage_logs`) | API 内で実装 | ✅ |
| 2-A4 | AI アシストパネル UI | `src/components/editor/AIAssistPanel.tsx` | ✅ |
| 2-A5 | 3候補 → ワンクリック適用 | `src/components/editor/EditorPageClient.tsx` | ✅ |
| 2-A6 | useAI hook | `src/hooks/useAI.ts` | ✅ |

### 2-B. シェア URL

| # | タスク | ファイル | 状態 |
|---|--------|---------|------|
| 2-B1 | `POST /api/cards/[cardId]/publish` | `src/app/api/cards/[cardId]/publish/route.ts` | ✅ |
| 2-B2 | share_id 生成 (nanoid) | API 内で実装 | ✅ |
| 2-B3 | 公開閲覧ページ | `src/app/(public)/card/[shareId]/page.tsx` | ✅ |
| 2-B4 | OGP メタタグ (og:image, og:title) | `src/app/(public)/card/[shareId]/page.tsx` | ✅ |
| 2-B5 | シェアダイアログ UI (URL/SNS) | `src/components/share/ShareDialog.tsx` | ✅ |

### 2-C. アニメーション

| # | タスク | ファイル | 状態 |
|---|--------|---------|------|
| 2-C1 | confetti (canvas-confetti) | `src/components/card/animations/ConfettiAnimation.tsx` | ✅ |
| 2-C2 | fade_in / slide_up (Framer Motion) | `src/components/card/CardPreview.tsx` | ✅ |
| 2-C3 | アニメーション選択 UI | `src/components/editor/EditorPanel.tsx` | ✅ |
| 2-C4 | アニメーション付き全画面プレビュー | `src/components/card/CardPreview.tsx` | ✅ |

### 2-D. PDF/PNG エクスポート

| # | タスク | ファイル | 状態 |
|---|--------|---------|------|
| 2-D1 | PNG エクスポート (html2canvas) | `src/lib/canvas/exporter.ts` | ✅ |
| 2-D2 | PDF エクスポート (jsPDF) | `src/lib/canvas/exporter.ts` | ✅ |
| 2-D3 | エクスポートパネル UI | `src/components/share/ExportPanel.tsx` | ✅ |

---

## Phase 3: 収益化 🔄 進行中

### 3-A. Stripe 課金

| # | タスク | ファイル | 状態 |
|---|--------|---------|------|
| 3-A1 | Stripe Product / Price 作成 (Standard + Pro) | Stripe Dashboard | ✅ |
| 3-A2 | `POST /api/stripe/checkout` — Checkout Session | `src/app/api/stripe/checkout/route.ts` | ✅ |
| 3-A3 | `POST /api/stripe/webhook` — Webhook 処理 | `src/app/api/stripe/webhook/route.ts` | ✅ |
| 3-A4 | Webhook: subscription 更新 → profiles.plan | API 内で実装 | ✅ |
| 3-A5 | 本番 Webhook signing secret を Vercel に設定 | Vercel env vars | ⚠️ 要対応 |
| 3-A6 | 本番課金 → profiles.plan 更新の最終確認 | — | ⚠️ 要確認 |
| 3-A7 | 料金ページ UI | `src/app/(app)/billing/page.tsx` | ✅ |

### 3-B. プランゲーティング

| # | タスク | ファイル | 状態 |
|---|--------|---------|------|
| 3-B1 | 月次カード作成数チェック (Free: 5枚) | API 内で実装 | ✅ |
| 3-B2 | アップグレード促進モーダル | `src/components/auth/LoginPromptModal.tsx` | ✅ |
| 3-B3 | プレミアムテンプレートにロック表示 | `src/components/editor/TemplateSelector.tsx` | ✅ |
| 3-B4 | 月次リセット cron | ⏳ 未実装 | ⏳ |

---

## Phase 4: 品質向上 🔄 進行中

| # | タスク | 状態 |
|---|--------|------|
| 4-1 | LP 全面刷新（8セクション） | ✅ |
| 4-2 | ゲストエディタ (/create → /create/editor) | ✅ |
| 4-3 | ログイン後ゲストデータ復元 | ✅ |
| 4-4 | Standardプラン追加（¥490/月） | ✅ |
| 4-5 | 色紙サイズ追加 (shikishi) | ✅ |
| 4-6 | SEO LP 8ページ (/lp/[keyword]) | ✅ |
| 4-7 | ブログ機能 (/blog, /blog/[slug] 4記事) | ✅ |
| 4-8 | Vercel 本番デプロイ | ✅ |
| 4-9 | デザイン変更（箇所は都度指示） | ⏳ |
| 4-10 | テンプレート追加（現在5件） | ⏳ |
| 4-11 | モバイル UI 最適化 | ⏳ |
| 4-12 | AI デザイン提案 (`/api/ai/design`) | ⏳ |
| 4-13 | AI 画像生成 (`/api/ai/image`) | ⏳ |

---

## 技術的な意思決定ログ

| 日付 | 決定事項 | 理由 |
|------|---------|------|
| 2026-03-29 | Supabase を採用 | Auth + DB + Storage + RLS 一元管理 |
| 2026-03-29 | Konva.js を採用 | React親和性・Canvas操作の実績 |
| 2026-03-29 | Gemini Flash をデフォルトモデルに | コスト効率 |
| 2026-04-19 | ゲストエディタ導入 | LP → 体験 → 登録のコンバージョン改善 |
| 2026-04-22 | Standardプラン追加 | 料金プランの最適化（¥490中間帯） |
| 2026-04-25 | dynamic = force-dynamic 追加 | Vercel ビルド時の静的プリレンダリングエラー修正 |
