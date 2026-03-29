# アーキテクチャ

## 技術スタック

| 役割 | 採用技術 |
|------|---------|
| フロントエンド | Next.js 14 (App Router) + TypeScript |
| スタイリング | Tailwind CSS + shadcn/ui |
| アニメーション | Framer Motion + canvas-confetti |
| カードエディタ | Konva.js + react-konva |
| 認証 | Supabase Auth (Google OAuth) |
| DB | Supabase (PostgreSQL + Storage) |
| AI | Google Gemini API |
| 課金 | Stripe |
| 状態管理 | Zustand (エディタUI) + React Query (サーバーデータ) |
| PDF出力 | html2canvas + jsPDF |
| デプロイ | Vercel |

## ディレクトリ構造のポリシー
- `src/app/` — Next.js App Router（ルーティングのみ、ロジックなし）
- `src/components/` — UIコンポーネント（ドメイン別サブディレクトリ）
- `src/lib/` — 外部サービスクライアント（Supabase/Gemini/Stripe）
- `src/hooks/` — カスタムReact Hooks
- `src/store/` — Zustandストア（クライアント状態）
- `src/types/` — TypeScript型定義（共有）
- `src/constants/` — 定数（テンプレート・プラン・アニメ）

## データフロー
```
Client (Konva Canvas)
  └── Zustand editorStore (local canvas state)
       ├── Auto-save → /api/cards/[cardId] (PUT)
       └── Publish  → /api/cards/[cardId]/publish (POST)

Server (Next.js Route Handlers)
  └── Supabase (PostgreSQL + Storage)
       ├── cards table (canvas_data JSONB)
       └── Storage (thumbnails, AI-generated images)
```

## 認証フロー
1. `/login` → Supabase OAuth → Google
2. Callback → `supabase.auth.exchangeCodeForSession()`
3. `middleware.ts` が全保護ルートでセッション検証
4. `profiles` テーブルは DB trigger で自動生成

## Canvas データ永続化
カード編集内容は `canvas_data JSONB` に保存。
Konva の `stage.toJSON()` ではなく独自の `CanvasData` 型でシリアライズする
（Konva内部型に依存しないため、将来的な移行が容易）。

## セキュリティ
- RLS: `cards` / `profiles` は `auth.uid() = user_id` で自動フィルタ
- Service Role Key はサーバーサイドのみ（環境変数 `SUPABASE_SERVICE_ROLE_KEY`）
- Gemini / Stripe キーは全てサーバーサイドのみ
- Stripe Webhook は署名検証必須
