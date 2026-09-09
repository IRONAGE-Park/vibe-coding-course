import type { Metadata } from "next";
import Nav from "../components/Nav";
import CopyBlock from "../components/CopyBlock";
import StepRail from "../components/StepRail";
import {
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
    "요청, 확인, 커밋·푸시, 자동 배포와 롤백까지 — 고치면 저절로 반영되는 사이클.",
};

const TOTAL = 5;

const RAIL = [
  { id: "update-1", num: "01", label: "무엇을 고칠지" },
  { id: "update-2", num: "02", label: "결과 확인" },
  { id: "update-3", num: "03", label: "막혔을 때" },
  { id: "update-4", num: "04", label: "커밋 & 푸시" },
  { id: "update-5", num: "05", label: "자동 배포" },
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
            이 장은 <b>강의 중에 함께 만듭니다</b>. 지금 보고 있는 이 사이트를
            그 자리에서 고쳐 배포하고, 화면이 바뀌는 것을 같이 확인합니다.
          </>
        }
      />

      <StepRail items={RAIL} />

      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-12 md:px-8">
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
            첫 배포가 끝났다면 여기서부터가 진짜입니다. 배포는 더 이상 큰
            행사가 아니라 <b>하루에 몇 번씩 하는 일</b>이 됩니다.
          </p>
        </section>

        {/* 1. 무엇을 고칠지 */}
        <StepCard
          no={1}
          total={TOTAL}
          id="update-1"
          title="무엇을 고칠지 한 문장으로 정하기"
          intro={
            <>
              &ldquo;이걸 바꾸고 싶다&rdquo;에서 멈추지 말고,{" "}
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
          <Placeholder>
            오늘 함께 고칠 내용은 강의 중에 정합니다.
            <br />
            정해지면 이 자리에 실제로 보낸 요청 문장이 들어갑니다.
          </Placeholder>
          <p className="text-[14.5px] leading-[1.65] text-[var(--s2-body)]">
            3장에서 배운 <b className="font-mono">/goal</b> 도 함께 걸어두면
            중간에 멈추지 않습니다.
          </p>
          <CopyBlock
            label="완료 조건도 함께"
            command="/goal 화면이 의도대로 바뀌고 npm run build 가 통과할 때까지"
          />
          <Callout title="기존 화면을 지키는 한마디">
            수정 요청에는 늘 <b>&ldquo;지금 화면은 그대로 두고&rdquo;</b>를
            붙이세요. 새 기능을 넣다가 멀쩡하던 화면이 망가지면 업데이트가
            아니라 사고입니다.
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
              <b className="font-mono">npm run dev</b> 로 띄운 화면에서 바로
              확인합니다. 배포된 화면이 아니라 <b>내 컴퓨터 화면</b>이 먼저입니다.
            </>
          }
        >
          <Placeholder>
            강의 중에 작업 전후 화면을 여기에 나란히 넣습니다.
          </Placeholder>
          <p className="text-[14.5px] leading-[1.65] text-[var(--s2-body)]">
            볼 때는 <b>바뀐 곳</b>보다 <b>안 바뀌어야 할 곳</b>을 먼저 보세요.
            색·간격·글자 크기가 그대로이고 달라진 건 요청한 부분 하나뿐이라면
            잘된 업데이트입니다.
          </p>
          <CheckList
            items={[
              <>
                <b>기존 화면이 안 망가졌는가</b> — 원래 있던 화면부터 확인
              </>,
              <>
                <b>새로 요청한 것이 동작하는가</b> — 직접 눌러보고 움직여보기
              </>,
              <>
                <b>요청한 조건을 지켰는가</b> — 1단계에서 정한 확인 기준으로 판정
              </>,
            ]}
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
              한 번에 깔끔하게 끝나는 일은 드뭅니다. 화면 아래에{" "}
              <b>빨간 배지</b>가 뜨거나 터미널에 영어가 쏟아지는 게 보통입니다.
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
                고친 뒤 화면을 새로고침해 <b>배지가 사라졌는지</b> 확인합니다.
              </>,
            ]}
          />
          <Callout title="빨간 글씨는 실패가 아니라 힌트입니다">
            여러분이 원인을 알 필요는 없습니다. <b>메시지를 그대로 옮기는 것</b>
            까지가 여러분 몫이고, 해석은 AI 몫입니다. 요약하거나 &ldquo;뭔가
            안 돼요&rdquo;로 바꾸지 말고 통째로 붙여넣으세요.
          </Callout>
        </StepCard>

        {/* 4. 커밋 & 푸시 */}
        <StepCard
          no={4}
          total={TOTAL}
          id="update-4"
          title="커밋하고 푸시하기"
          intro={
            <>
              화면이 마음에 들면 바로 저장소에 올립니다. 이것도 말로 시키면
              됩니다.
            </>
          }
        >
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
                커밋은 <b>기능 하나 단위</b>로 — 한 줄로 설명되면 좋은
                크기입니다
              </>,
              <>
                푸시 전에 <b className="font-mono">npm run build</b> 가
                통과하는지 확인하면 배포 실패를 미리 막습니다
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
              푸시하는 순간 Vercel이 새 버전을 만듭니다. 우리가 할 일은{" "}
              <b>기다렸다가 확인</b>하는 것뿐입니다.
            </>
          }
        >
          <MiniSteps
            items={[
              <>
                Vercel 대시보드 → <b>Deployments</b> 탭을 엽니다.
              </>,
              <>
                방금 푸시한 커밋이 <b>Building…</b> 상태로 올라옵니다.
              </>,
              <>
                <b>Ready</b>로 바뀌면 내 서비스 주소를 새로고침 — 방금 고친
                내용이 실제 사이트에도 반영돼 있습니다.
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
          <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
            푸시할 때마다 커밋 메시지 그대로 한 줄씩 쌓이고, 전부{" "}
            <b>Ready</b> — 배포에 걸린 시간은 <b>15~20초</b>뿐입니다. 각 줄
            오른쪽 <b>⋯ 메뉴</b>를 열면 이전 버전으로 되돌리는 메뉴가 바로
            나옵니다.
          </p>
          <Callout title="잘못돼도 괜찮습니다 — 되돌리면 되니까">
            배포된 화면이 이상하면 Deployments 목록에서 이전 버전의{" "}
            <b>⋯ 메뉴 → Promote to Production</b>을 누르세요. 몇 초 만에 예전
            화면으로 돌아갑니다. <b>되돌릴 수 있으니 마음껏 실험하세요</b> —
            이게 Git과 Vercel을 쓰는 이유입니다.
          </Callout>
        </StepCard>

        {/* 마무리 */}
        <section className="rounded-[24px] border border-[var(--s2-info-line)] bg-[var(--s2-info-bg)] p-7 md:p-9">
          <p className="text-[18px] font-extrabold leading-[1.5] md:text-[20px]">
            방금 <Blue>이 사이트가 바뀌는 것</Blue>을 함께 봤습니다
          </p>
          <p className="mt-3 text-[14.5px] leading-[1.7] text-[var(--s2-body)]">
            요청 한 문장 → 확인 → 오류 해결 → 커밋·푸시 → 자동 배포. 여러분의
            서비스도 이 사이클을 돌리면 됩니다. 오늘 밤 열 번쯤 돌려보세요.
          </p>
        </section>
      </main>

      <Pager
        prev={{ href: "/build", label: "03 초기 구축 · 첫 배포" }}
        next={{ href: "/tools", label: "05 유용한 도구들" }}
      />
      <SiteFooter />
    </div>
  );
}
