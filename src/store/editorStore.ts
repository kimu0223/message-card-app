import { create } from 'zustand'
import type { CanvasData, CanvasElement, Background, AnimationConfig, CardSize, EnvelopeConfig } from '@/types/card'

const defaultCanvasData: CanvasData = {
  version: '1.0',
  size: 'a4_landscape',
  background: { type: 'color', value: '#ffffff' },
  elements: [],
  animation: null,
}

interface EditorState {
  // カードデータ
  cardId: string | null
  title: string
  canvasData: CanvasData
  isSaving: boolean
  lastSavedAt: Date | null

  // 選択状態
  selectedElementId: string | null

  // UI状態
  zoom: number
  showAIPanel: boolean
  showShareDialog: boolean

  // Actions
  setCardId: (id: string) => void
  setTitle: (title: string) => void
  setCanvasData: (data: CanvasData) => void
  updateElement: (id: string, updates: Partial<CanvasElement>) => void
  addElement: (element: CanvasElement) => void
  removeElement: (id: string) => void
  setSelectedElementId: (id: string | null) => void
  setSize: (size: CardSize) => void
  setBackground: (bg: Background) => void
  setAnimation: (animation: AnimationConfig | null) => void
  setEnvelope: (envelope: EnvelopeConfig | undefined) => void
  reorderElement: (id: string, direction: 'up' | 'down') => void
  setIsSaving: (saving: boolean) => void
  setLastSavedAt: (date: Date) => void
  setZoom: (zoom: number) => void
  toggleAIPanel: () => void
  toggleShareDialog: () => void
  initFromCard: (card: { id: string; title: string; canvasData: CanvasData }) => void
}

export const useEditorStore = create<EditorState>((set) => ({
  cardId: null,
  title: '無題のカード',
  canvasData: defaultCanvasData,
  isSaving: false,
  lastSavedAt: null,
  selectedElementId: null,
  zoom: 0.7,
  showAIPanel: false,
  showShareDialog: false,

  setCardId: (id) => set({ cardId: id }),

  setTitle: (title) => set({ title }),

  setCanvasData: (data) => set({ canvasData: data }),

  updateElement: (id, updates) => set((state) => ({
    canvasData: {
      ...state.canvasData,
      elements: state.canvasData.elements.map(el =>
        el.id === id ? { ...el, ...updates } as CanvasElement : el
      ),
    },
  })),

  addElement: (element) => set((state) => ({
    canvasData: {
      ...state.canvasData,
      elements: [...state.canvasData.elements, element],
    },
    selectedElementId: element.id,
  })),

  removeElement: (id) => set((state) => ({
    canvasData: {
      ...state.canvasData,
      elements: state.canvasData.elements.filter(el => el.id !== id),
    },
    selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
  })),

  setSelectedElementId: (id) => set({ selectedElementId: id }),

  setSize: (size) => set((state) => ({
    canvasData: { ...state.canvasData, size },
  })),

  setBackground: (bg) => set((state) => ({
    canvasData: { ...state.canvasData, background: bg },
  })),

  setAnimation: (animation) => set((state) => ({
    canvasData: { ...state.canvasData, animation },
  })),

  setEnvelope: (envelope) => set((state) => ({
    canvasData: { ...state.canvasData, envelope },
  })),

  reorderElement: (id, direction) => set((state) => {
    const elements = state.canvasData.elements
    const sorted = [...elements].sort((a, b) => a.zIndex - b.zIndex)
    const sortedIdx = sorted.findIndex(el => el.id === id)
    if (sortedIdx === -1) return state

    let swapEl: CanvasElement | undefined
    if (direction === 'up' && sortedIdx < sorted.length - 1) {
      swapEl = sorted[sortedIdx + 1]
    } else if (direction === 'down' && sortedIdx > 0) {
      swapEl = sorted[sortedIdx - 1]
    }
    if (!swapEl) return state

    const currZIndex = sorted[sortedIdx].zIndex
    const swapZIndex = swapEl.zIndex
    return {
      canvasData: {
        ...state.canvasData,
        elements: elements.map(el => {
          if (el.id === id) return { ...el, zIndex: swapZIndex }
          if (el.id === swapEl!.id) return { ...el, zIndex: currZIndex }
          return el
        }),
      },
    }
  }),

  setIsSaving: (saving) => set({ isSaving: saving }),

  setLastSavedAt: (date) => set({ lastSavedAt: date }),

  setZoom: (zoom) => set({ zoom: Math.min(2, Math.max(0.1, zoom)) }),

  toggleAIPanel: () => set((state) => ({ showAIPanel: !state.showAIPanel })),

  toggleShareDialog: () => set((state) => ({ showShareDialog: !state.showShareDialog })),

  initFromCard: ({ id, title, canvasData }) => set({
    cardId: id,
    title,
    canvasData,
    selectedElementId: null,
    isSaving: false,
    lastSavedAt: null,
  }),
}))
