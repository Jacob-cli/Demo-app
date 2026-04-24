"use client";

export default function CoverPlaceholder({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <div
      className={`bg-neutral-100 border-2 border-dashed border-neutral-300 rounded-lg flex items-center justify-center ${className}`}
    >
      <span className="text-neutral-400 text-xs text-center px-2">{label || "Cover"}</span>
    </div>
  );
}
