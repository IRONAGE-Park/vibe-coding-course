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
  Shot,
  SiteFooter,
  StepCard,
  Term,
} from "../components/ui";

export const metadata: Metadata = {
  title: "04 업데이트 배포 | 바이브코딩과 함께 살아남기",
  description:
    "이 사이트에 다크 모드를 추가한 실제 과정 — 요청, 확인, 커밋·푸시, 자동 배포와 롤백까지.",
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
            이 장은 <b>실제 사례</b>입니다 — 지금 보고 있는 이 사이트에{" "}
            <b>다크 모드</b>를 추가한 과정을 그대로 옮겼습니다. 오른쪽 위{" "}
            <b>☾ 버튼</b>이 그 결과예요. 눌러보고 오세요.
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
              &ldquo;다크 모드를 넣고 싶다&rdquo;에서 멈추지 말고,{" "}
              <b>어디에 · 어떻게 확인할지</b>까지 붙이면 한 번에 끝납니다.
            </>
          }
        >
          <CopyBlock
            label="이번에 실제로 보낸 요청"
            command="화면을 어둡게 보는 다크 모드를 추가해줘. 헤더에 전환 버튼을 넣고, 새로고침해도 선택이 유지되게 해줘."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { k: "무엇을", v: "다크 모드" },
              { k: "어디에", v: "헤더에 전환 버튼" },
              { k: "어떻게 확인", v: "새로고침해도 유지" },
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
          <p className="text-[14.5px] leading-[1.65] text-[var(--s2-body)]">
            3장에서 배운 <b className="font-mono">/goal</b> 도 함께 걸어두면
            중간에 멈추지 않습니다.
          </p>
          <CopyBlock
            label="완료 조건도 함께"
            command="/goal 라이트·다크 두 화면이 모두 정상이고 npm run build 가 통과할 때까지"
          />
          <Callout title="기존 화면을 지키는 한마디">
            수정 요청에는 늘 <b>&ldquo;지금 화면은 그대로 두고&rdquo;</b>를
            붙이세요. 다크 모드를 넣으면서 라이트 화면이 망가지면 업데이트가
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
              확인합니다. 아래는 실제 작업 전후입니다.
            </>
          }
        >
          <div className="flex flex-col gap-5">
            <p className="text-[15px] font-extrabold">
              작업 전 — <Blue>라이트 모드뿐</Blue>
            </p>
            <Shot
              src="/captures/update/1-before-light.png"
              width={1440}
              height={1500}
              alt="다크 모드 추가 전 — 헤더에 전환 버튼이 없는 화면"
              url="localhost:3000 — 작업 전"
              eager
            />
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-[15px] font-extrabold">
              작업 후 ① — <Blue>기존 화면은 그대로</Blue>
            </p>
            <Shot
              src="/captures/update/2-after-light.png"
              width={1440}
              height={1500}
              alt="다크 모드 추가 후 라이트 모드 — 헤더 오른쪽에 전환 버튼이 생김"
              url="localhost:3000 — 작업 후 (라이트)"
            />
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              색·간격·글자 크기가 <b>작업 전과 똑같습니다</b>. 달라진 건 오른쪽
              위 버튼 하나뿐 — 이게 잘된 업데이트입니다.
            </p>
            <Shot
              src="/captures/update/4-toggle-light.png"
              width={1320}
              height={66}
              alt="헤더 오른쪽 끝에 생긴 달 모양 테마 전환 버튼"
              url="헤더 — 라이트 모드일 때 ☾"
              highlight={{
                top: "24%",
                left: "78.5%",
                width: "3%",
                height: "52%",
              }}
            />
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-[15px] font-extrabold">
              작업 후 ② — <Blue>새로 생긴 다크 모드</Blue>
            </p>
            <Shot
              src="/captures/update/3-after-dark.png"
              width={1440}
              height={1500}
              alt="다크 모드가 적용된 화면 — 어두운 배경에 밝은 글자"
              url="localhost:3000 — 작업 후 (다크)"
            />
            <Shot
              src="/captures/update/5-toggle-dark.png"
              width={1320}
              height={66}
              alt="다크 모드에서는 버튼이 해 모양으로 바뀐다"
              url="헤더 — 다크 모드일 때 ☀"
              highlight={{
                top: "24%",
                left: "78.5%",
                width: "3%",
                height: "52%",
              }}
            />
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              버튼 모양도 <b>☾ ↔ ☀</b> 로 바뀝니다 — 지금 어느 모드인지가 아니라{" "}
              <b>누르면 어떻게 되는지</b>를 보여주는 쪽이 덜 헷갈립니다.
            </p>
          </div>
          <CheckList
            items={[
              <>
                <b>기존 화면이 안 망가졌는가</b> — 라이트 모드를 먼저 확인
              </>,
              <>
                <b>새 기능이 동작하는가</b> — 버튼을 눌러 두 모드 전환
              </>,
              <>
                <b>요청한 조건을 지켰는가</b> — 새로고침해도 선택이 남아 있는지
              </>,
            ]}
          />
        </StepCard>

        {/* 3. 막혔을 때 */}
        <StepCard
          no={3}
          total={TOTAL}
          id="update-3"
          title="막혔을 때 — 실제로 이런 게 나왔습니다"
          intro={
            <>
              한 번에 깔끔하게 끝나는 일은 드뭅니다. 이번에도 화면 왼쪽 아래에{" "}
              <b>빨간 &ldquo;1 Issue&rdquo;</b> 배지가 떴어요.
            </>
          }
        >
          <Term
            title="개발 서버가 알려준 문제"
            lines={[
              { text: "⚠ 1 Issue" },
              { text: "" },
              {
                dim: true,
                text: "Hydration failed because the server rendered HTML",
              },
              { dim: true, text: "didn't match the client." },
            ]}
          />
          <MiniSteps
            items={[
              <>
                빨간 배지를 눌러 <b>메시지 전체를 복사</b>합니다.
              </>,
              <>
                Claude에게 그대로 붙여넣고 —{" "}
                <b>&ldquo;이 오류가 났어. 원인이 뭐고 어떻게 고치면
                돼?&rdquo;</b>
              </>,
              <>
                고친 뒤 화면을 새로고침해 <b>배지가 사라졌는지</b> 확인합니다.
              </>,
            ]}
          />
          <Callout title="빨간 글씨는 실패가 아니라 힌트입니다">
            이번 원인은 <b>테마를 미리 적용하는 코드</b>와 <b>화면을 그리는
            순서</b>가 어긋난 것이었고, 한 줄 고쳐서 해결됐습니다. 여러분이
            원인을 알 필요는 없습니다 — <b>메시지를 그대로 옮기는 것</b>까지가
            여러분 몫이고, 해석은 AI 몫입니다.
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
              { dim: true, text: "> 다크 모드 작업 커밋하고 푸시해줘." },
              { dim: true, text: "> 커밋 메시지는 한국어로." },
              { text: "" },
              { text: "✓ [main 8f2c1a9] feat: 다크/라이트 테마 전환 추가" },
              { text: "✓ Pushed to origin/main" },
            ]}
          />
          <CheckList
            items={[
              <>
                커밋은 <b>기능 하나 단위</b>로 — &ldquo;다크 모드 추가&rdquo;처럼
                한 줄로 설명되면 좋은 크기입니다
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
                <b>Ready</b>로 바뀌면 내 서비스 주소를 새로고침 — 다크 모드
                버튼이 실제 사이트에도 생겨 있습니다.
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
            이 페이지의 <Blue>☾ 버튼</Blue>이 방금 그 결과입니다
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
