export interface Flashcard {
  id: string;
  setId: string;
  front: string;
  back: string;
  tags: string[];
  learned: boolean;
  createdAt: number;
}

export interface FlashcardSet {
  id: string;
  title: string;
  createdAt: number;
}

export interface StoreState {
  sets: FlashcardSet[];
  cards: Flashcard[];
  addSet: (title: string) => void;
  updateSet: (id: string, title: string) => void;
  deleteSet: (id: string) => void;
  addCard: (setId: string, front: string, back: string, tags: string[]) => void;
  updateCard: (id: string, front: string, back: string, tags: string[]) => void;
  deleteCard: (id: string) => void;
  toggleCardLearned: (id: string) => void;
  importData: (data: { sets: FlashcardSet[]; cards: Flashcard[] }) => void;
  exportData: () => { sets: FlashcardSet[]; cards: Flashcard[] };
}
