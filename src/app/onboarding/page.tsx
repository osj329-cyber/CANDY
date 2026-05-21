"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STEPS = ["로그인", "기본 정보", "스타일 취향", "라이프스타일", "완료"];

const STYLE_CARDS = [
  { id: 1, emoji: "🤍", label: "미니멀" },
  { id: 2, emoji: "🌸", label: "페미닌" },
  { id: 3, emoji: "🖤", label: "스트리트" },
  { id: 4, emoji: "🌿", label: "내추럴" },
  { id: 5, emoji: "💙", label: "캐주얼" },
  { id: 6, emoji: "🔥", label: "섹시" },
];

const LIFESTYLE_OPTIONS = ["학교", "직장", "카페", "홈오피스", "야외활동"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);
  const [lifestyle, setLifestyle] = useState<string[]>([]);
  const [bodyType, setBodyType] = useState("");
  const [skinTone, setSkinTone] = useState("");

  const next = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else router.push("/home");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col max-w-[430px] mx-auto">
      {/* 스텝 인디케이터 */}
      {step > 0 && step < STEPS.length - 1 && (
        <div className="px-5 pt-6 pb-2">
          <div className="flex gap-1.5">
            {STEPS.slice(1, -1).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-1 rounded-full transition-all"
                style={{
                  background: i < step ? "var(--pink)" : i === step - 1 ? "var(--pink)" : "var(--border)",
                }}
              />
            ))}
          </div>
          <p className="font-[var(--font-dm-mono)] text-[10px] uppercase tracking-wider text-[var(--text-sub)] mt-2">
            {step} / {STEPS.length - 2}단계
          </p>
        </div>
      )}

      <div className="flex-1 flex flex-col px-5 py-6">
        {/* Step 0: 로그인 */}
        {step === 0 && (
          <div className="flex flex-col flex-1">
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl"
                style={{ background: "var(--pink-lt)" }}
              >
                🍬
              </div>
              <div className="text-center">
                <h1 className="font-[var(--font-instrument-serif)] text-4xl italic text-[var(--pink)] mb-2">
                  CANDY
                </h1>
                <p className="text-sm text-[var(--text-sub)]">
                  오늘의 나를 완성하는
                  <br />
                  AI 코디 추천 서비스
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { icon: "💬", label: "카카오로 시작하기", bg: "#FEE500", color: "#3C1E1E" },
                { icon: "🟢", label: "네이버로 시작하기", bg: "#03C75A", color: "#fff" },
                { icon: "🔵", label: "구글로 시작하기", bg: "var(--card)", color: "var(--text)", border: true },
              ].map(({ icon, label, bg, color, border }) => (
                <button
                  key={label}
                  onClick={next}
                  className="w-full py-3.5 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: bg,
                    color,
                    border: border ? "1.5px solid var(--border)" : "none",
                  }}
                >
                  <span>{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: 기본 정보 */}
        {step === 1 && (
          <div className="flex flex-col flex-1">
            <h2 className="font-[var(--font-instrument-serif)] text-2xl mb-1">기본 정보 입력</h2>
            <p className="text-sm text-[var(--text-sub)] mb-6">체형과 피부톤을 알면 더 정확한 추천을 드려요.</p>

            <div className="flex flex-col gap-5 flex-1">
              <div>
                <p className="text-sm font-medium mb-2">체형</p>
                <div className="grid grid-cols-3 gap-2">
                  {["마른", "보통", "볼륨"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setBodyType(type)}
                      className="py-3 rounded-xl border text-sm font-medium transition-all"
                      style={{
                        background: bodyType === type ? "var(--pink)" : "var(--bg)",
                        borderColor: bodyType === type ? "var(--pink)" : "var(--border)",
                        color: bodyType === type ? "#fff" : "var(--text)",
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">피부톤</p>
                <div className="grid grid-cols-3 gap-2">
                  {["쿨톤", "웜톤", "뉴트럴"].map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setSkinTone(tone)}
                      className="py-3 rounded-xl border text-sm font-medium transition-all"
                      style={{
                        background: skinTone === tone ? "var(--purple)" : "var(--bg)",
                        borderColor: skinTone === tone ? "var(--purple)" : "var(--border)",
                        color: skinTone === tone ? "#fff" : "var(--text)",
                      }}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
                <button className="mt-2 text-xs text-[var(--text-sub)] underline">
                  잘 모르겠어요 (자동 진단 받기)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: 스타일 취향 */}
        {step === 2 && (
          <div className="flex flex-col flex-1">
            <h2 className="font-[var(--font-instrument-serif)] text-2xl mb-1">스타일 취향</h2>
            <p className="text-sm text-[var(--text-sub)] mb-6">좋아하는 스타일을 선택해 주세요. (복수 선택)</p>

            <div className="grid grid-cols-3 gap-3 flex-1">
              {STYLE_CARDS.map((card) => (
                <button
                  key={card.id}
                  onClick={() =>
                    setLiked((l) =>
                      l.includes(card.id) ? l.filter((id) => id !== card.id) : [...l, card.id]
                    )
                  }
                  className="aspect-square rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all"
                  style={{
                    background: liked.includes(card.id) ? "var(--pink-lt)" : "var(--card)",
                    borderColor: liked.includes(card.id) ? "var(--pink)" : "var(--border)",
                  }}
                >
                  <span className="text-3xl">{card.emoji}</span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: liked.includes(card.id) ? "var(--pink-dk)" : "var(--text)" }}
                  >
                    {card.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: 라이프스타일 */}
        {step === 3 && (
          <div className="flex flex-col flex-1">
            <h2 className="font-[var(--font-instrument-serif)] text-2xl mb-1">라이프스타일</h2>
            <p className="text-sm text-[var(--text-sub)] mb-6">주로 어디에 있나요? (복수 선택)</p>

            <div className="flex flex-col gap-3 flex-1">
              {LIFESTYLE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() =>
                    setLifestyle((l) =>
                      l.includes(opt) ? l.filter((x) => x !== opt) : [...l, opt]
                    )
                  }
                  className="w-full py-4 rounded-2xl border text-sm font-medium text-left px-5 transition-all"
                  style={{
                    background: lifestyle.includes(opt) ? "var(--teal-lt)" : "var(--card)",
                    borderColor: lifestyle.includes(opt) ? "var(--teal)" : "var(--border)",
                    color: lifestyle.includes(opt) ? "var(--teal-dk)" : "var(--text)",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: 완료 */}
        {step === 4 && (
          <div className="flex flex-col flex-1 items-center justify-center text-center gap-4">
            <div className="text-6xl">🎉</div>
            <h2 className="font-[var(--font-instrument-serif)] text-3xl">준비 완료!</h2>
            <p className="text-sm text-[var(--text-sub)] max-w-[240px]">
              프로필 설정이 끝났어요.
              <br />
              <strong className="text-[var(--pink)]">7일 프리미엄 무료 체험</strong>을 시작합니다!
            </p>
          </div>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="px-5 pb-10">
        <button
          onClick={next}
          disabled={
            (step === 1 && (!bodyType || !skinTone)) ||
            (step === 2 && liked.length === 0) ||
            (step === 3 && lifestyle.length === 0)
          }
          className="w-full py-4 rounded-2xl text-sm font-medium text-white transition-all disabled:opacity-40"
          style={{ background: "var(--pink)" }}
        >
          {step === 0 ? null : step === STEPS.length - 1 ? "홈으로 이동" : "다음"}
        </button>
      </div>
    </div>
  );
}
