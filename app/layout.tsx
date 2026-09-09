import type { Metadata } from "next";
import { cookies } from "next/headers";
import { THEME_COOKIE } from "./lib/theme";
import { Noto_Sans_KR, Fragment_Mono } from "next/font/google";
import "./globals.css";
import NameGate from "./components/NameGate";

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
  title: "바이브코딩과 함께 살아남기 | (주)인바이즈",
  description:
    "환경 설정부터 첫 배포, 업데이트 배포까지 — 화면 캡처를 따라 하나씩 진행하는 바이브 코딩 실습 가이드.",
  openGraph: {
    title: "바이브코딩과 함께 살아남기",
    description:
      "아이디어에서 배포까지 — 코딩 경험이 없어도 오늘 나만의 웹서비스를 만들 수 있습니다.",
    type: "website",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // 테마를 쿠키에서 읽어 서버에서 바로 심습니다.
  // 인라인 <script> 로 심으면 React 가 "클라이언트 렌더에서는 실행되지 않는다"고 경고하고,
  // next/script 도 결국 같은 <script> 태그를 렌더링해서 경고가 그대로 납니다.
  // 쿠키가 없으면 data-theme 을 붙이지 않고, 시스템 설정은 globals.css 의
  // prefers-color-scheme 블록이 처리합니다. 그래서 첫 페인트부터 깜빡임이 없습니다.
  const stored = (await cookies()).get(THEME_COOKIE)?.value;
  const theme = stored === "dark" || stored === "light" ? stored : undefined;
  return (
    <html
      lang="ko"
      data-theme={theme}
      data-scroll-behavior="smooth"
      className={`${notoSansKr.variable} ${fragmentMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="s2 min-h-full flex flex-col font-sans">
        <link
          rel="stylesheet"
          precedence="default"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {children}
        <NameGate />
      </body>
    </html>
  );
}
