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
