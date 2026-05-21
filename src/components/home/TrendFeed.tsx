"use client";

import { useState } from "react";

const CATEGORIES = ["전체", "캐주얼", "미니멀", "페미닌", "스트리트"];

const TRENDS = [
  { id: 1, title: "린넨 셋업 룩", category: "미니멀", likes: 2841, emoji: "🤍", color: "var(--slate-lt)", canCopy: true },
  { id: 2, title: "Y2K 데님 코디", category: "스트리트", likes: 1923, emoji: "💜", color: "var(--purple-lt)", canCopy: false },
  { id: 3, title: "플로럴 시어 블라우스", category: "페미닌", likes: 3102, emoji: "🌸", color: "var(--pink-lt)", canCopy: true },
  { id: 4, title: "오버핏 후드 조거", category: "캐주얼", likes: 1567, emoji: "🖤", color: "var(--slate-lt)", canCopy: true },
];

export default function TrendFeed() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [saved, setSaved] = useState<number[]>([]);
  const [copying, setCopying] = useState<number | null>(null);

  const filtered =
    activeCategory === "전체"
      ? TRENDS
      : TRENDS.filter((t) => t.category === activeCategory);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-[var(--font-instrument-serif)] text-xl">이번 주 트렌드</h2>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4 pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all"
            style={{
              background: activeCategory === cat ? "var(--text)" : "var(--card)",
              color: activeCategory === cat ? "#fff" : "var(--text-sub)",
              borderColor: activeCategory === cat ? "var(--text)" : "var(--border)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 트렌드 카드 그리드 */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((trend) => (
          <div
            key={trend.id}
            className="rounded-2xl border border-[var(--border)] overflow-hidden"
            style={{ background: trend.color }}
          >
            <div className="aspect-[3/4] flex items-center justify-center text-5xl">
              {trend.emoji}
            </div>
            <div className="p-3 bg-[var(--card)]">
              <p className="text-xs font-medium leading-tight mb-1">{trend.title}</p>
              <div className="flex items-center justify-between mb-2">
                <span
                  className="font-[var(--font-dm-mono)] text-[9px] px-1.5 py-0.5 rounded-full"
                  style={{ background: "var(--bg)", color: "var(--text-sub)" }}
                >
                  {trend.category}
                </span>
                <button
                  onClick={() =>
                    setSaved((s) =>
                      s.includes(trend.id) ? s.filter((id) => id !== trend.id) : [...s, trend.id]
                    )
                  }
                  className="text-sm"
                >
                  {saved.includes(trend.id) ? "🩷" : "🤍"}
                </button>
              </div>
              {trend.canCopy && (
                <button
                  onClick={() => setCopying(copying === trend.id ? null : trend.id)}
                  className="w-full text-[10px] py-1.5 rounded-lg font-medium transition-all"
                  style={{
                    background: copying === trend.id ? "var(--pink)" : "var(--pink-lt)",
                    color: copying === trend.id ? "#fff" : "var(--pink-dk)",
                  }}
                >
                  {copying === trend.id ? "✓ 내 옷장으로 재현 중" : "내 옷장으로 따라하기"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
