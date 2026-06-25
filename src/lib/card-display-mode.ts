import type { CanvasData } from '@/types/card'
import type { Plan } from '@/types/user'

/**
 * 3Dカード表示（`displayMode: '3d'`）はProプラン限定の演出。
 * カード所有者の「現在の」プランがPro以外なら displayMode を '2d' に正規化する。
 *
 * 公開ビューのレンダリング時（src/app/(public)/card/[shareId]/page.tsx）に
 * 一度だけ適用する唯一の権威ゲート。保存時には適用しない。
 * （これにより Pro→Free ダウングレード後は3Dを配信せず、
 *  逆にアップグレード済みなら過去カードもそのまま3Dで表示される）
 *
 * 入力をミューテートせず、必要なときだけ新しいオブジェクトを返す。
 */
export function gateDisplayModeByPlan(
  canvasData: CanvasData,
  plan: Plan | null | undefined,
): CanvasData {
  if (plan === 'pro') return canvasData
  if (canvasData.displayMode !== '3d') return canvasData
  return { ...canvasData, displayMode: '2d' }
}
