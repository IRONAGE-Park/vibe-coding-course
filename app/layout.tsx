import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "바이브 코딩 실습 가이드 | 경상국립대 × INVAIZ",
  description:
    "생성형 AI와 바이브 코딩으로 지역문제 해결 웹서비스 프로토타입을 만드는 실습 가이드. 환경 세팅부터 기획, 코딩, 배포까지.",
  openGraph: {
    title: "바이브 코딩 실습 가이드",
    description:
      "아이디어에서 배포까지 — 코딩 경험이 없어도 오늘 밤 나만의 웹서비스를 만들 수 있습니다.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
