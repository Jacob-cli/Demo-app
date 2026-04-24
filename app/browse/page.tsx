"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp, getAllTitles } from "@/lib/store";
import CoverPlaceholder from "@/components/CoverPlaceholder";
import SourceHealthBadge from "@/components/SourceHealthBadge";
import { Search, Plus, Globe, Trash2, ExternalLink } from "lucide-react";

type Tab = "sources" | "catalogue" | "extensions";

export default function BrowsePage() {
  const { sources } = useApp();
  const allTitles = getAllTitles();
  const [activeTab, setActiveTab] = useState<Tab>("sources");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const filteredSources = sources.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sourceTitles = selectedSource
    ? allTitles.filter((t) => t.source === selectedSource)
    : [];

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-xl font-bold text-neutral-900">Browse</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-neutral-100 p-1 rounded-xl">
        {(["sources", "catalogue", "extensions"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setSelectedSource(null); }}
            className={`flex-1 py-2 text-xs font-medium rounded-lg capitalize transition-colors ${
              activeTab === tab ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          placeholder={activeTab === "sources" ? "Search sources..." : "Search catalogue..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Sources Tab */}
      {activeTab === "sources" && !selectedSource && (
        <div className="space-y-2">
          {filteredSources.map((source) => (
            <button
              key={source.name}
              onClick={() => setSelectedSource(source.name)}
              className="w-full flex items-center gap-3 bg-white rounded-xl p-4 border border-neutral-200 hover:shadow-sm transition-shadow text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                <Globe size={18} className="text-neutral-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-neutral-900">{source.name}</h3>
                  <SourceHealthBadge health={source.health} />
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {source.installed ? "Installed" : "Not installed"} · {allTitles.filter((t) => t.source === source.name).length} titles
                </p>
              </div>
              <ChevronRightIcon />
            </button>
          ))}
          {filteredSources.length === 0 && (
            <div className="wireframe-box p-6 text-center">
              <p className="text-sm text-neutral-500">No sources installed</p>
              <button className="mt-2 text-xs text-blue-600 font-medium">Open Extension Store</button>
            </div>
          )}
        </div>
      )}

      {/* Source Catalogue */}
      {selectedSource && (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedSource(null)}
            className="text-xs text-blue-600 font-medium flex items-center gap-1"
          >
            ← Back to sources
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-neutral-900">{selectedSource}</h2>
            <SourceHealthBadge health={sources.find((s) => s.name === selectedSource)?.health || "good"} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {sourceTitles.map((title) => (
              <Link key={title.id} href={`/title/${title.id}`} className="space-y-1.5">
                <CoverPlaceholder className="w-full h-44" label={title.title.slice(0, 10)} />
                <h3 className="text-xs font-medium text-neutral-900 truncate">{title.title}</h3>
                <p className="text-[10px] text-neutral-500">{title.genre[0]}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Catalogue Tab (All) */}
      {activeTab === "catalogue" && (
        <div className="grid grid-cols-3 gap-3">
          {allTitles
            .filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((title) => (
              <Link key={title.id} href={`/title/${title.id}`} className="space-y-1.5">
                <CoverPlaceholder className="w-full h-44" label={title.title.slice(0, 10)} />
                <h3 className="text-xs font-medium text-neutral-900 truncate">{title.title}</h3>
                <p className="text-[10px] text-neutral-500">{title.source}</p>
              </Link>
            ))}
        </div>
      )}

      {/* Extensions Tab */}
      {activeTab === "extensions" && (
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-blue-900">Extension Store</h3>
            <p className="text-xs text-blue-700 mt-1">Browse and install extensions from added repositories</p>
          </div>
          {sources.map((source) => (
            <div
              key={source.name}
              className="flex items-center gap-3 bg-white rounded-xl p-4 border border-neutral-200"
            >
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                <Globe size={18} className="text-neutral-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-neutral-900">{source.name}</h3>
                <p className="text-xs text-neutral-500">v1.2.0 · {source.installed ? "Installed" : "Available"}</p>
              </div>
              <button
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  source.installed
                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {source.installed ? "Remove" : "Install"}
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400 shrink-0">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
