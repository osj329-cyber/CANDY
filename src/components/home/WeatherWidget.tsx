"use client";

import { useState } from "react";

const scheduleTypes = ["강의", "미팅", "데이트", "운동", "외출"];
const moods = ["캐주얼", "세미캐", "포멀"];

export default function WeatherWidget() {
  const [selectedSchedule, setSelectedSchedule] = useState("외출");
  const [moodIndex, setMoodIndex] = useState(0);

  return (
    <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden">
      {/* 날씨 정보 */}
      <div className="px-5 pt-5 pb-4 flex items-center justify-between">
        <div>
          <p className="font-[var(--font-dm-mono)] text-[10px] tracking-wider uppercase text-[var(--text-sub)] mb-1">
            오늘의 날씨
          </p>
          <div className="flex items-end gap-2">
            <span className="font-[var(--font-instrument-serif)] text-4xl">22°</span>
            <span className="text-sm text-[var(--text-sub)] mb-1">체감 19° · 강수 10%</span>
          </div>
          <p className="text-xs text-[var(--text-sub)] mt-1">서울 마포구 · 맑음</p>
        </div>
        <div className="text-5xl">☀️</div>
      </div>

      <div className="h-px bg-[var(--border)]" />

      {/* 일정 유형 */}
      <div className="px-5 pt-4 pb-3">
        <p className="text-xs font-medium text-[var(--text-sub)] mb-2">오늘 일정</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {scheduleTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedSchedule(type)}
              className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all"
              style={{
                background: selectedSchedule === type ? "var(--pink)" : "var(--bg)",
                color: selectedSchedule === type ? "#fff" : "var(--text-sub)",
                borderColor: selectedSchedule === type ? "var(--pink)" : "var(--border)",
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 분위기 슬라이더 */}
      <div className="px-5 pb-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-[var(--text-sub)]">분위기</p>
          <span
            className="font-[var(--font-dm-mono)] text-xs px-2 py-0.5 rounded-full"
            style={{ background: "var(--pink-lt)", color: "var(--pink-dk)" }}
          >
            {moods[moodIndex]}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={2}
          step={1}
          value={moodIndex}
          onChange={(e) => setMoodIndex(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--pink) ${moodIndex * 50}%, var(--border) ${moodIndex * 50}%)`,
          }}
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-[var(--text-sub)]">캐주얼</span>
          <span className="text-[10px] text-[var(--text-sub)]">포멀</span>
        </div>
      </div>
    </div>
  );
}
