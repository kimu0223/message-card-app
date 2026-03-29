import { getGeminiClient, GEMINI_MODELS } from './client';
import type { AIMessageRequest, AIMessageResponse } from '@/types/ai';

export async function generateCardMessages(
  req: AIMessageRequest
): Promise<AIMessageResponse> {
  const client = getGeminiClient();

  const prompt = `
あなたはメッセージカードの文章を考えるプロのライターです。
以下の条件に合わせて、感動的で自然な日本語のメッセージを3パターン生成してください。

条件:
- シチュエーション: ${req.occasion}
- 相手との関係: ${req.relationship}
- トーン: ${req.tone}
- 文章の長さ: ${req.length === 'short' ? '30文字以内' : req.length === 'medium' ? '50〜80文字' : '100〜150文字'}
${req.keywords?.length ? `- キーワード(含めると良い): ${req.keywords.join(', ')}` : ''}

出力形式: JSON配列で3つのメッセージのみ返してください。
例: ["メッセージ1", "メッセージ2", "メッセージ3"]
`.trim();

  const response = await client.models.generateContent({
    model: GEMINI_MODELS.flash,
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      temperature: 0.9,
    },
  });

  const text = response.text ?? '[]';
  const messages: string[] = JSON.parse(text);

  return {
    messages: messages.slice(0, 3),
    creditsUsed: 0, // free feature — counted against monthly limit
  };
}
