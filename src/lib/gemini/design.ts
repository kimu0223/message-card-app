import { getGeminiClient, GEMINI_MODELS } from './client';
import type { AIDesignGenerateRequest, AIDesignGenerateResponse, AIDesignRefinement, AIDesignRefineResponse } from '@/types/ai';
import type { CanvasData, CanvasElement, CardSize } from '@/types/card';
import { CARD_SIZES } from '@/types/card';
import { FONT_GUIDANCE, COLOR_PALETTES, DECORATION_HINTS } from '@/constants/ai-design';

/** Strip control characters and limit length to prevent prompt injection */
function sanitizeUserText(text: string, maxLen = 200): string {
  return text
    .replace(/[\x00-\x1F\x7F]/g, '')
    .replace(/[`${}]/g, '')
    .slice(0, maxLen);
}

function buildDesignPrompt(req: AIDesignGenerateRequest): string {
  const size: CardSize = req.size ?? 'a4_landscape';
  const { width, height } = CARD_SIZES[size];
  const fonts = FONT_GUIDANCE[req.mood];
  const palettes = COLOR_PALETTES[req.mood];
  const decorations = DECORATION_HINTS[req.occasion];

  return `
あなたはプロのグラフィックデザイナーです。メッセージカードのデザインデータをJSON形式で4パターン生成してください。

## 条件
- 相手: ${req.recipient}
- シーン: ${req.occasion}
- 雰囲気: ${req.mood}
- キャンバスサイズ: ${width}x${height}px (${size})
${req.messageText ? `- メッセージテキスト: 「${sanitizeUserText(req.messageText)}」` : '- メッセージテキスト: 相手やシーンに適した短い日本語メッセージを入れてください'}

## デザインの方向性
- メインフォント: ${fonts.primary}
- アクセントフォント: ${fonts.accent}
- 使用可能なカラーパレット(4色ずつ): ${JSON.stringify(palettes)}
- 装飾シェイプ候補: ${decorations.join(', ')}

## 出力JSON仕様
4パターンのCanvasData配列を返してください。各パターンは以下の構造:

{
  "version": "1.0",
  "size": "${size}",
  "background": {
    "type": "color" または "gradient",
    "value": "#hex色" または "linear-gradient(角度, 色1, 色2)"
  },
  "elements": [
    // TextElement (必ず1つ以上のメッセージテキストを含む)
    {
      "id": "ユニークID",
      "type": "text",
      "x": 数値(0-${width}),
      "y": 数値(0-${height}),
      "width": 数値,
      "height": 数値,
      "rotation": 0,
      "opacity": 1,
      "zIndex": 数値,
      "text": "テキスト内容",
      "fontFamily": "${fonts.primary}" または "${fonts.accent}",
      "fontSize": 数値(18-120),
      "fontWeight": "normal" または "bold",
      "fontStyle": "normal" または "italic",
      "color": "#hex",
      "align": "left" または "center" または "right",
      "lineHeight": 1.4-2.0
    },
    // ShapeElement (装飾用、0-6個)
    {
      "id": "ユニークID",
      "type": "shape",
      "x": 数値,
      "y": 数値,
      "width": 数値,
      "height": 数値,
      "rotation": 数値(-30 to 30),
      "opacity": 0.1-1.0,
      "zIndex": 数値,
      "shapeType": "rect" または "circle" または "heart" または "star",
      "fill": "#hex",
      "stroke": "#hex" または "transparent",
      "strokeWidth": 0-3
    }
  ],
  "animation": {
    "type": "fade_in" または "slide_up" または "confetti" または "bounce" または "sparkle",
    "duration": 800-2000,
    "delay": 0,
    "loop": false
  }
}

## 重要なルール
- 各パターンは見た目が明確に異なるようにしてください（背景色、レイアウト、装飾の数を変える）
- テキスト要素は読みやすい位置に配置（キャンバスの中央付近）
- メッセージのフォントサイズは大きめ(36-72px)、サブテキストは小さめ(18-28px)
- elements配列は最大8要素まで
- 装飾shapeはテキストの背景や枠として使い、メッセージの邪魔にならないよう配置
- idは "el_" + ランダム英数8文字
- zIndexは0から昇順で配置（背景装飾が小、テキストが大）
- パターン1はシンプルめ、パターン4はデコレーション多めにして多様性を出す

JSON配列のみ返してください。説明やマークダウンは不要です。
`.trim();
}

function buildRefinementPrompt(refinement: AIDesignRefinement): string {
  const base = refinement.baseVariant;
  const size = refinement.size ?? base.size;
  const { width, height } = CARD_SIZES[size];

  let adjustments = '';
  if (refinement.colorTemperature === 'warmer') {
    adjustments += '- 色味をより暖色系（オレンジ、赤、茶系）に寄せてください\n';
  } else if (refinement.colorTemperature === 'cooler') {
    adjustments += '- 色味をより寒色系（青、紫、グレー系）に寄せてください\n';
  }
  if (refinement.decorationDensity === 'sparse') {
    adjustments += '- 装飾shape要素を減らしてミニマルにしてください（最大2個）\n';
  } else if (refinement.decorationDensity === 'dense') {
    adjustments += '- 装飾shape要素を増やしてデコラティブにしてください（5-6個）\n';
  }
  if (refinement.size && refinement.size !== base.size) {
    adjustments += `- キャンバスサイズを${width}x${height}px (${size})に変更し、要素の位置を調整してください\n`;
  }

  return `
以下のメッセージカードデザインJSONを調整してください。

## 元のデザイン:
${JSON.stringify(base, null, 2)}

## 調整内容:
${adjustments}

## 出力
調整後のCanvasData JSONを1つだけ返してください。構造は元と同じです。
キャンバスサイズ: ${width}x${height}px (size: "${size}")
JSON配列ではなく、単一のオブジェクトで返してください。
`.trim();
}

/** Validates structure only — does NOT mutate input. Exported for use in route handlers. */
export function validateCanvasDataStructure(data: unknown): data is CanvasData {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;

  if (typeof d.version !== 'string') return false;
  if (typeof d.size !== 'string') return false;

  const bg = d.background as Record<string, unknown> | undefined;
  if (!bg || !['color', 'gradient', 'image'].includes(bg.type as string)) return false;
  if (typeof bg.value !== 'string') return false;

  if (!Array.isArray(d.elements)) return false;
  for (const el of d.elements as unknown[]) {
    if (!el || typeof el !== 'object') return false;
    const e = el as Record<string, unknown>;
    if (!['text', 'shape', 'sticker', 'image'].includes(e.type as string)) return false;
    if (typeof e.x !== 'number' || typeof e.y !== 'number') return false;
    if (typeof e.width !== 'number' || typeof e.height !== 'number') return false;
  }

  return true;
}

/** Corrects size field and ensures element IDs/zIndex are set */
function normalizeCanvasData(data: CanvasData, expectedSize?: CardSize): CanvasData {
  const size = expectedSize ?? data.size;
  const elements = data.elements.map((el, i) => ({
    ...el,
    id: el.id || `el_${Math.random().toString(36).slice(2, 10)}`,
    zIndex: el.zIndex ?? i,
  })) as CanvasElement[];
  return { ...data, size, elements };
}

export async function generateDesignVariants(
  req: AIDesignGenerateRequest
): Promise<AIDesignGenerateResponse> {
  const client = getGeminiClient();
  const prompt = buildDesignPrompt(req);
  const size = req.size ?? 'a4_landscape';

  const response = await client.models.generateContent({
    model: GEMINI_MODELS.flash3,
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      temperature: 1.0,
    },
  });

  const text = response.text ?? '[]';
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('AI returned invalid JSON');
  }

  let variants: unknown[];
  if (Array.isArray(parsed)) {
    variants = parsed;
  } else if (typeof parsed === 'object' && parsed !== null && 'variants' in (parsed as Record<string, unknown>)) {
    variants = (parsed as Record<string, unknown>).variants as unknown[];
  } else {
    throw new Error('Unexpected AI response structure');
  }

  const validVariants: CanvasData[] = [];
  for (const v of variants) {
    if (validateCanvasDataStructure(v)) {
      validVariants.push(normalizeCanvasData(v as CanvasData, size));
    }
  }

  if (validVariants.length === 0) {
    throw new Error('AI generated no valid designs');
  }

  // Pad to 4 if fewer (deep copy last variant)
  while (validVariants.length < 4) {
    const last = validVariants[validVariants.length - 1];
    validVariants.push(structuredClone(last));
  }

  return {
    variants: validVariants.slice(0, 4),
    creditsUsed: 0,
  };
}

export async function refineDesignVariant(
  refinement: AIDesignRefinement
): Promise<AIDesignRefineResponse> {
  const client = getGeminiClient();
  const prompt = buildRefinementPrompt(refinement);

  const response = await client.models.generateContent({
    model: GEMINI_MODELS.flash3,
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      temperature: 0.7,
    },
  });

  const text = response.text ?? '{}';
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('AI returned invalid JSON for refinement');
  }

  const size = refinement.size ?? refinement.baseVariant.size;
  if (!validateCanvasDataStructure(parsed)) {
    throw new Error('AI refinement produced invalid design');
  }

  return {
    variant: normalizeCanvasData(parsed as CanvasData, size),
    creditsUsed: 0,
  };
}
