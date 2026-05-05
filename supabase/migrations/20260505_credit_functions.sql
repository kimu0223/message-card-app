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

-- Atomic credit addition: returns new balance
CREATE OR REPLACE FUNCTION add_credits(p_user_id uuid, p_amount int)
RETURNS int
LANGUAGE plpgsql
AS $$
DECLARE
  v_new_balance int;
BEGIN
  UPDATE profiles
  SET credits = credits + p_amount
  WHERE id = p_user_id
  RETURNING credits INTO v_new_balance;

  IF NOT FOUND THEN
    RETURN -1;
  END IF;

  RETURN v_new_balance;
END;
$$;
