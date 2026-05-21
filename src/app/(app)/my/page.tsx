"use client";

import { useState } from "react";

const PLAN_FEATURES = {
  free: ["하루 추천 1회", "옷장 30개 아이템", "기본 메이크업 추천"],
  standard: ["하루 추천 무제한", "옷장 무제한", "통합 스타일링", "쇼핑 연동"],
  premium: ["모든 스탠다드 기능", "시즌 리포트", "예산 코칭", "1:1 스타일리스트"],
};

const LOOKBOOK = [
  { id: 1, emoji: "🤍", title: "미팅 코디", date: "2025.05.18", tags: ["오피스", "세미포멀"] },
  { id: 2, emoji: "🌸", title: "주말 데이트", date: "2025.05.10", tags: ["페미닌", "캐주얼"] },
  { id: 3, emoji: "🖤", title: "친구 모임", date: "2025.04.28", tags: ["스트리트"] },
  { id: 4, emoji: "💜", title: "쇼핑 외출", date: "2025.04.15", tags: ["캐주얼", "데일리"] },
];

type Sheet = "profile" | "lookbook" | "notification" | "settings" | "support" | null;

export default function MyPage() {
  const [currentPlan] = useState<"free" | "standard" | "premium">("free");
  const [activeSheet, setActiveSheet] = useState<Sheet>(null);

  const menuItems = [
    { id: "profile" as Sheet, icon: "👤", label: "프로필 설정", desc: "체형·피부톤·취향 관리" },
    { id: "lookbook" as Sheet, icon: "📚", label: "룩북 · 히스토리", desc: "저장된 룩 & 착용 캘린더" },
    { id: "notification" as Sheet, icon: "🔔", label: "알림 설정", desc: "아침 코디·저녁 피드백 알림" },
    { id: "settings" as Sheet, icon: "⚙️", label: "앱 설정", desc: "연동 계정·개인정보 관리" },
    { id: "support" as Sheet, icon: "💬", label: "고객센터", desc: "FAQ · 1:1 문의" },
  ];

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 bg-[var(--card)] border-b border-[var(--border)] px-5 py-4">
        <p className="font-[var(--font-dm-mono)] text-[10px] tracking-widest uppercase text-[var(--text-sub)]">My Page</p>
        <h1 className="font-[var(--font-instrument-serif)] text-2xl">마이페이지</h1>
      </header>

      <div className="px-4 py-5 flex flex-col gap-5">
        {/* 프로필 카드 */}
        <div
          className="rounded-2xl p-5 flex items-center gap-4"
          style={{ background: "linear-gradient(135deg, var(--pink-lt), var(--purple-lt))" }}
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "var(--card)" }}>
            😊
          </div>
          <div className="flex-1">
            <p className="font-medium text-base">김예진</p>
            <p className="text-xs text-[var(--text-sub)] mt-0.5">쿨톤 · 보통 체형</p>
            <div className="flex gap-1 mt-2">
              {["캐주얼", "미니멀"].map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: "var(--card)", color: "var(--pink-dk)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button onClick={() => setActiveSheet("profile")} className="text-xs text-[var(--text-sub)]">편집</button>
        </div>

        {/* 구독 플랜 */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">구독 플랜</h3>
            <span className="font-[var(--font-dm-mono)] text-[10px] px-2 py-0.5 rounded-full" style={{ background: "var(--slate-lt)", color: "var(--slate-dk)" }}>
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
                <p className="font-[var(--font-dm-mono)] text-[10px] uppercase tracking-wider mb-1" style={{ color: currentPlan === plan ? "rgba(255,255,255,0.7)" : "var(--text-sub)" }}>
                  {plan}
                </p>
                <p className="font-medium text-sm">{plan === "free" ? "무료" : plan === "standard" ? "₩4,900" : "₩9,900"}</p>
                {plan !== "free" && <p className="text-[10px] mt-0.5" style={{ color: currentPlan === plan ? "rgba(255,255,255,0.7)" : "var(--text-sub)" }}>/월</p>}
              </div>
            ))}
          </div>
          {currentPlan === "free" && (
            <button className="w-full mt-4 py-3 rounded-xl text-sm font-medium text-white" style={{ background: "var(--pink)" }}>
              스탠다드로 업그레이드
            </button>
          )}
        </div>

        {/* 메뉴 목록 */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden">
          {menuItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActiveSheet(item.id)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-[var(--bg)]"
              style={{ borderBottom: i < menuItems.length - 1 ? "1px solid var(--border)" : "none" }}
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

        <button className="text-sm text-[var(--text-sub)] text-center py-2">로그아웃</button>
      </div>

      {/* 바텀시트 오버레이 */}
      {activeSheet && (
        <div className="fixed inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,0.4)" }} onClick={() => setActiveSheet(null)}>
          <div className="w-full max-w-[430px] mx-auto bg-[var(--card)] rounded-t-3xl overflow-hidden max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="pt-4 pb-2 flex justify-center sticky top-0 bg-[var(--card)]">
              <div className="w-10 h-1 rounded-full" style={{ background: "var(--border-dk)" }} />
            </div>

            {/* 프로필 설정 */}
            {activeSheet === "profile" && (
              <div className="px-6 pb-8">
                <h3 className="font-[var(--font-instrument-serif)] text-xl mb-5">프로필 설정</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-xs font-medium text-[var(--text-sub)] mb-2">닉네임</p>
                    <input defaultValue="김예진" className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: "var(--border)", background: "var(--bg)" }} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[var(--text-sub)] mb-2">체형</p>
                    <div className="grid grid-cols-3 gap-2">
                      {["마른", "보통", "볼륨"].map((t) => (
                        <button key={t} className="py-2.5 rounded-xl border text-sm font-medium transition-all"
                          style={{ background: t === "보통" ? "var(--pink)" : "var(--bg)", borderColor: t === "보통" ? "var(--pink)" : "var(--border)", color: t === "보통" ? "#fff" : "var(--text)" }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[var(--text-sub)] mb-2">피부톤</p>
                    <div className="grid grid-cols-3 gap-2">
                      {["쿨톤", "웜톤", "뉴트럴"].map((t) => (
                        <button key={t} className="py-2.5 rounded-xl border text-sm font-medium transition-all"
                          style={{ background: t === "쿨톤" ? "var(--purple)" : "var(--bg)", borderColor: t === "쿨톤" ? "var(--purple)" : "var(--border)", color: t === "쿨톤" ? "#fff" : "var(--text)" }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[var(--text-sub)] mb-2">스타일 취향</p>
                    <div className="flex flex-wrap gap-2">
                      {["미니멀", "캐주얼", "페미닌", "스트리트", "내추럴"].map((s) => (
                        <button key={s} className="px-3 py-1.5 rounded-full border text-xs font-medium transition-all"
                          style={{ background: ["미니멀","캐주얼"].includes(s) ? "var(--pink-lt)" : "var(--bg)", borderColor: ["미니멀","캐주얼"].includes(s) ? "var(--pink)" : "var(--border)", color: ["미니멀","캐주얼"].includes(s) ? "var(--pink-dk)" : "var(--text-sub)" }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button className="w-full py-3 rounded-xl text-sm font-medium text-white mt-2" style={{ background: "var(--pink)" }} onClick={() => setActiveSheet(null)}>
                    저장
                  </button>
                </div>
              </div>
            )}

            {/* 룩북 */}
            {activeSheet === "lookbook" && (
              <div className="px-6 pb-8">
                <h3 className="font-[var(--font-instrument-serif)] text-xl mb-5">룩북 · 히스토리</h3>
                <div className="flex flex-col gap-3">
                  {LOOKBOOK.map((look) => (
                    <div key={look.id} className="flex items-center gap-4 p-4 rounded-2xl border" style={{ borderColor: "var(--border)", background: "var(--bg)" }}>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: "var(--card)" }}>
                        {look.emoji}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{look.title}</p>
                        <p className="font-[var(--font-dm-mono)] text-[10px] text-[var(--text-sub)] mt-0.5">{look.date}</p>
                        <div className="flex gap-1 mt-1.5">
                          {look.tags.map((tag) => (
                            <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: "var(--pink-lt)", color: "var(--pink-dk)" }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                      <button className="text-xs px-3 py-1.5 rounded-full" style={{ background: "var(--purple-lt)", color: "var(--purple-dk)" }}>공유</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 알림 설정 */}
            {activeSheet === "notification" && (
              <div className="px-6 pb-8">
                <h3 className="font-[var(--font-instrument-serif)] text-xl mb-5">알림 설정</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "아침 코디 알림", desc: "매일 오전 7:30", on: true },
                    { label: "저녁 피드백 알림", desc: "매일 오후 8:00", on: true },
                    { label: "트렌드 업데이트", desc: "새 트렌드 등록 시", on: false },
                    { label: "미착용 아이템 알림", desc: "30일 이상 미착용 시", on: true },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl border" style={{ borderColor: "var(--border)" }}>
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-[var(--text-sub)] mt-0.5">{item.desc}</p>
                      </div>
                      <div className="w-11 h-6 rounded-full flex items-center px-0.5 transition-all cursor-pointer flex-shrink-0"
                        style={{ background: item.on ? "var(--pink)" : "var(--border-dk)", justifyContent: item.on ? "flex-end" : "flex-start" }}>
                        <div className="w-5 h-5 rounded-full bg-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 앱 설정 */}
            {activeSheet === "settings" && (
              <div className="px-6 pb-8">
                <h3 className="font-[var(--font-instrument-serif)] text-xl mb-5">앱 설정</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "언어", value: "한국어" },
                    { label: "테마", value: "라이트" },
                    { label: "연동 계정", value: "카카오" },
                    { label: "캘린더 연동", value: "연결됨" },
                    { label: "쇼핑몰 연동", value: "무신사, 지그재그" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between px-4 py-3.5 rounded-xl" style={{ background: "var(--bg)" }}>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-sm text-[var(--text-sub)]">{item.value} ›</p>
                    </div>
                  ))}
                  <button className="mt-3 w-full py-3 rounded-xl text-sm font-medium" style={{ background: "var(--pink-lt)", color: "var(--pink-dk)" }}>
                    개인정보 삭제 요청
                  </button>
                </div>
              </div>
            )}

            {/* 고객센터 */}
            {activeSheet === "support" && (
              <div className="px-6 pb-8">
                <h3 className="font-[var(--font-instrument-serif)] text-xl mb-5">고객센터</h3>
                <div className="flex flex-col gap-3">
                  <div className="p-4 rounded-2xl border" style={{ borderColor: "var(--border)" }}>
                    <p className="text-sm font-medium mb-3">자주 묻는 질문</p>
                    {["AI 추천은 어떻게 작동하나요?", "옷장 아이템은 몇 개까지 등록 가능한가요?", "구독을 해지하면 데이터는 어떻게 되나요?"].map((q) => (
                      <div key={q} className="py-2.5 border-t text-sm text-[var(--text-sub)] flex justify-between" style={{ borderColor: "var(--border)" }}>
                        {q} <span>›</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-3 rounded-xl text-sm font-medium text-white" style={{ background: "var(--purple)" }}>
                    1:1 문의하기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
