'use client';

import { useCallback } from 'react';
import { useAIDesignWizardStore } from '@/store/aiDesignWizardStore';
import type { AIDesignGenerateRequest, AIDesignRefinement } from '@/types/ai';
import type { CanvasData } from '@/types/card';
import { toast } from 'sonner';

export function useAIDesign() {
  const {
    setVariants,
    setIsGenerating,
    setError,
    setSelectedVariant,
    nextStep,
  } = useAIDesignWizardStore();

  const generateDesigns = useCallback(async (params: AIDesignGenerateRequest): Promise<CanvasData[] | null> => {
    setIsGenerating(true);
    setError(null);

    try {
      const res = await fetch('/api/ai/design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (res.status === 401) {
        setError('login_required');
        toast.error('ログインが必要です');
        return null;
      }

      if (res.status === 429) {
        setError('limit_exceeded');
        toast.error('今月のAIデザイン生成回数の上限に達しました');
        return null;
      }

      if (!res.ok) {
        throw new Error('Generation failed');
      }

      const data = await res.json();
      setVariants(data.variants);
      nextStep();
      return data.variants;
    } catch {
      setError('generation_failed');
      toast.error('デザインの生成に失敗しました。もう一度お試しください。');
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, [setVariants, setIsGenerating, setError, nextStep]);

  const refineDesign = useCallback(async (refinement: AIDesignRefinement): Promise<CanvasData | null> => {
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/design/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(refinement),
      });

      if (!res.ok) throw new Error('Refinement failed');

      const data = await res.json();
      return data.variant;
    } catch {
      toast.error('デザインの調整に失敗しました');
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, [setIsGenerating]);

  const selectVariant = useCallback((index: number) => {
    setSelectedVariant(index);
  }, [setSelectedVariant]);

  return { generateDesigns, refineDesign, selectVariant };
}
