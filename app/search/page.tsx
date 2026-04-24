"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getAllTitles } from "@/lib/store";
import CoverPlaceholder from "@/components/CoverPlaceholder";
import SourceHealthBadge from "@/components/SourceHealthBadge";
import { Search, ArrowLeft, X, Clock, TrendingUp } from "lucide-react";

const recentSearches = ["Solo Leveling", "Jujutsu Kaisen", "action manga"];
const trendingSearches = ["Omniscient Reader", "Tower of God", "Blue Box", "Chainsaw Man"];

export default function SearchPage() {
  const allTitles = getAllTitles();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allTitles.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.author.toLowerCase().includes(q) ||
        t.genre.some((g) => g.toLowerCase().includes(q))
    );
  }, [query, allTitles]);

  const groupedBySource = useMemo(() => {
    const groups: Record<string, typeof allTitles> = {};
    results.forEach((t) => {
      if (!groups[t.source]) groups[t.source] = [];
      groups[t.source].push(t);
    });
    return groups;
  }, [results]);

  return (
    <main className="p-4 space-y-4">
      {/* Search Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
        >
          <ArrowLeft size={20} className="text-neutral-600" />
        </Link>
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search titles, authors, genres..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full pl-9 pr-9 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X size={16} className="text-neutral-400" />
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {query.trim() ? (
        <div className="space-y-4">
          {results.length === 0 ? (
            <div className="wireframe-box p-8 text-center">
              <p className="text-sm text-neutral-500">No results found</p>
              <p className="text-xs text-neutral-400 mt-1">Try a different search term</p>
            </div>
          ) : (
            Object.entries(groupedBySource).map(([source, titles]) => (
              <section key={source} className="space-y-2">
                <div className="flex items-center gap-2 px-1">
                  <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    {source}
                  </h2>
                  <SourceHealthBadge health={titles[0]?.sourceHealth || "good"} />
                  <span className="text-xs text-neutral-400">({titles.length})</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {titles.map((title) => (
                    <Link key={title.id} href={`/title/${title.id}`} className="space-y-1.5">
                      <CoverPlaceholder className="w-full h-40" label={title.title.slice(0, 10)} />
                      <h3 className="text-xs font-medium text-neutral-900 truncate">{title.title}</h3>
                      <p className="text-[10px] text-neutral-500">{title.author}</p>
                    </Link>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Recent Searches */}
          <section className="space-y-3">
            <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
              <Clock size={14} />
              Recent
            </h2>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 bg-white border border-neutral-200 rounded-full text-xs text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </section>

          {/* Trending */}
          <section className="space-y-3">
            <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp size={14} />
              Trending
            </h2>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 bg-white border border-neutral-200 rounded-full text-xs text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </section>

          {/* Genre Pills */}
          <section className="space-y-3">
            <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Browse by Genre
            </h2>
            <div className="flex flex-wrap gap-2">
              {["Action", "Fantasy", "Romance", "Horror", "Supernatural", "Sports", "Thriller", "Comedy", "Drama"].map(
                (genre) => (
                  <button
                    key={genre}
                    onClick={() => setQuery(genre)}
                    className="px-3 py-1.5 bg-neutral-100 rounded-full text-xs text-neutral-700 hover:bg-neutral-200 transition-colors"
                  >
                    {genre}
                  </button>
                )
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
