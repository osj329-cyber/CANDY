import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "CANDY — AI 코디 추천",
  description: "오늘의 나를 완성하는 AI 스타일링 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${dmSans.variable} ${dmMono.variable} ${instrumentSerif.variable} h-full`}
    >
      <body className="min-h-full" style={{ fontFamily: "var(--font-dm-sans), 'Apple SD Gothic Neo', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
