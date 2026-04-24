"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import type { Title } from "@/lib/store";
import CoverPlaceholder from "@/components/CoverPlaceholder";
import SourceHealthBadge from "@/components/SourceHealthBadge";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Play,
  Download,
  Globe,
  Check,
  ChevronDown,
  Share2,
  Link2,
} from "lucide-react";

export default function TitleDetailClient({ title }: { title: Title }) {
  const { library, addToLibrary, removeFromLibrary } = useApp();
  const isInLibrary = library.some((t) => t.id === title.id);
  const [showAllChapters, setShowAllChapters] = useState(false);
  const [activeTab, setActiveTab] = useState<"chapters" | "info">("chapters");

  const displayedChapters = showAllChapters
    ? title.chapters
    : title.chapters.slice(0, 12);

  const unreadCount = title.chapters.filter((c) => !c.read).length;
  const nextChapter = title.chapters.find((c) => !c.read);

  return (
    <main className="pb-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-neutral-100 to-neutral-50 pt-4 pb-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/"
            className="p-2 rounded-full bg-white/80 backdrop-blur hover:bg-white transition-colors"
          >
            <ArrowLeft size={20} className="text-neutral-700" />
          </Link>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-white/80 backdrop-blur hover:bg-white transition-colors">
              <Share2 size={18} className="text-neutral-600" />
            </button>
            <button className="p-2 rounded-full bg-white/80 backdrop-blur hover:bg-white transition-colors">
              <Link2 size={18} className="text-neutral-600" />
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <CoverPlaceholder className="w-32 h-44 shrink-0 shadow-lg" label={title.title.slice(0, 12)} />
          <div className="flex-1 min-w-0 py-1">
            <h1 className="text-lg font-bold text-neutral-900 leading-tight">{title.title}</h1>
            <p className="text-sm text-neutral-600 mt-1">{title.author}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {title.genre.map((g) => (
                <span
                  key={g}
                  className="text-[10px] px-2 py-0.5 bg-white border border-neutral-200 rounded-full text-neutral-600"
                >
                  {g}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs px-2 py-0.5 bg-neutral-200 rounded text-neutral-700 font-medium">
                {title.status}
              </span>
              <span className="text-xs px-2 py-0.5 bg-neutral-200 rounded text-neutral-700 font-medium capitalize">
                {title.type}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <Globe size={12} className="text-neutral-500" />
              <span className="text-xs text-neutral-500">{title.source}</span>
              <SourceHealthBadge health={title.sourceHealth} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-5">
          <Link
            href={`/reader/${title.id}?chapter=${nextChapter?.number || 1}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Play size={16} />
            {nextChapter ? `Resume Ch. ${nextChapter.number}` : "Start Reading"}
          </Link>
          <button
            onClick={() => (isInLibrary ? removeFromLibrary(title.id) : addToLibrary(title))}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isInLibrary
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50"
            }`}
          >
            {isInLibrary ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            {isInLibrary ? "Saved" : "Add"}
          </button>
          <button className="flex items-center justify-center px-4 py-2.5 bg-white text-neutral-700 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-200 px-4">
        {(["chapters", "info"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium capitalize transition-colors relative ${
              activeTab === tab ? "text-blue-600" : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {activeTab === "chapters" ? (
          <div className="space-y-1">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-neutral-500">
                {title.chapters.length} chapters · {unreadCount} unread
              </p>
              <div className="flex gap-2">
                <button className="text-xs text-blue-600 font-medium">Mark all read</button>
              </div>
            </div>
            {displayedChapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/reader/${title.id}?chapter=${chapter.number}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                  {chapter.read ? (
                    <Check size={14} className="text-green-500" />
                  ) : (
                    <span className="text-xs font-medium text-neutral-500">{chapter.number}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate ${chapter.read ? "text-neutral-400" : "text-neutral-900 font-medium"}`}>
                    {chapter.title}
                  </p>
                  <p className="text-[10px] text-neutral-400">{chapter.date}</p>
                </div>
                {chapter.downloaded && (
                  <Download size={14} className="text-blue-500 shrink-0" />
                )}
              </Link>
            ))}
            {title.chapters.length > 12 && (
              <button
                onClick={() => setShowAllChapters(!showAllChapters)}
                className="w-full py-3 text-xs text-blue-600 font-medium flex items-center justify-center gap-1 hover:bg-neutral-50 rounded-xl transition-colors"
              >
                {showAllChapters ? "Show less" : `Show all ${title.chapters.length} chapters`}
                <ChevronDown
                  size={14}
                  className={`transition-transform ${showAllChapters ? "rotate-180" : ""}`}
                />
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-1">Synopsis</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{title.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-2">Tracker</h3>
              <div className="flex gap-2">
                <button className="px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs text-neutral-600 hover:bg-neutral-50 transition-colors">
                  Link AniList
                </button>
                <button className="px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs text-neutral-600 hover:bg-neutral-50 transition-colors">
                  Link MAL
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-2">Source</h3>
              <div className="flex items-center gap-2 p-3 bg-white border border-neutral-200 rounded-xl">
                <Globe size={16} className="text-neutral-500" />
                <span className="text-sm text-neutral-700">{title.source}</span>
                <SourceHealthBadge health={title.sourceHealth} />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
