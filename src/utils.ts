import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Flashcard } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function filterCardsBySearch(cards: Flashcard[], search: string): Flashcard[] {
  const lowerSearch = search.toLowerCase();
  return cards.filter(
    (card) =>
      card.front.toLowerCase().includes(lowerSearch) ||
      card.back.toLowerCase().includes(lowerSearch) ||
      card.tags.some((tag) => tag.toLowerCase().includes(lowerSearch))
  );
}

export function filterCardsByTags(cards: Flashcard[], tags: string[]): Flashcard[] {
  if (tags.length === 0) return cards;
  return cards.filter((card) =>
    tags.every((tag) => card.tags.includes(tag))
  );
}

export function downloadJSON(data: any, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function parseJSONFile(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        resolve(json);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
