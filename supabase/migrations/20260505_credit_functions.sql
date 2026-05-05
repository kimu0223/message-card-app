-- Atomic credit deduction: returns remaining credits, or -1 if insufficient
CREATE OR REPLACE FUNCTION deduct_credits(p_user_id uuid, p_amount int)
RETURNS int
LANGUAGE plpgsql
AS $$
DECLARE
  v_remaining int;
BEGIN
  UPDATE profiles
  SET credits = credits - p_amount
  WHERE id = p_user_id AND credits >= p_amount
  RETURNING credits INTO v_remaining;

  IF NOT FOUND THEN
    RETURN -1;
  END IF;

  RETURN v_remaining;
END;
$$;

-- Atomic credit addition with transaction recording.
-- Purchase transactions are idempotent by stripe_payment_intent_id.
CREATE OR REPLACE FUNCTION add_credits(
  p_user_id uuid,
  p_amount int,
  p_type text DEFAULT 'bonus',
  p_description text DEFAULT '',
  p_stripe_payment_intent_id text DEFAULT NULL
)
RETURNS int
LANGUAGE plpgsql
AS $$
DECLARE
  v_new_balance int;
BEGIN
  IF p_amount <= 0 THEN
    RETURN -1;
  END IF;

  IF p_type NOT IN ('purchase', 'refund', 'bonus') THEN
    RAISE EXCEPTION 'Invalid credit transaction type: %', p_type;
  END IF;

  BEGIN
    UPDATE profiles
    SET credits = credits + p_amount
    WHERE id = p_user_id
    RETURNING credits INTO v_new_balance;

    IF NOT FOUND THEN
      RETURN -1;
    END IF;

    INSERT INTO credit_transactions (
      user_id,
      amount,
      type,
      description,
      stripe_payment_intent_id
    ) VALUES (
      p_user_id,
      p_amount,
      p_type,
      p_description,
      p_stripe_payment_intent_id
    );

    RETURN v_new_balance;
  EXCEPTION
    WHEN unique_violation THEN
      IF p_type = 'purchase' AND p_stripe_payment_intent_id IS NOT NULL THEN
        SELECT credits INTO v_new_balance
        FROM profiles
        WHERE id = p_user_id;

        RETURN COALESCE(v_new_balance, -1);
      END IF;

      RAISE;
  END;

  RETURN v_new_balance;
END;
$$;

create unique index if not exists idx_credit_tx_purchase_payment_intent_unique
  on public.credit_transactions(stripe_payment_intent_id)
  where type = 'purchase' and stripe_payment_intent_id is not null;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'credit_transactions'
      and policyname = 'Users can insert own transactions'
  ) then
    create policy "Users can insert own transactions" on public.credit_transactions
      for insert with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'ai_usage_logs'
      and policyname = 'Users can insert own AI logs'
  ) then
    create policy "Users can insert own AI logs" on public.ai_usage_logs
      for insert with check (auth.uid() = user_id);
  end if;
end
$$;
