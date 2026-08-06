import type { Metadata } from "next";
import { Noto_Sans_KR, Fragment_Mono } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const fragmentMono = Fragment_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fragment-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "바이브코딩과 함께 살아남기 | 경상대학교 X (주)인바이즈",
  description:
    "환경 설정부터 첫 배포, 업데이트 배포까지 — 화면 캡처를 따라 하나씩 진행하는 바이브 코딩 실습 가이드.",
  openGraph: {
    title: "바이브코딩과 함께 살아남기",
    description:
      "아이디어에서 배포까지 — 코딩 경험이 없어도 오늘 나만의 웹서비스를 만들 수 있습니다.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      // 아래 인라인 스크립트가 하이드레이션 전에 data-theme을 심습니다
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${notoSansKr.variable} ${fragmentMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="s2 min-h-full flex flex-col font-sans">
        {/* 첫 페인트 전에 테마를 결정해 화면 깜빡임을 막습니다 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})()`,
          }}
        />
        <link
          rel="stylesheet"
          precedence="default"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {children}
      </body>
    </html>
  );
}
