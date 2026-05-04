'use client';

import type { CanvasData } from '@/types/card';
import { CARD_SIZES } from '@/types/card';

interface DesignVariantPreviewProps {
  canvasData: CanvasData;
  selected?: boolean;
  onClick?: () => void;
}

export default function DesignVariantPreview({ canvasData, selected, onClick }: DesignVariantPreviewProps) {
  const { width, height } = CARD_SIZES[canvasData.size];
  const aspectRatio = width / height;

  const bgStyle: React.CSSProperties = canvasData.background.type === 'gradient'
    ? { background: canvasData.background.value }
    : { backgroundColor: canvasData.background.value };

  // Scale factor to fit preview (max 200px wide)
  const previewWidth = 200;
  const scale = previewWidth / width;

  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl border-2 transition-all hover:shadow-lg ${
        selected
          ? 'border-violet-500 shadow-lg ring-2 ring-violet-200'
          : 'border-zinc-200 hover:border-zinc-300'
      }`}
      style={{ aspectRatio: `${aspectRatio}` }}
    >
      {/* Canvas preview */}
      <div
        className="absolute inset-0"
        style={bgStyle}
      >
        {/* Render elements scaled down */}
        <div
          className="relative h-full w-full"
          style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width, height }}
        >
          {canvasData.elements
            .slice()
            .sort((a, b) => a.zIndex - b.zIndex)
            .map((el) => {
              if (el.type === 'text') {
                return (
                  <div
                    key={el.id}
                    className="absolute overflow-hidden"
                    style={{
                      left: el.x,
                      top: el.y,
                      width: el.width,
                      height: el.height,
                      transform: `rotate(${el.rotation}deg)`,
                      opacity: el.opacity,
                      fontFamily: el.fontFamily,
                      fontSize: el.fontSize,
                      fontWeight: el.fontWeight,
                      fontStyle: el.fontStyle,
                      color: el.color,
                      textAlign: el.align,
                      lineHeight: el.lineHeight,
                    }}
                  >
                    {el.text}
                  </div>
                );
              }
              if (el.type === 'shape') {
                const shapeStyle: React.CSSProperties = {
                  left: el.x,
                  top: el.y,
                  width: el.width,
                  height: el.height,
                  transform: `rotate(${el.rotation}deg)`,
                  opacity: el.opacity,
                  backgroundColor: el.fill,
                  border: el.strokeWidth > 0 ? `${el.strokeWidth}px solid ${el.stroke}` : undefined,
                };
                if (el.shapeType === 'circle') {
                  shapeStyle.borderRadius = '50%';
                } else if (el.shapeType === 'heart') {
                  shapeStyle.clipPath = 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")';
                  shapeStyle.backgroundColor = el.fill;
                } else if (el.shapeType === 'star') {
                  shapeStyle.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
                }
                return (
                  <div
                    key={el.id}
                    className="absolute"
                    style={shapeStyle}
                  />
                );
              }
              return null;
            })}
        </div>
      </div>

      {/* Selection indicator */}
      {selected && (
        <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-violet-500 shadow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/5">
        {!selected && (
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-zinc-700 opacity-0 shadow transition-opacity group-hover:opacity-100">
            選択
          </span>
        )}
      </div>
    </button>
  );
}
