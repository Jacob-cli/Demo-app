"use client";

export default function SourceHealthBadge({ health }: { health: "good" | "slow" | "broken" }) {
  const colors = {
    good: "bg-green-500",
    slow: "bg-yellow-500",
    broken: "bg-red-500",
  };
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colors[health]}`}></span>
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${colors[health]}`}></span>
    </span>
  );
}
