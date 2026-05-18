# CLAUDE.md — メッセージカードアプリ

## プロジェクト概要
アニメーション付きメッセージカードWebアプリ。
「デザインセンスがない男性でも3分で感動的なカードが作れる」を最優先コンセプト。

## 開発コマンド
```bash
npm run dev       # 開発サーバー起動 (http://localhost:3000)
npm run build     # 本番ビルド
npm run lint      # ESLint
npx tsc --noEmit  # 型チェック
```

## ディレクトリ規則
| パス | 役割 |
|------|------|
| `src/types/` | TypeScript型定義。変更時は `src/types/index.ts` からre-exportする |
| `src/constants/` | 定数。テンプレート・プラン・アニメ設定 |
| `src/lib/supabase/` | `client.ts`=ブラウザ用, `server.ts`=サーバー用 (RSC/Route Handler) |
| `src/lib/gemini/` | Gemini API呼び出し関数（サーバーサイドのみ） |
| `src/lib/stripe/` | Stripe クライアント（サーバーサイドのみ） |
| `src/store/` | Zustand ストア（クライアント状態） |
| `src/hooks/` | カスタムReact Hooks |
| `src/components/ui/` | shadcn/ui コンポーネント（直接編集しない） |

## 重要なルール

### セキュリティ
- `SUPABASE_SERVICE_ROLE_KEY`, `GOOGLE_GEMINI_API_KEY`, `STRIPE_SECRET_KEY` は
  **絶対にクライアントサイドで使用しない**
- Route Handler でのみこれらのキーを使うこと
- Stripe Webhook は必ず署名検証 (`stripe.webhooks.constructEvent`) を行う

### Canvas データ
- Konva の `stage.toJSON()` は使わず、独自の `CanvasData` 型 (`src/types/card.ts`) でシリアライズ
- `canvas_data` は Supabase の JSONB カラムに保存

### Supabase
- クライアントコンポーネント: `src/lib/supabase/client.ts` の `createClient()`
- サーバーコンポーネント / Route Handler: `src/lib/supabase/server.ts` の `createClient()`
- 管理操作（Webhook等）: `src/lib/supabase/server.ts` の `createServiceClient()`

### 状態管理
- エディタのUI状態 → Zustand (`src/store/editorStore.ts`)
- サーバーデータ（カード一覧・プロファイル等）→ React Query

### コーディング規則
- コンポーネントは機能ドメイン別にディレクトリ分割（`card/`, `editor/`, `share/`, `billing/`, `lp/`）
- 型は `any` を使わない。不明な型は `unknown` + type guard
- 日本語コメントOK

## 環境変数
`.env.example` を参照。ローカルは `.env.local` を使用。

## 外部サービスダッシュボード
- Supabase: https://app.supabase.com
- Stripe: https://dashboard.stripe.com (テスト時は Test Mode)
- Vercel: https://vercel.com/dashboard
- Google AI Studio: https://aistudio.google.com

## DBスキーマ変更
Supabase Dashboard の SQL Editor でマイグレーションを実行。
将来的には `supabase/migrations/` でバージョン管理予定。

## マーケティングチーム

`marketing/` ディレクトリにエージェントチームと戦略ドキュメントを管理。

## SNS素材自動生成

以下のキーワードが出たら、対応するスクリプトを即実行する。

| ユーザーの意図 | 実行するコマンド |
|---|---|
| 「スクリーンショット撮って」「カード画像作って」「素材撮影」 | `node scripts/capture-cards.mjs --url http://localhost:3000` |
| 「動画作って」「SNS動画生成」「TikTok/X用動画」 | `node scripts/make-video.mjs` |
| 「SNS素材作って」「まとめて作って」「一括生成」 | capture → make-video の順に両方実行 |

### スクリプト仕様
- `scripts/capture-cards.mjs` — Playwrightで `/card-gallery?i=N` を巡回し `screenshots/cards/` にPNG保存
- `scripts/make-video.mjs` — FFmpegで TikTok縦(1080×1920) と X横(1920×1080) のMP4を `~/Desktop` に保存
- どちらも引数なしで即実行できる。ローカルサーバーが起動中なら `--url http://localhost:3000` を推奨。
- 初回のみ: `npm install --save-dev @playwright/test` / `brew install ffmpeg-full` が必要。

| ファイル | 内容 |
|---|---|
| `marketing/MARKETING_TEAM.md` | チーム構成・KPI・週次オペレーション |
| `marketing/FUNNEL_DESIGN.md` | データ駆動ファネル設計（P0〜P2施策一覧） |
| `marketing/X_PLAYBOOK.md` | X（Twitter）投稿戦略プレイブック |
| `marketing/agents/x-strategy-agent.md` | Xストラテジスト エージェント定義 |
| `marketing/agents/funnel-analyst-agent.md` | ファネルアナリスト エージェント定義 |
| `marketing/agents/cro-agent.md` | CRO（コンバージョン最適化）エージェント定義 |
| `marketing/agents/content-agent.md` | コンテンツエージェント定義 |
| `marketing/agents/retention-agent.md` | リテンション・アクティベーション エージェント定義 |

### マーケティング最優先施策（P0）
1. `src/lib/guest-limit.ts` の `GUEST_SESSION_LIMIT` 緩和（体験前に壁を作らない）
2. LP に Sticky CTAバー追加（`src/components/lp/LPHeader.tsx`）
3. カード完成後の登録促進モーダル（価値体験 → 登録の順序に変える）

### GA4 プロパティ
- アカウント: kimu8120 (369949529)
- プロパティ: メッセージカードアプリ (535252003)
- 主要流入: X (Organic Social) 72%
