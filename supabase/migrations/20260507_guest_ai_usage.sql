-- ゲストAIデザイン使用量テーブル
-- Cookie セッション（1回/30日）+ IP（10回/日）の2層レート制限に使用
-- service_role のみアクセス可（RLSで anon/authenticated を全拒否）

CREATE TABLE IF NOT EXISTS public.guest_ai_usage (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text        NOT NULL,
  ip_address text,
  feature    text        NOT NULL DEFAULT 'design_generation',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- セッション制限チェック用インデックス
CREATE INDEX IF NOT EXISTS idx_guest_ai_usage_session
  ON public.guest_ai_usage (session_id, feature, created_at);

-- IP制限チェック用インデックス
CREATE INDEX IF NOT EXISTS idx_guest_ai_usage_ip
  ON public.guest_ai_usage (ip_address, feature, created_at);

-- RLS有効化
ALTER TABLE public.guest_ai_usage ENABLE ROW LEVEL SECURITY;

-- anon キー（ブラウザ直接アクセス）を全拒否
CREATE POLICY "deny_anon_access" ON public.guest_ai_usage
  FOR ALL TO anon USING (false);

-- ログイン済みユーザーの直接アクセスも拒否
CREATE POLICY "deny_authenticated_access" ON public.guest_ai_usage
  FOR ALL TO authenticated USING (false);

-- service_role はRLSをbypassするため、サーバー側Route Handlerのみが操作可能
