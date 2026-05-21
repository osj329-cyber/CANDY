"use client";

import { useState } from "react";

const CATEGORIES = ["전체", "상의", "하의", "아우터", "신발", "가방", "액세서리"];

const ITEMS = [
  { id: 1, emoji: "👕", name: "화이트 오버핏 셔츠", brand: "COS", category: "상의", color: "#fff", worn: 12 },
  { id: 2, emoji: "👖", name: "와이드 슬랙스", brand: "무신사 스탠다드", category: "하의", color: "#2c3e50", worn: 8 },
  { id: 3, emoji: "🧥", name: "베이지 트렌치코트", brand: "ZARA", category: "아우터", color: "#c8a882", worn: 5 },
  { id: 4, emoji: "👟", name: "화이트 스니커즈", brand: "New Balance", category: "신발", color: "#fff", worn: 20 },
  { id: 5, emoji: "👜", name: "미니 버킷백", brand: "Mango", category: "가방", color: "#8B6552", worn: 7 },
  { id: 6, emoji: "🧶", name: "스트라이프 니트", brand: "아더에러", category: "상의", color: "#e8e0d0", worn: 3 },
];

export default function ClosetPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [showAdd, setShowAdd] = useState(false);

  const filtered =
    activeCategory === "전체" ? ITEMS : ITEMS.filter((i) => i.category === activeCategory);

  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--border)] px-5 py-4 flex items-center justify-between">
        <div>
          <p className="font-[var(--font-dm-mono)] text-[10px] tracking-widest uppercase text-[var(--text-sub)]">
            My Closet
          </p>
          <h1 className="font-[var(--font-instrument-serif)] text-2xl">
            내 옷장
          </h1>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xl"
          style={{ background: "var(--purple)" }}
        >
          +
        </button>
      </header>

      <div className="px-4 py-4">
        {/* 통계 */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { num: ITEMS.length, label: "전체 아이템" },
            { num: ITEMS.reduce((s, i) => s + i.worn, 0), label: "총 착용 횟수" },
            { num: ITEMS.filter((i) => i.worn === 0).length, label: "미착용" },
          ].map(({ num, label }) => (
            <div
              key={label}
              className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-3 text-center"
            >
              <p className="font-[var(--font-dm-mono)] text-xl font-medium">{num}</p>
              <p className="text-[10px] text-[var(--text-sub)] mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* 카테고리 필터 */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4 pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all"
              style={{
                background: activeCategory === cat ? "var(--purple)" : "var(--card)",
                color: activeCategory === cat ? "#fff" : "var(--text-sub)",
                borderColor: activeCategory === cat ? "var(--purple)" : "var(--border)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 아이템 그리드 */}
        <div className="grid grid-cols-3 gap-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden"
            >
              <div
                className="aspect-square flex items-center justify-center text-4xl"
                style={{ background: "var(--purple-lt)" }}
              >
                {item.emoji}
              </div>
              <div className="p-2.5">
                <p className="text-xs font-medium truncate">{item.name}</p>
                <p className="text-[10px] text-[var(--text-sub)] mt-0.5">{item.brand}</p>
                <p
                  className="font-[var(--font-dm-mono)] text-[9px] mt-1"
                  style={{ color: "var(--purple)" }}
                >
                  {item.worn}회 착용
                </p>
              </div>
            </div>
          ))}

          {/* 아이템 추가 버튼 */}
          <button
            onClick={() => setShowAdd(true)}
            className="aspect-square rounded-2xl border-2 border-dashed border-[var(--border)] flex flex-col items-center justify-center gap-1 transition-all hover:border-[var(--purple)]"
          >
            <span className="text-2xl text-[var(--text-sub)]">+</span>
            <span className="text-[10px] text-[var(--text-sub)]">추가</span>
          </button>
        </div>
      </div>

      {/* 아이템 추가 바텀시트 */}
      {showAdd && (
        <div
          className="fixed inset-0 z-50 flex items-end"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={() => setShowAdd(false)}
        >
          <div
            className="w-full max-w-[430px] mx-auto bg-[var(--card)] rounded-t-3xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-10 h-1 rounded-full mx-auto mb-6"
              style={{ background: "var(--border-dk)" }}
            />
            <h3 className="font-[var(--font-instrument-serif)] text-xl mb-5">아이템 추가</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "📷", label: "사진 촬영", desc: "AI 자동 태깅", color: "var(--purple)" },
                { icon: "🖼", label: "갤러리 업로드", desc: "앨범에서 선택", color: "var(--purple)" },
                { icon: "🛍", label: "쇼핑몰 연동", desc: "구매 내역 자동 등록", color: "var(--teal)" },
                { icon: "✏️", label: "직접 입력", desc: "정보 수동 입력", color: "var(--slate)" },
              ].map(({ icon, label, desc, color }) => (
                <button
                  key={label}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-[var(--border)] transition-all hover:border-[var(--purple)]"
                >
                  <span className="text-2xl">{icon}</span>
                  <span className="text-sm font-medium">{label}</span>
                  <span className="text-[10px] text-[var(--text-sub)]">{desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
