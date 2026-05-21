"use client";

import { useState } from "react";

const CATEGORIES = ["전체", "상의", "하의", "아우터", "신발", "가방", "액세서리"];

type Item = {
  id: number;
  emoji: string;
  name: string;
  brand: string;
  category: string;
  size: string;
  purchaseDate: string;
  price: string;
  worn: number;
  lastWorn: string;
  tags: string[];
};

const ITEMS: Item[] = [
  { id: 1, emoji: "👕", name: "화이트 오버핏 셔츠", brand: "COS", category: "상의", size: "M", purchaseDate: "2024.03.12", price: "89,000", worn: 12, lastWorn: "2025.05.18", tags: ["미니멀", "데일리"] },
  { id: 2, emoji: "👖", name: "와이드 슬랙스", brand: "무신사 스탠다드", category: "하의", size: "M", purchaseDate: "2024.01.05", price: "49,900", worn: 8, lastWorn: "2025.05.15", tags: ["오피스", "캐주얼"] },
  { id: 3, emoji: "🧥", name: "베이지 트렌치코트", brand: "ZARA", category: "아우터", size: "S", purchaseDate: "2023.10.20", price: "129,000", worn: 5, lastWorn: "2025.04.30", tags: ["클래식", "포멀"] },
  { id: 4, emoji: "👟", name: "화이트 스니커즈", brand: "New Balance", category: "신발", size: "250", purchaseDate: "2024.06.08", price: "109,000", worn: 20, lastWorn: "2025.05.20", tags: ["캐주얼", "데일리"] },
  { id: 5, emoji: "👜", name: "미니 버킷백", brand: "Mango", category: "가방", size: "Free", purchaseDate: "2024.04.15", price: "79,000", worn: 7, lastWorn: "2025.05.10", tags: ["데일리"] },
  { id: 6, emoji: "🧶", name: "스트라이프 니트", brand: "아더에러", category: "상의", size: "Free", purchaseDate: "2024.11.03", price: "198,000", worn: 3, lastWorn: "2025.03.22", tags: ["캐주얼", "트렌디"] },
];

const WEAR_HISTORY = [
  "2025.05.18 — 미팅 코디",
  "2025.05.10 — 데이트 코디",
  "2025.04.28 — 외출",
];

export default function ClosetPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [showAdd, setShowAdd] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showHistory, setShowHistory] = useState(false);

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
          <h1 className="font-[var(--font-instrument-serif)] text-2xl">내 옷장</h1>
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
            <div key={label} className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-3 text-center">
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
            <button
              key={item.id}
              onClick={() => { setSelectedItem(item); setShowHistory(false); }}
              className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden text-left transition-all active:scale-95"
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
                <p className="font-[var(--font-dm-mono)] text-[9px] mt-1" style={{ color: "var(--purple)" }}>
                  {item.worn}회 착용
                </p>
              </div>
            </button>
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

      {/* 아이템 상세 바텀시트 */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-end"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="w-full max-w-[430px] mx-auto bg-[var(--card)] rounded-t-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 핸들 */}
            <div className="pt-4 pb-2 flex justify-center">
              <div className="w-10 h-1 rounded-full" style={{ background: "var(--border-dk)" }} />
            </div>

            {/* 상단 아이템 정보 */}
            <div className="px-6 pb-5 flex items-center gap-4">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
                style={{ background: "var(--purple-lt)" }}
              >
                {selectedItem.emoji}
              </div>
              <div className="flex-1">
                <p className="font-medium text-base leading-tight">{selectedItem.name}</p>
                <p className="text-sm text-[var(--text-sub)] mt-0.5">{selectedItem.brand}</p>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {selectedItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "var(--purple-lt)", color: "var(--purple-dk)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-px" style={{ background: "var(--border)" }} />

            {/* 상세 정보 그리드 */}
            <div className="px-6 py-5 grid grid-cols-2 gap-3">
              {[
                { label: "카테고리", value: selectedItem.category },
                { label: "사이즈", value: selectedItem.size },
                { label: "구매일", value: selectedItem.purchaseDate },
                { label: "구매가", value: `₩${selectedItem.price}` },
                { label: "착용 횟수", value: `${selectedItem.worn}회` },
                { label: "마지막 착용", value: selectedItem.lastWorn },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[var(--bg)] rounded-xl p-3">
                  <p className="font-[var(--font-dm-mono)] text-[9px] uppercase tracking-wider text-[var(--text-sub)] mb-1">
                    {label}
                  </p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>

            {/* 착용 기록 토글 */}
            <div className="px-6 pb-2">
              <button
                onClick={() => setShowHistory((v) => !v)}
                className="w-full flex items-center justify-between py-3 px-4 rounded-xl border transition-all"
                style={{ borderColor: "var(--border)", background: "var(--bg)" }}
              >
                <span className="text-sm font-medium">착용 기록</span>
                <span className="text-[var(--text-sub)] text-sm">{showHistory ? "▲" : "▾"}</span>
              </button>
              {showHistory && (
                <div className="mt-2 flex flex-col gap-1.5">
                  {WEAR_HISTORY.map((record, i) => (
                    <div key={i} className="text-xs text-[var(--text-sub)] px-4 py-2 bg-[var(--bg)] rounded-xl">
                      {record}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 액션 버튼 */}
            <div className="px-6 pt-3 pb-8 grid grid-cols-3 gap-2">
              <button
                className="py-3 rounded-xl text-sm font-medium border"
                style={{ borderColor: "var(--border)", color: "var(--text-sub)" }}
              >
                편집
              </button>
              <button
                className="py-3 rounded-xl text-sm font-medium text-white col-span-1"
                style={{ background: "var(--purple)" }}
              >
                오늘 착용
              </button>
              <button
                className="py-3 rounded-xl text-sm font-medium"
                style={{ background: "var(--pink-lt)", color: "var(--pink-dk)" }}
              >
                코디 추천
              </button>
            </div>
          </div>
        </div>
      )}

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
            <div className="w-10 h-1 rounded-full mx-auto mb-6" style={{ background: "var(--border-dk)" }} />
            <h3 className="font-[var(--font-instrument-serif)] text-xl mb-5">아이템 추가</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "📷", label: "사진 촬영", desc: "AI 자동 태깅", color: "var(--purple)" },
                { icon: "🖼", label: "갤러리 업로드", desc: "앨범에서 선택", color: "var(--purple)" },
                { icon: "🛍", label: "쇼핑몰 연동", desc: "구매 내역 자동 등록", color: "var(--teal)" },
                { icon: "✏️", label: "직접 입력", desc: "정보 수동 입력", color: "var(--slate)" },
              ].map(({ icon, label, desc }) => (
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
