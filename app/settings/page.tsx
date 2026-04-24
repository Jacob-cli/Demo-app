"use client";

import Link from "next/link";
import { useApp } from "@/lib/store";
import {
  Palette,
  BookOpen,
  Globe,
  Link2,
  Save,
  Bell,
  Info,
  BarChart3,
  ChevronRight,
  Moon,
  Monitor,
} from "lucide-react";

const settingsGroups = [
  {
    title: "Appearance",
    items: [
      { icon: Palette, label: "Theme & Colors", desc: "Dark, light, accent color", href: "#" },
      { icon: Monitor, label: "Library Display", desc: "Grid size, badges, covers", href: "#" },
    ],
  },
  {
    title: "Reading",
    items: [
      { icon: BookOpen, label: "Reader Defaults", desc: "Direction, zoom, brightness", href: "#" },
      { icon: Moon, label: "Per-Content Type", desc: "Manga RTL, Manhwa vertical", href: "#" },
    ],
  },
  {
    title: "Data & Sync",
    items: [
      { icon: Link2, label: "Tracker Settings", desc: "AniList, MAL, Kitsu", href: "#" },
      { icon: Save, label: "Backup & Restore", desc: "Export/import library", href: "#" },
    ],
  },
  {
    title: "System",
    items: [
      { icon: Bell, label: "Notifications", desc: "Chapter alerts, frequency", href: "#" },
      { icon: Globe, label: "Extension Repos", desc: "Manage source repositories", href: "#" },
      { icon: BarChart3, label: "Reading Statistics", desc: "Your reading data", href: "#" },
      { icon: Info, label: "About / Legal", desc: "Version, licenses, DMCA", href: "#" },
    ],
  },
];

export default function SettingsPage() {
  const { library, history } = useApp();

  return (
    <main className="p-4 space-y-6">
      <h1 className="text-xl font-bold text-neutral-900">Settings</h1>

      {/* Stats Preview */}
      <div className="bg-white rounded-xl p-4 border border-neutral-200">
        <h2 className="text-sm font-semibold text-neutral-700 mb-3">Reading Statistics</h2>
        <div className="grid grid-cols-4 gap-2">
          <div className="text-center p-2 bg-neutral-50 rounded-lg">
            <p className="text-base font-bold text-neutral-900">{history.length}</p>
            <p className="text-[10px] text-neutral-500">Chapters</p>
          </div>
          <div className="text-center p-2 bg-neutral-50 rounded-lg">
            <p className="text-base font-bold text-neutral-900">{library.length}</p>
            <p className="text-[10px] text-neutral-500">Series</p>
          </div>
          <div className="text-center p-2 bg-neutral-50 rounded-lg">
            <p className="text-base font-bold text-neutral-900">2</p>
            <p className="text-[10px] text-neutral-500">Completed</p>
          </div>
          <div className="text-center p-2 bg-neutral-50 rounded-lg">
            <p className="text-base font-bold text-neutral-900">12h</p>
            <p className="text-[10px] text-neutral-500">Total</p>
          </div>
        </div>
        {/* Activity Chart Placeholder */}
        <div className="mt-3 h-16 bg-neutral-50 rounded-lg border border-dashed border-neutral-200 flex items-end justify-around px-2 pb-2 gap-1">
          {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
            <div
              key={i}
              className="w-full bg-blue-200 rounded-t"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <p className="text-[10px] text-neutral-400 text-center mt-1">Weekly reading activity</p>
      </div>

      {/* Settings Groups */}
      {settingsGroups.map((group) => (
        <section key={group.title} className="space-y-1">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-1">
            {group.title}
          </h2>
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            {group.items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 p-4 hover:bg-neutral-50 transition-colors ${
                    idx !== group.items.length - 1 ? "border-b border-neutral-100" : ""
                  }`}
                >
                  <Icon size={18} className="text-neutral-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-neutral-900">{item.label}</h3>
                    <p className="text-xs text-neutral-500">{item.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-neutral-400 shrink-0" />
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
