"use client";

import Link from "next/link";
import { useApp, getAllTitles } from "@/lib/store";
import CoverPlaceholder from "@/components/CoverPlaceholder";
import { Search, Clock, TrendingUp, Zap, ChevronRight } from "lucide-react";

export default function HomePage() {
  const { library, history } = useApp();
  const allTitles = getAllTitles();
  const hasLibrary = library.length > 0;

  const continueReading = library.filter((t) => t.lastRead);
  const trending = allTitles.filter((t) => !t.inLibrary).slice(0, 5);
  const recentlyUpdated = allTitles.slice(0, 4);

  return (
    <main className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Inkverse</h1>
          <p className="text-xs text-neutral-500">
            {hasLibrary ? "Welcome back, reader" : "Your reading adventure starts here"}
          </p>
        </div>
        <Link
          href="/search"
          className="p-2 rounded-full bg-white border border-neutral-200 hover:bg-neutral-100 transition-colors"
        >
          <Search size={20} className="text-neutral-600" />
        </Link>
      </div>

      {/* Context-Aware Hero */}
      {hasLibrary ? (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-700 flex items-center gap-1.5">
              <Zap size={16} className="text-amber-500" />
              Continue Reading
            </h2>
            <Link href="/library" className="text-xs text-blue-600 font-medium">
              See all
            </Link>
          </div>
          {continueReading.length > 0 ? (
            <div className="space-y-3">
              {continueReading.slice(0, 2).map((title) => (
                <Link
                  key={title.id}
                  href={`/reader/${title.id}?chapter=${title.lastRead?.chapter}&page=${title.lastRead?.page}`}
                  className="flex gap-3 bg-white rounded-xl p-3 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CoverPlaceholder className="w-20 h-28 shrink-0" label={title.title.slice(0, 8)} />
                  <div className="flex-1 min-w-0 py-1">
                    <h3 className="font-semibold text-neutral-900 truncate">{title.title}</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">{title.author}</p>
                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                        <Clock size={12} />
                        <span>Ch. {title.lastRead?.chapter} — Page {title.lastRead?.page}</span>
                      </div>
                      <div className="w-full bg-neutral-100 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{
                            width: `${Math.min(
                              ((title.lastRead?.chapter || 0) / title.chapters.length) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="self-center">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      <ChevronRight size={16} className="text-blue-600" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="wireframe-box p-6 text-center">
              <p className="text-sm text-neutral-500">No recent reading activity</p>
              <Link href="/browse" className="text-xs text-blue-600 mt-2 inline-block">
                Browse sources
              </Link>
            </div>
          )}
        </section>
      ) : (
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <h2 className="text-lg font-bold text-neutral-900">Discover your next favorite</h2>
          <p className="text-sm text-neutral-600 mt-1">
            Trending titles from popular sources, curated for you.
          </p>
          <div className="flex gap-2 mt-4">
            <Link
              href="/browse"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Sources
            </Link>
            <Link
              href="/settings"
              className="px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
            >
              Add Source
            </Link>
          </div>
        </section>
      )}

      {/* Trending / Discovery Row */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-700 flex items-center gap-1.5">
            <TrendingUp size={16} className="text-rose-500" />
            {hasLibrary ? "Trending Now" : "Popular This Week"}
          </h2>
          <Link href="/browse" className="text-xs text-blue-600 font-medium">
            Browse all
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
          {trending.map((title) => (
            <Link
              key={title.id}
              href={`/title/${title.id}`}
              className="shrink-0 w-28 space-y-1.5"
            >
              <CoverPlaceholder className="w-28 h-40" label={title.title.slice(0, 10)} />
              <h3 className="text-xs font-medium text-neutral-900 truncate">{title.title}</h3>
              <p className="text-[10px] text-neutral-500">{title.source}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recently Updated */}
      {hasLibrary && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-700">Recently Updated</h2>
            <Link href="/updates" className="text-xs text-blue-600 font-medium">
              Updates tab
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {recentlyUpdated.map((title) => (
              <Link
                key={title.id}
                href={`/title/${title.id}`}
                className="bg-white rounded-xl p-3 border border-neutral-200 hover:shadow-sm transition-shadow"
              >
                <CoverPlaceholder className="w-full h-36 mb-2" label={title.title.slice(0, 12)} />
                <h3 className="text-xs font-medium text-neutral-900 truncate">{title.title}</h3>
                <p className="text-[10px] text-neutral-500 mt-0.5">Ch. {title.chapters.length}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Reading Stats Teaser */}
      {hasLibrary && (
        <section className="bg-white rounded-xl p-4 border border-neutral-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-neutral-700">Your Reading Stats</h2>
            <Link href="/settings" className="text-xs text-blue-600 font-medium">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-2 bg-neutral-50 rounded-lg">
              <p className="text-lg font-bold text-neutral-900">{history.length}</p>
              <p className="text-[10px] text-neutral-500">Chapters</p>
            </div>
            <div className="text-center p-2 bg-neutral-50 rounded-lg">
              <p className="text-lg font-bold text-neutral-900">{library.length}</p>
              <p className="text-[10px] text-neutral-500">In Library</p>
            </div>
            <div className="text-center p-2 bg-neutral-50 rounded-lg">
              <p className="text-lg font-bold text-neutral-900">12h</p>
              <p className="text-[10px] text-neutral-500">This Week</p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
