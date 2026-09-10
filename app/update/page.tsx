import type { Metadata } from "next";
import Nav from "../components/Nav";
import CopyBlock from "../components/CopyBlock";
import StageCycle from "../components/StageCycle";
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
  TimedList,
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

const LEARN_PARTS = ["① 무엇을 볼지", "② 모으기", "③ 읽기", "④ 강화하기"];

const FUNNEL = [
  { k: "알게 됨", en: "획득", v: "첫 화면에서 목록을 내려 본다" },
  { k: "첫 가치", en: "활성화", v: "조건에 맞는 공고 1개를 누른다 — 핵심 행동" },
  { k: "다시 옴", en: "유지", v: "일주일 안에 다시 온다 · 알림을 신청한다" },
  { k: "돈", en: "수익", v: "유료 전환 · 선결제 (아직이면 연락처로 대신)" },
  { k: "추천", en: "추천", v: "링크를 다른 창업팀에 공유한다" },
];

const CHANNELS = [
  {
    k: "행동 기록",
    tag: "숫자 · 무엇이",
    v: "①의 행동이 일어날 때마다 남기고, 첫 방문 주별로 묶어 봅니다.",
  },
  {
    k: "보여주며 관찰",
    tag: "사람 · 왜",
    v: "인터뷰했던 첫 고객에게 먼저 보여주고 옆에서 봅니다.",
  },
  {
    k: "의견 창구",
    tag: "사람 · 왜",
    v: "모든 화면에 연락 방법을 두고 직접 받습니다. 투표로 기능을 정하지 않습니다.",
  },
  {
    k: "떠난 사람 · 남은 사람",
    tag: "사람 · 왜",
    v: "떠난 사람에겐 이유를, 남은 사람에겐 왜 쓰는지를 묻습니다.",
  },
];

const MVP_INTERVIEW = [
  { t: "2분", k: "인사", v: "화면을 보며 떠오르는 생각을 소리 내어 말해 달라고 합니다." },
  { t: "2분", k: "첫 화면만", v: "누르지 말고, 무엇을 하는 서비스 같은지 말해 달라고 합니다." },
  { t: "3분", k: "가격", v: "가격을 보여주고 반응을 적습니다. 없으면 알림 신청을 부탁합니다." },
  { t: "15분", k: "가입 · 핵심 행동", v: "직접 해 보게 하고, 도와주지 말고 멈칫하는 곳을 적습니다." },
  { t: "2분", k: "마무리", v: "‘일주일 뒤 다시 연락드려도 될까요?’" },
  { t: "5분", k: "바로 기록", v: "가장 큰 문제 3가지를 적습니다." },
];

const REINFORCE = [
  { k: "말을 고객의 말로", v: "인터뷰에서 들은 표현으로 첫 화면을 다시 씁니다." },
  { k: "원한 결과에 맞추기", v: "기능을 늘리기보다, 고객이 원한 결과에 가까워지게 고칩니다." },
  { k: "내 취향 말고 반응으로", v: "이름·문구·디자인은 여러 안을 보여주고 반응 좋은 쪽을 남깁니다." },
  { k: "있는 기능을 더 깊게", v: "가장 많이 빠지는 칸을 다듬고, 효과 없는 기능은 뺍니다." },
];

const DECISIONS = [
  { k: "계속", v: "신호가 좋다 → 가장 큰 구멍을 계속 메운다" },
  { k: "방향 전환", v: "다른 고객·문제에서 반응이 더 좋다 → plan.md의 첫 고객·문제부터 다시" },
  { k: "멈춤", v: "신호가 없거나, 오래 풀고 싶은 문제가 아니다 → 배운 것을 남기고 새 아이디어로" },
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
            배포가 아니라 <b>배운 것</b> — 뒤쪽 &lsquo;배우는 법&rsquo;에서
            다룹니다.
          </p>
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
            label="새 기능이라면 — 먼저 기획서와 대조"
            command="docs/plan.md 의 핵심 가치와 이 요청이 맞는지 먼저 확인하고, 안 맞으면 만들기 전에 말해줘"
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

        {/* 배우는 법 — 개요 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>배우는 법</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            배포는 끝이 아니다 — <Blue>배운 것</Blue>이 생겨야 끝
          </h2>
          <p className="mt-3 text-[15px] leading-[1.7] text-[var(--s2-body)]">
            앱이 생긴 지금은 사이클의 3·4단계입니다.
          </p>
          <div className="mt-5">
            <StageCycle current={[2, 3]} />
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {LEARN_PARTS.map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                <span className="rounded-full border border-[var(--s2-line)] bg-[var(--s2-tint)] px-3.5 py-1.5 text-[13.5px] font-bold text-[var(--s2-strong)]">
                  {s}
                </span>
                {i < LEARN_PARTS.length - 1 && (
                  <span className="font-mono text-[13px] text-[var(--s2-arrow)]">
                    -&gt;
                  </span>
                )}
              </span>
            ))}
            <span className="font-mono rounded-full bg-[var(--s2-blue-soft)] px-3 py-1.5 text-[12px] text-[var(--s2-blue)]">
              ↻ 매주
            </span>
          </div>
        </section>

        {/* ① 무엇을 볼지 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>배우는 법 ①</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            무엇을 볼지 — <Blue>단계마다 행동 하나</Blue>
          </h2>
          <p className="mt-3 text-[15px] leading-[1.7] text-[var(--s2-body)]">
            칸마다 행동 하나를 정하면 <b>어디서 사람이 빠지는지</b> 보입니다.
          </p>
          <ol className="mt-5 flex flex-col rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)]">
            {FUNNEL.map((f, i) => (
              <li
                key={f.k}
                className="grid grid-cols-[2rem_1fr] gap-x-3 gap-y-0.5 border-b border-[var(--s2-divider)] px-4 py-3 last:border-b-0 md:grid-cols-[2rem_8rem_1fr]"
              >
                <span className="font-mono text-[13px] font-bold text-[var(--s2-blue)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[14px] font-extrabold text-[var(--s2-strong)]">
                  {f.k}{" "}
                  <span className="font-mono text-[11px] font-normal text-[var(--s2-faint)]">
                    {f.en}
                  </span>
                </span>
                <span className="col-span-2 text-[13.5px] leading-[1.6] text-[var(--s2-body)] md:col-span-1">
                  {f.v}
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-5">
            <CheckList
              items={[
                <>
                  <b>이번 주에 볼 숫자는 하나만</b>
                </>,
                <>
                  방문자 수 같은{" "}
                  <Tip tip="오르기만 하고 무엇을 고칠지는 알려주지 않는 숫자. 방문자 수 · 다운로드 수가 대표적입니다. 특정 행동과 이어진 숫자를 보세요.">
                    허영 지표
                  </Tip>
                  에 속지 않기
                </>,
              ]}
            />
          </div>
        </section>

        {/* ② 모으기 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>배우는 법 ②</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            모으기 — <Blue>숫자는 무엇이, 사람은 왜</Blue>
          </h2>
          <p className="mt-3 text-[15px] leading-[1.7] text-[var(--s2-body)]">
            사용자가 적은 지금은 <b>사람 쪽이 훨씬 빠릅니다</b>.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {CHANNELS.map((c) => (
              <div
                key={c.k}
                className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-5"
              >
                <p className="font-mono text-[11.5px] text-[var(--s2-blue)]">
                  {c.tag}
                </p>
                <p className="mt-1 text-[15.5px] font-extrabold">{c.k}</p>
                <p className="mt-1.5 text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
                  {c.v}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Term
              title="행동 기록 켜기 — 5장 Supabase 연동 후"
              lines={[
                {
                  dim: true,
                  text: "> 핵심 행동(조건에 맞는 공고 클릭)이 일어날 때마다 기록을 남겨줘.",
                },
                {
                  dim: true,
                  text: "> 남길 것: 시각 · 화면 · 어디서 왔는지. 이름·연락처 같은 개인정보는 빼고.",
                },
                {
                  dim: true,
                  text: "> 주별로 몇 명이 처음 왔고, 그중 몇 명이 핵심 행동을 했는지 볼 수 있게.",
                },
              ]}
            />
            <CopyBlock
              label="의견 창구 달기"
              command="모든 화면 오른쪽 아래에 '의견 보내기' 버튼을 달고, 누르면 내 이메일로 보내는 메일 창이 열리게 해줘"
            />
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              보여주며 관찰하기 — <Blue>20~30분 대본</Blue>
            </p>
            <TimedList rows={MVP_INTERVIEW} />
          </div>

          <div className="mt-6">
            <Callout title="사용자가 쌓이면 한 가지 질문">
              <b>
                &ldquo;더 이상 못 쓰게 되면 얼마나 실망하시겠어요?&rdquo;
              </b>{" "}
              &lsquo;매우 실망&rsquo;이 40%를 넘으면 꼭 필요한 제품이 되어 가는
              신호입니다.
            </Callout>
          </div>
        </section>

        {/* ③ 읽기 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>배우는 법 ③</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            읽기 — <Blue>가장 큰 구멍 하나</Blue>부터
          </h2>
          <div className="mt-5">
            <CheckList
              items={[
                <>
                  <b>가장 많이 빠지는 칸 하나부터</b> — 여러 곳을 동시에 고치지
                  않습니다
                </>,
                <>
                  <b>사람이 적을 땐 강한 신호만</b> — 첫 결과 하나에 방향을
                  통째로 바꾸지 않습니다
                </>,
                <>
                  <b>말보다 행동</b> — &ldquo;좋아요&rdquo;보다 다시 왔는지,
                  연락처를 남겼는지
                </>,
                <>
                  숫자가 <b>무엇</b>을 가리키면, 사람에게 <b>왜</b>를 묻습니다
                </>,
              ]}
            />
          </div>
        </section>

        {/* ④ 강화하기 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>배우는 법 ④</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            배운 것으로 <Blue>강화하기</Blue>
          </h2>
          <p className="mt-3 text-[15px] leading-[1.7] text-[var(--s2-body)]">
            방향은 <b>내 생각이 아니라 고객의 반응</b>이 정합니다.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {REINFORCE.map((r, i) => (
              <div
                key={r.k}
                className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-5"
              >
                <p className="font-mono text-[12px] text-[var(--s2-blue)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 text-[15.5px] font-extrabold">{r.k}</p>
                <p className="mt-1.5 text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
                  {r.v}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Term
              title="배포 직후 — 배운 것 남기기"
              lines={[
                {
                  dim: true,
                  text: "> 방금 배포한 변경을 docs/learning.md 에 추가해줘.",
                },
                { dim: true, text: ">   - 바꾼 것:" },
                { dim: true, text: ">   - 예상한 것: (1단계에서 적은 가설)" },
                { dim: true, text: ">   - 실제로 본 것: (숫자 + 만난 사람의 말)" },
                { dim: true, text: ">   - 다음에 할 것:" },
              ]}
            />
            <Term
              title="한 주가 끝나면 — 기획서로 되돌리기"
              lines={[
                {
                  dim: true,
                  text: "> docs/learning.md 를 읽고, docs/plan.md 에서 바뀌어야 할 칸과",
                },
                {
                  dim: true,
                  text: "> 그 근거가 된 기록을 짝지어 보여줘. 내가 확인하면 반영해줘.",
                },
              ]}
            />
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              몇 바퀴 돌았다면 — <Blue>계속, 전환, 멈춤</Blue>
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {DECISIONS.map((d) => (
                <div
                  key={d.k}
                  className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-5"
                >
                  <p className="text-[15.5px] font-extrabold">{d.k}</p>
                  <p className="mt-1.5 text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
                    {d.v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 매주 한 번 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>매주 한 번</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            배우는 리듬 — <Blue>일주일에 한 바퀴</Blue>
          </h2>
          <div className="mt-5">
            <MiniSteps
              items={[
                <>
                  <b>숫자 보기</b> — 가장 많이 빠지는 칸 찾기
                </>,
                <>
                  <b>사람 만나기</b> — 그 칸에서 빠진 사람에게 이유 묻기
                </>,
                <>
                  <b>가설 한 줄</b> — [이렇게 바꾸면] → [이 숫자가 오를 것이다]
                </>,
                <>
                  <b>작게 바꿔 배포</b> — 이번 주엔 하나만
                </>,
                <>
                  <b>기록</b> —{" "}
                  <span className="font-mono text-[13.5px]">learning.md</span> →{" "}
                  <span className="font-mono text-[13.5px]">plan.md</span>
                </>,
              ]}
            />
          </div>
        </section>

        {/* 마무리 */}
        <section className="rounded-[24px] border border-[var(--s2-info-line)] bg-[var(--s2-info-bg)] p-7 md:p-9">
          <p className="text-[18px] font-extrabold leading-[1.5] md:text-[20px]">
            방금 <Blue>이 사이트가 바뀌는 것</Blue>을 함께 봤습니다
          </p>
          <p className="mt-3 text-[14.5px] leading-[1.7] text-[var(--s2-body)]">
            요청 → 확인 → 커밋·푸시 → 자동 배포 → 배운 것 기록. 오늘 밤 열 번쯤
            돌려보세요. <b>완벽해질 때까지 기다리지 마세요.</b>
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
