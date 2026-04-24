"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import type { Title } from "@/lib/store";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Settings,
  List,
  RotateCcw,
  Sun,
  Moon,
  Type,
  Maximize,
  X,
  SkipForward,
  Bookmark,
  Share2,
} from "lucide-react";

export default function ReaderClient({
  title,
  initialChapter,
  initialPage,
}: {
  title: Title;
  initialChapter: number;
  initialPage: number;
}) {
  const { addToHistory, markChapterRead } = useApp();
  const [chapter, setChapter] = useState(initialChapter);
  const [page, setPage] = useState(initialPage);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showChapterDrawer, setShowChapterDrawer] = useState(false);
  const [showCompletedCard, setShowCompletedCard] = useState(false);
  const [readingMode, setReadingMode] = useState<"rtl" | "ltr" | "vertical">(
    title.type === "manga" ? "rtl" : "vertical"
  );
  const [brightness, setBrightness] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalPages = 20; // Mock pages per chapter
  const totalChapters = title.chapters.length;

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timer);
  }, [showControls]);

  const handleTap = useCallback(() => {
    setShowControls((prev) => !prev);
  }, []);

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      setPage((p) => p + 1);
    } else {
      // Chapter complete
      markChapterRead(title.id, `c${chapter}`);
      setShowCompletedCard(true);
    }
  }, [page, totalPages, chapter, title.id, markChapterRead]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage((p) => p - 1);
    }
  }, []);

  const goToChapter = useCallback(
    (chNum: number) => {
      setChapter(chNum);
      setPage(1);
      setShowChapterDrawer(false);
      setShowCompletedCard(false);
      addToHistory({ titleId: title.id, title: title.title, chapter: chNum, date: new Date().toISOString() });
    },
    [title.id, title.title, addToHistory]
  );

  const nextChapter = useCallback(() => {
    if (chapter < totalChapters) {
      goToChapter(chapter + 1);
    }
  }, [chapter, totalChapters, goToChapter]);

  const prevChapter = useCallback(() => {
    if (chapter > 1) {
      goToChapter(chapter - 1);
    }
  }, [chapter, goToChapter]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") nextPage();
      if (e.key === "ArrowLeft") prevPage();
      if (e.key === "Escape") {
        setShowSettings(false);
        setShowChapterDrawer(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextPage, prevPage]);

  return (
    <div
      className="fixed inset-0 bg-black z-50 flex flex-col"
      style={{ filter: `brightness(${brightness}%)` }}
    >
      {/* Reader Surface */}
      <div className="flex-1 relative" onClick={handleTap}>
        {/* Page Content Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full max-w-md mx-auto bg-neutral-900 flex flex-col">
            {/* Mock Page */}
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="w-full aspect-[3/4] bg-neutral-800 border-2 border-dashed border-neutral-600 rounded-lg flex flex-col items-center justify-center gap-3">
                <span className="text-neutral-500 text-sm font-medium">Page {page}</span>
                <span className="text-neutral-600 text-xs">Chapter {chapter}</span>
                <span className="text-neutral-600 text-xs">{title.title}</span>
                <div className="text-neutral-700 text-[10px] mt-2">
                  {readingMode === "rtl" ? "← Right to Left" : readingMode === "vertical" ? "↓ Vertical Scroll" : "→ Left to Right"}
                </div>
              </div>
            </div>
            {/* Page Progress */}
            <div className="px-4 pb-2">
              <div className="w-full bg-neutral-700 rounded-full h-1">
                <div
                  className="bg-blue-500 h-1 rounded-full transition-all"
                  style={{ width: `${(page / totalPages) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-neutral-500 text-center mt-1">
                {page} / {totalPages}
              </p>
            </div>
          </div>
        </div>

        {/* Tap Zones (visual guides) */}
        {!showControls && !showSettings && !showChapterDrawer && !showCompletedCard && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-1/4" onClick={(e) => { e.stopPropagation(); prevPage(); }} />
            <div className="absolute right-0 top-0 bottom-0 w-1/4" onClick={(e) => { e.stopPropagation(); nextPage(); }} />
          </>
        )}
      </div>

      {/* Top Controls */}
      <div
        className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent transition-transform duration-300 ${
          showControls ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 pt-safe">
          <Link
            href={`/title/${title.id}`}
            className="p-2 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 transition-colors"
          >
            <ArrowLeft size={20} className="text-white" />
          </Link>
          <div className="flex-1 mx-4">
            <p className="text-white text-sm font-medium truncate text-center">{title.title}</p>
            <p className="text-white/60 text-xs text-center">Ch. {chapter}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); setShowChapterDrawer(true); }}
              className="p-2 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 transition-colors"
            >
              <List size={18} className="text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setShowSettings(true); }}
              className="p-2 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 transition-colors"
            >
              <Settings size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent transition-transform duration-300 ${
          showControls ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 pb-safe">
          <button
            onClick={(e) => { e.stopPropagation(); prevChapter(); }}
            className="p-2 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 transition-colors"
            disabled={chapter <= 1}
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div className="flex gap-3">
            <button
              onClick={(e) => { e.stopPropagation(); setShowChapterDrawer(true); }}
              className="px-4 py-2 rounded-full bg-black/40 backdrop-blur text-white text-xs font-medium hover:bg-black/60 transition-colors"
            >
              Ch. {chapter}
            </button>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); nextChapter(); }}
            className="p-2 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 transition-colors"
            disabled={chapter >= totalChapters}
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Settings Sheet */}
      {showSettings && (
        <div className="absolute inset-0 z-50" onClick={() => setShowSettings(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="absolute bottom-0 left-0 right-0 bg-neutral-900 rounded-t-2xl p-6 space-y-5 animate-in slide-in-from-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold">Reader Settings</h3>
              <button onClick={() => setShowSettings(false)} className="p-1">
                <X size={20} className="text-neutral-400" />
              </button>
            </div>

            {/* Reading Mode */}
            <div className="space-y-2">
              <p className="text-xs text-neutral-400 uppercase tracking-wider">Reading Direction</p>
              <div className="flex gap-2">
                {(["rtl", "ltr", "vertical"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setReadingMode(mode)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${
                      readingMode === mode
                        ? "bg-blue-600 text-white"
                        : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
                    }`}
                  >
                    {mode === "rtl" ? "Manga (RTL)" : mode === "ltr" ? "Comic (LTR)" : "Webtoon"}
                  </button>
                ))}
              </div>
            </div>

            {/* Brightness */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-400 uppercase tracking-wider">Brightness</p>
                <span className="text-xs text-neutral-500">{brightness}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                value={brightness}
                onChange={(e) => setBrightness(parseInt(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            {/* Toggles */}
            <div className="space-y-2">
              <p className="text-xs text-neutral-400 uppercase tracking-wider">Options</p>
              <div className="space-y-1">
                <button className="w-full flex items-center justify-between p-3 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors">
                  <span className="text-sm text-neutral-300">Show page numbers</span>
                  <div className="w-10 h-5 bg-blue-600 rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors">
                  <span className="text-sm text-neutral-300">Preload next chapter</span>
                  <div className="w-10 h-5 bg-blue-600 rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chapter Drawer */}
      {showChapterDrawer && (
        <div className="absolute inset-0 z-50" onClick={() => setShowChapterDrawer(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="absolute bottom-0 left-0 right-0 bg-neutral-900 rounded-t-2xl max-h-[70vh] flex flex-col animate-in slide-in-from-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-neutral-800">
              <h3 className="text-white font-semibold">Chapters</h3>
              <button onClick={() => setShowChapterDrawer(false)} className="p-1">
                <X size={20} className="text-neutral-400" />
              </button>
            </div>
            <div className="overflow-y-auto p-2 space-y-1">
              {title.chapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => goToChapter(ch.number)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${
                    ch.number === chapter
                      ? "bg-blue-600/20 border border-blue-600/30"
                      : "hover:bg-neutral-800"
                  }`}
                >
                  <span
                    className={`text-xs font-medium w-8 text-center ${
                      ch.number === chapter ? "text-blue-400" : "text-neutral-500"
                    }`}
                  >
                    {ch.number}
                  </span>
                  <span
                    className={`text-sm flex-1 ${
                      ch.read ? "text-neutral-500 line-through" : ch.number === chapter ? "text-white font-medium" : "text-neutral-300"
                    }`}
                  >
                    {ch.title}
                  </span>
                  {ch.read && <Check size={14} className="text-green-500 shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chapter Completed Card */}
      {showCompletedCard && (
        <div className="absolute inset-0 z-50 flex items-center justify-center" onClick={() => setShowCompletedCard(false)}>
          <div className="absolute inset-0 bg-black/70" />
          <div
            className="relative bg-neutral-900 rounded-2xl p-6 mx-4 max-w-sm w-full space-y-4 animate-in zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-green-500/20 rounded-full flex items-center justify-center">
                <Check size={24} className="text-green-500" />
              </div>
              <h3 className="text-white font-semibold text-lg">Chapter Complete</h3>
              <p className="text-neutral-400 text-sm mt-1">
                {title.title} — Ch. {chapter}
              </p>
            </div>

            <div className="bg-neutral-800 rounded-xl p-3 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-500">Pages read</span>
                <span className="text-neutral-300">{totalPages}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-500">Time spent</span>
                <span className="text-neutral-300">~4 min</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-500">Progress</span>
                <span className="text-neutral-300">{Math.round((chapter / totalChapters) * 100)}%</span>
              </div>
            </div>

            <div className="space-y-2">
              {chapter < totalChapters && (
                <button
                  onClick={() => { setShowCompletedCard(false); nextChapter(); }}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <SkipForward size={16} />
                  Next Chapter →
                </button>
              )}
              <button
                onClick={() => setShowCompletedCard(false)}
                className="w-full py-3 bg-neutral-800 text-neutral-300 rounded-xl text-sm font-medium hover:bg-neutral-700 transition-colors"
              >
                Stay on this page
              </button>
            </div>

            {!title.inLibrary && (
              <div className="pt-2 border-t border-neutral-800 text-center">
                <p className="text-xs text-neutral-500 mb-2">Add to library to track progress?</p>
                <button className="text-xs text-blue-400 font-medium hover:text-blue-300 transition-colors">
                  + Add {title.title} to Library
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
