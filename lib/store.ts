"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { demoTitles, type Title, type ReadingEntry } from "@/lib/data";

export type { Title, Chapter, ReadingEntry } from "@/lib/data";

interface AppState {
  library: Title[];
  history: ReadingEntry[];
  sources: { name: string; health: "good" | "slow" | "broken"; installed: boolean }[];
  categories: string[];
  hasOnboarded: boolean;
  addToLibrary: (title: Title) => void;
  removeFromLibrary: (id: string) => void;
  markChapterRead: (titleId: string, chapterId: string) => void;
  addToHistory: (entry: ReadingEntry) => void;
  setHasOnboarded: (v: boolean) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [library, setLibrary] = useState<Title[]>(demoTitles.filter((t) => t.inLibrary));
  const [history, setHistory] = useState<ReadingEntry[]>([
    { titleId: "1", title: "Solo Leveling", chapter: 45, date: "2024-03-15" },
    { titleId: "2", title: "Jujutsu Kaisen", chapter: 238, date: "2024-03-14" },
  ]);
  const [sources] = useState([
    { name: "MangaDex", health: "good" as const, installed: true },
    { name: "MangaPlus", health: "good" as const, installed: true },
    { name: "Webtoon", health: "slow" as const, installed: true },
    { name: "ComicK", health: "broken" as const, installed: false },
  ]);
  const [categories] = useState(["Reading", "Completed", "Plan to Read", "On Hold"]);
  const [hasOnboarded, setHasOnboarded] = useState(true);

  const addToLibrary = useCallback((title: Title) => {
    setLibrary((prev) => {
      if (prev.find((t) => t.id === title.id)) return prev;
      return [...prev, { ...title, inLibrary: true, category: "Reading" }];
    });
  }, []);

  const removeFromLibrary = useCallback((id: string) => {
    setLibrary((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const markChapterRead = useCallback((titleId: string, chapterId: string) => {
    setLibrary((prev) =>
      prev.map((t) =>
        t.id === titleId
          ? {
              ...t,
              chapters: t.chapters.map((c) =>
                c.id === chapterId ? { ...c, read: true } : c
              ),
            }
          : t
      )
    );
  }, []);

  const addToHistory = useCallback((entry: ReadingEntry) => {
    setHistory((prev) => [entry, ...prev].slice(0, 100));
  }, []);

  return (
    <AppContext.Provider
      value={{
        library,
        history,
        sources,
        categories,
        hasOnboarded,
        addToLibrary,
        removeFromLibrary,
        markChapterRead,
        addToHistory,
        setHasOnboarded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
