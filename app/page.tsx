import Link from "next/link";
import Nav from "./components/Nav";
import SdlcLoop from "./components/SdlcLoop";
import { Badge, Blue, Ext, Pill, SiteFooter } from "./components/ui";

const CHAPTERS = [
  {
    href: "/setup",
    num: "01",
    title: "환경 설정",
    desc: "Node.js · Claude Code · GitHub · Vercel — 도구 7가지 설치와 가입",
  },
  {
    href: "/plan",
    num: "02",
    title: "문제 정의",
    desc: "AI에게 인터뷰받으며 문제를 좁히고 intent.md · spec.md 두 문서로 시작하기",
  },
  {
    href: "/build",
    num: "03",
    title: "초기 구축 · 첫 배포",
    desc: "Claude Code로 만들고 GitHub에 올려 Vercel로 세상에 공개",
  },
  {
    href: "/update",
    num: "04",
    title: "업데이트 배포",
    desc: "고치고 푸시하면 자동 반영 — 수정·롤백 사이클",
  },
  {
    href: "/learn",
    num: "05",
    title: "배우는 법",
    desc: "모니터링으로 지켜보고, 사용자 인터뷰로 듣고, 배운 것으로 강화하는 매주의 루프",
  },
  {
    href: "/tools",
    num: "06",
    title: "유용한 도구들",
    desc: "CLAUDE.md · Skills · Harness — 다음 단계로 가는 도구",
  },
];

export default function Home() {
  return (
    <div>
      <Nav />

      {/* ── 커버 ───────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="mx-auto w-full max-w-5xl px-5 pb-16 pt-16 md:px-8 md:pb-20 md:pt-24">
          <Pill>(주)인바이즈</Pill>
          <h1 className="mt-7 text-[38px] font-black leading-[1.2] tracking-[-0.03em] md:text-[64px]">
            <span className="inline-block -rotate-1.5 rounded-[10px] bg-[var(--s2-blue)] px-4 pb-1.5 text-[var(--s2-on-blue)] md:px-6 md:pb-2">
              바이브코딩
            </span>
            과 함께
            <br />
            살아남기
          </h1>
          <p className="mt-6 max-w-2xl text-[16.5px] leading-[1.65] text-[var(--s2-body)] md:text-[18px]">
            코딩을 몰라도 오늘 나만의 서비스가 생깁니다. 환경 설정부터 첫 배포,
            업데이트까지 — 화면 캡처를 그대로 따라 하면 됩니다.
          </p>
          <div className="mt-9">
            <Link
              href="/setup"
              className="inline-block rounded-full bg-[var(--s2-blue)] px-7 py-3.5 text-[15px] font-bold text-[var(--s2-on-blue)] transition-transform hover:-translate-y-0.5"
            >
              환경 설정부터 시작하기 →
            </Link>
          </div>
        </div>
        <span
          aria-hidden
          className="font-mono pointer-events-none absolute -bottom-14 right-2 select-none text-[180px] leading-none tracking-[-0.05em] text-[var(--s2-ghost)] md:text-[260px]"
        >
          GO
        </span>
      </section>

      {/* ── 개발 주기 ──────────────────────────────────── */}
      <section className="border-t border-[var(--s2-line)]">
        <div className="mx-auto w-full max-w-5xl px-5 py-14 md:px-8">
          <Badge>AI 네이티브 개발 주기</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            코드는 더 이상 병목이 아닙니다 — 이 강의는{" "}
            <Blue>여섯 단계 루프</Blue>를 한 바퀴 돕니다
          </h2>
          <p className="mt-3 text-[15px] leading-[1.7] text-[var(--s2-body)]">
            단계마다 AI가 <b>문서(.md)</b>를 만들고 다음 단계가 그 문서를
            읽습니다. 사람은 루프 <b>위</b>에서 시작하고, 방향을 정하고,
            승인합니다.
          </p>
          <div className="mt-6">
            <SdlcLoop />
          </div>
          <p className="mt-4 text-[13px] leading-[1.65] text-[var(--s2-gray)]">
            출처 —{" "}
            <Ext href="https://claude.com/blog/the-ai-native-sdlc-playbook">
              The AI-Native SDLC Playbook
            </Ext>{" "}
            ·{" "}
            <Ext href="https://academy.claude.com/ko/courses/ai-native-sdlc-playbook/introduction">
              Claude Academy 코스
            </Ext>
          </p>
        </div>
      </section>

      {/* ── 챕터 목차 ──────────────────────────────────── */}
      <section className="border-t border-[var(--s2-line)] bg-[var(--s2-tint)]">
        <div className="mx-auto w-full max-w-5xl px-5 py-14 md:px-8">
          <div className="flex flex-col gap-4">
            {CHAPTERS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group flex items-center gap-5 rounded-[20px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-6 shadow-[var(--s2-shadow-md)] transition-all hover:-translate-y-0.5 hover:border-[var(--s2-blue)]"
              >
                <span className="font-mono text-[22px] font-bold text-[var(--s2-blue)]">
                  {c.num}
                </span>
                <span className="flex-1">
                  <span className="block text-[18px] font-extrabold group-hover:text-[var(--s2-blue)]">
                    {c.title}
                  </span>
                  <span className="mt-1 block text-[14px] leading-[1.6] text-[var(--s2-body)]">
                    {c.desc}
                  </span>
                </span>
                <span className="font-mono hidden shrink-0 text-[15px] text-[var(--s2-arrow)] group-hover:text-[var(--s2-blue)] sm:block">
                  -&gt;
                </span>
              </Link>
            ))}
            <Link
              href="/help"
              className="group flex items-center gap-5 rounded-[20px] border-2 border-dashed border-[var(--s2-line)] bg-[var(--s2-card)]/60 p-5 transition-colors hover:border-[var(--s2-blue)]"
            >
              <span className="text-[20px]">🙋</span>
              <span className="flex-1 text-[15.5px] font-extrabold group-hover:text-[var(--s2-blue)]">
                막혔을 때 — 자주 나오는 문제 모음
              </span>
              <span className="font-mono text-[15px] text-[var(--s2-arrow)]">-&gt;</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
