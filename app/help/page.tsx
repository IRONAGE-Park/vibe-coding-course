import type { Metadata } from "next";
import Nav from "../components/Nav";
import { Blue, PageHero, Pager, SiteFooter } from "../components/ui";

export const metadata: Metadata = {
  title: "막혔을 때 | 바이브코딩과 함께 살아남기",
  description: "자주 나오는 문제와 해결법 — 10분 이상 혼자 고민하지 마세요.",
};

const FAQ = [
  {
    q: "AI가 만든 화면이 이상하게 깨져요",
    a: "당황하지 말고 “방금 수정을 되돌리고, ○○만 다시 바꿔줘”라고 하세요. git으로 관리 중이라면 “마지막 커밋 상태로 되돌려줘”도 됩니다.",
  },
  {
    q: "AI가 요청을 반만 반영해요",
    a: "요청을 쪼개세요. 3가지를 한 번에 시켰다면 1가지씩 나눠서 다시 요청하고, “나머지는 절대 바꾸지 마”를 붙이세요.",
  },
  {
    q: "대화가 길어져서 AI가 느려지고 엉뚱해져요",
    a: "새 세션을 여세요. 프로젝트 규칙을 CLAUDE.md에 적어뒀다면 새 세션에서도 Claude가 바로 맥락을 잡습니다. (5장의 CLAUDE.md 참고)",
  },
  {
    q: "팀원들과 어떻게 분업하나요?",
    a: "화면 단위로 나누세요 — A는 메인 페이지, B는 상세 페이지. 색상·글꼴 같은 스타일 기준만 먼저 합의하면 자연스럽게 이어집니다.",
  },
  {
    q: "진짜 데이터가 없어요",
    a: "프로토타입은 가짜 데이터로 충분합니다. “그럴듯한 예시 데이터 10개를 채워줘”라고 하세요. 부산에서 찍은 사진 속 실제 정보를 몇 개 섞으면 훨씬 진짜 같아집니다.",
  },
  {
    q: "배포가 실패해요 (Vercel에서 빨간불)",
    a: "실패한 배포를 눌러 로그 마지막 부분을 복사한 뒤, Claude에게 “배포가 이 에러로 실패했어. 고쳐줘”라고 붙여넣으세요. 대부분 한 번에 해결됩니다.",
  },
];

export default function HelpPage() {
  return (
    <div>
      <Nav />
      <PageHero
        num="Q"
        label="FAQ"
        title={
          <>
            <Blue>막혔을 때</Blue> — 먼저 여기를 보세요
          </>
        }
        sub={
          <>
            10분 이상 혼자 고민하지 마세요. 아래를 먼저 확인하고, 그래도 안
            되면 손을 들거나 Claude에게 상황을 그대로 붙여넣으세요.
          </>
        }
      />

      <main className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-12 md:px-8">
        {FAQ.map((item) => (
          <details
            key={item.q}
            className="group rounded-[20px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-6 shadow-[var(--s2-shadow-md)]"
          >
            <summary className="cursor-pointer list-none text-[16.5px] font-extrabold">
              <span className="font-mono mr-2 text-[var(--s2-blue)]">Q.</span>
              {item.q}
            </summary>
            <p className="mt-3 text-[14.5px] leading-[1.7] text-[var(--s2-body)]">
              {item.a}
            </p>
          </details>
        ))}
      </main>

      <Pager
        prev={{ href: "/tools", label: "05 유용한 도구들" }}
        next={{ href: "/", label: "홈 — 실습 목차" }}
      />
      <SiteFooter />
    </div>
  );
}
