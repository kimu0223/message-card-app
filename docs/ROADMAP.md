# ロードマップ

## Phase 0: 基盤構築（Week 1-2）
- [x] Next.js + TypeScript + Tailwind + shadcn/ui セットアップ
- [x] 型定義 (`src/types/`)
- [x] 定数 (`src/constants/`)
- [x] Supabase クライアント (`src/lib/supabase/`)
- [x] Gemini クライアント (`src/lib/gemini/`)
- [x] Stripe クライアント (`src/lib/stripe/`)
- [x] middleware.ts ルート保護
- [x] .env.example 整備
- [x] CLAUDE.md + docs/ ドキュメント
- [ ] Supabase プロジェクト作成・DBスキーマ適用・RLS設定
- [ ] Google OAuth設定
- [ ] profiles テーブル自動生成トリガー

## Phase 1: カード作成コア（Week 3-5）
- [ ] テンプレートデータ登録（5種 × フリー）
- [ ] テンプレート選択UI（カテゴリ → スタイル の2ステップ）
- [ ] Konva.js カードエディタ（テキスト編集・背景変更）
- [ ] カード保存API + ダッシュボード
- [ ] フォント・カラー選択UI
- [ ] `src/app/(auth)/login/page.tsx`
- [ ] `src/app/(app)/dashboard/page.tsx`
- [ ] `src/app/(app)/editor/page.tsx`
- [ ] `src/app/(app)/editor/[cardId]/page.tsx`

## Phase 2: シェア + AI（Week 6-8）
- [ ] シェアURL発行 (`/card/[shareId]`)
- [ ] `/api/cards/[cardId]/publish` Route Handler
- [ ] `src/app/(public)/card/[shareId]/page.tsx`
- [ ] AI メッセージ生成 (`/api/ai/message`)
- [ ] AIアシストパネルUI
- [ ] アニメーション（confetti・fade_in）
- [ ] PDF/PNG エクスポート

## Phase 3: 収益化（Week 9-11）
- [ ] Stripe サブスク決済フロー
- [ ] クレジット購入フロー
- [ ] Stripe Webhook処理
- [ ] プランゲーティング + アップグレード促進UI
- [ ] `src/app/(app)/billing/page.tsx`

## Phase 4: 品質向上（Week 12+）
- [ ] AIデザイン提案（`/api/ai/design`）
- [ ] AI画像生成（`/api/ai/image`、Imagen 3）
- [ ] LINE/Instagram OGP最適化
- [ ] モバイルUI最適化
- [ ] LP (`src/app/page.tsx`) 完成
