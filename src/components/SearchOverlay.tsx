"use client";

import { useState, useEffect, useRef } from "react";

const SEARCH_DATA = [
  { type: "아이템", label: "화이트 오버핏 셔츠", sub: "COS · 상의", href: "/closet" },
  { type: "아이템", label: "와이드 슬랙스", sub: "무신사 스탠다드 · 하의", href: "/closet" },
  { type: "아이템", label: "베이지 트렌치코트", sub: "ZARA · 아우터", href: "/closet" },
  { type: "기능", label: "오늘의 코디 추천", sub: "홈 탭", href: "/home" },
  { type: "기능", label: "통합 스타일링", sub: "추천 탭", href: "/recommend" },
  { type: "기능", label: "쇼핑 연동", sub: "추천 탭", href: "/recommend" },
  { type: "트렌드", label: "린넨 셋업 룩", sub: "미니멀", href: "/home" },
  { type: "트렌드", label: "Y2K 데님 코디", sub: "스트리트", href: "/home" },
];

const RECENT = ["미니멀 코디", "화이트 셔츠", "봄 코디"];

type Props = { onClose: () => void };

export default function SearchOverlay({ onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const results = query.trim()
    ? SEARCH_DATA.filter((d) => d.label.includes(query) || d.sub.includes(query))
    : [];

  const typeColor: Record<string, string> = {
    아이템: "var(--purple)",
    기능: "var(--teal)",
    트렌드: "var(--pink)",
  };

  return (
    <div className="fixed inset-0 z-50 bg-[var(--bg)] flex flex-col max-w-[430px] mx-auto">
      {/* 검색 헤더 */}
      <div className="flex items-center gap-3 px-4 py-4 bg-[var(--card)] border-b border-[var(--border)]">
        <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-2xl" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
          <span className="text-[var(--text-sub)] text-sm">🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="아이템, 기능, 트렌드 검색..."
            className="flex-1 bg-transparent text-sm outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-[var(--text-sub)] text-xs">✕</button>
          )}
        </div>
        <button onClick={onClose} className="text-sm font-medium" style={{ color: "var(--pink)" }}>취소</button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* 최근 검색어 */}
        {!query && (
          <div className="mb-6">
            <p className="font-[var(--font-dm-mono)] text-[10px] uppercase tracking-wider text-[var(--text-sub)] mb-3">최근 검색어</p>
            <div className="flex flex-wrap gap-2">
              {RECENT.map((r) => (
                <button
                  key={r}
                  onClick={() => setQuery(r)}
                  className="px-3 py-1.5 rounded-full border text-sm"
                  style={{ borderColor: "var(--border)", color: "var(--text-sub)" }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 추천 검색어 */}
        {!query && (
          <div>
            <p className="font-[var(--font-dm-mono)] text-[10px] uppercase tracking-wider text-[var(--text-sub)] mb-3">인기 키워드</p>
            <div className="flex flex-wrap gap-2">
              {["봄 코디", "미니멀", "오피스룩", "데이트룩", "캐주얼"].map((k) => (
                <button key={k} onClick={() => setQuery(k)} className="px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{ background: "var(--pink-lt)", color: "var(--pink-dk)" }}>
                  {k}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 검색 결과 */}
        {query && results.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="font-[var(--font-dm-mono)] text-[10px] uppercase tracking-wider text-[var(--text-sub)] mb-1">
              검색 결과 {results.length}개
            </p>
            {results.map((item, i) => (
              <button
                key={i}
                onClick={onClose}
                className="flex items-center gap-3 p-4 rounded-2xl border text-left"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}
              >
                <span
                  className="font-[var(--font-dm-mono)] text-[9px] px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: typeColor[item.type] + "22", color: typeColor[item.type] }}
                >
                  {item.type}
                </span>
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-[var(--text-sub)]">{item.sub}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* 결과 없음 */}
        {query && results.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-16 gap-3">
            <span className="text-4xl">🔍</span>
            <p className="text-sm text-[var(--text-sub)]">"{query}"에 대한 결과가 없어요</p>
          </div>
        )}
      </div>
    </div>
  );
}
