"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import CoverPlaceholder from "@/components/CoverPlaceholder";
import { Grid, List, Filter, Search, Plus, Check, Download } from "lucide-react";

export default function LibraryPage() {
  const { library, categories } = useApp();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = library.filter((t) => {
    const matchesCategory = activeCategory === "All" || t.category === activeCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-neutral-900">Library</h1>
        <div className="flex gap-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-neutral-200" : "hover:bg-neutral-100"}`}
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-neutral-200" : "hover:bg-neutral-100"}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          placeholder="Search library..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? "bg-neutral-900 text-white"
                : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="wireframe-box p-8 text-center mt-8">
          <div className="w-16 h-16 mx-auto mb-3 bg-neutral-100 rounded-full flex items-center justify-center">
            <Plus size={24} className="text-neutral-400" />
          </div>
          <h3 className="text-sm font-medium text-neutral-700">Your library is empty</h3>
          <p className="text-xs text-neutral-500 mt-1">Browse sources to add titles</p>
          <Link
            href="/browse"
            className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg"
          >
            Browse Sources
          </Link>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-3 gap-3">
          {filtered.map((title) => (
            <Link key={title.id} href={`/title/${title.id}`} className="space-y-1.5 group">
              <div className="relative">
                <CoverPlaceholder className="w-full h-44" label={title.title.slice(0, 10)} />
                {title.lastRead && (
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-black/60 rounded px-1.5 py-0.5">
                    <div className="w-full bg-white/30 rounded-full h-0.5">
                      <div
                        className="bg-blue-400 h-0.5 rounded-full"
                        style={{ width: `${Math.min(((title.lastRead.chapter / title.chapters.length) * 100), 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <h3 className="text-xs font-medium text-neutral-900 truncate group-hover:text-blue-600 transition-colors">
                {title.title}
              </h3>
              <p className="text-[10px] text-neutral-500">Ch. {title.chapters.length}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((title) => (
            <Link
              key={title.id}
              href={`/title/${title.id}`}
              className="flex gap-3 bg-white rounded-xl p-3 border border-neutral-200 hover:shadow-sm transition-shadow"
            >
              <CoverPlaceholder className="w-16 h-22 shrink-0" label={title.title.slice(0, 6)} />
              <div className="flex-1 min-w-0 py-0.5">
                <h3 className="text-sm font-medium text-neutral-900 truncate">{title.title}</h3>
                <p className="text-xs text-neutral-500 mt-0.5">{title.author}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] px-1.5 py-0.5 bg-neutral-100 rounded text-neutral-600">
                    {title.status}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-neutral-100 rounded text-neutral-600">
                    {title.type}
                  </span>
                  {title.lastRead && (
                    <span className="text-[10px] text-blue-600 font-medium">
                      Ch. {title.lastRead.chapter}
                    </span>
                  )}
                </div>
              </div>
              {title.chapters.some((c) => c.downloaded) && (
                <Download size={14} className="text-blue-500 shrink-0 self-center" />
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
