"use client";

import { useState } from "react";

const OUTFITS = [
  {
    top: "화이트 오버핏 셔츠",
    bottom: "와이드 슬랙스",
    outer: "베이지 트렌치코트",
    shoes: "화이트 스니커즈",
    bag: "미니 버킷백",
    makeup: { base: "글로우 파운데이션", point: "브라운 아이", lip: "누드 코랄" },
    hair: "루즈 하프업",
    comment: "오늘 외출에 딱 맞는 시크한 봄 코디예요",
  },
  {
    top: "스트라이프 니트",
    bottom: "데님 스트레이트",
    outer: "-",
    shoes: "로퍼",
    bag: "토트백",
    makeup: { base: "내추럴 쿠션", point: "테라코타 블러셔", lip: "로즈 핑크" },
    hair: "포니테일",
    comment: "편안하면서도 스타일리시한 캐주얼 룩이에요",
  },
];

export default function TodayRecommendCard() {
  const [index, setIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"코디" | "메이크업" | "헤어">("코디");
  const [confirmed, setConfirmed] = useState(false);
  const [showConfirmToast, setShowConfirmToast] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    setShowConfirmToast(true);
    setTimeout(() => setShowConfirmToast(false), 2500);
  };
  const outfit = OUTFITS[index];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-[var(--font-instrument-serif)] text-xl">오늘의 추천</h2>
        <span
          className="font-[var(--font-dm-mono)] text-[10px] px-2 py-0.5 rounded-full"
          style={{ background: "var(--pink-lt)", color: "var(--pink-dk)" }}
        >
          AI 생성
        </span>
      </div>

      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden">
        {/* 탭 */}
        <div className="flex border-b border-[var(--border)]">
          {(["코디", "메이크업", "헤어"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-3 text-sm font-medium transition-colors"
              style={{
                color: activeTab === tab ? "var(--pink)" : "var(--text-sub)",
                borderBottom: activeTab === tab ? "2px solid var(--pink)" : "2px solid transparent",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 코디 탭 */}
        {activeTab === "코디" && (
          <div className="p-5">
            <div className="flex flex-col gap-3">
              {[
                { label: "상의", value: outfit.top, icon: "👕" },
                { label: "하의", value: outfit.bottom, icon: "👖" },
                { label: "아우터", value: outfit.outer, icon: "🧥" },
                { label: "신발", value: outfit.shoes, icon: "👟" },
                { label: "가방", value: outfit.bag, icon: "👜" },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[var(--pink-lt)] flex items-center justify-center text-base flex-shrink-0">
                    {icon}
                  </span>
                  <div className="flex-1">
                    <p className="font-[var(--font-dm-mono)] text-[10px] uppercase tracking-wider text-[var(--text-sub)]">
                      {label}
                    </p>
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="mt-4 p-3 rounded-xl text-xs"
              style={{ background: "var(--pink-lt)", color: "var(--pink-dk)" }}
            >
              💬 {outfit.comment}
            </div>
          </div>
        )}

        {/* 메이크업 탭 */}
        {activeTab === "메이크업" && (
          <div className="p-5 flex flex-col gap-3">
            {[
              { label: "베이스", value: outfit.makeup.base, color: "var(--pink)" },
              { label: "포인트", value: outfit.makeup.point, color: "var(--purple)" },
              { label: "립 컬러", value: outfit.makeup.lip, color: "var(--coral)" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex-shrink-0"
                  style={{ background: color + "33", border: `1.5px solid ${color}55` }}
                />
                <div>
                  <p className="font-[var(--font-dm-mono)] text-[10px] uppercase tracking-wider text-[var(--text-sub)]">
                    {label}
                  </p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 헤어 탭 */}
        {activeTab === "헤어" && (
          <div className="p-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[var(--teal-lt)] flex items-center justify-center text-base flex-shrink-0">
                💇
              </span>
              <div>
                <p className="font-[var(--font-dm-mono)] text-[10px] uppercase tracking-wider text-[var(--text-sub)]">
                  추천 헤어
                </p>
                <p className="text-sm font-medium">{outfit.hair}</p>
              </div>
            </div>
            <p className="text-xs text-[var(--text-sub)]">
              오늘 코디 분위기에 자연스럽게 어울리는 스타일이에요.
            </p>
          </div>
        )}

        {/* 하단 버튼 */}
        <div className="px-5 pb-5 flex gap-2">
          {confirmed ? (
            <div className="flex-1 py-3 rounded-xl text-sm font-medium text-center" style={{ background: "var(--teal-lt)", color: "var(--teal-dk)" }}>
              ✓ 오늘 코디 확정됨
            </div>
          ) : (
            <>
              <button
                className="flex-1 py-3 rounded-xl text-sm font-medium border border-[var(--border)] text-[var(--text-sub)]"
                onClick={() => setIndex((i) => (i + 1) % OUTFITS.length)}
              >
                다시 추천
              </button>
              <button
                className="flex-1 py-3 rounded-xl text-sm font-medium text-white"
                style={{ background: "var(--pink)" }}
                onClick={handleConfirm}
              >
                오늘 이렇게 입을게요 ✓
              </button>
            </>
          )}
        </div>
      </div>

      {/* 확정 토스트 */}
      {showConfirmToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl text-sm font-medium text-white shadow-lg"
          style={{ background: "var(--teal)", whiteSpace: "nowrap" }}>
          🎉 오늘 코디가 룩북에 저장됐어요!
        </div>
      )}

      {/* 대안 코디 슬라이드 인디케이터 */}
      <div className="flex justify-center gap-1.5 mt-3">
        {OUTFITS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="rounded-full transition-all"
            style={{
              width: i === index ? 20 : 6,
              height: 6,
              background: i === index ? "var(--pink)" : "var(--border-dk)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
