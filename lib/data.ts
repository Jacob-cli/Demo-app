export interface Title {
  id: string;
  title: string;
  cover: string;
  author: string;
  status: "ongoing" | "completed";
  type: "manga" | "manhwa" | "manhua";
  genre: string[];
  description: string;
  source: string;
  sourceHealth: "good" | "slow" | "broken";
  chapters: Chapter[];
  inLibrary: boolean;
  category?: string;
  lastRead?: { chapter: number; page: number };
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  date: string;
  read: boolean;
  downloaded: boolean;
}

export interface ReadingEntry {
  titleId: string;
  title: string;
  chapter: number;
  date: string;
}

export const demoTitles: Title[] = [
  {
    id: "1",
    title: "Solo Leveling",
    cover: "",
    author: "Chugong",
    status: "completed",
    type: "manhwa",
    genre: ["Action", "Fantasy"],
    description: "In a world where hunters battle deadly monsters...",
    source: "MangaDex",
    sourceHealth: "good",
    inLibrary: true,
    category: "Reading",
    lastRead: { chapter: 45, page: 12 },
    chapters: Array.from({ length: 50 }, (_, i) => ({
      id: `c${i + 1}`,
      number: i + 1,
      title: `Chapter ${i + 1}`,
      date: "2024-03-15",
      read: i < 45,
      downloaded: i < 10,
    })),
  },
  {
    id: "2",
    title: "Jujutsu Kaisen",
    cover: "",
    author: "Gege Akutami",
    status: "ongoing",
    type: "manga",
    genre: ["Action", "Supernatural"],
    description: "A boy swallows a cursed object and becomes a vessel...",
    source: "MangaPlus",
    sourceHealth: "good",
    inLibrary: true,
    category: "Reading",
    lastRead: { chapter: 238, page: 8 },
    chapters: Array.from({ length: 250 }, (_, i) => ({
      id: `c${i + 1}`,
      number: i + 1,
      title: `Chapter ${i + 1}`,
      date: "2024-03-14",
      read: i < 238,
      downloaded: false,
    })),
  },
  {
    id: "3",
    title: "Omniscient Reader",
    cover: "",
    author: "Sing-Shong",
    status: "ongoing",
    type: "manhwa",
    genre: ["Action", "Thriller"],
    description: "The only reader of a novel that becomes reality...",
    source: "Webtoon",
    sourceHealth: "slow",
    inLibrary: true,
    category: "Plan to Read",
    chapters: Array.from({ length: 180 }, (_, i) => ({
      id: `c${i + 1}`,
      number: i + 1,
      title: `Chapter ${i + 1}`,
      date: "2024-03-13",
      read: false,
      downloaded: false,
    })),
  },
  {
    id: "4",
    title: "Chainsaw Man",
    cover: "",
    author: "Tatsuki Fujimoto",
    status: "ongoing",
    type: "manga",
    genre: ["Action", "Horror"],
    description: "A devil hunter merges with his pet devil...",
    source: "MangaPlus",
    sourceHealth: "good",
    inLibrary: false,
    chapters: Array.from({ length: 160 }, (_, i) => ({
      id: `c${i + 1}`,
      number: i + 1,
      title: `Chapter ${i + 1}`,
      date: "2024-03-12",
      read: false,
      downloaded: false,
    })),
  },
  {
    id: "5",
    title: "Tower of God",
    cover: "",
    author: "SIU",
    status: "ongoing",
    type: "manhwa",
    genre: ["Fantasy", "Action"],
    description: "A boy enters a mysterious tower to find his friend...",
    source: "Webtoon",
    sourceHealth: "good",
    inLibrary: false,
    chapters: Array.from({ length: 200 }, (_, i) => ({
      id: `c${i + 1}`,
      number: i + 1,
      title: `Chapter ${i + 1}`,
      date: "2024-03-11",
      read: false,
      downloaded: false,
    })),
  },
  {
    id: "6",
    title: "Blue Box",
    cover: "",
    author: "Kouji Miura",
    status: "ongoing",
    type: "manga",
    genre: ["Romance", "Sports"],
    description: "A badminton player falls for a basketball senpai...",
    source: "MangaPlus",
    sourceHealth: "good",
    inLibrary: false,
    chapters: Array.from({ length: 120 }, (_, i) => ({
      id: `c${i + 1}`,
      number: i + 1,
      title: `Chapter ${i + 1}`,
      date: "2024-03-10",
      read: false,
      downloaded: false,
    })),
  },
];

export function getAllTitles(): Title[] {
  return demoTitles;
}

export function getTitleById(id: string): Title | undefined {
  return demoTitles.find((t) => t.id === id);
}
