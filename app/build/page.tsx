import type { Metadata } from "next";
import Nav from "../components/Nav";
import CopyBlock from "../components/CopyBlock";
import StepRail from "../components/StepRail";
import {
  Blue,
  Callout,
  CheckList,
  PageHero,
  Pager,
  Shot,
  SiteFooter,
  StepCard,
  Term,
} from "../components/ui";

export const metadata: Metadata = {
  title: "03 초기 구축 · 첫 배포 | 바이브코딩과 함께 살아남기",
  description:
    "goal 스킬로 앱 초안을 만들고, GitHub에 올린 뒤, Vercel로 첫 배포까지.",
};

const TOTAL = 5;

const RAIL = [
  { id: "build-1", num: "01", label: "완료 조건 걸기" },
  { id: "build-2", num: "02", label: "앱 초안 만들기" },
  { id: "build-3", num: "03", label: "GitHub에 올리기" },
  { id: "build-4", num: "04", label: "Vercel 연결" },
  { id: "build-5", num: "05", label: "첫 배포 확인" },
];

export default function BuildPage() {
  return (
    <div>
      <Nav />
      <PageHero
        num="03"
        label="Chapter 03"
        title={
          <>
            초기 구축과 <Blue>첫 배포</Blue>
          </>
        }
        sub={
          <>
            2장에서 만든 문서를 근거로 앱 초안을 만들고, GitHub에 올린 뒤,
            Vercel과 연결해 전 세계에 공개합니다.
          </>
        }
      />

      <StepRail items={RAIL} />

      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-12 md:px-8">
        {/* 황금 루프 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <p className="mb-5 text-[18px] font-extrabold">
            🔁 바이브 코딩 황금 루프 — 한 바퀴에 10분을 넘기지 마세요
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            {["말한다", "결과를 본다", "다른 점을 찾는다", "구체적으로 고쳐 말한다"].map(
              (step, i, arr) => (
                <span key={step} className="flex items-center gap-2.5">
                  <span
                    className={`rounded-full border px-4 py-2 text-[14px] font-bold ${
                      i === 0
                        ? "border-[var(--s2-blue)] bg-[var(--s2-blue)] text-[var(--s2-on-blue)]"
                        : "border-[var(--s2-line)] bg-[var(--s2-card)] text-[var(--s2-strong)]"
                    }`}
                  >
                    {i + 1}. {step}
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
              ↻ 반복
            </span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[16px] border border-[var(--s2-bad-line)] bg-[var(--s2-bad-bg)] p-5">
              <p className="mb-2 text-[14.5px] font-extrabold text-[var(--s2-bad-ink)]">
                ❌ 실패하는 말
              </p>
              <ul className="flex flex-col gap-1.5 text-[13.5px] leading-[1.6] text-[var(--s2-bad-body)]">
                <li>&ldquo;웹사이트 만들어줘&rdquo; — 뭘 만들지 AI가 찍어야 함</li>
                <li>&ldquo;더 예쁘게 해줘&rdquo; — 기준이 없음</li>
                <li>&ldquo;전부 다시 만들어&rdquo; — 잘 된 부분까지 잃음</li>
                <li>한 번에 기능 10개 — 다 어중간해짐</li>
              </ul>
            </div>
            <div className="rounded-[16px] border border-[var(--s2-good-line)] bg-[var(--s2-good-bg)] p-5">
              <p className="mb-2 text-[14.5px] font-extrabold text-[var(--s2-good-ink)]">
                ✅ 성공하는 말
              </p>
              <ul className="flex flex-col gap-1.5 text-[13.5px] leading-[1.6] text-[var(--s2-good-body)]">
                <li>&ldquo;메인 상단에 검색창 추가해줘&rdquo; — 위치+대상 명확</li>
                <li>&ldquo;버튼은 주황색, 글자는 더 크게&rdquo; — 구체적 기준</li>
                <li>&ldquo;나머지는 그대로, 지도만 수정&rdquo; — 범위 지정</li>
                <li>한 번에 한 가지 → 확인 → 다음 요청</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 1. /goal 로 완료 조건 걸기 */}
        <StepCard
          no={1}
          total={TOTAL}
          id="build-1"
          title="/goal 로 완료 조건 걸기"
          intro={
            <>
              AI가 도중에 &ldquo;일단 이 정도면 되겠죠?&rdquo; 하고 멈추는 걸
              막는 장치입니다. 만들기 전에 <b>끝났다고 인정할 기준</b>을 먼저
              정해둡니다.
            </>
          }
        >
          <div className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-6">
            <p className="mb-2 text-[15.5px] font-extrabold">
              슬래시 명령어(<span className="font-mono">/</span>)가 뭔가요?
            </p>
            <p className="text-[14.5px] leading-[1.7] text-[var(--s2-body)]">
              Claude Code 입력창에 <b className="font-mono">/</b> 를 치면 쓸 수
              있는 명령어 목록이 뜹니다. <b>기본으로 들어 있는 것</b>(
              <span className="font-mono text-[13.5px]">/goal</span>,{" "}
              <span className="font-mono text-[13.5px]">/code-review</span>,{" "}
              <span className="font-mono text-[13.5px]">/debug</span> …)도 있고,
              나중에 필요하면 자주 쓰는 절차를 명령어로 추가할 수도 있습니다.
              오늘은 기본 제공되는 <b>/goal</b> 하나만 씁니다.
            </p>
          </div>
          <div className="rounded-[16px] border border-[var(--s2-info-line)] bg-[var(--s2-info-bg)] p-6">
            <p className="mb-2 text-[15.5px] font-extrabold">
              <Blue>/goal</Blue> 의 목적 — 완료 조건 걸기
            </p>
            <p className="text-[14.5px] leading-[1.7] text-[var(--s2-body)]">
              공식 설명은 <b>&ldquo;조건이 충족될 때까지 계속 작업한다&rdquo;</b>
              입니다. 조건을 하나 걸어두면 Claude는 <b>작업을 멈추기 전에</b> 그
              조건이 채워졌는지 스스로 확인하고, 아직이면 계속 이어서 합니다.
              1교시에서 본 &ldquo;AI는 큰 작업을 한 번에 못 한다&rdquo;의 반대편
              문제 — <b>중간에 대충 끝내버리는 것</b>을 막아주는 장치입니다.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              조건은 <Blue>눈으로 확인할 수 있는 것</Blue>으로
            </p>
            <CopyBlock
              label="Claude Code에 입력 — 이번 작업의 완료 조건"
              command="/goal 메인·상세 화면이 모두 뜨고 npm run build 가 오류 없이 통과할 때까지"
            />
            <CopyBlock label="조건을 없앨 때" command="/goal clear" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[16px] border border-[var(--s2-bad-line)] bg-[var(--s2-bad-bg)] p-5">
              <p className="mb-2 text-[14.5px] font-extrabold text-[var(--s2-bad-ink)]">
                ❌ 확인할 수 없는 조건
              </p>
              <ul className="flex flex-col gap-1.5 text-[13.5px] leading-[1.6] text-[var(--s2-bad-body)]">
                <li>&ldquo;예쁘게 될 때까지&rdquo;</li>
                <li>&ldquo;완성될 때까지&rdquo;</li>
                <li>&ldquo;사용자가 만족할 때까지&rdquo;</li>
              </ul>
            </div>
            <div className="rounded-[16px] border border-[var(--s2-good-line)] bg-[var(--s2-good-bg)] p-5">
              <p className="mb-2 text-[14.5px] font-extrabold text-[var(--s2-good-ink)]">
                ✅ 확인할 수 있는 조건
              </p>
              <ul className="flex flex-col gap-1.5 text-[13.5px] leading-[1.6] text-[var(--s2-good-body)]">
                <li>&ldquo;npm run build 가 통과할 때까지&rdquo;</li>
                <li>&ldquo;화면 2개가 모두 뜰 때까지&rdquo;</li>
                <li>&ldquo;목록에 예시 데이터 10개가 보일 때까지&rdquo;</li>
              </ul>
            </div>
          </div>
          <Callout title="목록에 /goal 이 안 보인다면">
            Claude Code 버전이 낮을 수 있습니다. 터미널에서{" "}
            <code className="font-mono text-[13px]">claude update</code> 로 최신
            버전으로 올린 뒤 다시 실행해 보세요. 그래도 없으면 이 단계는
            건너뛰어도 됩니다 — 완료 조건을 <b>말로</b> 함께 적어주면 비슷한
            효과가 납니다.
          </Callout>
        </StepCard>

        {/* 2. 앱 초안 만들기 */}
        <StepCard
          no={2}
          total={TOTAL}
          id="build-2"
          title="앱 초안 만들기"
          intro={
            <>
              완료 조건을 걸어뒀으니, 이제 <b>무엇을 만들지</b>만 말하면 됩니다.
              2장의 두 문서가 그대로 지시서가 됩니다.
            </>
          }
        >
          <CopyBlock
            label="Orca에서 + → Claude 로 연 뒤, 이렇게 요청"
            command="docs/plan.md 와 docs/requirements.md 를 읽고 웹앱 초안을 만들어줘"
          />
          <Term
            title="이렇게 진행됩니다"
            lines={[
              {
                dim: true,
                text: "> /goal 메인·상세 화면이 모두 뜨고 npm run build 가 통과할 때까지",
              },
              { text: "목표를 설정했습니다." },
              { text: "" },
              {
                dim: true,
                text: "> docs/plan.md 와 docs/requirements.md 를 읽고 초안을 만들어줘",
              },
              { text: "" },
              { text: "두 문서를 읽었습니다. 계획은 이렇습니다:" },
              { text: "  1. 메인 화면 — 카테고리별 지원사업 목록" },
              { text: "  2. 상세 화면 — 지원사업 정보와 신청 방법" },
              { text: "  3. 예시 데이터 10개" },
              { text: "만들지 않을 것: 로그인, 관리자, 알림" },
              { text: "" },
              { text: "이대로 진행할까요?" },
              { text: "" },
              { dim: true, text: "> 좋아, 그대로 만들어줘" },
            ]}
          />
          <CheckList
            items={[
              <>
                <b>계획을 먼저 보여주는 이유</b> — 1장의 CLAUDE.md에{" "}
                &ldquo;만들기 전에 계획을 요약하고 컨펌을 받는다&rdquo;라고
                적어뒀기 때문입니다
              </>,
              <>
                <b>끝까지 만드는 이유</b> — 방금 <span className="font-mono">/goal</span>{" "}
                로 완료 조건을 걸어뒀기 때문입니다
              </>,
            ]}
          />
          <Callout title="계획이 마음에 안 들면 여기서 고치세요">
            &ldquo;3번은 빼고 대신 검색창을 넣어줘&rdquo;처럼 <b>항목을 짚어</b>{" "}
            수정하면 됩니다. 코드가 한 줄도 만들어지기 전이라 되돌릴 것이
            없습니다.
          </Callout>
        </StepCard>

        {/* 3. GitHub에 올리기 */}
        <StepCard
          no={3}
          total={TOTAL}
          id="build-3"
          title="GitHub에 올리기 — 커밋하고 푸시"
          intro={
            <>
              초안이 나왔으면 바로 저장소에 올립니다. <b>커밋</b>은 &ldquo;여기까지를
              한 묶음으로 기록&rdquo;, <b>푸시</b>는 &ldquo;그 기록을 GitHub로
              보내기&rdquo;입니다.
            </>
          }
        >
          <Term
            title="Claude Code 안에서 — 이것도 말로 시킵니다"
            lines={[
              {
                dim: true,
                text: "> 지금까지 만든 걸 커밋하고 GitHub에 푸시해줘.",
              },
              { dim: true, text: "> 커밋 메시지는 한국어로." },
              { text: "" },
              { text: "✓ 12 files changed" },
              { text: "✓ [main a1b2c3d] feat: 지원사업 모아보기 초안 구현" },
              { text: "✓ Pushed to origin/main" },
            ]}
          />
          <CheckList
            items={[
              <>
                푸시가 실패하면 대부분 <b>로그인 문제</b>입니다 — 1장의{" "}
                <code className="font-mono text-[13px]">gh auth status</code> 로
                확인하세요
              </>,
              <>
                커밋은 <b>작게, 자주</b> — 화면 하나 만들 때마다 한 번씩이
                좋습니다
              </>,
            ]}
          />
          <div className="flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              ① 저장소 화면에서 확인 — <Blue>파일과 커밋 메시지</Blue>
            </p>
            <Shot
              src="/captures/deploy/7-github-pushed.png"
              width={2894}
              height={1923}
              alt="GitHub 저장소 화면 — 푸시된 파일 목록과 최근 커밋 메시지"
              url="github.com/내아이디/vibe-coding-practice"
              highlight={{
                top: "19.3%",
                left: "18%",
                width: "24%",
                height: "3%",
                label: "방금 올린 커밋",
              }}
            />
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              내 저장소 주소를 열었을 때 <b>방금 만든 파일들</b>과{" "}
              <b>커밋 메시지</b>가 보이면 성공입니다. 오른쪽 위{" "}
              <b>N Commits</b> 숫자도 늘어나 있습니다.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              ② 커밋 목록에서 확인 — <Blue>기록이 쌓이는 곳</Blue>
            </p>
            <Shot
              src="/captures/deploy/8-github-commits.png"
              width={2894}
              height={1923}
              alt="GitHub 커밋 목록 화면 — 날짜별로 쌓인 커밋 기록"
              url="github.com/내아이디/vibe-coding-practice/commits/main"
            />
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              저장소 상단의 <b>N Commits</b>를 누르면 나오는 화면입니다. 앞으로
              수정할 때마다 여기에 한 줄씩 쌓입니다 —{" "}
              <b>언제든 이 시점으로 되돌릴 수 있다</b>는 뜻이라, 마음 놓고
              실험해도 됩니다.
            </p>
          </div>
        </StepCard>

        {/* 4. Vercel 연결 */}
        <StepCard
          no={4}
          total={TOTAL}
          id="build-4"
          title="Vercel과 GitHub 연결하기"
          intro={
            <>
              한 번만 연결하면 이후부터는 <b>푸시만 해도 자동 배포</b>됩니다.
              설정은 건드릴 필요 없습니다 — Vercel이 Next.js를 자동 인식합니다.
            </>
          }
        >
          <div className="flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              ① <Blue>Add New → Project</Blue>
            </p>
            <Shot
              src="/captures/deploy/1-add-new-project.jpg"
              width={689}
              height={195}
              alt="Vercel 대시보드 — Add New Project"
              url="vercel.com/dashboard"
              href="https://vercel.com/dashboard"
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              ② <Blue>Continue with GitHub</Blue>
            </p>
            <Shot
              src="/captures/deploy/2-add-new-with-github.jpg"
              width={1808}
              height={982}
              alt="Vercel — Continue with GitHub"
              url="vercel.com/new"
              href="https://vercel.com/new"
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              ③ 내 저장소 옆 <Blue>Import</Blue>
            </p>
            <Shot
              src="/captures/deploy/3-import-project.jpg"
              width={899}
              height={470}
              alt="Vercel Import 목록"
              url="vercel.com/new"
              href="https://vercel.com/new"
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              ④ 설정 그대로 <Blue>Deploy</Blue>
            </p>
            <Shot
              src="/captures/deploy/4-deploy.jpg"
              width={807}
              height={945}
              alt="Vercel Deploy 버튼"
              url="vercel.com/new"
              href="https://vercel.com/new"
            />
          </div>
        </StepCard>

        {/* 5. 첫 배포 확인 */}
        <StepCard
          no={5}
          total={TOTAL}
          id="build-5"
          title="첫 배포 확인 — 내 서비스가 공개되는 순간"
          intro={<>폭죽이 터지면 성공. 주소를 옆 사람에게 보내보세요.</>}
        >
          <div className="flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              ⑤ <Blue>Congratulations!</Blue>
            </p>
            <Shot
              src="/captures/deploy/5-success-deploy.jpg"
              width={878}
              height={991}
              alt="Vercel 배포 성공 화면"
              url="vercel.com"
              href="https://vercel.com/dashboard"
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              ⑥ 대시보드에서 <Blue>주소 확인</Blue>
            </p>
            <Shot
              src="/captures/deploy/6-check-dashboard.jpg"
              width={1679}
              height={902}
              alt="Vercel 대시보드 Domains"
              url="vercel.com/dashboard"
              href="https://vercel.com/dashboard"
            />
          </div>
          <CheckList
            items={[
              <>
                <span className="font-mono text-[13px]">
                  프로젝트명.vercel.app
                </span>{" "}
                주소를 브라우저에서 열어보기
              </>,
              <>휴대폰으로도 접속해 보기 — 같은 화면이 보이면 성공</>,
              <>
                <b>팀 채팅방에 링크 공유 — 이게 완주 조건!</b>
              </>,
            ]}
          />
          <Callout title="설정을 건드릴 필요가 없어요">
            Vercel이 Next.js 프로젝트를 자동 인식해서 빌드 설정을 채워줍니다.{" "}
            <b>Deploy 버튼만 누르면</b> 1~2분 안에 끝납니다.
          </Callout>
        </StepCard>
      </main>

      <Pager
        prev={{ href: "/plan", label: "02 문제 정의" }}
        next={{ href: "/update", label: "04 업데이트 배포" }}
      />
      <SiteFooter />
    </div>
  );
}
