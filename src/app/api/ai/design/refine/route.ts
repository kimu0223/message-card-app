import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { refineDesignVariant, validateCanvasDataStructure } from '@/lib/gemini/design';
import type { AIDesignRefinement } from '@/types/ai';

const DAILY_REFINE_LIMIT = 20;

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Simple daily rate limit for refinements
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { count } = await supabase
    .from('ai_usage_logs')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('feature', 'design_refine')
    .gte('created_at', today.toISOString());

  if ((count ?? 0) >= DAILY_REFINE_LIMIT) {
    return NextResponse.json({ error: 'limit_exceeded' }, { status: 429 });
  }

  let body: AIDesignRefinement;
  try {
    body = (await request.json()) as AIDesignRefinement;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body.baseVariant || !validateCanvasDataStructure(body.baseVariant)) {
    return NextResponse.json({ error: 'Invalid baseVariant' }, { status: 400 });
  }

  // Limit baseVariant element count to prevent abuse
  if (Array.isArray(body.baseVariant.elements) && body.baseVariant.elements.length > 20) {
    return NextResponse.json({ error: 'Too many elements' }, { status: 400 });
  }

  try {
    const result = await refineDesignVariant(body);

    await supabase.from('ai_usage_logs').insert({
      user_id: user.id,
      feature: 'design_refine',
      tokens_used: 0,
      credits_consumed: 0,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('AI design refinement error:', error);
    return NextResponse.json({ error: 'Refinement failed' }, { status: 500 });
  }
}
