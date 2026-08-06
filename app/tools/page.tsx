import type { Metadata } from "next";
import Nav from "../components/Nav";
import CopyBlock from "../components/CopyBlock";
import {
  Blue,
  Callout,
  CheckList,
  Ext,
  PageHero,
  Pager,
  Shot,
  SiteFooter,
  StepCard,
  Term,
} from "../components/ui";

export const metadata: Metadata = {
  title: "05 유용한 도구들 | 바이브코딩과 함께 살아남기",
  description:
    "CLAUDE.md, Skills, Harness, 프로젝트 참고와 뉴스, AI 에이전트 활용 — 다음 단계로 가는 다섯 가지.",
};

export default function ToolsPage() {
  return (
    <div>
      <Nav />
      <PageHero
        num="05"
        label="Chapter 05"
        title={
          <>
            앞으로 알아야 할 <Blue>유용한 도구들</Blue>
          </>
        }
        sub={
          <>
            오늘 배운 것은 시작일 뿐 — 바이브 코딩을 한 단계 끌어올리는 다섯
            가지 도구와 습관입니다.
          </>
        }
      />

      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-12 md:px-8">
        {/* 1. CLAUDE.md */}
        <StepCard
          no={1}
          title={
            <>
              CLAUDE.md — <Blue>프로젝트의 사용설명서</Blue>
            </>
          }
          intro={
            <>
              <b>1장 마지막에 붙여넣은 그 파일</b>입니다. 매 세션마다 Claude가
              자동으로 읽으니, 프로젝트가 자라면 규칙도 여기에 계속 더하면
              됩니다.
            </>
          }
        >
          <div className="flex flex-col gap-5">
            <Shot
              src="/captures/tools/claude-md-docs.png"
              width={1443}
              height={1922}
              alt="Claude Code 공식 문서 — 메모리"
              url="code.claude.com/docs/ko/memory"
              href="https://code.claude.com/docs/ko/memory"
            />
            <div className="flex flex-col gap-4">
              <CheckList
                items={[
                  <>
                    작업하다 <b>같은 지적을 두 번 하게 되면</b> — 그건
                    CLAUDE.md에 적을 규칙입니다
                  </>,
                  <>
                    <b className="font-mono text-[13.5px]">/init</b> 을 입력하면
                    Claude가 코드를 분석해 초안을 만들어줍니다
                  </>,
                  <>
                    <b className="font-mono text-[13.5px]">~/.claude/CLAUDE.md</b>{" "}
                    에 적으면 모든 프로젝트에 적용되는 나만의 전역 규칙이 됩니다
                  </>,
                ]}
              />
              <Term
                title="프로젝트가 자라면 이런 줄이 늘어납니다"
                lines={[
                  { text: "## 프로젝트 지식" },
                  { text: "- 공고 데이터는 app/data/ 에 있음" },
                  { text: "- 색상은 파란색 계열로 통일" },
                  { text: "- 날짜는 항상 '2026년 8월 6일' 형식으로 표시" },
                ]}
              />
            </div>
          </div>
        </StepCard>

        {/* 2. Skills */}
        <StepCard
          no={2}
          title={
            <>
              Skills — <Blue>명령어로 부르는 작업 절차</Blue>
            </>
          }
          intro={
            <>
              3장에서 쓴 <b className="font-mono text-[13.5px]">/goal</b> 처럼,{" "}
              <b className="font-mono">/</b> 로 부르는 명령어들입니다. 기본
              제공되는 것만 알아둬도 충분히 쓸 만합니다.
            </>
          }
        >
          <div className="flex flex-col gap-5">
            <Shot
              src="/captures/tools/claude-skills-docs.png"
              width={1443}
              height={1922}
              alt="Claude Code 공식 문서 — Skills"
              url="code.claude.com/docs/ko/skills"
              href="https://code.claude.com/docs/ko/skills"
            />
            <CheckList
              items={[
                <>
                  <b className="font-mono text-[13.5px]">/goal</b> — 완료 조건을
                  걸어두고 채워질 때까지 계속 작업하게 하기
                </>,
                <>
                  <b className="font-mono text-[13.5px]">/code-review</b> — 방금
                  만든 코드에서 문제될 부분을 훑어보기
                </>,
                <>
                  <b className="font-mono text-[13.5px]">/debug</b> — 오류가 날
                  때 원인을 찾아 고치기
                </>,
                <>
                  <b className="font-mono text-[13.5px]">/init</b> — CLAUDE.md
                  초안 자동 생성
                </>,
              ]}
            />
            <Callout title="목록은 / 만 눌러보면 나옵니다">
              외울 필요 없습니다. Claude Code 입력창에{" "}
              <b className="font-mono">/</b> 를 치면 지금 쓸 수 있는 명령어와
              설명이 전부 뜹니다 — 궁금한 건 눌러보면 됩니다.
            </Callout>
          </div>
        </StepCard>

        {/* 3. Harness */}
        <StepCard
          no={3}
          title={
            <>
              Harness — <Blue>AI에게 손발을 달아주는 틀</Blue>
            </>
          }
          intro={
            <>
              Claude Code가 똑똑한 이유는 모델이 전부가 아닙니다 — 모델을
              도구·권한·반복 루프로 감싼 <b>하네스(harness)</b> 덕분입니다.
            </>
          }
        >
          <div className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-6">
            <p className="font-mono mb-4 text-[12px] text-[var(--s2-faint)]">
              THE AGENT LOOP
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              {["내가 요청", "Claude가 판단", "도구 실행", "결과 확인"].map(
                (step, i, arr) => (
                  <span key={step} className="flex items-center gap-2.5">
                    <span className="rounded-full border border-[var(--s2-line)] bg-[var(--s2-card)] px-4 py-2 text-[13.5px] font-bold text-[var(--s2-strong)]">
                      {step}
                    </span>
                    {i < arr.length - 1 && (
                      <span className="font-mono text-[14px] text-[var(--s2-arrow)]">
                        -&gt;
                      </span>
                    )}
                  </span>
                )
              )}
              <span className="font-mono rounded-full bg-[var(--s2-blue-soft)] px-3.5 py-1.5 text-[12.5px] text-[var(--s2-blue)]">
                ↻ 끝날 때까지 반복
              </span>
            </div>
          </div>
          <CheckList
            items={[
              <>
                <b>도구</b> — 파일 읽기·쓰기, 터미널, 웹 검색을 Claude가 직접
                수행
              </>,
              <>
                <b>권한</b> —{" "}
                <b className="font-mono text-[13px]">Shift+Tab</b>으로 모드
                전환: 물어보고 실행 ↔ 계획만 ↔ 자동 실행
              </>,
              <>
                <b>확장</b> — MCP로 Slack·DB·GitHub 같은 외부 서비스도 도구로
                연결
              </>,
            ]}
          />
          <Callout title="왜 알아야 하나요?">
            같은 모델도 <b>어떤 하네스에 태우느냐</b>에 따라 결과가 완전히
            달라집니다. 잘 안 풀리면 &ldquo;모델이 멍청해서&rdquo;가 아니라{" "}
            <b>권한·도구·지시문</b>을 먼저 점검하세요.
          </Callout>
        </StepCard>

        {/* 4. 참고 & 뉴스 */}
        <StepCard
          no={4}
          title={
            <>
              다른 프로젝트 <Blue>참고</Blue>하고, 뉴스로 <Blue>따라잡기</Blue>
            </>
          }
          intro={
            <>
              잘 만든 코드를 읽는 가장 쉬운 방법 — 내려받아서 Claude에게
              설명시키기. 도구는 매달 바뀌니 소식도 구독하세요.
            </>
          }
        >
          <div className="flex flex-col gap-5">
            <Shot
              src="/captures/tools/github-trending.png"
              width={1443}
              height={1922}
              alt="GitHub Trending"
              url="github.com/trending"
              href="https://github.com/trending"
            />
            <div className="flex flex-col gap-4">
              <CopyBlock
                label="터미널 — 다른 프로젝트 내려받기"
                command="git clone https://github.com/유저/프로젝트.git"
              />
              <Term
                title="그 폴더에서 claude 실행 후"
                lines={[{ dim: true, text: "> 이 프로젝트 구조를 설명해줘." }]}
              />
              <CheckList
                items={[
                  <>
                    <Ext href="https://github.com/trending">
                      github.com/trending
                    </Ext>{" "}
                    — 요즘 뜨는 프로젝트 매주 구경
                  </>,
                  <>
                    <Ext href="https://www.anthropic.com/news">
                      anthropic.com/news
                    </Ext>{" "}
                    ·{" "}
                    <Ext href="https://code.claude.com/docs/ko/changelog">
                      Claude Code changelog
                    </Ext>{" "}
                    — 새 기능 소식
                  </>,
                ]}
              />
            </div>
          </div>
        </StepCard>

        {/* 5. AI Agent */}
        <StepCard
          no={5}
          title={
            <>
              코딩을 넘어 — <Blue>AI 에이전트</Blue>로 일상 업무까지
            </>
          }
          intro={
            <>
              Claude Code는 코딩 도구이기 전에 <b>일 시키는 도구</b>입니다 —
              오늘 배운 방식 그대로.
            </>
          }
        >
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                t: "데이터 분석",
                d: "“이 매출 엑셀 읽고 월별 요약 만들어줘” — CSV·JSON을 표와 리포트로.",
              },
              {
                t: "파일 정리",
                d: "“사진을 날짜별 폴더로 정리해줘” — 수백 개도 한 번에.",
              },
              {
                t: "업무 자동화",
                d: "매일 아침 리포트, 자료 조사 요약 — 예약 실행과 MCP 연결까지.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-[20px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-5 shadow-[var(--s2-shadow-md)]"
              >
                <p className="text-[16px] font-extrabold">{c.t}</p>
                <p className="mt-2 text-[13px] leading-[1.65] text-[var(--s2-body)]">
                  {c.d}
                </p>
              </div>
            ))}
          </div>
          <Callout title="오늘의 핵심을 한 문장으로">
            중요한 것은 <b>문제를 정확히 정의하고, 잘게 쪼개서, 명확하게 시키는
            능력</b> — 코딩 밖의 모든 일에도 똑같이 통합니다.
          </Callout>
        </StepCard>
      </main>

      <Pager
        prev={{ href: "/update", label: "04 업데이트 배포" }}
        next={{ href: "/help", label: "막혔을 때 — FAQ" }}
      />
      <SiteFooter />
    </div>
  );
}
