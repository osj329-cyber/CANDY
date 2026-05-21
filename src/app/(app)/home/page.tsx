"use client";

import { useState } from "react";
import WeatherWidget from "@/components/home/WeatherWidget";
import TodayRecommendCard from "@/components/home/TodayRecommendCard";
import TrendFeed from "@/components/home/TrendFeed";
import SearchOverlay from "@/components/SearchOverlay";

export default function HomePage() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--border)] px-5 py-4 flex items-center justify-between">
        <div>
          <p className="font-[var(--font-dm-mono)] text-[10px] tracking-widest uppercase text-[var(--text-sub)]">
            AI Styling
          </p>
          <h1 className="font-[var(--font-instrument-serif)] text-2xl italic text-[var(--pink)]">
            CANDY
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSearch(true)}
            className="w-9 h-9 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center"
          >
            <SearchIcon />
          </button>
          <button className="w-9 h-9 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center">
            <BellIcon />
          </button>
        </div>
      </header>

      {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />}

      <div className="px-4 py-4 flex flex-col gap-5">
        {/* 날씨·일정 위젯 */}
        <WeatherWidget />

        {/* 오늘의 추천 카드 */}
        <TodayRecommendCard />

        {/* 트렌드 피드 */}
        <TrendFeed />
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg className="w-5 h-5 text-[var(--text-sub)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg className="w-5 h-5 text-[var(--text-sub)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
    </svg>
  );
}
