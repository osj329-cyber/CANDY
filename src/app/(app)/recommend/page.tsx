"use client";

import { useState } from "react";

const STYLING_TABS = ["코디 추천", "메이크업 추천", "헤어 추천", "쇼핑 연동"];

const OUTFIT_REC = {
  items: [
    { label: "상의", value: "화이트 크롭 블라우스", owned: true },
    { label: "하의", value: "와이드 데님 팬츠", owned: true },
    { label: "아우터", value: "베이지 오버핏 자켓", owned: false },
    { label: "신발", value: "메리제인 플랫", owned: true },
  ],
  tpo: "오늘 미팅 일정에 세미 포멀하게 어울려요",
};

const MAKEUP_BY_TONE: Record<string, { step: string; product: string; brand: string; color: string }[]> = {
  쿨톤: [
    { step: "베이스", product: "글로우 세럼 파운데이션", brand: "이니스프리", color: "var(--pink)" },
    { step: "블러셔", product: "로즈 핑크 블러셔", brand: "롬앤", color: "var(--pink)" },
    { step: "아이섀도", product: "모브 핑크 팔레트", brand: "클리오", color: "var(--purple)" },
    { step: "립", product: "쿨 레드 틴트", brand: "3CE", color: "var(--pink)" },
  ],
  웜톤: [
    { step: "베이스", product: "새틴 파운데이션", brand: "헤라", color: "var(--amber)" },
    { step: "블러셔", product: "코랄 무드 블러셔", brand: "롬앤", color: "var(--coral)" },
    { step: "아이섀도", product: "브라운 모노 팔레트", brand: "클리오", color: "var(--amber)" },
    { step: "립", product: "누드 코랄 틴트", brand: "3CE", color: "var(--coral)" },
  ],
  뉴트럴: [
    { step: "베이스", product: "내추럴 쿠션", brand: "미샤", color: "var(--slate)" },
    { step: "블러셔", product: "베이지 로즈 블러셔", brand: "에뛰드", color: "var(--pink)" },
    { step: "아이섀도", product: "뉴트럴 데일리 팔레트", brand: "롬앤", color: "var(--amber)" },
    { step: "립", product: "베이지 핑크 틴트", brand: "페리페라", color: "var(--pink)" },
  ],
};

const HAIR_REC = [
  { name: "루즈 번", desc: "반업 스타일로 포멀하지 않게" },
  { name: "내추럴 웨이브", desc: "볼륨감을 살린 반웨이브" },
  { name: "깔끔한 포니테일", desc: "스마트한 느낌의 미팅 룩" },
];

const EVENT_OUTFITS: Record<string, { emoji: string; items: string[]; comment: string }> = {
  면접: { emoji: "💼", items: ["화이트 블라우스", "블랙 슬랙스", "베이지 자켓", "로퍼"], comment: "단정하고 신뢰감 있는 면접 룩이에요" },
  데이트: { emoji: "🌸", items: ["플로럴 원피스", "베이지 카디건", "메리제인 플랫", "미니 백"], comment: "로맨틱하고 사랑스러운 데이트 룩이에요" },
  여행: { emoji: "✈️", items: ["스트라이프 티셔츠", "와이드 데님", "스니커즈", "캔버스 백"], comment: "편안하고 활동적인 여행 코디예요" },
  결혼식: { emoji: "💐", items: ["플리츠 미디 스커트", "새틴 블라우스", "힐", "클러치"], comment: "우아하고 격식 있는 하객 룩이에요" },
  파티: { emoji: "🎉", items: ["시퀸 미니 드레스", "스트랩 샌들", "이브닝 백"], comment: "화려하고 눈에 띄는 파티 룩이에요" },
  운동: { emoji: "🏃", items: ["레깅스", "크롭 집업", "러닝화", "크로스백"], comment: "기능적이고 스타일리시한 운동 룩이에요" },
};

export default function RecommendPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [swapped, setSwapped] = useState<string[]>([]);
  const [skinTone, setSkinTone] = useState("쿨톤");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const makeupRec = MAKEUP_BY_TONE[skinTone];

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--border)] px-5 py-4">
        <p className="font-[var(--font-dm-mono)] text-[10px] tracking-widest uppercase text-[var(--text-sub)]">AI Styling</p>
        <h1 className="font-[var(--font-instrument-serif)] text-2xl">통합 스타일링</h1>
      </header>

      <div className="flex border-b border-[var(--border)] bg-[var(--card)]">
        {STYLING_TABS.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(i)}
            className="flex-1 py-3 text-xs font-medium transition-colors"
            style={{ color: activeTab === i ? "var(--teal)" : "var(--text-sub)", borderBottom: activeTab === i ? "2px solid var(--teal)" : "2px solid transparent" }}>
            {tab}
          </button>
        ))}
      </div>

      <div className="px-4 py-5">

        {/* 코디 추천 */}
        {activeTab === 0 && (
          <div className="flex flex-col gap-4">
            <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">오늘의 코디</h3>
                <span className="font-[var(--font-dm-mono)] text-[10px] px-2 py-0.5 rounded-full" style={{ background: "var(--teal-lt)", color: "var(--teal-dk)" }}>옷장 기반</span>
              </div>
              <div className="flex flex-col gap-3">
                {OUTFIT_REC.items.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-medium flex-shrink-0"
                      style={{ background: item.owned ? "var(--teal-lt)" : "var(--amber-lt)", color: item.owned ? "var(--teal-dk)" : "var(--amber-dk)" }}>
                      {item.owned ? "✓" : "!"}
                    </div>
                    <div className="flex-1">
                      <p className="font-[var(--font-dm-mono)] text-[10px] uppercase tracking-wider text-[var(--text-sub)]">{item.label}</p>
                      <p className="text-sm font-medium">{swapped.includes(item.label) ? "대체 아이템 선택됨" : item.value}</p>
                    </div>
                    {!item.owned && (
                      <button className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "var(--amber-lt)", color: "var(--amber-dk)" }}>쇼핑</button>
                    )}
                    <button
                      onClick={() => setSwapped((s) => s.includes(item.label) ? s.filter((x) => x !== item.label) : [...s, item.label])}
                      className="text-xs px-2.5 py-1 rounded-full border transition-all"
                      style={{ borderColor: swapped.includes(item.label) ? "var(--teal)" : "var(--border)", color: swapped.includes(item.label) ? "var(--teal)" : "var(--text-sub)", background: swapped.includes(item.label) ? "var(--teal-lt)" : "transparent" }}>
                      {swapped.includes(item.label) ? "완료" : "교체"}
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl text-xs" style={{ background: "var(--teal-lt)", color: "var(--teal-dk)" }}>
                💬 {OUTFIT_REC.tpo}
              </div>
            </div>

            {/* 특별 일정 플래너 */}
            <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5">
              <h3 className="font-medium mb-3">특별 일정 플래너</h3>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {Object.keys(EVENT_OUTFITS).map((event) => (
                  <button key={event}
                    onClick={() => setSelectedEvent(selectedEvent === event ? null : event)}
                    className="py-2.5 rounded-xl border text-sm font-medium transition-all"
                    style={{
                      background: selectedEvent === event ? "var(--teal)" : "var(--bg)",
                      borderColor: selectedEvent === event ? "var(--teal)" : "var(--border)",
                      color: selectedEvent === event ? "#fff" : "var(--text)",
                    }}>
                    {event}
                  </button>
                ))}
              </div>
              {selectedEvent && (
                <div className="rounded-xl p-4 flex flex-col gap-3" style={{ background: "var(--teal-lt)" }}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{EVENT_OUTFITS[selectedEvent].emoji}</span>
                    <p className="font-medium text-sm" style={{ color: "var(--teal-dk)" }}>{selectedEvent} 추천 코디</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {EVENT_OUTFITS[selectedEvent].items.map((item) => (
                      <span key={item} className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "var(--card)", color: "var(--teal-dk)" }}>{item}</span>
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: "var(--teal-dk)" }}>💬 {EVENT_OUTFITS[selectedEvent].comment}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 메이크업 추천 */}
        {activeTab === 1 && (
          <div className="flex flex-col gap-4">
            {/* 피부톤 선택 */}
            <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5">
              <h3 className="font-medium mb-3">피부톤 설정</h3>
              <div className="flex gap-3">
                {["쿨톤", "웜톤", "뉴트럴"].map((tone) => (
                  <button key={tone} onClick={() => setSkinTone(tone)}
                    className="flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all"
                    style={{
                      background: skinTone === tone ? "var(--purple)" : "var(--bg)",
                      borderColor: skinTone === tone ? "var(--purple)" : "var(--border)",
                      color: skinTone === tone ? "#fff" : "var(--text-sub)",
                    }}>
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">오늘의 메이크업</h3>
                <span className="font-[var(--font-dm-mono)] text-[10px] px-2 py-0.5 rounded-full" style={{ background: "var(--pink-lt)", color: "var(--pink-dk)" }}>
                  {skinTone} 기반
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {makeupRec.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex-shrink-0" style={{ background: item.color + "33", border: `1.5px solid ${item.color}66` }} />
                    <div className="flex-1">
                      <p className="font-[var(--font-dm-mono)] text-[10px] uppercase tracking-wider text-[var(--text-sub)]">{item.step}</p>
                      <p className="text-sm font-medium">{item.product}</p>
                      <p className="text-xs text-[var(--text-sub)]">{item.brand}</p>
                    </div>
                    <button className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "var(--pink-lt)", color: "var(--pink-dk)" }}>구매</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 헤어 추천 */}
        {activeTab === 2 && (
          <div className="flex flex-col gap-3">
            {HAIR_REC.map((hair, i) => (
              <div key={i} className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: "var(--amber-lt)" }}>💇</div>
                <div className="flex-1">
                  <p className="font-medium">{hair.name}</p>
                  <p className="text-xs text-[var(--text-sub)] mt-0.5">{hair.desc}</p>
                </div>
                <button className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ background: "var(--amber-lt)", color: "var(--amber-dk)" }}>선택</button>
              </div>
            ))}
          </div>
        )}

        {/* 쇼핑 연동 */}
        {activeTab === 3 && (
          <div className="flex flex-col gap-4">
            <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">없는 아이템</h3>
                <span className="font-[var(--font-dm-mono)] text-[10px] px-2 py-0.5 rounded-full" style={{ background: "var(--amber-lt)", color: "var(--amber-dk)" }}>1개 부족</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "var(--amber-lt)" }}>
                <span className="text-2xl">🧥</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">베이지 오버핏 자켓</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--amber-dk)" }}>오늘 코디에 필요한 아이템</p>
                </div>
                <button className="text-xs px-3 py-1.5 rounded-full font-medium text-white flex-shrink-0" style={{ background: "var(--amber)" }}>찾기</button>
              </div>
            </div>

            <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5">
              <h3 className="font-medium mb-4">유사 상품 추천</h3>
              <div className="flex flex-col gap-3">
                {[
                  { name: "오버핏 코튼 자켓", brand: "무신사 스탠다드", price: "39,900" },
                  { name: "베이지 루즈핏 자켓", brand: "ZARA", price: "89,000" },
                  { name: "린넨 오버핏 블레이저", brand: "COS", price: "129,000" },
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "var(--amber-lt)" }}>🧥</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-[var(--text-sub)]">{p.brand}</p>
                      <p className="font-[var(--font-dm-mono)] text-xs mt-0.5" style={{ color: "var(--teal)" }}>₩{p.price}</p>
                    </div>
                    <button className="text-xs px-3 py-1.5 rounded-full font-medium flex-shrink-0" style={{ background: "var(--teal-lt)", color: "var(--teal-dk)" }}>구매</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, var(--purple-lt), var(--teal-lt))" }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-sm">이번 달 패션 예산</h3>
                <span className="font-[var(--font-dm-mono)] text-[9px] px-2 py-0.5 rounded-full" style={{ background: "var(--card)", color: "var(--purple-dk)" }}>PREMIUM</span>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <span className="font-[var(--font-dm-mono)] text-2xl font-medium">₩47,200</span>
                <span className="text-xs text-[var(--text-sub)] mb-1">/ ₩100,000</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                <div className="h-full rounded-full" style={{ width: "47%", background: "var(--purple)" }} />
              </div>
              <p className="text-xs text-[var(--text-sub)] mt-2">이번 달 52,800원 남았어요</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
