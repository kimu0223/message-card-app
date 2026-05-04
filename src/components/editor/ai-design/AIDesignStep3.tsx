'use client';

import { useState } from 'react';
import { useAIDesignWizardStore } from '@/store/aiDesignWizardStore';
import { CARD_SIZES } from '@/types/card';
import type { CardSize } from '@/types/card';
import type { AIDesignRefinement } from '@/types/ai';

interface AIDesignStep3Props {
  onRefine: (refinement: AIDesignRefinement) => void;
  onSkip: () => void;
  isRefining: boolean;
}

export default function AIDesignStep3({ onRefine, onSkip, isRefining }: AIDesignStep3Props) {
  const { variants, selectedVariantIndex, size, setSize } = useAIDesignWizardStore();
  const [colorTemp, setColorTemp] = useState<'warmer' | 'neutral' | 'cooler'>('neutral');
  const [density, setDensity] = useState<'sparse' | 'medium' | 'dense'>('medium');

  const selectedVariant = selectedVariantIndex !== null ? variants[selectedVariantIndex] : null;

  const handleRefine = () => {
    if (!selectedVariant) return;
    onRefine({
      baseVariant: selectedVariant,
      colorTemperature: colorTemp !== 'neutral' ? colorTemp : undefined,
      decorationDensity: density !== 'medium' ? density : undefined,
      size,
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-zinc-800">
          デザインを調整（任意）
        </h3>
        <p className="mt-0.5 text-xs text-zinc-500">
          このままでよければ「スキップ」で完了できます
        </p>
      </div>

      {/* Size */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-600">
          サイズ変更
        </label>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value as CardSize)}
          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 outline-none focus:border-violet-400"
        >
          {(Object.entries(CARD_SIZES) as [CardSize, { label: string }][]).map(([key, config]) => (
            <option key={key} value={key}>{config.label}</option>
          ))}
        </select>
      </div>

      {/* Color Temperature */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-600">
          色味
        </label>
        <div className="flex gap-2">
          {([
            { value: 'warmer', label: '暖色寄り', emoji: '🔥' },
            { value: 'neutral', label: 'そのまま', emoji: '⚖️' },
            { value: 'cooler', label: '寒色寄り', emoji: '❄️' },
          ] as const).map((opt) => (
            <button
              key={opt.value}
              onClick={() => setColorTemp(opt.value)}
              className={`flex flex-1 items-center justify-center gap-1 rounded-lg border py-2 text-xs font-medium transition-all ${
                colorTemp === opt.value
                  ? 'border-violet-500 bg-violet-50 text-violet-700'
                  : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <span>{opt.emoji}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Decoration Density */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-600">
          装飾の量
        </label>
        <div className="flex gap-2">
          {([
            { value: 'sparse', label: 'ミニマル' },
            { value: 'medium', label: 'バランス' },
            { value: 'dense', label: 'デコラティブ' },
          ] as const).map((opt) => (
            <button
              key={opt.value}
              onClick={() => setDensity(opt.value)}
              className={`flex-1 rounded-lg border py-2 text-xs font-medium transition-all ${
                density === opt.value
                  ? 'border-violet-500 bg-violet-50 text-violet-700'
                  : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <button
          onClick={handleRefine}
          disabled={isRefining}
          className="flex-1 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700 disabled:opacity-50"
        >
          {isRefining ? '調整中...' : '調整を適用'}
        </button>
        <button
          onClick={onSkip}
          className="rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50"
        >
          スキップ
        </button>
      </div>
    </div>
  );
}
