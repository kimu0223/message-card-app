'use client';

import { useCallback, useState } from 'react';
import { Sparkles, ArrowLeft, X } from 'lucide-react';
import { useAIDesignWizardStore } from '@/store/aiDesignWizardStore';
import { useAIDesign } from '@/hooks/useAIDesign';
import AIDesignStep1 from './AIDesignStep1';
import AIDesignStep2 from './AIDesignStep2';
import AIDesignStep3 from './AIDesignStep3';
import type { CanvasData } from '@/types/card';
import type { AIDesignRefinement } from '@/types/ai';

interface AIDesignWizardProps {
  onComplete: (canvasData: CanvasData) => void;
  onClose: () => void;
}

export default function AIDesignWizard({ onComplete, onClose }: AIDesignWizardProps) {
  const {
    step, recipient, occasion, mood, size,
    variants, selectedVariantIndex, isGenerating,
    nextStep, prevStep, reset,
  } = useAIDesignWizardStore();
  const { generateDesigns, refineDesign } = useAIDesign();
  const [isRefining, setIsRefining] = useState(false);

  const canGenerate = recipient && occasion && mood;

  const handleGenerate = useCallback(async () => {
    if (!recipient || !occasion || !mood) return;
    await generateDesigns({ recipient, occasion, mood, size });
  }, [recipient, occasion, mood, size, generateDesigns]);

  const handleOmakase = useCallback(async () => {
    // Quick generate with defaults
    const defaultRecipient = 'friend';
    const defaultOccasion = occasion ?? 'birthday';
    const defaultMood = 'warm';
    await generateDesigns({
      recipient: defaultRecipient,
      occasion: defaultOccasion,
      mood: defaultMood,
      size,
    });
  }, [occasion, size, generateDesigns]);

  const handleSelectVariant = useCallback(() => {
    nextStep(); // Go to Step 3 (refinement)
  }, [nextStep]);

  const handleRegenerate = useCallback(async () => {
    if (!recipient || !occasion || !mood) return;
    await generateDesigns({ recipient, occasion, mood, size });
  }, [recipient, occasion, mood, size, generateDesigns]);

  const handleRefine = useCallback(async (refinement: AIDesignRefinement) => {
    setIsRefining(true);
    const result = await refineDesign(refinement);
    setIsRefining(false);
    if (result) {
      onComplete(result);
      reset();
    }
  }, [refineDesign, onComplete, reset]);

  const handleSkipRefine = useCallback(() => {
    if (selectedVariantIndex !== null && variants[selectedVariantIndex]) {
      onComplete(variants[selectedVariantIndex]);
      reset();
    }
  }, [selectedVariantIndex, variants, onComplete, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
        <div className="flex items-center gap-2">
          {step > 1 && (
            <button onClick={prevStep} className="rounded p-1 hover:bg-zinc-100">
              <ArrowLeft className="h-4 w-4 text-zinc-500" />
            </button>
          )}
          <Sparkles className="h-4 w-4 text-violet-500" />
          <h3 className="text-sm font-semibold text-zinc-800">AIデザイン生成</h3>
        </div>
        <div className="flex items-center gap-3">
          {/* Step indicator */}
          <div className="flex gap-1">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  s === step ? 'bg-violet-500' : s < step ? 'bg-violet-200' : 'bg-zinc-200'
                }`}
              />
            ))}
          </div>
          <button onClick={handleClose} className="rounded p-1 hover:bg-zinc-100">
            <X className="h-4 w-4 text-zinc-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {step === 1 && <AIDesignStep1 />}
        {step === 2 && (
          <AIDesignStep2
            onSelect={handleSelectVariant}
            onRegenerate={handleRegenerate}
          />
        )}
        {step === 3 && (
          <AIDesignStep3
            onRefine={handleRefine}
            onSkip={handleSkipRefine}
            isRefining={isRefining}
          />
        )}
      </div>

      {/* Footer (Step 1 only) */}
      {step === 1 && (
        <div className="border-t border-zinc-100 p-4 space-y-2">
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || isGenerating}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                  <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                </svg>
                デザインを生成中...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                デザインを生成する
              </>
            )}
          </button>
          <button
            onClick={handleOmakase}
            disabled={isGenerating}
            className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-50 disabled:opacity-50"
          >
            おまかせで作る
          </button>
        </div>
      )}
    </div>
  );
}
