# Inkverse — Wireframe Prototype

A Next.js 14 interactive wireframe prototype of the Inkverse manga reader app, based on the Gate 2 User Flow Map.

## Features Implemented

### Navigation
- **5-tab bottom nav**: Home, Library, Browse, Updates, Settings
- Context-aware routing between all screens

### Screens (from the 37-screen inventory)
- **A1 Home Feed** — Context-aware: shows "Discover mode" for empty library, "Personal mode" with Continue Reading for returning users
- **A2 Library** — Grid/list toggle, category pills, search, progress bars
- **A3 Browse** — Sources tab with health badges, Catalogue grid, Extension store
- **A4 Updates** — New chapter feed with unread indicators
- **A5 Settings** — Grouped settings hub with reading stats preview
- **B2/B3 Global Search** — Search across all sources with grouped results
- **C1 Title Detail** — Cover, metadata, genre pills, source health, chapter list, info tab
- **D1 Reader** — Full-screen reader with tap controls, page progress
- **D3 Chapter Drawer** — Swipe-up chapter list with read/unread states
- **D4 Reader Settings** — Direction mode, brightness, preloading toggles
- **D6 Chapter Completed Card** — End-of-chapter overlay with stats and next chapter prompt
- **H3 Empty Library State** — Illustrated empty state with CTA

### Competitive Differentiators
- **Context-aware Home Feed** — Adapts between discovery and personal mode
- **Source Health Badges** — Green/yellow/red indicators on every source
- **Chapter Completed Card** — Stats + next chapter nudge
- **Per-content-type reader memory** — Auto RTL for manga, vertical for manhwa
- **Smart Continue Reading** — Page-level progress with visual bars

## Tech Stack
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (icons)

## Running Locally

```bash
cd inkverse-prototype
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Data
The prototype includes 6 demo titles across 3 sources (MangaDex, MangaPlus, Webtoon) with:
- Full chapter lists (up to 250 chapters)
- Read/unread states
- Download status
- Source health indicators
- Library categories

## Static Export
To build for static hosting:
```bash
npm run build
```
Output goes to `dist/`.
