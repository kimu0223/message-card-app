'use client'

import { useEffect, useRef, useCallback, type RefObject } from 'react'
import { CARD_SIZES, type CardSize } from '@/types/card'
import { useEditorStore } from '@/store/editorStore'

// カード周囲に確保する余白（px, CSS基準）
const FIT_PADDING = 40
// フィット時の最大倍率（等倍を超えて拡大しない）
const MAX_FIT_ZOOM = 1

/**
 * カードがキャンバス領域（コンテナ）に収まるよう zoom を自動調整する。
 *
 * マウント時・カードサイズ変更時・コンテナのリサイズ時に「フィット倍率」を適用する。
 * これにより、A4横などの大きなカードがモバイル幅で画面からはみ出し、白紙が
 * 巨大表示される「崩れ」を防ぐ。
 *
 * ユーザーが手動ズーム（+/-）した後は、カードサイズが変わるまで自動フィットを抑制し、
 * 意図したズーム倍率を尊重する。手動操作時は返り値の `markManualZoom()` を呼ぶこと。
 */
export function useFitZoom(
  containerRef: RefObject<HTMLElement | null>,
  size: CardSize | undefined,
) {
  const setZoom = useEditorStore((s) => s.setZoom)
  // 手動ズーム中フラグ（カードサイズ変更でリセットして再フィットを許可）
  const manualRef = useRef(false)

  const markManualZoom = useCallback(() => {
    manualRef.current = true
  }, [])

  // カードサイズが変わったら手動フラグを解除し、新サイズでフィットし直す
  useEffect(() => {
    manualRef.current = false
  }, [size])

  useEffect(() => {
    const el = containerRef.current
    if (!el || !size) return

    const { width: cardW, height: cardH } = CARD_SIZES[size]

    const fit = () => {
      if (manualRef.current) return
      const rect = el.getBoundingClientRect()
      // レイアウト確定前（幅0）はスキップ。ResizeObserver が後追いで再実行する。
      if (rect.width < 10 || rect.height < 10) return
      const z = Math.min(
        (rect.width - FIT_PADDING) / cardW,
        (rect.height - FIT_PADDING) / cardH,
        MAX_FIT_ZOOM,
      )
      // setZoom 側で [0.1, 2] にクランプされる
      setZoom(z)
    }

    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [containerRef, size, setZoom])

  return { markManualZoom }
}
