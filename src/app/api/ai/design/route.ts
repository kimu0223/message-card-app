import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateDesignVariants } from '@/lib/gemini/design';
import type { AIDesignGenerateRequest, AIDesignRecipient, AIDesignOccasion, AIDesignMood } from '@/types/ai';
import type { CardSize } from '@/types/card';

const FREE_LIMIT = parseInt(process.env.AI_DESIGN_FREE_MONTHLY_LIMIT ?? '5');

const VALID_RECIPIENTS: AIDesignRecipient[] = ['lover', 'friend', 'family', 'colleague', 'teacher'];
const VALID_OCCASIONS: AIDesignOccasion[] = ['birthday', 'thank_you', 'congratulations', 'anniversary', 'seasonal', 'other'];
const VALID_MOODS: AIDesignMood[] = ['warm', 'elegant', 'pop', 'cool', 'simple', 'cute'];
const VALID_SIZES: CardSize[] = ['a4_landscape', 'a4_portrait', 'square', 'instagram', 'line_stamp', 'shikishi'];

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
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
      return NextResponse.json({ error: 'limit_exceeded' }, { status: 429 });
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

    await supabase.from('ai_usage_logs').insert({
      user_id: user.id,
      feature: 'design_generation',
      tokens_used: 0,
      credits_consumed: 0,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('AI design generation error:', error);
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
