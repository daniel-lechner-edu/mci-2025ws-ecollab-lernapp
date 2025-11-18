import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Flashcard, FlashcardSet, StoreState } from './types';
import { generateId } from './utils';

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      sets: [],
      cards: [],

      addSet: (title: string) => {
        const newSet: FlashcardSet = {
          id: generateId(),
          title,
          createdAt: Date.now(),
        };
        set((state) => ({ sets: [...state.sets, newSet] }));
      },

      updateSet: (id: string, title: string) => {
        set((state) => ({
          sets: state.sets.map((s) => (s.id === id ? { ...s, title } : s)),
        }));
      },

      deleteSet: (id: string) => {
        set((state) => ({
          sets: state.sets.filter((s) => s.id !== id),
          cards: state.cards.filter((c) => c.setId !== id),
        }));
      },

      addCard: (setId: string, front: string, back: string, tags: string[]) => {
        const newCard: Flashcard = {
          id: generateId(),
          setId,
          front,
          back,
          tags,
          learned: false,
          createdAt: Date.now(),
        };
        set((state) => ({ cards: [...state.cards, newCard] }));
      },

      updateCard: (id: string, front: string, back: string, tags: string[]) => {
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === id ? { ...c, front, back, tags } : c
          ),
        }));
      },

      deleteCard: (id: string) => {
        set((state) => ({
          cards: state.cards.filter((c) => c.id !== id),
        }));
      },

      toggleCardLearned: (id: string) => {
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === id ? { ...c, learned: !c.learned } : c
          ),
        }));
      },

      importData: (data: { sets: FlashcardSet[]; cards: Flashcard[] }) => {
        set({ sets: data.sets, cards: data.cards });
      },

      exportData: () => {
        const state = get();
        return { sets: state.sets, cards: state.cards };
      },
    }),
    {
      name: 'flashcard-storage',
    }
  )
);
