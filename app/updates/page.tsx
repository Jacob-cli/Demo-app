"use client";

import Link from "next/link";
import { useApp } from "@/lib/store";
import CoverPlaceholder from "@/components/CoverPlaceholder";
import { Bell, CheckCheck, Filter } from "lucide-react";

export default function UpdatesPage() {
  const { library } = useApp();
  const hasUpdates = library.length > 0;

  // Mock updates based on library
  const updates = library.flatMap((title) =>
    title.chapters
      .filter((c) => !c.read && c.number > (title.lastRead?.chapter || 0))
      .slice(0, 2)
      .map((c) => ({
        title,
        chapter: c,
      }))
  );

  return (
    <main className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-neutral-900">Updates</h1>
        {hasUpdates && (
          <button className="p-2 rounded-lg hover:bg-neutral-100 transition-colors">
            <CheckCheck size={18} className="text-neutral-600" />
          </button>
        )}
      </div>

      {!hasUpdates ? (
        <div className="wireframe-box p-8 text-center mt-8">
          <div className="w-16 h-16 mx-auto mb-3 bg-neutral-100 rounded-full flex items-center justify-center">
            <Bell size={24} className="text-neutral-400" />
          </div>
          <h3 className="text-sm font-medium text-neutral-700">No updates yet</h3>
          <p className="text-xs text-neutral-500 mt-1">Follow series to see new chapters here</p>
          <Link
            href="/browse"
            className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg"
          >
            Browse Sources
          </Link>
        </div>
      ) : updates.length === 0 ? (
        <div className="wireframe-box p-6 text-center mt-4">
          <p className="text-sm text-neutral-500">All caught up!</p>
          <p className="text-xs text-neutral-400 mt-1">No new chapters since your last visit</p>
        </div>
      ) : (
        <div className="space-y-2">
          {updates.map(({ title, chapter }) => (
            <Link
              key={`${title.id}-${chapter.id}`}
              href={`/reader/${title.id}?chapter=${chapter.number}`}
              className="flex gap-3 bg-white rounded-xl p-3 border border-neutral-200 hover:shadow-sm transition-shadow"
            >
              <CoverPlaceholder className="w-14 h-20 shrink-0" label={title.title.slice(0, 6)} />
              <div className="flex-1 min-w-0 py-0.5">
                <h3 className="text-sm font-medium text-neutral-900 truncate">{title.title}</h3>
                <p className="text-xs text-neutral-500 mt-0.5">{title.source}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-semibold text-blue-600">Ch. {chapter.number}</span>
                  <span className="text-[10px] text-neutral-400">{chapter.date}</span>
                </div>
              </div>
              <div className="shrink-0 self-center">
                <span className="w-2 h-2 rounded-full bg-blue-500 block" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
