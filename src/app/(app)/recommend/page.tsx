"use client";

import { useState } from "react";

const STYLING_TABS = ["코디 추천", "메이크업 추천", "헤어 추천"];

const OUTFIT_REC = {
  items: [
    { label: "상의", value: "화이트 크롭 블라우스", owned: true },
    { label: "하의", value: "와이드 데님 팬츠", owned: true },
    { label: "아우터", value: "베이지 오버핏 자켓", owned: false },
    { label: "신발", value: "메리제인 플랫", owned: true },
  ],
  tpo: "오늘 미팅 일정에 세미 포멀하게 어울려요",
};

const MAKEUP_REC = [
  { step: "베이스", product: "글로우 세럼 파운데이션", brand: "이니스프리", color: "var(--pink)" },
  { step: "블러셔", product: "코랄 무드 블러셔", brand: "롬앤", color: "var(--coral)" },
  { step: "아이섀도", product: "브라운 모노 팔레트", brand: "클리오", color: "var(--amber)" },
  { step: "립", product: "누드 코랄 틴트", brand: "3CE", color: "var(--pink)" },
];

const HAIR_REC = [
  { name: "루즈 번", desc: "반업 스타일로 포멀하지 않게" },
  { name: "내추럴 웨이브", desc: "볼륨감을 살린 반웨이브" },
  { name: "깔끔한 포니테일", desc: "스마트한 느낌의 미팅 룩" },
];

export default function RecommendPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [swapped, setSwapped] = useState<string[]>([]);

  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--border)] px-5 py-4">
        <p className="font-[var(--font-dm-mono)] text-[10px] tracking-widest uppercase text-[var(--text-sub)]">
          AI Styling
        </p>
        <h1 className="font-[var(--font-instrument-serif)] text-2xl">통합 스타일링</h1>
      </header>

      {/* 스타일링 탭 */}
      <div className="flex border-b border-[var(--border)] bg-[var(--card)]">
        {STYLING_TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className="flex-1 py-3 text-sm font-medium transition-colors"
            style={{
              color: activeTab === i ? "var(--teal)" : "var(--text-sub)",
              borderBottom: activeTab === i ? "2px solid var(--teal)" : "2px solid transparent",
            }}
          >
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
                <span
                  className="font-[var(--font-dm-mono)] text-[10px] px-2 py-0.5 rounded-full"
                  style={{ background: "var(--teal-lt)", color: "var(--teal-dk)" }}
                >
                  옷장 기반
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {OUTFIT_REC.items.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-medium flex-shrink-0"
                      style={{
                        background: item.owned ? "var(--teal-lt)" : "var(--amber-lt)",
                        color: item.owned ? "var(--teal-dk)" : "var(--amber-dk)",
                      }}
                    >
                      {item.owned ? "✓" : "!"}
                    </div>
                    <div className="flex-1">
                      <p className="font-[var(--font-dm-mono)] text-[10px] uppercase tracking-wider text-[var(--text-sub)]">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium">{item.value}</p>
                    </div>
                    {!item.owned && (
                      <button
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ background: "var(--amber-lt)", color: "var(--amber-dk)" }}
                      >
                        쇼핑
                      </button>
                    )}
                    <button
                      onClick={() =>
                        setSwapped((s) =>
                          s.includes(item.label) ? s.filter((x) => x !== item.label) : [...s, item.label]
                        )
                      }
                      className="text-xs px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--text-sub)]"
                    >
                      교체
                    </button>
                  </div>
                ))}
              </div>

              <div
                className="mt-4 p-3 rounded-xl text-xs"
                style={{ background: "var(--teal-lt)", color: "var(--teal-dk)" }}
              >
                💬 {OUTFIT_REC.tpo}
              </div>
            </div>

            {/* 특별 일정 플래너 */}
            <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5">
              <h3 className="font-medium mb-3">특별 일정 플래너</h3>
              <div className="grid grid-cols-3 gap-2">
                {["면접", "데이트", "여행", "결혼식", "파티", "운동"].map((event) => (
                  <button
                    key={event}
                    className="py-2.5 rounded-xl border border-[var(--border)] text-sm font-medium transition-all hover:border-[var(--teal)] hover:text-[var(--teal)]"
                  >
                    {event}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 메이크업 추천 */}
        {activeTab === 1 && (
          <div className="flex flex-col gap-4">
            <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">오늘의 메이크업</h3>
                <span
                  className="font-[var(--font-dm-mono)] text-[10px] px-2 py-0.5 rounded-full"
                  style={{ background: "var(--pink-lt)", color: "var(--pink-dk)" }}
                >
                  쿨톤 웜믹스
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {MAKEUP_REC.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex-shrink-0"
                      style={{ background: item.color + "33", border: `1.5px solid ${item.color}66` }}
                    />
                    <div className="flex-1">
                      <p className="font-[var(--font-dm-mono)] text-[10px] uppercase tracking-wider text-[var(--text-sub)]">
                        {item.step}
                      </p>
                      <p className="text-sm font-medium">{item.product}</p>
                      <p className="text-xs text-[var(--text-sub)]">{item.brand}</p>
                    </div>
                    <button
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: "var(--pink-lt)", color: "var(--pink-dk)" }}
                    >
                      구매
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 피부톤 필터 */}
            <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5">
              <h3 className="font-medium mb-3">피부톤 설정</h3>
              <div className="flex gap-3">
                {["쿨톤", "웜톤", "뉴트럴"].map((tone) => (
                  <button
                    key={tone}
                    className="flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all"
                    style={{
                      background: tone === "쿨톤" ? "var(--purple-lt)" : "var(--bg)",
                      borderColor: tone === "쿨톤" ? "var(--purple)" : "var(--border)",
                      color: tone === "쿨톤" ? "var(--purple-dk)" : "var(--text-sub)",
                    }}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 헤어 추천 */}
        {activeTab === 2 && (
          <div className="flex flex-col gap-3">
            {HAIR_REC.map((hair, i) => (
              <div
                key={i}
                className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5 flex items-center gap-4"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: "var(--amber-lt)" }}
                >
                  💇
                </div>
                <div className="flex-1">
                  <p className="font-medium">{hair.name}</p>
                  <p className="text-xs text-[var(--text-sub)] mt-0.5">{hair.desc}</p>
                </div>
                <button
                  className="text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{ background: "var(--amber-lt)", color: "var(--amber-dk)" }}
                >
                  선택
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
