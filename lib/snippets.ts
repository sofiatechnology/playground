export type SavedSnippet = {
  id: string;
  title: string;
  language: string;
  code: string;
  createdAt: number;
};

const STORAGE_KEY = "codey-snippets";

export function getSnippets(): SavedSnippet[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedSnippet[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSnippet(snippet: Omit<SavedSnippet, "id" | "createdAt">) {
  const next: SavedSnippet = {
    ...snippet,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  const snippets = [next, ...getSnippets()].slice(0, 50);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
  return next;
}

export function deleteSnippet(id: string) {
  const snippets = getSnippets().filter((snippet) => snippet.id !== id);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
  return snippets;
}
