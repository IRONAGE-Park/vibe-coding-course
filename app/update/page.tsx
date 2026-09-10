import type { Metadata } from "next";
import Nav from "../components/Nav";
import CopyBlock from "../components/CopyBlock";
import SdlcLoop from "../components/SdlcLoop";
import StepRail from "../components/StepRail";
import Tip from "../components/Tip";
import {
  Badge,
  Blue,
  Callout,
  CheckList,
  MiniSteps,
  PageHero,
  Pager,
  Placeholder,
  Shot,
  SiteFooter,
  StepCard,
  Term,
} from "../components/ui";

export const metadata: Metadata = {
  title: "04 업데이트 배포 | 바이브코딩과 함께 살아남기",
  description:
    "요청, 확인, 커밋·푸시, 자동 배포와 롤백, 그리고 배운 것으로 다시 고치는 사이클.",
};

/* 배경 설명 · 사례 · 진행 요령은 강사 노트(app/lib/lecture-notes.ts)에 있습니다 */

const TOTAL = 5;

const RAIL = [
  { id: "update-1", num: "01", label: "무엇을 고칠지" },
  { id: "update-2", num: "02", label: "결과 확인" },
  { id: "update-3", num: "03", label: "막혔을 때" },
  { id: "update-4", num: "04", label: "커밋 & 푸시" },
  { id: "update-5", num: "05", label: "자동 배포" },
];

const RULES = [
  { k: "기존 기능 80 : 새 기능 20", v: "출시 직후엔 있는 기능을 다듬는 데 시간을 씁니다." },
  { k: "기능이 늘면 핵심이 흐려진다", v: "2장의 핵심 가치 한 줄이 묻힙니다." },
  { k: "한 번에 하나만", v: "여러 개를 바꾸면 무엇이 통했는지 모릅니다." },
];

export default function UpdatePage() {
  return (
    <div>
      <Nav />
      <PageHero
        num="04"
        label="Chapter 04"
        title={
          <>
            <Blue>업데이트 배포</Blue> — 고치면 저절로 반영된다
          </>
        }
        sub={
          <>
            이 장은 <b>강의 중에 함께 만듭니다</b>. 이 사이트를 그 자리에서
            고쳐 배포하고, 화면이 바뀌는 것을 같이 봅니다.
          </>
        }
      />

      <StepRail items={RAIL} />

      <main className="mx-auto w-full flex max-w-5xl flex-col gap-8 px-5 py-12 md:px-8">
        {/* 사이클 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <p className="mb-5 text-[18px] font-extrabold">
            업데이트 사이클 — 이 네 단계의 반복
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            {["Claude에게 수정 요청", "결과 확인", "커밋 & 푸시", "자동 배포"].map(
              (step, i, arr) => (
                <span key={step} className="flex items-center gap-2.5">
                  <span
                    className={`rounded-full border px-4 py-2 text-[14px] font-bold ${
                      i === 3
                        ? "border-[var(--s2-blue)] bg-[var(--s2-blue)] text-[var(--s2-on-blue)]"
                        : "border-[var(--s2-line)] bg-[var(--s2-card)] text-[var(--s2-strong)]"
                    }`}
                  >
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
              ↻ 반복
            </span>
          </div>
          <p className="mt-5 text-[14.5px] leading-[1.65] text-[var(--s2-body)]">
            배포는 이제 <b>하루에 몇 번씩 하는 일</b>입니다. 한 바퀴의 끝은
            배포가 아니라 <b>배운 것</b> — 5장 &lsquo;배우는 법&rsquo;에서
            다룹니다.
          </p>
          <div className="mt-6">
            <p className="mb-3 text-[15px] font-extrabold">
              개발 주기로 보면 — <Blue>검증 · 배포 · 운영</Blue>, 그리고 다시
              1단계
            </p>
            <SdlcLoop current={[3, 4, 5]} />
          </div>
        </section>

        {/* 업데이트 원칙 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>업데이트 원칙</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            기능을 <Blue>밀어 넣지 말고</Blue>, 끌려오게
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {RULES.map((c, i) => (
              <div
                key={c.k}
                className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-5"
              >
                <p className="font-mono text-[12px] text-[var(--s2-blue)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 text-[15.5px] font-extrabold">{c.k}</p>
                <p className="mt-1.5 text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
                  {c.v}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 1. 무엇을 고칠지 */}
        <StepCard
          no={1}
          total={TOTAL}
          id="update-1"
          title="무엇을 고칠지 한 문장으로 정하기"
          intro={
            <>
              <b>어디에 · 어떻게 확인할지</b>까지 붙이면 한 번에 끝납니다.
            </>
          }
        >
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { k: "무엇을", v: "바꿀 대상 하나" },
              { k: "어디에", v: "화면의 어느 자리인지" },
              { k: "어떻게 확인", v: "됐는지 판단할 기준" },
            ].map((c, i) => (
              <div
                key={c.k}
                className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-5"
              >
                <p className="font-mono text-[12px] text-[var(--s2-blue)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 text-[15px] font-extrabold">{c.k}</p>
                <p className="mt-1.5 text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
                  {c.v}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-[16px] border border-[var(--s2-info-line)] bg-[var(--s2-info-bg)] p-5">
            <p className="mb-2 text-[14.5px] font-extrabold">
              한 줄 더 — 왜 바꾸는지를{" "}
              <Tip tip="틀렸는지 판정할 수 있게 쓴 예상. 결과가 기대에 못 미쳐도 괜찮습니다 — 미리 적어 두면 기분이 아니라 기준으로 판단하게 됩니다.">
                가설
              </Tip>
              로
            </p>
            <p className="font-mono text-[13px] text-[var(--s2-strong)]">
              [이렇게 바꾸면] → [이런 결과가 나올 것이다]
            </p>
            <p className="mt-2 text-[14px] leading-[1.65] text-[var(--s2-body)]">
              예) &lsquo;마감 임박순&rsquo; 정렬을 넣으면 → 처음 온 사람이 30초
              안에 공고 하나를 누를 것이다.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[15px] font-extrabold">
              고칠 거리는 <Blue>이 순서로</Blue>
            </p>
            <MiniSteps
              items={[
                <>
                  <b>사람들이 막힌 곳</b> — 보여줬을 때 멈칫한 자리
                </>,
                <>
                  <b>있는 기능 다듬기</b> — 느리거나 헷갈리는 곳
                </>,
                <>
                  <b>새 기능</b> — &lsquo;있으면 좋음&rsquo; 목록에서 하나씩
                </>,
              ]}
            />
          </div>
          <Placeholder>
            오늘 함께 고칠 내용은 강의 중에 정합니다.
            <br />
            정해지면 이 자리에 실제로 보낸 요청 문장이 들어갑니다.
          </Placeholder>
          <CopyBlock
            label="완료 조건도 함께 — 3장의 /goal"
            command="/goal 화면이 의도대로 바뀌고 npm run build 가 통과할 때까지"
          />
          <CopyBlock
            label="새 기능이라면 — 먼저 intent.md 와 대조"
            command="docs/intent.md 의 원하는 결과와 이 요청이 맞는지 먼저 확인하고, 안 맞으면 만들기 전에 말해줘"
          />
          <Callout title="기존 화면을 지키는 한마디">
            수정 요청에는 늘 <b>&ldquo;지금 화면은 그대로 두고&rdquo;</b>를
            붙이세요.
          </Callout>
        </StepCard>

        {/* 2. 결과 확인 */}
        <StepCard
          no={2}
          total={TOTAL}
          id="update-2"
          title="결과 확인 — 눈으로 직접"
          intro={
            <>
              <b className="font-mono">npm run dev</b> 로 띄운{" "}
              <b>내 컴퓨터 화면</b>에서 먼저 확인합니다.
            </>
          }
        >
          <Placeholder>
            강의 중에 작업 전후 화면을 여기에 나란히 넣습니다.
          </Placeholder>
          <p className="text-[14.5px] leading-[1.65] text-[var(--s2-body)]">
            <b>바뀐 곳</b>보다 <b>안 바뀌어야 할 곳</b>을 먼저 보세요.
          </p>
          <CheckList
            items={[
              <>
                <b>기존 화면이 안 망가졌는가</b>
              </>,
              <>
                <b>새로 요청한 것이 동작하는가</b> — 직접 눌러보기
              </>,
              <>
                <b>1단계의 확인 기준</b>을 지켰는가
              </>,
            ]}
          />
          <div className="flex flex-col gap-2">
            <p className="text-[15px] font-extrabold">
              내 눈 다음은 <Blue>처음 보는 사람의 눈</Blue>
            </p>
            <MiniSteps
              items={[
                <>옆 사람에게 설명 없이 화면만 보여줍니다.</>,
                <>
                  <b>
                    &ldquo;아무것도 누르지 말고, 뭐 하는 서비스 같은지 말해
                    주세요.&rdquo;
                  </b>
                </>,
                <>
                  핵심 행동을 부탁하고, <b>멈칫하는 곳</b>을 적습니다.
                </>,
              ]}
            />
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              칭찬보다 멈칫한 곳이 다음 업데이트 거리입니다.
            </p>
          </div>
          <Callout title="디자인이 조각나지 않게">
            필요할 때마다 덧대면 색과 버튼이 제각각이 되고 신뢰가 떨어집니다.
            규칙을 문서로 남기세요.
          </Callout>
          <CopyBlock
            label="스타일 규칙을 문서로"
            command="지금 화면의 색·글꼴·버튼 규칙을 docs/style.md 로 정리하고, 앞으로 수정할 때는 이 규칙을 따라줘"
          />
        </StepCard>

        {/* 3. 막혔을 때 */}
        <StepCard
          no={3}
          total={TOTAL}
          id="update-3"
          title="막혔을 때 — 메시지를 그대로 옮기기"
          intro={
            <>
              화면 아래 <b>빨간 배지</b>나 터미널의 영어 메시지는 보통입니다.
            </>
          }
        >
          <Term
            title="개발 서버는 이런 식으로 알려줍니다"
            lines={[
              { text: "⚠ 1 Issue" },
              { text: "" },
              { dim: true, text: "…에러 메시지가 영어로 길게 나옵니다" },
            ]}
          />
          <MiniSteps
            items={[
              <>
                빨간 배지를 눌러 <b>메시지 전체를 복사</b>합니다.
              </>,
              <>
                Claude에게 그대로 붙여넣고 —{" "}
                <b>
                  &ldquo;이 오류가 났어. 원인이 뭐고 어떻게 고치면 돼?&rdquo;
                </b>
              </>,
              <>
                새로고침해 <b>배지가 사라졌는지</b> 확인합니다.
              </>,
            ]}
          />
          <Callout title="빨간 글씨는 실패가 아니라 힌트">
            원인은 몰라도 됩니다. <b>메시지를 통째로 붙여넣는 것</b>까지가
            여러분 몫입니다.
          </Callout>
          <CopyBlock
            label="같은 오류가 두 번째라면"
            command="이 오류가 왜 생겼는지 원인을 끝까지 따라가서 설명하고, 다시 안 생기게 막아줘"
          />
        </StepCard>

        {/* 4. 커밋 & 푸시 */}
        <StepCard
          no={4}
          total={TOTAL}
          id="update-4"
          title="커밋하고 푸시하기"
          intro={<>화면이 마음에 들면 바로 올립니다. 이것도 말로 시킵니다.</>}
        >
          <CopyBlock
            label="올리기 전에 — AI에게 검토받기"
            command="/code-review"
          />
          <Term
            title="Claude Code 안에서"
            lines={[
              { dim: true, text: "> 방금 작업 커밋하고 푸시해줘." },
              { dim: true, text: "> 커밋 메시지는 한국어로." },
              { text: "" },
              { text: "✓ [main 8f2c1a9] feat: …" },
              { text: "✓ Pushed to origin/main" },
            ]}
          />
          <CheckList
            items={[
              <>
                커밋은 <b>기능 하나 단위</b>로, <b>작게 자주</b>
              </>,
              <>
                푸시 전에 <b className="font-mono">npm run build</b> 통과 확인
              </>,
              <>
                검토에서 <b>같은 지적이 두 번</b> 나오면 CLAUDE.md에 규칙으로
              </>,
            ]}
          />
        </StepCard>

        {/* 5. 자동 배포 */}
        <StepCard
          no={5}
          total={TOTAL}
          id="update-5"
          title="자동 배포 확인하고, 필요하면 되돌리기"
          intro={
            <>
              푸시하는 순간 Vercel이 새 버전을 만듭니다. <b>기다렸다가
              확인</b>만 하면 됩니다.
            </>
          }
        >
          <MiniSteps
            items={[
              <>
                Vercel 대시보드 → <b>Deployments</b> 탭
              </>,
              <>
                방금 푸시한 커밋이 <b>Building…</b>
              </>,
              <>
                <b>Ready</b>가 되면 내 서비스 주소를 새로고침
              </>,
            ]}
          />
          <Shot
            src="/captures/update/6-vercel-deployments.png"
            width={2800}
            height={1072}
            alt="Vercel Deployments 탭 — 푸시한 커밋마다 Ready 상태로 쌓여 있고, ⋯ 메뉴에 Instant Rollback과 Promote가 보인다"
            url="vercel.com — Deployments"
            highlight={{
              top: "40%",
              left: "83.5%",
              width: "15%",
              height: "56%",
              label: "되돌리기 메뉴",
            }}
          />
          <Callout title="잘못돼도 괜찮습니다">
            이전 버전의 <b>⋯ → Promote to Production</b>이면 몇 초 만에
            돌아갑니다. <b>되돌릴 수 있으니 마음껏 실험하세요.</b>
          </Callout>
        </StepCard>

        {/* 마무리 */}
        <section className="rounded-[24px] border border-[var(--s2-info-line)] bg-[var(--s2-info-bg)] p-7 md:p-9">
          <p className="text-[18px] font-extrabold leading-[1.5] md:text-[20px]">
            방금 <Blue>이 사이트가 바뀌는 것</Blue>을 함께 봤습니다
          </p>
          <p className="mt-3 text-[14.5px] leading-[1.7] text-[var(--s2-body)]">
            요청 → 확인 → 커밋·푸시 → 자동 배포 → 배운 것 기록. 오늘 밤 열 번쯤
            돌려보세요. <b>완벽해질 때까지 기다리지 마세요.</b> 배포한 뒤
            무엇을 지켜보고 누구에게 물을지는 5장에서 이어집니다.
          </p>
        </section>
      </main>

      <Pager
        prev={{ href: "/build", label: "03 초기 구축 · 첫 배포" }}
        next={{ href: "/learn", label: "05 배우는 법" }}
      />
      <SiteFooter />
    </div>
  );
}
