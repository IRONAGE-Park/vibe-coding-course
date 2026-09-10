import type { Metadata } from "next";
import Nav from "../components/Nav";
import CopyBlock from "../components/CopyBlock";
import StepRail from "../components/StepRail";
import Tip from "../components/Tip";
import {
  Blue,
  Callout,
  CheckList,
  Ext,
  MiniSteps,
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

const TOTAL = 6;

const RAIL = [
  { id: "tools-1", num: "01", label: "Supabase 연동" },
  { id: "tools-2", num: "02", label: "CLAUDE.md" },
  { id: "tools-3", num: "03", label: "Skills" },
  { id: "tools-4", num: "04", label: "Harness" },
  { id: "tools-5", num: "05", label: "참고 & 뉴스" },
  { id: "tools-6", num: "06", label: "AI 에이전트" },
];

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

      <StepRail items={RAIL} />

      <main className="mx-auto w-full flex max-w-5xl flex-col gap-8 px-5 py-12 md:px-8">
        {/* 1. Supabase 연동 */}
        <StepCard
          no={1}
          total={TOTAL}
          id="tools-1"
          title={
            <>
              Supabase 연동 — <Blue>데이터를 저장하고 싶을 때</Blue>
            </>
          }
          intro={
            <>
              새로고침해도 <b>남아야 하는 정보</b>(글·신청·후기)가 생기면
              데이터베이스가 필요합니다.
            </>
          }
        >
          <p className="text-[14.5px] leading-[1.65] text-[var(--s2-body)]">
            <b>필수는 아닙니다.</b> 보여주기만 하는 서비스라면 건너뛰고,{" "}
            <b>저장이 필요할 때</b>만 붙이세요.
          </p>

          <div className="flex flex-col gap-5">
            <p className="text-[15px] font-extrabold">
              ① <Blue>조직(Organization)</Blue> 만들기
            </p>
            <Shot
              src="/captures/supabase/1-organizations.png"
              width={2894}
              height={560}
              alt="Supabase 조직 목록 화면 — 오른쪽 위 New organization 버튼"
              url="supabase.com/dashboard/organizations"
              href="https://supabase.com/dashboard/organizations"
              highlight={{
                top: "45%",
                left: "71%",
                width: "8%",
                height: "6.5%",
                label: "여기서 시작",
              }}
            />
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              조직은 <b>프로젝트를 담는 상자</b>입니다. 팀 이름이나 수업
              이름으로 하나 만들어 두면 됩니다.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-[15px] font-extrabold">
              ② 이름과 <Blue>Free 플랜</Blue> 선택
            </p>
            <Shot
              src="/captures/supabase/2-new-organization.png"
              width={2894}
              height={830}
              alt="새 조직 만들기 폼 — 이름, 유형, 플랜"
              url="supabase.com/dashboard/new"
            />
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              Type은 <b>Personal</b>, Plan은 <b>Free - $0/month</b> 그대로 두고{" "}
              <b>Create organization</b>. 카드 등록이 필요 없습니다.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-[15px] font-extrabold">
              ③ <Blue>프로젝트</Blue> 만들기 — 여기가 진짜 데이터베이스
            </p>
            <Shot
              src="/captures/supabase/3-new-project.png"
              width={2894}
              height={1560}
              alt="새 프로젝트 만들기 — 이름, 데이터베이스 비밀번호, 리전"
              url="supabase.com/dashboard/new/..."
            />
            <MiniSteps
              items={[
                <>
                  <b>Project name</b> — 내 저장소와 같은 이름으로 두면 헷갈리지
                  않습니다.
                </>,
                <>
                  <b>Database password</b> — <b>Generate a password</b>를 눌러
                  자동 생성하고, 나온 값을 <b>따로 저장</b>해 두세요. (나중에
                  재설정도 가능합니다)
                </>,
                <>
                  <b>Region</b> — 한국 사용자라면 <b>Northeast Asia (Seoul 또는
                  Tokyo)</b>가 가장 빠릅니다.
                </>,
                <>
                  <b>Create new project</b>를 누르면 1~2분 뒤 준비됩니다.
                </>,
              ]}
            />
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-[15px] font-extrabold">
              ④ <Blue>Healthy</Blue>가 뜨면 준비 완료
            </p>
            <Shot
              src="/captures/supabase/4-project-created.png"
              width={2894}
              height={1300}
              alt="생성된 Supabase 프로젝트 대시보드 — 상태 Healthy"
              url="supabase.com/dashboard/project/..."
            />
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              <b>STATUS: Healthy</b>면 내 전용 데이터베이스가 켜진 것입니다.
              표를 만들고 싶으면 왼쪽 <b>Table Editor</b>에서 엑셀처럼 만들 수
              있어요.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-[15px] font-extrabold">
              ⑤ <Blue>Vercel과 연결</Blue> — 환경 변수 자동 동기화
            </p>
            <Shot
              src="/captures/supabase/5-vercel-integration.png"
              width={2894}
              height={1450}
              alt="Supabase 프로젝트 설정의 Integrations — Install Vercel integration"
              url="Project Settings → Integrations"
              highlight={{
                top: "55.5%",
                left: "52.5%",
                width: "10.5%",
                height: "3.2%",
                label: "여기 클릭",
              }}
            />
            <Shot
              src="/captures/supabase/7-vercel-marketplace.png"
              width={2894}
              height={420}
              alt="Vercel 마켓플레이스의 Supabase 통합 페이지 — 왼쪽 위 Install 버튼"
              url="vercel.com/integrations/supabase"
              href="https://vercel.com/integrations/supabase"
              highlight={{
                top: "42%",
                left: "63.5%",
                width: "4.5%",
                height: "12%",
                label: "Install",
              }}
            />
            <Callout title="연결해 두면 키를 옮겨 적지 않아도 됩니다">
              <b>Install</b> → Vercel 로그인 → 프로젝트 선택. 환경 변수가
              자동으로 채워지고 최신으로 유지됩니다.
            </Callout>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-[15px] font-extrabold">
              ⑥ 내 서비스에 붙이기 — <Blue>Connect</Blue> 버튼
            </p>
            <Shot
              src="/captures/supabase/6-connect-app.png"
              width={1346}
              height={1731}
              alt="Connect 대화상자 — Next.js App Router용 설치 명령과 환경 변수"
              url="상단 Connect → Framework → Next.js"
            />
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              위쪽 <b>Connect</b>를 누르고 <b>Framework → Next.js</b>를 고르면,
              내 프로젝트에 그대로 붙여넣을 <b>설치 명령과 환경 변수</b>가
              나옵니다. 오른쪽 위 <b>Copy prompt</b>를 눌러 <b>Claude에게 통째로
              붙여넣으면</b> 알아서 연결해 줍니다.
            </p>
            <CopyBlock
              label="Claude Code에 이렇게 시키면 됩니다"
              command="Supabase Connect 화면에서 복사한 내용이야. 이 프로젝트에 Supabase를 연결해줘."
            />
          </div>

          <Callout tone="warn" title="키는 코드에 직접 쓰지 마세요">
            주소와 키는 반드시{" "}
            <code className="font-mono text-[13px]">.env.local</code> 파일에
            넣습니다 — 1장에서 붙여넣은 CLAUDE.md에도 적어둔 규칙이에요. 이
            파일은 GitHub에 올라가지 않으니, <b>Vercel에는 프로젝트 설정의
            Environment Variables</b>에 같은 값을 넣어주면 됩니다. (⑤번 연동을
            해두면 이것도 자동입니다)
          </Callout>
        </StepCard>

        {/* 2. CLAUDE.md */}
        <StepCard
          no={2}
          total={TOTAL}
          id="tools-2"
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
                    <b>무엇을 적나</b> — 명령어 · 규칙 · 폴더 구조 · Claude가 자주
                    틀리는 것. <b>한 페이지 이내</b>로
                  </>,
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

        {/* 3. Skills */}
        <StepCard
          no={3}
          total={TOTAL}
          id="tools-3"
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
            <div className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-5">
              <p className="text-[15px] font-extrabold">
                유명 서비스의 <Blue>디자인 시스템</Blue>을 가져다 쓰기
              </p>
              <p className="mt-1.5 text-[14px] leading-[1.65] text-[var(--s2-body)]">
                <Ext href="https://getdesign.md/">getdesign.md</Ext> 는 Stripe ·
                Vercel · Linear · Apple · Airbnb 같은 서비스의 색 · 글꼴 · 간격 ·
                컴포넌트 규칙을{" "}
                <Tip tip="AI 코딩 에이전트가 읽기 좋게 디자인 규칙을 정리한 마크다운 파일. 프로젝트 맨 위 폴더에 두면 Claude Code · Codex가 그 규칙대로 화면을 만듭니다.">
                  DESIGN.md
                </Tip>{" "}
                파일로 모아 둔 곳입니다(원본:{" "}
                <Ext href="https://github.com/VoltAgent/awesome-design-md">
                  awesome-design-md
                </Ext>
                ). 마음에 드는 파일을 내 프로젝트 맨 위 폴더에 넣고 이렇게
                시키면 됩니다.
              </p>
              <div className="mt-3">
                <CopyBlock
                  label="Claude Code에 입력"
                  command="DESIGN.md 의 색 · 글꼴 · 컴포넌트 규칙대로 지금 화면을 다시 꾸며줘. 기능은 건드리지 마"
                />
              </div>
            </div>
            <Callout title="목록은 / 만 눌러보면 나옵니다">
              외울 필요 없습니다. Claude Code 입력창에{" "}
              <b className="font-mono">/</b> 를 치면 지금 쓸 수 있는 명령어와
              설명이 전부 뜹니다 — 궁금한 건 눌러보면 됩니다.
            </Callout>
            <Callout title="테스트까지 스킬에게 — computer-use & orca-cli">
              <b className="font-mono text-[13.5px]">computer-use</b> ·{" "}
              <b className="font-mono text-[13.5px]">orca-cli</b> 스킬을 쓰면
              Claude가 <b>브라우저를 직접 열고 눌러 보며</b> 테스트합니다 —
              &ldquo;방금 만든 버튼, 직접 눌러서 확인해줘&rdquo;.
            </Callout>
          </div>
        </StepCard>

        {/* 4. Harness */}
        <StepCard
          no={4}
          total={TOTAL}
          id="tools-4"
          title={
            <>
              Harness — <Blue>AI에게 손발을 달아주는 틀</Blue>
            </>
          }
          intro={
            <>
              Claude Code가 똑똑한 건 모델만의 힘이 아니라, 모델을
              도구·권한·반복 루프로 감싼{" "}
              <Tip tip="말에 씌우는 마구처럼, AI 모델에 도구 · 권한 · 반복 실행을 달아 실제로 일하게 만드는 틀. Claude Code 자체가 하나의 하네스입니다.">
                하네스(harness)
              </Tip>{" "}
              덕분입니다.
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
              <>
                <Tip tip="Claude가 행동하기 직전에 매번 실행되는 검사. CLAUDE.md와 스킬은 권고라 가끔 놓치지만, 훅은 막거나 승인을 요구합니다. 설정은 .claude/settings.json 에.">
                  훅(hooks)
                </Tip>{" "}
                — &lsquo;반드시&rsquo; 지킬 규칙을 거는 자리. 예) 실서비스 배포 전
                확인, 비밀 키 파일 수정 금지
              </>,
            ]}
          />
          <Callout title="잘 안 풀릴 때">
            모델 탓보다 <b>권한·도구·지시문</b>을 먼저 점검하세요.
          </Callout>
        </StepCard>

        {/* 5. 참고 & 뉴스 */}
        <StepCard
          no={5}
          total={TOTAL}
          id="tools-5"
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
                  <>
                    <Ext href="https://claude.com/blog/the-ai-native-sdlc-playbook">
                      The AI-Native SDLC Playbook
                    </Ext>{" "}
                    ·{" "}
                    <Ext href="https://academy.claude.com/ko/courses/ai-native-sdlc-playbook/introduction">
                      Claude Academy 코스(한국어)
                    </Ext>{" "}
                    — 오늘 따라 한 개발 주기의 원본
                  </>,
                ]}
              />
            </div>
          </div>
        </StepCard>

        {/* 6. AI Agent */}
        <StepCard
          no={6}
          total={TOTAL}
          id="tools-6"
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
