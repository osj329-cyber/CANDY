"use client";

import { useState } from "react";

type Props = { onClose: () => void };

const GOOD_TAGS = ["핏이 좋았어요", "색감이 예뻤어요", "TPO에 맞았어요", "편했어요", "칭찬 받았어요"];
const BAD_TAGS = ["핏이 아쉬워요", "색감이 별로예요", "불편했어요", "TPO 안 맞았어요"];

export default function FeedbackSheet({ onClose }: Props) {
  const [rating, setRating] = useState(0);
  const [goodSelected, setGoodSelected] = useState<string[]>([]);
  const [badSelected, setBadSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (val: string, list: string[], setList: (v: string[]) => void) =>
    setList(list.includes(val) ? list.filter((x) => x !== val) : [...list, val]);

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,0.4)" }} onClick={onClose}>
        <div className="w-full max-w-[430px] mx-auto bg-[var(--card)] rounded-t-3xl p-8 text-center" onClick={(e) => e.stopPropagation()}>
          <div className="text-5xl mb-4">🎯</div>
          <p className="font-[var(--font-instrument-serif)] text-xl mb-2">피드백 완료!</p>
          <p className="text-sm text-[var(--text-sub)] mb-6">내일 추천에 반영될게요</p>
          <button onClick={onClose} className="w-full py-3 rounded-xl text-sm font-medium text-white" style={{ background: "var(--pink)" }}>확인</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,0.4)" }} onClick={onClose}>
      <div className="w-full max-w-[430px] mx-auto bg-[var(--card)] rounded-t-3xl overflow-hidden max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="pt-4 pb-2 flex justify-center">
          <div className="w-10 h-1 rounded-full" style={{ background: "var(--border-dk)" }} />
        </div>
        <div className="px-6 pb-8">
          <p className="font-[var(--font-dm-mono)] text-[10px] uppercase tracking-wider text-[var(--text-sub)] mb-1">저녁 피드백</p>
          <h3 className="font-[var(--font-instrument-serif)] text-xl mb-5">오늘 코디 어떠셨나요?</h3>

          {/* 오늘 착용 코디 요약 */}
          <div className="p-4 rounded-2xl mb-5 flex items-center gap-3" style={{ background: "var(--pink-lt)" }}>
            <span className="text-2xl">👗</span>
            <div>
              <p className="text-sm font-medium">화이트 오버핏 셔츠 + 와이드 슬랙스</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--pink-dk)" }}>오늘 착용 코디</p>
            </div>
          </div>

          {/* 별점 */}
          <div className="mb-5">
            <p className="text-sm font-medium mb-3">전체 만족도</p>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} className="text-3xl transition-transform active:scale-90">
                  {star <= rating ? "⭐" : "☆"}
                </button>
              ))}
            </div>
          </div>

          {/* 좋았던 점 */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">좋았던 점</p>
            <div className="flex flex-wrap gap-2">
              {GOOD_TAGS.map((tag) => (
                <button key={tag} onClick={() => toggle(tag, goodSelected, setGoodSelected)}
                  className="px-3 py-1.5 rounded-full border text-xs font-medium transition-all"
                  style={{ background: goodSelected.includes(tag) ? "var(--teal-lt)" : "var(--bg)", borderColor: goodSelected.includes(tag) ? "var(--teal)" : "var(--border)", color: goodSelected.includes(tag) ? "var(--teal-dk)" : "var(--text-sub)" }}>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* 아쉬운 점 */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-2">아쉬운 점</p>
            <div className="flex flex-wrap gap-2">
              {BAD_TAGS.map((tag) => (
                <button key={tag} onClick={() => toggle(tag, badSelected, setBadSelected)}
                  className="px-3 py-1.5 rounded-full border text-xs font-medium transition-all"
                  style={{ background: badSelected.includes(tag) ? "var(--pink-lt)" : "var(--bg)", borderColor: badSelected.includes(tag) ? "var(--pink)" : "var(--border)", color: badSelected.includes(tag) ? "var(--pink-dk)" : "var(--text-sub)" }}>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setSubmitted(true)}
            disabled={rating === 0}
            className="w-full py-3 rounded-xl text-sm font-medium text-white disabled:opacity-40"
            style={{ background: "var(--pink)" }}>
            피드백 제출
          </button>
        </div>
      </div>
    </div>
  );
}
