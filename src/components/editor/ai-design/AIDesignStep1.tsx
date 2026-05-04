'use client';

import { useAIDesignWizardStore } from '@/store/aiDesignWizardStore';
import { RECIPIENT_OPTIONS, OCCASION_OPTIONS, MOOD_OPTIONS } from '@/constants/ai-design';
import { CARD_SIZES } from '@/types/card';
import type { CardSize } from '@/types/card';

export default function AIDesignStep1() {
  const {
    recipient, occasion, mood, size,
    setRecipient, setOccasion, setMood, setSize,
  } = useAIDesignWizardStore();

  return (
    <div className="space-y-6">
      {/* Q1: Recipient */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-800">
          誰に贈りますか？
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {RECIPIENT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setRecipient(opt.value)}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition-all ${
                recipient === opt.value
                  ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-sm'
                  : 'border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50'
              }`}
            >
              <span className="text-lg">{opt.emoji}</span>
              <span className="font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Q2: Occasion */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-800">
          何のカードですか？
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {OCCASION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setOccasion(opt.value)}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition-all ${
                occasion === opt.value
                  ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-sm'
                  : 'border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50'
              }`}
            >
              <span className="text-lg">{opt.emoji}</span>
              <span className="font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Q3: Mood (Visual Grid) */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-zinc-800">
          どんな雰囲気がいい？
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {MOOD_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setMood(opt.value)}
              className={`group relative overflow-hidden rounded-xl border p-3 text-left transition-all ${
                mood === opt.value
                  ? 'border-violet-500 shadow-md ring-1 ring-violet-500'
                  : 'border-zinc-200 hover:border-zinc-300 hover:shadow-sm'
              }`}
            >
              {/* Color preview bar */}
              <div className="mb-2 flex gap-1">
                {opt.colors.map((c, i) => (
                  <div
                    key={i}
                    className="h-5 flex-1 rounded-sm"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <p className="text-xs font-bold text-zinc-800">{opt.label}</p>
              <p className="mt-0.5 text-[10px] leading-tight text-zinc-500">
                {opt.description}
              </p>
              {mood === opt.value && (
                <div className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-violet-500">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size (collapsed, optional) */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-zinc-500">
          カードサイズ
        </label>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value as CardSize)}
          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400"
        >
          {(Object.entries(CARD_SIZES) as [CardSize, { label: string }][]).map(([key, config]) => (
            <option key={key} value={key}>
              {config.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
