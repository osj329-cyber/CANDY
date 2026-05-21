"use client";

import { useState } from "react";

const CATEGORIES = ["전체", "캐주얼", "미니멀", "페미닌", "스트리트"];

const TRENDS = [
  { id: 1, title: "린넨 셋업 룩", category: "미니멀", likes: 2841, emoji: "🤍", color: "var(--slate-lt)", canCopy: true,
    copyItems: ["화이트 오버핏 셔츠 (보유)", "와이드 슬랙스 (보유)", "화이트 스니커즈 (보유)"], match: 100 },
  { id: 2, title: "Y2K 데님 코디", category: "스트리트", likes: 1923, emoji: "💜", color: "var(--purple-lt)", canCopy: false,
    copyItems: [], match: 0 },
  { id: 3, title: "플로럴 시어 블라우스", category: "페미닌", likes: 3102, emoji: "🌸", color: "var(--pink-lt)", canCopy: true,
    copyItems: ["스트라이프 니트 (대체)", "와이드 슬랙스 (보유)", "미니 버킷백 (보유)"], match: 67 },
  { id: 4, title: "오버핏 후드 조거", category: "캐주얼", likes: 1567, emoji: "🖤", color: "var(--slate-lt)", canCopy: true,
    copyItems: ["스트라이프 니트 (대체)", "와이드 슬랙스 (보유)", "화이트 스니커즈 (보유)"], match: 80 },
];

export default function TrendFeed() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [saved, setSaved] = useState<number[]>([]);
  const [copySheet, setCopySheet] = useState<typeof TRENDS[0] | null>(null);

  const filtered = activeCategory === "전체" ? TRENDS : TRENDS.filter((t) => t.category === activeCategory);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-[var(--font-instrument-serif)] text-xl">이번 주 트렌드</h2>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4 pb-1">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all"
            style={{ background: activeCategory === cat ? "var(--text)" : "var(--card)", color: activeCategory === cat ? "#fff" : "var(--text-sub)", borderColor: activeCategory === cat ? "var(--text)" : "var(--border)" }}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map((trend) => (
          <div key={trend.id} className="rounded-2xl border border-[var(--border)] overflow-hidden" style={{ background: trend.color }}>
            <div className="aspect-[3/4] flex items-center justify-center text-5xl">{trend.emoji}</div>
            <div className="p-3 bg-[var(--card)]">
              <p className="text-xs font-medium leading-tight mb-1">{trend.title}</p>
              <div className="flex items-center justify-between mb-2">
                <span className="font-[var(--font-dm-mono)] text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: "var(--bg)", color: "var(--text-sub)" }}>{trend.category}</span>
                <button onClick={() => setSaved((s) => s.includes(trend.id) ? s.filter((id) => id !== trend.id) : [...s, trend.id])} className="text-sm">
                  {saved.includes(trend.id) ? "🩷" : "🤍"}
                </button>
              </div>
              {trend.canCopy && (
                <button
                  onClick={() => setCopySheet(trend)}
                  className="w-full text-[10px] py-1.5 rounded-lg font-medium"
                  style={{ background: "var(--pink-lt)", color: "var(--pink-dk)" }}>
                  내 옷장으로 따라하기
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 따라하기 결과 바텀시트 */}
      {copySheet && (
        <div className="fixed inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,0.4)" }} onClick={() => setCopySheet(null)}>
          <div className="w-full max-w-[430px] mx-auto bg-[var(--card)] rounded-t-3xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: "var(--border-dk)" }} />
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">{copySheet.emoji}</span>
              <div>
                <p className="font-medium">{copySheet.title}</p>
                <p className="text-xs text-[var(--text-sub)] mt-0.5">내 옷장 매칭률 {copySheet.match}%</p>
              </div>
              <div className="ml-auto">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-[var(--font-dm-mono)] font-medium text-sm"
                  style={{ background: copySheet.match === 100 ? "var(--teal-lt)" : "var(--amber-lt)", color: copySheet.match === 100 ? "var(--teal-dk)" : "var(--amber-dk)" }}>
                  {copySheet.match}%
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-5">
              {copySheet.copyItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: item.includes("보유") ? "var(--teal-lt)" : "var(--amber-lt)" }}>
                  <span className="text-sm">{item.includes("보유") ? "✓" : "~"}</span>
                  <p className="text-sm flex-1">{item}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setCopySheet(null)}
                className="py-3 rounded-xl text-sm font-medium border" style={{ borderColor: "var(--border)", color: "var(--text-sub)" }}>
                닫기
              </button>
              <button onClick={() => setCopySheet(null)}
                className="py-3 rounded-xl text-sm font-medium text-white" style={{ background: "var(--pink)" }}>
                이 코디로 추천받기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
