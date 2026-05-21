"use client";

import { useState } from "react";

const PLAN_FEATURES = {
  free: ["하루 추천 1회", "옷장 30개 아이템", "기본 메이크업 추천"],
  standard: ["하루 추천 무제한", "옷장 무제한", "통합 스타일링", "쇼핑 연동"],
  premium: ["모든 스탠다드 기능", "시즌 리포트", "예산 코칭", "1:1 스타일리스트"],
};

export default function MyPage() {
  const [currentPlan] = useState<"free" | "standard" | "premium">("free");
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const menuItems = [
    { id: "profile", icon: "👤", label: "프로필 설정", desc: "체형·피부톤·취향 관리" },
    { id: "lookbook", icon: "📚", label: "룩북 · 히스토리", desc: "저장된 룩 & 착용 캘린더" },
    { id: "share", icon: "📢", label: "SNS 공유", desc: "완성 룩 인스타·카카오 공유" },
    { id: "notification", icon: "🔔", label: "알림 설정", desc: "아침 코디·저녁 피드백 알림" },
    { id: "settings", icon: "⚙️", label: "앱 설정", desc: "연동 계정·개인정보 관리" },
    { id: "support", icon: "💬", label: "고객센터", desc: "FAQ · 1:1 문의" },
  ];

  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--border)] px-5 py-4">
        <p className="font-[var(--font-dm-mono)] text-[10px] tracking-widest uppercase text-[var(--text-sub)]">
          My Page
        </p>
        <h1 className="font-[var(--font-instrument-serif)] text-2xl">마이페이지</h1>
      </header>

      <div className="px-4 py-5 flex flex-col gap-5">
        {/* 프로필 카드 */}
        <div
          className="rounded-2xl p-5 flex items-center gap-4"
          style={{ background: "linear-gradient(135deg, var(--pink-lt), var(--purple-lt))" }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: "var(--card)" }}
          >
            😊
          </div>
          <div className="flex-1">
            <p className="font-medium text-base">김예진</p>
            <p className="text-xs text-[var(--text-sub)] mt-0.5">쿨톤 · 보통 체형</p>
            <div className="flex gap-1 mt-2">
              {["캐주얼", "미니멀"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                  style={{ background: "var(--card)", color: "var(--pink-dk)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button className="text-xs text-[var(--text-sub)]">편집</button>
        </div>

        {/* 구독 플랜 */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">구독 플랜</h3>
            <span
              className="font-[var(--font-dm-mono)] text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: "var(--slate-lt)", color: "var(--slate-dk)" }}
            >
              {currentPlan.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(["free", "standard", "premium"] as const).map((plan) => (
              <div
                key={plan}
                className="rounded-xl border p-3 text-center transition-all"
                style={{
                  background: currentPlan === plan ? "var(--pink)" : "var(--bg)",
                  borderColor: currentPlan === plan ? "var(--pink)" : "var(--border)",
                  color: currentPlan === plan ? "#fff" : "var(--text)",
                }}
              >
                <p className="font-[var(--font-dm-mono)] text-[10px] uppercase tracking-wider mb-1"
                  style={{ color: currentPlan === plan ? "rgba(255,255,255,0.7)" : "var(--text-sub)" }}>
                  {plan}
                </p>
                <p className="font-medium text-sm">
                  {plan === "free" ? "무료" : plan === "standard" ? "₩4,900" : "₩9,900"}
                </p>
                {plan !== "free" && <p className="text-[10px] mt-0.5" style={{ color: currentPlan === plan ? "rgba(255,255,255,0.7)" : "var(--text-sub)" }}>/월</p>}
              </div>
            ))}
          </div>

          {currentPlan === "free" && (
            <button
              className="w-full mt-4 py-3 rounded-xl text-sm font-medium text-white"
              style={{ background: "var(--pink)" }}
            >
              스탠다드로 업그레이드
            </button>
          )}
        </div>

        {/* 메뉴 목록 */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden">
          {menuItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(activeSection === item.id ? null : item.id)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-[var(--bg)]"
              style={{
                borderBottom: i < menuItems.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <span className="text-xl w-8 text-center flex-shrink-0">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-[var(--text-sub)]">{item.desc}</p>
              </div>
              <span className="text-[var(--text-sub)] text-sm">›</span>
            </button>
          ))}
        </div>

        {/* 로그아웃 */}
        <button className="text-sm text-[var(--text-sub)] text-center py-2">
          로그아웃
        </button>
      </div>
    </div>
  );
}
