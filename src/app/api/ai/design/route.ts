import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateDesignVariants } from '@/lib/gemini/design';
import { PLANS, CREDIT_COSTS } from '@/constants/plans';
import { deductCredits } from '@/lib/credits';
import type { AIDesignGenerateRequest, AIDesignRecipient, AIDesignOccasion, AIDesignMood } from '@/types/ai';
import type { CardSize } from '@/types/card';

const FREE_LIMIT = PLANS.free.monthlyAiDesignLimit!;

const VALID_RECIPIENTS: AIDesignRecipient[] = ['lover', 'friend', 'family', 'colleague', 'teacher'];
const VALID_OCCASIONS: AIDesignOccasion[] = ['birthday', 'thank_you', 'congratulations', 'anniversary', 'seasonal', 'other'];
const VALID_MOODS: AIDesignMood[] = ['warm', 'elegant', 'pop', 'cool', 'simple', 'cute'];
const VALID_SIZES: CardSize[] = ['a4_landscape', 'a4_portrait', 'square', 'instagram', 'line_stamp', 'shikishi'];

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // ゲストユーザーも利用可能。ログイン済みの場合のみ使用量・クレジット管理を行う。
  let needsCreditDeduction = false;

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan, credits')
      .eq('id', user.id)
      .single();

    const isPro = profile?.plan === 'pro';

    if (!isPro) {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { count } = await supabase
        .from('ai_usage_logs')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('feature', 'design_generation')
        .gte('created_at', startOfMonth.toISOString());

      if ((count ?? 0) >= FREE_LIMIT) {
        // Free上限超過 → クレジット残高チェック（消費はAI成功後）
        const credits = profile?.credits ?? 0;
        if (credits < CREDIT_COSTS.aiDesign) {
          return NextResponse.json({ error: 'limit_exceeded', needCredits: CREDIT_COSTS.aiDesign }, { status: 429 });
        }
        needsCreditDeduction = true;
      }
    }
  }

  let body: AIDesignGenerateRequest;
  try {
    body = (await request.json()) as AIDesignGenerateRequest;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { recipient, occasion, mood, size, messageText } = body;

  // Enum allowlist validation
  if (!VALID_RECIPIENTS.includes(recipient)) {
    return NextResponse.json({ error: 'Invalid recipient' }, { status: 400 });
  }
  if (!VALID_OCCASIONS.includes(occasion)) {
    return NextResponse.json({ error: 'Invalid occasion' }, { status: 400 });
  }
  if (!VALID_MOODS.includes(mood)) {
    return NextResponse.json({ error: 'Invalid mood' }, { status: 400 });
  }
  if (size && !VALID_SIZES.includes(size)) {
    return NextResponse.json({ error: 'Invalid size' }, { status: 400 });
  }
  if (messageText && messageText.length > 500) {
    return NextResponse.json({ error: 'Message text too long' }, { status: 400 });
  }

  try {
    const result = await generateDesignVariants(body);

    // ログイン済みユーザーのみ使用量ログ・クレジット消費を記録
    if (user) {
      if (needsCreditDeduction) {
        const { success } = await deductCredits(supabase, user.id, CREDIT_COSTS.aiDesign, 'AIデザイン生成（Free上限超過）');
        if (!success) {
          return NextResponse.json({ error: 'limit_exceeded', needCredits: CREDIT_COSTS.aiDesign }, { status: 429 });
        }
      }

      await supabase.from('ai_usage_logs').insert({
        user_id: user.id,
        feature: 'design_generation',
        tokens_used: 0,
        credits_consumed: needsCreditDeduction ? CREDIT_COSTS.aiDesign : 0,
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('AI design generation error:', error);
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
