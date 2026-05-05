drop function if exists public.add_credits(uuid, int);

create or replace function public.add_credits(
  p_user_id uuid,
  p_amount int,
  p_type text default 'bonus',
  p_description text default '',
  p_stripe_payment_intent_id text default null
)
returns int
language plpgsql
as $$
declare
  v_new_balance int;
begin
  if p_amount <= 0 then
    return -1;
  end if;

  if p_type not in ('purchase', 'refund', 'bonus') then
    raise exception 'Invalid credit transaction type: %', p_type;
  end if;

  begin
    update public.profiles
    set credits = credits + p_amount
    where id = p_user_id
    returning credits into v_new_balance;

    if not found then
      return -1;
    end if;

    insert into public.credit_transactions (
      user_id,
      amount,
      type,
      description,
      stripe_payment_intent_id
    ) values (
      p_user_id,
      p_amount,
      p_type,
      p_description,
      p_stripe_payment_intent_id
    );

    return v_new_balance;
  exception
    when unique_violation then
      if p_type = 'purchase' and p_stripe_payment_intent_id is not null then
        select credits into v_new_balance
        from public.profiles
        where id = p_user_id;

        return coalesce(v_new_balance, -1);
      end if;

      raise;
  end;
end;
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
