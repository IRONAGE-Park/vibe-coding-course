import type { Metadata } from "next";
import Nav from "../components/Nav";
import CopyBlock from "../components/CopyBlock";
import StageCycle from "../components/StageCycle";
import StepRail from "../components/StepRail";
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
    "요청, 확인, 커밋·푸시, 자동 배포와 롤백, 그리고 배우는 법 — 무엇을 볼지 정하고, 데이터를 모으고, 읽고, 서비스를 강화하는 사이클.",
};

const TOTAL = 5;

const RAIL = [
  { id: "update-1", num: "01", label: "무엇을 고칠지" },
  { id: "update-2", num: "02", label: "결과 확인" },
  { id: "update-3", num: "03", label: "막혔을 때" },
  { id: "update-4", num: "04", label: "커밋 & 푸시" },
  { id: "update-5", num: "05", label: "자동 배포" },
];

/* 『Running Lean』 13장 — 근거는 docs/research/D-레퍼런스-창업초기.md */
const RULES = [
  {
    k: "기존 기능 80 : 새 기능 20",
    v: "출시 직후엔 시간의 대부분을 이미 있는 기능을 낫게 만드는 데 씁니다. 새 기능은 맨 뒤입니다.",
  },
  {
    k: "기능이 늘면 핵심이 흐려진다",
    v: "기능이 많을수록 이해하기 어렵고, 2장에서 정한 핵심 가치 한 줄이 묻힙니다. 새 기능마다 테스트·설명·충돌이라는 숨은 비용도 붙습니다.",
  },
  {
    k: "한 번에 하나만",
    v: "방금 바꾼 것이 효과가 있었는지 확인하기 전에는 다음 기능에 손대지 않습니다. 여러 개를 동시에 바꾸면 무엇이 통했는지 알 수 없습니다.",
  },
];

const LEARN_PARTS = [
  "① 무엇을 볼지 정하기",
  "② 데이터 모으기",
  "③ 읽기",
  "④ 강화하기",
];

/* 『Running Lean』의 해적 지표(획득·활성화·유지·수익·추천)를 오늘의 예로 */
const FUNNEL = [
  { k: "알게 됨", en: "획득", v: "첫 화면에서 목록을 한 번 이상 내려 본다" },
  { k: "첫 가치", en: "활성화", v: "조건에 맞는 공고 1개를 누른다 — 2장의 핵심 행동" },
  { k: "다시 옴", en: "유지", v: "일주일 안에 다시 들어온다 · 마감 알림을 신청한다" },
  { k: "돈", en: "수익", v: "유료 전환 · 선결제. 아직 가격이 없다면 연락처 남기기로 대신" },
  { k: "추천", en: "추천", v: "링크를 다른 창업팀에 공유한다" },
];

/* 데이터를 모으는 네 창구 */
const CHANNELS = [
  {
    k: "행동 기록",
    tag: "숫자 · 무엇이",
    v: "①에서 정한 행동이 일어날 때마다 언제, 어느 화면에서, 어디서 왔는지를 남깁니다. 모아 볼 땐 첫 방문 주별로 묶어서 — 이번 주에 바꾼 것이 효과가 있었는지 지난주 사람들과 비교할 수 있습니다.",
    src: "RL 10장 · 부록",
  },
  {
    k: "보여주며 관찰",
    tag: "사람 · 왜",
    v: "2장에서 인터뷰했던 ‘따뜻한’ 첫 고객에게 먼저 보여줍니다. 마주 앉아 20분 동안 설명해도 설득하지 못한다면, 처음 온 사람을 몇 초 만에 설득할 수는 없습니다. 대본은 아래에.",
    src: "RL 11장",
  },
  {
    k: "의견 창구",
    tag: "사람 · 왜",
    v: "모든 화면에 연락할 방법을 두고, 창업자가 직접 받습니다. 투표로 기능을 정하지 않습니다 — 표가 많은 요청이 가장 중요한 요청은 아니고, 모든 사용자가 똑같이 중요한 것도 아닙니다.",
    src: "RL 12장",
  },
  {
    k: "떠난 사람 · 남은 사람",
    tag: "사람 · 왜",
    v: "안 쓰게 된 사람에게는 이유를, 계속 쓰는 사람에게는 ‘왜 쓰는지 · 어디서 알았는지’를 묻고 짧은 후기를 부탁합니다. 무료 체험이 끝나면 ‘예 / 아니요’를 받고, ‘글쎄요’는 아니요로 적습니다.",
    src: "RL 12장 · PP 23장",
  },
];

/* 『Running Lean』 11장의 MVP 인터뷰 대본을 줄인 것 */
const MVP_INTERVIEW = [
  {
    t: "2분",
    k: "인사",
    v: "거의 완성된 제품을 보여드리고 의견을 듣고 싶다고, 화면을 보며 떠오르는 생각을 소리 내어 말해 달라고 부탁합니다.",
  },
  {
    t: "2분",
    k: "첫 화면만",
    v: "아무것도 누르지 말고 이게 무엇을 해 주는 서비스 같은지, 다음에 뭘 하고 싶은지 말해 달라고 합니다.",
  },
  {
    t: "3분",
    k: "가격",
    v: "가격이 있다면 보여주고 반응을 적습니다. 아직 없다면 ‘출시되면 알림 받으시겠어요?’로 연락처를 부탁합니다.",
  },
  {
    t: "15분",
    k: "가입 · 핵심 행동",
    v: "직접 해 보게 하고 옆에서 봅니다. 도와주지 말고, 멈칫하거나 헤매는 곳을 적습니다.",
  },
  {
    t: "2분",
    k: "마무리",
    v: "아쉬운 점을 묻고, ‘일주일 뒤에 다시 연락드려도 될까요?’로 다음 대화를 약속합니다.",
  },
  {
    t: "5분",
    k: "바로 기록",
    v: "가장 큰 문제 3가지를 각자 적고 맞춰 봅니다.",
  },
];

/* 배운 것으로 강화하는 네 방향 */
const REINFORCE = [
  {
    k: "말을 고객의 말로",
    v: "고객이 쓴 단어로 첫 화면을 다시 씁니다. 『Running Lean』의 사진 공유 서비스는 ‘업로드가 필요 없다’는 기술 설명을 바쁜 부모의 하루 이야기로 바꾸자 ‘이게 내 얘기’라는 반응이 나왔습니다.",
    src: "RL 7·12장",
  },
  {
    k: "최상의 이득에 맞추기",
    v: "『핑크 펭귄』의 장례식장은 고객과 긴 대화를 나눈 뒤 브로슈어를 시설 사진에서 고객 사진으로 바꾸고, 위로하는 데 더 많은 시간을 쓰도록 일하는 방식 자체를 고쳤습니다. 기능이 아니라 고객이 원한 것을 키웠습니다.",
    src: "PP 6장",
  },
  {
    k: "내 취향 말고 반응으로",
    v: "『핑크 펭귄』 저자가 마음에 들어 붙인 워크숍 이름에는 10~15명, 진부하다고 여긴 새 이름에는 50명이 등록했습니다. 이름 · 문구 · 디자인은 여러 안을 사람에게 보여주고, 반응이 좋은 쪽을 남깁니다.",
    src: "PP 12·15장",
  },
  {
    k: "있는 기능을 더 깊게",
    v: "새 기능보다 사람이 가장 많이 빠지는 칸의 기능을 다듬습니다. 작은 변경 하나를 배포하고, 효과를 본 뒤 다음으로. 효과가 없으면 과감히 뺍니다.",
    src: "RL 12·13장",
  },
];

/* 배운 뒤의 결정 — 『Running Lean』 14장 */
const DECISIONS = [
  {
    k: "계속",
    v: "신호가 좋다 → 같은 방향에서 가장 큰 구멍을 계속 메웁니다.",
  },
  {
    k: "방향 전환",
    v: "다른 고객 유형이나 다른 문제에서 반응이 더 좋다 → plan.md의 첫 고객 · 문제 칸부터 다시 씁니다.",
  },
  {
    k: "멈춤",
    v: "몇 바퀴를 돌아도 신호가 없거나, 내가 오래 풀고 싶은 문제가 아니다 → 배운 것을 남기고 새 아이디어로.",
  },
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
            첫 배포가 끝났다면 여기서부터가 진짜입니다. 배포는 더 이상 큰
            행사가 아니라 <b>하루에 몇 번씩 하는 일</b>이 됩니다.
          </p>
          <p className="mt-3 text-[14.5px] leading-[1.65] text-[var(--s2-body)]">
            『Running Lean』은 이 반복을 <b>만들기 → 측정 → 배우기</b> 루프라고
            부릅니다. 한 바퀴의 끝은 배포가 아니라 <b>배운 것</b>입니다 — 그래서
            이 장 뒤쪽에 <b>&lsquo;배우는 법&rsquo;</b>을 네 부분으로 두었습니다.
          </p>
        </section>

        {/* 업데이트 원칙 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>업데이트 원칙</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            기능을 <Blue>밀어 넣지 말고</Blue>, 끌려오게
          </h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-[var(--s2-body)]">
            배포가 쉬워지면 기능을 계속 얹고 싶어집니다. 『Running Lean』은 이걸
            &lsquo;기능 밀어붙이기&rsquo;라 부르며 경계합니다. 좋은 시장에서는
            고객이 제품을 끌어당깁니다 — 정말 필요한 기능은{" "}
            <b>사용자가 먼저 요구합니다</b>.
          </p>
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
          <div className="rounded-[16px] border border-[var(--s2-info-line)] bg-[var(--s2-info-bg)] p-5">
            <p className="mb-2 text-[14.5px] font-extrabold">
              한 줄 더 — <Blue>왜 바꾸는지</Blue>를 가설로
            </p>
            <p className="font-mono text-[13px] text-[var(--s2-strong)]">
              [이렇게 바꾸면] → [이런 결과가 나올 것이다]
            </p>
            <p className="mt-2 text-[14px] leading-[1.65] text-[var(--s2-body)]">
              예) 메인 상단에 &lsquo;마감 임박순&rsquo; 정렬을 넣으면 → 처음 온
              사람이 30초 안에 공고 하나를 누를 것이다. 결과가 기대에 못 미쳐도
              괜찮습니다. 미리 적어 두기만 해도 &ldquo;됐다 / 안 됐다&rdquo;를
              기분이 아니라 <b>기준으로</b> 판단하게 됩니다.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[15px] font-extrabold">
              고칠 거리는 <Blue>이 순서로</Blue> 고릅니다
            </p>
            <MiniSteps
              items={[
                <>
                  <b>사람들이 막힌 곳</b> — 처음 보는 사람에게 보여줬을 때 멈칫한
                  자리, 기록에서 사람이 가장 많이 빠지는 칸 (아래 &lsquo;배우는
                  법&rsquo; 참고)
                </>,
                <>
                  <b>이미 있는 기능을 더 낫게</b> — 느리거나, 헷갈리거나, 보기
                  불편한 곳
                </>,
                <>
                  <b>새 기능</b> — 2장{" "}
                  <span className="font-mono text-[13.5px]">requirements.md</span>
                  의 &lsquo;있으면 좋음&rsquo; 목록에서, 한 번에 하나
                </>,
              ]}
            />
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
          <CopyBlock
            label="새 기능이라면 — 먼저 기획서와 대조"
            command="docs/plan.md 의 핵심 가치와 이 요청이 맞는지 먼저 확인하고, 안 맞으면 만들기 전에 말해줘"
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
          <div className="flex flex-col gap-2">
            <p className="text-[15px] font-extrabold">
              내 눈 다음은 <Blue>처음 보는 사람의 눈</Blue>
            </p>
            <MiniSteps
              items={[
                <>옆 사람에게 화면을 보여주되, 설명은 하지 않습니다.</>,
                <>
                  <b>
                    &ldquo;아무것도 누르지 말고, 이게 뭐 하는 서비스 같은지
                    말씀해 주세요.&rdquo;
                  </b>{" "}
                  — 대답이 막히면 첫 화면 문구를 고칠 차례입니다.
                </>,
                <>
                  이번엔 2장에서 정한 핵심 행동을 부탁합니다. 생각을 소리 내어
                  말하게 하고, <b>멈칫하는 곳</b>을 적습니다.
                </>,
              ]}
            />
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              &ldquo;좋네요&rdquo;는 흘려들으세요. 칭찬보다 멈칫한 자리가 다음
              업데이트 거리입니다. 『Running Lean』은 이런 테스트를{" "}
              <b>5명만 해도 문제 대부분이 드러난다</b>는 사용성 연구를
              소개합니다. 강의 뒤에 쓸 20분 대본은 아래 &lsquo;배우는 법
              ②&rsquo;에 있습니다.
            </p>
          </div>
          <Callout title="디자인이 조각나지 않게">
            『핑크 펭귄』은 기능이 같아도 사람들은 <b>보기 좋은 쪽을 더 믿고
            더 쉽게 쓴다</b>고 말합니다 — 기능이 똑같은 ATM 두 대로 한 실험에서
            화면이 보기 좋은 쪽을 더 빨리 썼습니다. 반대로 필요할 때마다
            하나씩 덧대면 색과 버튼이 제각각인 조각보가 되고, 신뢰가
            떨어집니다. 규칙을 한 번 문서로 남겨 두세요.
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
          <p className="text-[14.5px] leading-[1.65] text-[var(--s2-body)]">
            같은 오류가 <b>두 번째</b> 나면 한 줄을 더 붙이세요. 『Running
            Lean』은 문제가 생길 때마다 &lsquo;왜?&rsquo;를 거듭 물어 뿌리를
            찾고, 다음엔 같은 문제가 없도록 막는 장치를 더하라고 권합니다.
          </p>
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
                <b>모아서 한 번에 말고, 작게 자주</b> — 『Running Lean』은 배포되지
                않은 코드를 창고에 쌓인 재고로 봅니다. 2주 치를 모아 올리지 말고
                몇 시간 작업마다 올리세요
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

        {/* 배우는 법 — 개요 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>배우는 법</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            배포는 끝이 아니다 — <Blue>배운 것</Blue>이 생겨야 끝
          </h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-[var(--s2-body)]">
            『Running Lean』은 &lsquo;완료&rsquo;를 다르게 정의합니다. 코드가
            배포된 게 아니라, 사용자가 써 보고 <b>무언가를 배웠을 때</b>가
            완료입니다. 앱이 생긴 지금부터는 2장에서 본 아이템 발전 사이클의
            3·4단계 — 직접 보여주며 작게 확인하고, 기록된 행동으로 크게
            확인하는 단계입니다.
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

        {/* 배우는 법 ① 무엇을 볼지 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>배우는 법 ①</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            무엇을 볼지 정하기 — <Blue>단계마다 행동 하나</Blue>
          </h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-[var(--s2-body)]">
            『Running Lean』은 사용자의 여정을 다섯 칸으로 나눠 봅니다. 칸마다
            &lsquo;이 행동을 하면 이 단계를 지난 것&rsquo;이라고 정해 두면,{" "}
            <b>어디서 사람이 빠지는지</b>가 보입니다.
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
                  <b>이번 주에 볼 숫자는 하나만</b> — 여러 목표를 한꺼번에 쫓으면
                  결과를 읽을 수 없습니다
                </>,
                <>
                  <b>좋은 숫자의 세 조건</b> — 특정 행동과 이어지고, 누구나 보고
                  이해할 수 있고, 어떻게 나온 숫자인지 따라갈 수 있을 것
                </>,
                <>
                  <b>방문자 수 · 다운로드 수는 &lsquo;허영 지표&rsquo;</b> —
                  오르기만 하고 무엇을 고칠지는 알려주지 않습니다
                </>,
                <>
                  <b>서비스 성격에 따라 가장 중요한 칸이 다릅니다</b> — 한 번
                  쓰고 끝나는 서비스는 첫 가치, 반복해서 쓰는 서비스는 다시 옴
                </>,
              ]}
            />
          </div>
        </section>

        {/* 배우는 법 ② 모으기 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>배우는 법 ②</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            데이터 모으기 — <Blue>숫자는 무엇이, 사람은 왜</Blue>를 알려줍니다
          </h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-[var(--s2-body)]">
            숫자만 보면 이유를 모르고, 사람만 만나면 크기를 모릅니다. 둘 다
            모읍니다. 다만 사용자가 적은 지금은 사람 쪽이 훨씬 빨리 가르쳐
            줍니다 — 『Running Lean』의 저자는 광고로 3주 넘게 비교 실험을
            돌려도 결론이 나지 않았지만, 직접 만난 인터뷰에서는 짧은 시간에{" "}
            <b>&lsquo;왜&rsquo;</b>를 배웠습니다.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {CHANNELS.map((c) => (
              <div
                key={c.k}
                className="flex flex-col rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-5"
              >
                <p className="font-mono text-[11.5px] text-[var(--s2-blue)]">
                  {c.tag}
                </p>
                <p className="mt-1 text-[15.5px] font-extrabold">{c.k}</p>
                <p className="mt-1.5 text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
                  {c.v}
                </p>
                <p className="mt-auto pt-3 font-mono text-[11px] text-[var(--s2-faint)]">
                  {c.src}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Term
              title="행동 기록 켜기"
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
            <p className="text-[13.5px] leading-[1.65] text-[var(--s2-gray)]">
              기록을 저장하려면 5장의 Supabase 연동이 필요합니다. 처음부터
              모든 걸 재지 말고, ①에서 정한 행동 몇 개만 남기세요.
            </p>
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
              계속 쓰는 사람이 어느 정도 생기면 물어보세요 —{" "}
              <b>
                &ldquo;이 서비스를 더 이상 못 쓰게 되면 얼마나 실망하시겠어요?&rdquo;
              </b>{" "}
              &lsquo;매우 실망&rsquo;이 40%를 넘으면 꼭 필요한 제품이 되어
              간다는 신호입니다(『Running Lean』이 소개한 숀 엘리스의 기준). 너무
              일찍 물으면 의미가 없으니, 계속 쓰는 사람이 쌓인 뒤에.
            </Callout>
          </div>
        </section>

        {/* 배우는 법 ③ 읽기 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>배우는 법 ③</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            데이터 읽기 — <Blue>가장 큰 구멍 하나</Blue>부터
          </h2>
          <div className="mt-5">
            <CheckList
              items={[
                <>
                  <b>가장 많이 빠지는 칸 하나부터</b> — 다섯 칸 중 사람이 가장
                  많이 빠지는 곳이 이번 주 고칠 거리입니다. 여러 곳을 동시에
                  고치면 무엇이 통했는지 모릅니다
                </>,
                <>
                  <b>사람이 적을 땐 강한 신호만 믿기</b> — 크게 부정적이면 빨리
                  바꾸고, 긍정적이면 계속 가되 나중에 숫자로 다시 확인합니다. 첫
                  결과 하나에 방향을 통째로 바꾸지도, 다 됐다고 안심하지도
                  않습니다
                </>,
                <>
                  <b>평균은 쉽게 속입니다</b> — 사용자가 적으면 자동 방문이나 첫
                  고객이 아닌 사람 몇 명이 숫자를 흔듭니다. 숫자 뒤의 사람 목록을
                  직접 보세요
                </>,
                <>
                  <b>말보다 행동</b> — &ldquo;좋아요&rdquo;보다 다시
                  들어왔는지, 연락처를 남겼는지를 믿습니다
                </>,
                <>
                  <b>파란불에 집중</b> — 확실히 원하는 사람에게 시간을 쓰고,
                  망설이는 사람을 설득하느라 매달리지 않습니다(『핑크 펭귄』).
                  가장 반응이 뜨거운 사람들의 공통점이 다음 첫 고객입니다
                </>,
                <>
                  <b>숫자가 &lsquo;무엇&rsquo;을 가리키면, 사람에게
                  &lsquo;왜&rsquo;를</b> — 빠진 칸이 보이면 그 칸에서 빠진 사람
                  몇 명에게 직접 묻습니다
                </>,
              ]}
            />
          </div>
        </section>

        {/* 배우는 법 ④ 강화하기 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>배우는 법 ④</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            배운 것으로 <Blue>강화하기</Blue>
          </h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-[var(--s2-body)]">
            배운 것은 네 방향으로 서비스를 단단하게 만듭니다. 공통점은 하나 —{" "}
            <b>내 생각이 아니라 고객의 반응</b>이 방향을 정합니다.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {REINFORCE.map((r, i) => (
              <div
                key={r.k}
                className="flex flex-col rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-5"
              >
                <p className="font-mono text-[12px] text-[var(--s2-blue)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 text-[15.5px] font-extrabold">{r.k}</p>
                <p className="mt-1.5 text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
                  {r.v}
                </p>
                <p className="mt-auto pt-3 font-mono text-[11px] text-[var(--s2-faint)]">
                  {r.src}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              배운 것을 <Blue>문서에 남기고, 기획서로 되돌리기</Blue>
            </p>
            <Term
              title="배포 직후 Claude Code에게"
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
              title="한 주가 끝나면"
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
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              『Running Lean』은 매 사이클의 끝에 배운 것을 캔버스에 반영하라고
              합니다. 2장의 plan.md가 추측에서 사실로 조금씩 바뀌어 가는 것 —
              그게 서비스가 강해지는 과정입니다.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              몇 바퀴 돌았다면 — <Blue>계속, 전환, 멈춤</Blue> 중 하나를 고릅니다
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
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              『Running Lean』의 저자는 사진 공유 서비스를 운영하며 부모보다
              웨딩 사진사가 돈을 더 잘 낸다는 걸 배웠지만, 그 고객들의 문제에
              열정을 느끼지 못해 결국 다른 길을 택했습니다. 데이터와 함께{" "}
              <b>&lsquo;이 문제를 오래 풀고 싶은가&rsquo;</b>도 물으세요.
            </p>
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
                  <b>숫자 보기</b> — 주별로 묶은 기록에서 사람이 가장 많이 빠지는
                  칸을 찾습니다
                </>,
                <>
                  <b>사람 만나기</b> — 그 칸에서 빠진 사람, 남은 사람 몇 명에게
                  이유를 묻습니다
                </>,
                <>
                  <b>가설 한 줄</b> — [이렇게 바꾸면] → [이 숫자가 오를 것이다]
                </>,
                <>
                  <b>작게 바꿔 배포</b> — 이번 주엔 하나만. 이 장의 1~5단계 그대로
                </>,
                <>
                  <b>기록</b> —{" "}
                  <span className="font-mono text-[13.5px]">learning.md</span>에
                  적고, 달라진 사실은{" "}
                  <span className="font-mono text-[13.5px]">plan.md</span>에
                  반영합니다
                </>,
              ]}
            />
          </div>
          <p className="mt-4 text-[14.5px] leading-[1.7] text-[var(--s2-body)]">
            『Running Lean』은 인터뷰도 지표도 한 주 단위로 모아 보고, 결과를{" "}
            <b>예상한 것 → 실제로 본 것 → 다음 할 일</b>로 팀과 나누라고
            권합니다. 누구나 볼 수 있게 두면, 틀린 가정도 빨리 드러납니다. 그리고
            『핑크 펭귄』의 말처럼 오늘의 빅아이디어도 언젠가 낡습니다 — 이
            리듬이 서비스를 계속 새롭게 합니다.
          </p>
        </section>

        {/* 마무리 */}
        <section className="rounded-[24px] border border-[var(--s2-info-line)] bg-[var(--s2-info-bg)] p-7 md:p-9">
          <p className="text-[18px] font-extrabold leading-[1.5] md:text-[20px]">
            방금 <Blue>이 사이트가 바뀌는 것</Blue>을 함께 봤습니다
          </p>
          <p className="mt-3 text-[14.5px] leading-[1.7] text-[var(--s2-body)]">
            요청 한 문장 → 확인 → 오류 해결 → 커밋·푸시 → 자동 배포 → 배운 것
            기록. 여러분의 서비스도 이 사이클을 돌리면 됩니다. 오늘 밤 열 번쯤
            돌려보세요.
          </p>
          <p className="mt-3 text-[14.5px] leading-[1.7] text-[var(--s2-body)]">
            완벽해질 때까지 기다리지 마세요. 『핑크 펭귄』에는 더 멋진 이름을
            찾겠다며 1년 동안 아이디어를 실행하지 못한 사업가가 나옵니다.
            저자의 결론은 간단합니다 — 통하는 이름으로 먼저 시작했다면, 쓰는
            동안 더 나은 이름을 찾았을 거라고. <b>서비스도 같습니다.</b>
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
