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
  title: "06 유용한 도구들 | 바이브코딩과 함께 살아남기",
  description:
    "CLAUDE.md, Skills, Harness, 프로젝트 참고와 뉴스, AI 에이전트 활용, 테스트 자동화 — 다음 단계로 가는 도구와 습관.",
};

const TOTAL = 7;

const RAIL = [
  { id: "tools-1", num: "01", label: "Supabase 연동" },
  { id: "tools-2", num: "02", label: "CLAUDE.md" },
  { id: "tools-3", num: "03", label: "Skills" },
  { id: "tools-4", num: "04", label: "Harness" },
  { id: "tools-5", num: "05", label: "참고 & 뉴스" },
  { id: "tools-6", num: "06", label: "AI 에이전트" },
  { id: "tools-7", num: "07", label: "테스트 자동화" },
];

/* 테스트 자동화로 어디까지 확인할 수 있는지 — 아래로 갈수록 넓어집니다 */
const TEST_LADDER = [
  {
    t: "빌드가 되는가",
    tool: "npm run build",
    d: "문법 · 타입 오류를 잡습니다. 1장 CLAUDE.md의 ‘완료 전에 확인’이 바로 이 단계 — 이미 하고 있어요.",
  },
  {
    t: "계산이 맞는가",
    tool: "단위 테스트 (Vitest 등)",
    d: "가격 계산 · 날짜 변환처럼 입력과 결과가 정해진 기능을 수백 가지 경우로 몇 초 만에 확인합니다.",
  },
  {
    t: "사용자 흐름이 되는가",
    tool: "Playwright 테스트 코드",
    d: "가입 → 글쓰기 → 저장 → 목록에 보이기. 사람이 하던 순서를 코드로 남겨, 여러 브라우저 · 휴대폰 화면 크기에서 매번 똑같이 돌립니다.",
  },
  {
    t: "처음 온 사람처럼 써 보면",
    tool: "Playwright MCP · Orca CLI · Claude in Chrome",
    d: "스크립트 없이 “처음 온 사용자처럼 둘러보고 이상한 점을 알려줘”. 깨진 화면 · 콘솔 오류 · 헷갈리는 버튼을 스크린샷과 함께 찾아옵니다.",
  },
  {
    t: "브라우저 밖까지",
    tool: "computer-use",
    d: "데스크톱 앱 · 파일 선택 창 · 휴대폰 시뮬레이터처럼 화면에 보이는 것이면 무엇이든 직접 눌러 봅니다.",
  },
  {
    t: "사람 없이 매번",
    tool: "/goal · 훅 · GitHub Actions",
    d: "“테스트가 모두 통과할 때까지”를 완료 조건으로 걸거나, 푸시할 때마다 자동으로 돌려 깨진 코드가 배포되기 전에 막습니다.",
  },
];

export default function ToolsPage() {
  return (
    <div>
      <Nav />
      <PageHero
        num="06"
        label="Chapter 06"
        title={
          <>
            앞으로 알아야 할 <Blue>유용한 도구들</Blue>
          </>
        }
        sub={
          <>
            오늘 배운 것은 시작일 뿐 — 바이브 코딩을 한 단계 끌어올리는 도구와
            습관, 그리고 마지막으로 AI가 스스로 확인하게 만드는{" "}
            <b>테스트 자동화</b>입니다.
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
              ① <Blue>GitHub 계정으로</Blue> 가입
            </p>
            <Shot
              src="/captures/setup/supabase-signup.png"
              width={1443}
              height={1922}
              alt="Supabase 가입 화면"
              url="supabase.com/dashboard/sign-up"
              href="https://supabase.com/dashboard/sign-up"
              highlight={{
                top: "35.8%",
                left: "29%",
                width: "42%",
                height: "3.8%",
                label: "GitHub으로 가입!",
              }}
            />
            <MiniSteps
              items={[
                <>
                  <Ext href="https://supabase.com/dashboard/sign-up">
                    supabase.com/dashboard/sign-up
                  </Ext>{" "}
                  접속 — 이미 계정이 있다면 ②로 넘어가세요.
                </>,
                <>
                  이메일 가입 대신 <b>Continue with GitHub</b> →{" "}
                  <b>Authorize</b>. 1장의 Vercel과 같은 방법입니다.
                </>,
                <>
                  확인:{" "}
                  <Ext href="https://supabase.com/dashboard">
                    supabase.com/dashboard
                  </Ext>
                  가 열리면 성공.
                </>,
              ]}
            />
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-[15px] font-extrabold">
              ② <Blue>조직(Organization)</Blue> 만들기
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
              ③ 이름과 <Blue>Free 플랜</Blue> 선택
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
              ④ <Blue>프로젝트</Blue> 만들기 — 여기가 진짜 데이터베이스
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
              ⑤ <Blue>Healthy</Blue>가 뜨면 준비 완료
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
              ⑥ <Blue>Vercel과 연결</Blue> — 환경 변수 자동 동기화
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
              ⑦ 내 서비스에 붙이기 — <Blue>Connect</Blue> 버튼
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
            Environment Variables</b>에 같은 값을 넣어주면 됩니다. (⑥번 연동을
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
              &ldquo;방금 만든 버튼, 직접 눌러서 확인해줘&rdquo;. 설치 방법과
              어디까지 되는지는 마지막 <b>07 테스트 자동화</b>에서 다룹니다.
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

        {/* 7. 테스트 자동화 */}
        <StepCard
          no={7}
          total={TOTAL}
          id="tools-7"
          title={
            <>
              테스트 자동화 — <Blue>AI가 스스로 확인하게</Blue>
            </>
          }
          intro={
            <>
              Claude는 <b>&lsquo;다 된 것 같을 때&rsquo;</b> 멈춥니다. 확인할
              방법을 쥐여 주면, <b>통과할 때까지 스스로 고칩니다</b>.
            </>
          }
        >
          {/* ① 왜 중요한가 */}
          <div className="flex flex-col gap-4">
            <p className="text-[15px] font-extrabold">
              ① 왜 중요한가 — <Blue>코드가 빨리 바뀔수록</Blue>
            </p>
            <p className="text-[14.5px] leading-[1.7] text-[var(--s2-body)]">
              바이브 코딩에서는 코드가 몇 분 만에 바뀝니다. 만드는 속도가
              빨라진 만큼, <b>제대로 됐는지 확인하는 일</b>이 가장 느린 단계가
              됐어요.{" "}
              <Ext href="https://code.claude.com/docs/en/best-practices">
                Claude Code 공식 가이드
              </Ext>
              도 가장 효과가 큰 습관으로 이것을 꼽습니다 —{" "}
              <b>확인할 수 없다면, 배포하지 마세요.</b>
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[16px] border border-[var(--s2-bad-line)] bg-[var(--s2-bad-bg)] p-5">
                <p className="mb-2 text-[14.5px] font-extrabold text-[var(--s2-bad-ink)]">
                  확인 방법이 없으면
                </p>
                <ul className="flex list-disc flex-col gap-1.5 pl-5 text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
                  <li>
                    확인하는 사람이 <b>나</b>입니다 — 모든 실수가 내가 발견할
                    때까지 기다립니다
                  </li>
                  <li>기능이 10개면, 고칠 때마다 10개를 다시 눌러 봐야 합니다</li>
                  <li>
                    어제 되던 것이 오늘 조용히 깨집니다(
                    <Tip tip="고친 곳과 상관없어 보이던 기존 기능이 망가지는 것. 기능이 많아질수록 자주, 조용히 일어납니다.">
                      회귀
                    </Tip>
                    )
                  </li>
                </ul>
              </div>
              <div className="rounded-[16px] border border-[var(--s2-good-line)] bg-[var(--s2-good-bg)] p-5">
                <p className="mb-2 text-[14.5px] font-extrabold text-[var(--s2-good-ink)]">
                  확인 방법이 있으면
                </p>
                <ul className="flex list-disc flex-col gap-1.5 pl-5 text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
                  <li>
                    AI가 <b>만들고 → 확인하고 → 고치기</b>를 혼자 반복합니다
                  </li>
                  <li>전체 기능 점검이 명령 한 줄, 몇 분이면 끝납니다</li>
                  <li>
                    &ldquo;됐어요&rdquo; 대신 <b>테스트 결과 · 스크린샷</b>이라는
                    증거를 받습니다
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* ② 자동화하면 얻는 것 */}
          <div className="flex flex-col gap-4">
            <p className="text-[15px] font-extrabold">
              ② 자동화하면 <Blue>얻는 것</Blue>
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  t: "혼자 끝내는 AI",
                  d: "실패하면 원인을 읽고 고친 뒤 다시 돌립니다. 위 04 Harness의 에이전트 루프에 ‘확인’이 들어가는 순간입니다.",
                },
                {
                  t: "겁 없이 고치기",
                  d: "고친 뒤 전체 테스트가 통과하면 다른 기능이 안 깨졌다는 뜻. 큰 수정도 안심하고 맡길 수 있습니다.",
                },
                {
                  t: "시간이 남는다",
                  d: "30번 누르던 확인이 명령 한 줄. 푸시할 때마다, 내가 자는 동안에도 돌릴 수 있습니다.",
                },
                {
                  t: "말 대신 증거",
                  d: "테스트 결과 · 스크린샷 · 녹화로 확인합니다. 다시 해 볼 필요 없이 결과만 보면 되니 검토가 빨라집니다.",
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
            <Callout title="설정 없이 오늘 바로 — /verify">
              Claude Code에 기본으로 들어 있는{" "}
              <b className="font-mono text-[13.5px]">/verify</b> 는 앱을 직접
              빌드 · 실행해서 <b>방금 바꾼 것이 정말 되는지</b> 확인합니다.
              아래 도구를 붙이기 전에 먼저 눌러 보세요.
            </Callout>
          </div>

          {/* ③ 세 가지 도구 */}
          <div className="flex flex-col gap-4">
            <p className="text-[15px] font-extrabold">
              ③ 세 가지 도구 — <Blue>무엇으로 확인시킬까</Blue>
            </p>

            {/* Playwright */}
            <div className="rounded-[20px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-5 shadow-[var(--s2-shadow-md)] md:p-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <p className="text-[17px] font-extrabold">Playwright</p>
                <span className="rounded-full bg-[var(--s2-blue-soft)] px-2.5 py-0.5 text-[12px] font-bold text-[var(--s2-blue)]">
                  한 번 적어 두고 매번 돌리기
                </span>
              </div>
              <p className="mt-2 text-[14px] leading-[1.65] text-[var(--s2-body)]">
                사용자가 할 행동(열기 → 입력 → 클릭 → 확인)을{" "}
                <b>테스트 코드</b>로 적어 두면, 매번 똑같이 몇 초 만에 다시
                돌립니다. 크롬 · 파이어폭스 · 사파리 계열 엔진과 휴대폰 화면
                크기까지 한 번에 확인합니다.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <CopyBlock
                  label="터미널 — Claude가 브라우저를 직접 쓰게 연결 (Playwright MCP)"
                  command="claude mcp add playwright npx @playwright/mcp@latest"
                />
                <CopyBlock
                  label="프로젝트 폴더에서 — 테스트를 계획 · 작성 · 수리하는 에이전트 설치"
                  command="npx playwright init-agents --loop=claude"
                />
                <p className="text-[13px] leading-[1.6] text-[var(--s2-body)]">
                  두 번째 명령은 <b>planner</b>(무엇을 테스트할지 계획) ·{" "}
                  <b>generator</b>(테스트 코드 작성) · <b>healer</b>(화면이 바뀌어
                  깨진 테스트 수리) 세 에이전트를 넣어 줍니다 —{" "}
                  <Ext href="https://playwright.dev/docs/test-agents">
                    Playwright Test Agents
                  </Ext>
                </p>
              </div>
            </div>

            {/* Orca CLI */}
            <div className="rounded-[20px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-5 shadow-[var(--s2-shadow-md)] md:p-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <p className="text-[17px] font-extrabold">Orca CLI</p>
                <span className="rounded-full bg-[var(--s2-blue-soft)] px-2.5 py-0.5 text-[12px] font-bold text-[var(--s2-blue)]">
                  이미 쓰는 Orca의 브라우저로
                </span>
              </div>
              <p className="mt-2 text-[14px] leading-[1.65] text-[var(--s2-body)]">
                실습에서 쓴 Orca에는 작업마다 <b>진짜 크롬(Chromium) 창</b>이
                붙어 있습니다. <b>orca-cli</b> 스킬을 설치하면 에이전트가 그
                브라우저를 열고 · 읽고 · 누르고 · 입력하고 · 캡처합니다.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <CopyBlock
                  label="터미널 — orca-cli 스킬 설치"
                  command="npx skills add https://github.com/stablyai/orca --skill orca-cli --global"
                />
                <p className="text-[13px] leading-[1.6] text-[var(--s2-body)]">
                  먼저 Orca <b>설정 → General → Orca CLI</b>에서 명령어 등록을
                  켜 주세요. 설치하면 에이전트가 이런 명령으로 브라우저를
                  다룹니다(직접 칠 필요는 없습니다).
                </p>
                <Term
                  title="에이전트가 쓰는 Orca CLI"
                  lines={[
                    { text: "orca goto --url http://localhost:3000" },
                    { dim: true, text: "# 화면의 버튼 · 입력칸 목록을 읽기 (@e1, @e3 …)" },
                    { text: "orca snapshot" },
                    { text: "orca fill --element @e1 --value \"홍길동\"" },
                    { text: "orca click --element @e3" },
                    { dim: true, text: "# 휴대폰 화면으로 바꿔서 캡처" },
                    { text: "orca set device --name \"iPhone 12\"" },
                    { text: "orca screenshot" },
                  ]}
                />
                <p className="text-[12.5px] text-[var(--s2-faint)]">
                  자세한 명령은{" "}
                  <Ext href="https://www.onorca.dev/docs/cli/overview">
                    Orca CLI 문서
                  </Ext>
                </p>
              </div>
            </div>

            {/* computer-use */}
            <div className="rounded-[20px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-5 shadow-[var(--s2-shadow-md)] md:p-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <p className="font-mono text-[16px] font-extrabold">computer-use</p>
                <span className="rounded-full bg-[var(--s2-blue-soft)] px-2.5 py-0.5 text-[12px] font-bold text-[var(--s2-blue)]">
                  화면 전체를 사람처럼
                </span>
              </div>
              <p className="mt-2 text-[14px] leading-[1.65] text-[var(--s2-body)]">
                브라우저 안만이 아니라 <b>화면 전체</b>를 보고 마우스 · 키보드로
                조작합니다. 데스크톱 앱, 파일 선택 창, 휴대폰 시뮬레이터처럼 다른
                도구가 닿지 않는 곳까지 확인할 수 있습니다.
              </p>
              <div className="mt-4">
                <CheckList
                  items={[
                    <>
                      <b>Orca</b> — 같은 스킬 목록의{" "}
                      <b className="font-mono text-[13px]">computer-use</b> 스킬
                      (설치는 위 명령에서{" "}
                      <b className="font-mono text-[13px]">--skill computer-use</b>
                      )
                    </>,
                    <>
                      <b>Claude Code</b> — macOS 터미널에서{" "}
                      <b className="font-mono text-[13px]">/mcp</b> →{" "}
                      <b className="font-mono text-[13px]">computer-use</b> →
                      Enable (Pro · Max 요금제, 미리보기 기능). Windows는 Claude
                      데스크톱 앱 설정에서 켭니다 —{" "}
                      <Ext href="https://code.claude.com/docs/en/computer-use">
                        공식 문서
                      </Ext>
                    </>,
                  ]}
                />
              </div>
              <div className="mt-4">
                <Callout tone="warn" title="가장 넓지만, 가장 느린 방법">
                  내 컴퓨터 화면을 직접 움직이고, 한 동작마다 화면을 보고
                  판단하느라 느립니다. 그래서 Claude도{" "}
                  <b>MCP → 터미널 → 브라우저 도구</b>를 먼저 쓰고, 그걸로 안 될
                  때만 씁니다. 웹 서비스라면 Playwright · Orca CLI로 충분합니다.
                </Callout>
              </div>
            </div>
          </div>

          {/* ④ 어디까지 가능한가 */}
          <div className="flex flex-col gap-4">
            <p className="text-[15px] font-extrabold">
              ④ 어디까지 <Blue>자동으로 확인할 수 있나</Blue>
            </p>
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              아래로 갈수록 넓어지고, 대신 느려집니다. 위에서부터 하나씩 더해
              가면 됩니다.
            </p>
            <ol className="flex flex-col overflow-hidden rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-card)]">
              {TEST_LADDER.map((l, i) => (
                <li
                  key={l.t}
                  className={`flex gap-4 px-5 py-4 ${
                    i > 0 ? "border-t border-[var(--s2-line)]" : ""
                  }`}
                >
                  <span className="font-mono flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--s2-blue-soft)] text-[13px] font-bold text-[var(--s2-blue)]">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <p className="text-[15px] font-extrabold">{l.t}</p>
                      <span className="font-mono text-[11.5px] text-[var(--s2-faint)]">
                        {l.tool}
                      </span>
                    </div>
                    <p className="mt-1 text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
                      {l.d}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-5">
              <p className="text-[15px] font-extrabold">
                그래도 <Blue>사람이 정해야 하는 것</Blue>
              </p>
              <div className="mt-3">
                <CheckList
                  items={[
                    <>
                      <b>무엇이 &lsquo;맞는&rsquo; 결과인지</b> — 기준은 2장
                      spec.md의 &lsquo;확인 방법&rsquo;에서 옵니다. 테스트는 그
                      기준을 지키게 할 뿐, 기준을 만들지 않습니다
                    </>,
                    <>
                      <b>쓰기 편한지, 마음이 가는지</b> — 느낌은 5장의 사용자
                      인터뷰로 확인합니다
                    </>,
                    <>
                      <b>결제 · 실제 메일 발송</b>처럼 되돌릴 수 없는 동작은
                      테스트용 계정 · 환경에서만
                    </>,
                    <>
                      AI가 직접 눌러 보는 테스트는 느리고 비용이 듭니다 —{" "}
                      <b>반복할 확인은 Playwright 코드로 굳혀</b> 두세요
                    </>,
                  ]}
                />
              </div>
            </div>
          </div>

          {/* ⑤ 시켜 보기 */}
          <div className="flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              ⑤ 오늘 바로 <Blue>시켜 보기</Blue>
            </p>
            <CopyBlock
              label="Claude Code에 입력 — 핵심 흐름을 테스트로 남기기"
              command="docs/spec.md 의 확인 방법을 보고, 핵심 사용자 흐름 3개를 Playwright 테스트로 만들어줘. 실행해서 모두 통과할 때까지 고치고, 결과 화면을 캡처해서 보여줘."
            />
            <CopyBlock
              label="Orca에서 — 휴대폰 화면 점검"
              command="orca-cli 스킬로 내 서비스를 열고 iPhone 12 화면에서 모든 버튼을 눌러 봐. 잘리거나 안 눌리는 곳이 있으면 스크린샷과 함께 알려줘."
            />
            <CopyBlock
              label="완료 조건으로 걸기 — 3장의 /goal"
              command="/goal npx playwright test 가 모두 통과하고 npm run build 가 오류 없이 끝날 때까지"
            />
            <CopyBlock
              label="CLAUDE.md 의 ‘완료 전에 확인’에 한 줄 더하기"
              command="- 기능을 바꾸면 npx playwright test 로 확인한다. 실패하면 고친 뒤 다시 돌린다."
            />
          </div>

          <Callout title="마지막 한 문장">
            만드는 건 이제 AI가 몇 분이면 합니다.{" "}
            <b>&lsquo;제대로 됐다&rsquo;를 무엇으로 확인할지 정해 주는 것</b> —
            그게 우리가 맡을 일입니다.
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
