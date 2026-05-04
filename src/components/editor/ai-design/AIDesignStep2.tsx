'use client';

import { useAIDesignWizardStore } from '@/store/aiDesignWizardStore';
import DesignVariantPreview from './DesignVariantPreview';

interface AIDesignStep2Props {
  onSelect: () => void;
  onRegenerate: () => void;
}

export default function AIDesignStep2({ onSelect, onRegenerate }: AIDesignStep2Props) {
  const { variants, selectedVariantIndex, setSelectedVariant, isGenerating } = useAIDesignWizardStore();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-zinc-800">
          デザインが完成しました
        </h3>
        <p className="mt-0.5 text-xs text-zinc-500">
          お好みのデザインを選んでください
        </p>
      </div>

      {/* Responsive Variant Grid: 1 col on mobile, 2 cols on sm+ */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {variants.map((variant, i) => (
          <DesignVariantPreview
            key={i}
            canvasData={variant}
            selected={selectedVariantIndex === i}
            onClick={() => setSelectedVariant(i)}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onSelect}
          disabled={selectedVariantIndex === null}
          className="flex-1 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          このデザインを使う
        </button>
        <button
          onClick={onRegenerate}
          disabled={isGenerating}
          className="rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 disabled:opacity-50"
        >
          {isGenerating ? '生成中...' : 'もう一度'}
        </button>
      </div>
    </div>
  );
}
