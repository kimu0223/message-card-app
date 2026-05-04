import { getGeminiClient, GEMINI_MODELS } from './client';
import type { AIDesignGenerateRequest, AIDesignGenerateResponse, AIDesignRefinement, AIDesignRefineResponse } from '@/types/ai';
import type { CanvasData, CanvasElement, CardSize } from '@/types/card';
import { CARD_SIZES } from '@/types/card';
import { FONT_GUIDANCE, COLOR_PALETTES, DECORATION_HINTS, LAYOUT_PATTERNS } from '@/constants/ai-design';

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

  // キャンバスのレイアウト基準点を事前計算してプロンプトに含める
  const cx = Math.round(width / 2);
  const cy = Math.round(height / 2);
  const goldenY = Math.round(height * 0.382);  // 黄金比ポイント（上から38.2%）
  const thirdX = Math.round(width / 3);
  const thirdY = Math.round(height / 3);
  const padX = Math.round(width * 0.08);  // 左右パディング (8%)
  const padY = Math.round(height * 0.08); // 上下パディング (8%)
  const safeW = width - padX * 2;  // テキスト配置可能幅
  const safeH = height - padY * 2; // テキスト配置可能高さ

  return `
あなたは一流のグラフィックデザイナーです。メッセージカードのデザインデータをJSON形式で4パターン生成してください。
プロのデザイナーとして、レイアウト・配色・タイポグラフィ・装飾すべてに意図を持った美しいデザインを作ってください。

## 依頼条件
- 相手: ${req.recipient}
- シーン: ${req.occasion}
- 雰囲気: ${req.mood}
- キャンバスサイズ: ${width}x${height}px (${size})
${req.messageText ? `- メッセージテキスト: 「${sanitizeUserText(req.messageText)}」` : '- メッセージテキスト: 相手やシーンに適した心のこもった日本語メッセージを考えてください(20-40文字程度)'}

## フォント指定
- タイトル/メインメッセージ用: "${fonts.primary}"
- サブテキスト/差出人名用: "${fonts.accent}"

## カラーパレット (60-30-10ルール)
各パレットは [背景色60%, メインカラー30%, アクセントカラー10%, テキスト色] の順です。
- パターン1用: ${JSON.stringify(palettes[0])}
- パターン2用: ${JSON.stringify(palettes[1])}
- パターン3用: ${JSON.stringify(palettes[2])}
- パターン4用: ${JSON.stringify(palettes[3])}

**60-30-10ルールの適用方法:**
- 背景色(60%): backgroundのvalueに使用
- メインカラー(30%): 装飾シェイプのfillやテキストの装飾色に使用
- アクセントカラー(10%): 最も目立つポイント1箇所(タイトルのアンダーラインやハイライト装飾)に使用
- テキスト色: テキスト要素のcolorに使用。背景とのコントラスト比4.5:1以上を確保すること

## 装飾の役割ガイド
使用可能シェイプ: ${decorations.shapes.join(', ')}
装飾の意図:
${decorations.roles.map((r, i) => `- ${decorations.shapes[i] ?? decorations.shapes[0]}: ${r}`).join('\n')}

**重要: 装飾はランダムに置かない。以下のいずれかの「デザイン上の役割」を必ず持たせること:**
1. フレーム: テキスト周囲を囲んでメッセージを際立たせる(rect/circle)
2. アンダーライン/セパレーター: タイトルとサブテキストを視覚的に分ける(細長いrect)
3. コーナーアクセント: 四隅のうち対角2箇所に配置して視線を中央に誘導(circle/star/heart)
4. 背景アクセント: 大きめ・低透明度でテクスチャ感を出す(circle/rect)
5. シンボル: シーンを象徴する形を1つだけ印象的に配置(heart/star)

## レイアウト基準値 (このキャンバスの座標)
- キャンバス中央: (${cx}, ${cy})
- 黄金比ポイント(上から38.2%): y=${goldenY}
- 三分割線: x=${thirdX}, x=${thirdX * 2} / y=${thirdY}, y=${thirdY * 2}
- 安全マージン: 上下左右それぞれ ${padX}px以上空ける
- テキスト配置可能領域: x=${padX}~${padX + safeW}, y=${padY}~${padY + safeH}

## 4パターンのレイアウト指示
以下の4パターンは見た目が**明確に**異なるデザインにしてください。

### パターン1: ${LAYOUT_PATTERNS.pattern1.name}
${LAYOUT_PATTERNS.pattern1.description}
- ${LAYOUT_PATTERNS.pattern1.elementCount}
- ${LAYOUT_PATTERNS.pattern1.layoutGuide}
- 背景: ソリッドカラー推奨
- アニメーション: fade_in (1200ms)

### パターン2: ${LAYOUT_PATTERNS.pattern2.name}
${LAYOUT_PATTERNS.pattern2.description}
- ${LAYOUT_PATTERNS.pattern2.elementCount}
- ${LAYOUT_PATTERNS.pattern2.layoutGuide}
- 背景: ソリッドカラーまたは淡いグラデーション
- アニメーション: slide_up (1000ms)

### パターン3: ${LAYOUT_PATTERNS.pattern3.name}
${LAYOUT_PATTERNS.pattern3.description}
- ${LAYOUT_PATTERNS.pattern3.elementCount}
- ${LAYOUT_PATTERNS.pattern3.layoutGuide}
- 背景: グラデーション推奨(10-20度の微妙な角度)
- アニメーション: bounce (1000ms)

### パターン4: ${LAYOUT_PATTERNS.pattern4.name}
${LAYOUT_PATTERNS.pattern4.description}
- ${LAYOUT_PATTERNS.pattern4.elementCount}
- ${LAYOUT_PATTERNS.pattern4.layoutGuide}
- 背景: ソリッドカラーまたはグラデーション
- アニメーション: sparkle (1500ms)

## タイポグラフィ階層ルール
テキスト要素は以下の階層を守ってください:
1. **メインメッセージ** (必須): fontSize ${Math.min(Math.round(width * 0.06), 72)}-${Math.min(Math.round(width * 0.08), 96)}px, fontWeight: "bold", フォント: "${fonts.primary}"
2. **サブテキスト** (任意: 日付・差出人名・一言添え): fontSize ${Math.max(Math.round(width * 0.02), 18)}-${Math.max(Math.round(width * 0.03), 24)}px, fontWeight: "normal", フォント: "${fonts.accent}"
3. メインとサブのフォントサイズ比は **2.5:1 ~ 3:1** を目安にすること
4. テキスト同士は最低 ${Math.round(height * 0.04)}px 以上の間隔を空ける(窮屈にしない)
5. lineHeightはメインメッセージ: 1.5-1.8、サブテキスト: 1.3-1.5

## 出力JSON仕様
4パターンのCanvasData配列を返してください。各パターンは以下の構造:

{
  "version": "1.0",
  "size": "${size}",
  "background": {
    "type": "color" | "gradient",
    "value": "#hex色" | "linear-gradient(角度deg, 色1, 色2)"
  },
  "elements": [
    {
      "id": "el_xxxxxxxx",
      "type": "text",
      "x": 数値(${padX}-${padX + safeW}),
      "y": 数値(${padY}-${padY + safeH}),
      "width": 数値,
      "height": 数値,
      "rotation": 0,
      "opacity": 1,
      "zIndex": 数値,
      "text": "テキスト内容",
      "fontFamily": "${fonts.primary}" | "${fonts.accent}",
      "fontSize": 数値(18-96),
      "fontWeight": "normal" | "bold",
      "fontStyle": "normal" | "italic",
      "color": "#hex",
      "align": "left" | "center" | "right",
      "lineHeight": 1.3-1.8
    },
    {
      "id": "el_xxxxxxxx",
      "type": "shape",
      "x": 数値,
      "y": 数値,
      "width": 数値,
      "height": 数値,
      "rotation": 数値(-15 ~ 15),
      "opacity": 0.08-1.0,
      "zIndex": 数値,
      "shapeType": "rect" | "circle" | "heart" | "star",
      "fill": "#hex",
      "stroke": "#hex" | "transparent",
      "strokeWidth": 0-3
    }
  ],
  "animation": {
    "type": "fade_in" | "slide_up" | "confetti" | "bounce" | "sparkle",
    "duration": 800-2000,
    "delay": 0,
    "loop": false
  }
}

## 厳守ルール
1. **座標とサイズ**: すべてのx,y,width,heightは0以上の数値。テキストのx+widthは${width}以下、y+heightは${height}以下にすること
2. **zIndex**: 0から昇順。背景装飾(0-2) → フレーム装飾(3-4) → テキスト(5-7)の順
3. **要素数**: 各パターンのelementsは最大8要素。テキストは必ず1つ以上含める
4. **ID**: "el_" + ランダム英数字8文字。全パターン通じてユニークにすること
5. **テキスト幅**: メインメッセージのwidthは${Math.round(safeW * 0.6)}~${safeW}px程度を確保(読みやすさのため)
6. **装飾opacity**: 背景的な装飾はopacity 0.08-0.2、アクセント装飾は0.4-0.8、フレーム装飾は0.15-0.4
7. **余白**: テキストはキャンバス端から最低${padX}px離す。装飾も端から${Math.round(padX * 0.3)}px以上離す
8. **グラデーション**: "linear-gradient(角度deg, #色1, #色2)"形式。角度は0-180の整数
9. **パターン多様性**: 4パターンの背景色・レイアウト構成・装飾数・テキスト配置が明確に異なること
10. **装飾の意図**: 各shapeが上記「デザイン上の役割」のどれに該当するか意識して配置すること

JSON配列のみ返してください。説明文やマークダウン記法は一切不要です。
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
