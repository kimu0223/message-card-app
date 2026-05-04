import { create } from 'zustand';
import type { AIDesignRecipient, AIDesignOccasion, AIDesignMood } from '@/types/ai';
import type { CanvasData, CardSize } from '@/types/card';
import { MOOD_PRESELECTION_MAP } from '@/constants/ai-design';

interface AIDesignWizardState {
  step: 1 | 2 | 3;
  recipient: AIDesignRecipient | null;
  occasion: AIDesignOccasion | null;
  mood: AIDesignMood | null;
  size: CardSize;
  variants: CanvasData[];
  selectedVariantIndex: number | null;
  isGenerating: boolean;
  error: string | null;

  setRecipient: (r: AIDesignRecipient) => void;
  setOccasion: (o: AIDesignOccasion) => void;
  setMood: (m: AIDesignMood) => void;
  setSize: (s: CardSize) => void;
  setVariants: (v: CanvasData[]) => void;
  setSelectedVariant: (i: number) => void;
  setIsGenerating: (v: boolean) => void;
  setError: (e: string | null) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  getSmartMoodDefault: () => AIDesignMood;
}

export const useAIDesignWizardStore = create<AIDesignWizardState>((set, get) => ({
  step: 1,
  recipient: null,
  occasion: null,
  mood: null,
  size: 'a4_landscape',
  variants: [],
  selectedVariantIndex: null,
  isGenerating: false,
  error: null,

  setRecipient: (r) => set((state) => ({
    recipient: r,
    mood: state.occasion ? MOOD_PRESELECTION_MAP[r][state.occasion] : state.mood,
  })),
  setOccasion: (o) => set((state) => ({
    occasion: o,
    mood: state.recipient ? MOOD_PRESELECTION_MAP[state.recipient][o] : state.mood,
  })),
  setMood: (m) => set({ mood: m }),
  setSize: (s) => set({ size: s }),
  setVariants: (v) => set({ variants: v }),
  setSelectedVariant: (i) => set({ selectedVariantIndex: i }),
  setIsGenerating: (v) => set({ isGenerating: v }),
  setError: (e) => set({ error: e }),
  nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 3) as 1 | 2 | 3 })),
  prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) as 1 | 2 | 3 })),
  reset: () => set({
    step: 1,
    recipient: null,
    occasion: null,
    mood: null,
    size: 'a4_landscape',
    variants: [],
    selectedVariantIndex: null,
    isGenerating: false,
    error: null,
  }),
  getSmartMoodDefault: () => {
    const { recipient, occasion } = get();
    if (recipient && occasion) {
      return MOOD_PRESELECTION_MAP[recipient][occasion];
    }
    return 'warm';
  },
}));
