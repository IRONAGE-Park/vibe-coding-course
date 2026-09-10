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
  Ext,
  MiniSteps,
  PageHero,
  Pager,
  SiteFooter,
  StepCard,
  Term,
  TimedList,
} from "../components/ui";

export const metadata: Metadata = {
  title: "02 문제 정의 | 바이브코딩과 함께 살아남기",
  description:
    "창업 아이템을 Claude Code와 대화하며 문제부터 정의하고, 한 장짜리 기획서와 요구사항 명세를 만들어 앱 초안 개발까지 지시하는 과정. 아이템을 키우는 사이클과 데이터를 모으는 법까지.",
};

const TOTAL = 5;

const RAIL = [
  { id: "plan-1", num: "01", label: "AI와 대화 시작" },
  { id: "plan-2", num: "02", label: "문제 정의" },
  { id: "plan-3", num: "03", label: "기획서" },
  { id: "plan-4", num: "04", label: "요구사항 명세" },
  { id: "plan-5", num: "05", label: "개발 지시" },
];

const FLOW = [
  { k: "문제 정의", v: "무엇이 불편한가" },
  { k: "기획서", v: "docs/plan.md" },
  { k: "요구사항 명세", v: "docs/requirements.md" },
  { k: "개발 지시", v: "앱 초안" },
];

/* 『Running Lean』·『핑크 펭귄』에서 가져온 원칙 — 근거는 docs/research/D-레퍼런스-창업초기.md */
const PRINCIPLES = [
  {
    k: "제품이 아니라 고객부터",
    v: "“우리는 ○○ 앱을 만듭니다”로 시작하면 같은 말을 하는 수많은 경쟁자 사이에 묻힙니다. 출발점은 제품이 아니라, 가장 돕고 싶은 고객 한 유형입니다.",
    src: "핑크 펭귄 1·2장",
  },
  {
    k: "해결책은 최대한 늦게",
    v: "고객은 우리의 해결책이 아니라 자기 문제에 관심이 있습니다. 해결책을 일찍 못 박을수록 아무도 원하지 않는 것을 만들 위험이 커집니다.",
    src: "Running Lean 1·3장",
  },
  {
    k: "오늘 문서는 가설이다",
    v: "『Running Lean』에 따르면 성공한 스타트업의 약 3분의 2는 처음 계획과 다른 길로 갔습니다. 목표는 완벽한 기획이 아니라, 빨리 확인하고 고칠 수 있는 기획입니다.",
    src: "Running Lean 소개",
  },
];

/* 사이클 한 바퀴의 모양 */
const LOOP = [
  "가장 위험한 가정 고르기",
  "가설 한 문장",
  "가장 작은 실험",
  "기록",
  "plan.md 고치기",
];

/* 『Running Lean』 2장 — 책 자체를 이 사이클로 만든 과정 */
const BOOK_CASE = [
  {
    k: "문제 이해",
    v: "책을 내 달라던 독자들에게 직접 전화 — ‘이론은 많은데 따라 할 단계별 안내가 없다’는 문제를 확인",
  },
  {
    k: "해결책 정의",
    v: "하루 만에 목차와 가제만 있는 소개 페이지를 만들어 공개 — 석 달 만에 이메일 1,000개",
  },
  {
    k: "작게 검증",
    v: "책 대신 슬라이드로 무료 워크숍 → 유료로 바꾸고, 가격을 두 배씩 올려 저항이 생기는 지점 확인",
  },
  {
    k: "크게 검증",
    v: "선주문을 받고 2주마다 원고를 보내며 고침 — 혼자 판 부수가 쌓이자 출판사가 먼저 연락",
  },
];

/* 린 캔버스를 오늘 실습용으로 줄인 9칸 */
const CANVAS = [
  { num: "①", title: "서비스 이름", ex: "공고레이더 — 짧게, 약어 말고. 임시여도 OK" },
  {
    num: "②",
    title: "문제 (최대 3개)",
    ex: "공고가 흩어져 있다 · 우리 조건인지 모른다 · 마감을 놓친다",
  },
  { num: "③", title: "지금의 대안", ex: "매일 사이트 순회 · 단톡방 공유 · 그냥 놓침" },
  {
    num: "④",
    title: "첫 고객",
    ex: "가장 절실한 한 유형 — 3인 이하 예비창업팀 대표",
  },
  {
    num: "⑤",
    title: "핵심 가치 한 줄",
    ex: "받을 수 있는 지원금을 마감 전에 놓치지 않는다",
  },
  { num: "⑥", title: "해결책", ex: "문제마다 가장 간단한 기능 하나 — 그중 1개가 킬러" },
  { num: "⑦", title: "화면 구성", ex: "메인 + 상세 1~2개" },
  {
    num: "⑧",
    title: "수익",
    ex: "누가, 얼마를 내나 — 쓰는 사람과 내는 사람이 다르면 둘 다. 모르면 ‘모름’",
  },
  {
    num: "⑨",
    title: "성공 신호",
    ex: "핵심 행동 1개 — 첫 방문 30초 안에 공고 1개 클릭",
  },
];

const CHAIN_LABELS = ["기능", "혜택", "최상의 이득"];
const VALUE_CHAINS = [
  {
    name: "이력서 서비스 — 『Running Lean』의 예",
    steps: ["전문가급 템플릿", "돋보이는 이력서", "원하던 회사에 합격"],
  },
  {
    name: "지원사업 서비스 — 오늘의 예",
    steps: ["조건 필터", "맞는 공고만 모아 보기", "받을 수 있는 지원금을 놓치지 않기"],
  },
];

/* 신호의 세기 — 말보다 행동, 행동 중에서도 돈이 가장 강합니다 */
const SIGNALS = [
  { k: "칭찬", v: "“좋네요”" },
  { k: "말로 수락", v: "“나오면 쓸게요”" },
  { k: "연락처", v: "출시 알림 신청" },
  { k: "시간", v: "30분 인터뷰 · 지인 소개" },
  { k: "돈", v: "선결제 · 계약금" },
];

function signalClass(i: number) {
  if (i === 0)
    return "border-[var(--s2-line)] bg-[var(--s2-tint)] text-[var(--s2-gray)]";
  if (i === SIGNALS.length - 1)
    return "border-[var(--s2-blue)] bg-[var(--s2-blue)] text-[var(--s2-on-blue)]";
  if (i === SIGNALS.length - 2)
    return "border-[var(--s2-blue)] bg-[var(--s2-blue-soft)] text-[var(--s2-strong)]";
  return "border-[var(--s2-line)] bg-[var(--s2-card)] text-[var(--s2-strong)]";
}

/* 앱이 생기기 전에 데이터를 얻는 방법 — 싸고 빠른 순서 */
const METHODS = [
  {
    k: "관찰",
    when: "문제 이해",
    how: "고객이 그 일을 하는 모습을 옆에서 봅니다. 『Running Lean』의 저자는 매주 2시간을 비워 누구든 30분씩 대화를 신청할 수 있게 열어 두고, 반복되는 문제를 찾았습니다.",
    get: "고객도 말로 설명하지 못하는 불편",
    src: "RL 7장",
  },
  {
    k: "문제 인터뷰",
    when: "문제 이해",
    how: "20~30분, 가능하면 직접 만나서. 해결책은 꺼내지 않고 문제의 순위와 지금의 해결 방법을 묻습니다. 대본은 아래에.",
    get: "꼭 필요한 문제 · 지금의 대안 · 첫 고객의 모습",
    src: "RL 6·7장",
  },
  {
    k: "소개 페이지",
    when: "문제 → 해결책",
    how: "문제와 핵심 가치 한 줄만 적은 한 페이지에 ‘출시 알림 받기’를 답니다. 해결책은 자세히 보여주지 않습니다. 오늘 배운 방법이면 금방 만듭니다.",
    get: "관심 있는 사람의 연락처 = 다음 인터뷰 대상",
    src: "RL 2장 · 부록",
  },
  {
    k: "데모 · 목업",
    when: "해결책 정의",
    how: "만들기 전에 화면 그림이나 짧은 시연 영상으로 보여줍니다. 드롭박스는 제품보다 3분짜리 영상이 먼저였습니다. 예시 데이터는 진짜처럼.",
    get: "어떤 기능이 꼭 필요하고 무엇을 빼도 되는지",
    src: "RL 5·8장",
  },
  {
    k: "가격 제시",
    when: "해결책 정의",
    how: "‘얼마면 사겠어요?’가 아니라 ‘월 ○원을 생각합니다’라고 말하고 반응을 적습니다. 모두 쉽게 받아들이면 더 높여 봅니다.",
    get: "받을 수 있는 가격 · 누가 돈을 내는지",
    src: "RL 8장",
  },
  {
    k: "손으로 먼저 · 무료 시범",
    when: "해결책 → 작게 검증",
    how: "자동화하기 전에 몇 명에게 손으로 먼저 해 줍니다. 가치의 일부를 무료로 주되, 끝나면 ‘예 / 아니요’로 답하기로 미리 약속합니다.",
    get: "실제로 쓰는지 · 돈을 낼지 · 어디를 자동화할지",
    src: "RL 5장 · PP 21·23·26장",
  },
];

/* 『Running Lean』 7장의 문제 인터뷰 대본을 줄인 것 */
const INTERVIEW = [
  {
    t: "2분",
    k: "인사 · 목적",
    v: "아직 파는 게 아니라 배우러 왔다고 먼저 말합니다. 그래야 상대가 편하게 이야기합니다.",
  },
  {
    t: "2분",
    k: "기본 정보",
    v: "이 사람이 첫 고객 유형에 맞는지 확인하는 질문 몇 개.",
  },
  {
    t: "2분",
    k: "문제 이야기",
    v: "우리가 생각한 문제 상황을 짧은 이야기로 들려주고 공감이 되는지 묻습니다.",
  },
  {
    t: "4분",
    k: "문제 순위",
    v: "문제 3개의 순위를 매겨 달라고 합니다. 사람마다 말하는 순서를 바꿔서 — 순서가 답을 흔들지 않게.",
  },
  {
    t: "15분",
    k: "지금은 어떻게 하나",
    v: "핵심. 지금 쓰는 방법 · 도구 · 과정을 자세히, 그 방법을 어떻게 알게 됐는지까지. 중요하다던 문제를 실제로는 방치하고 있다면 이유를 더 묻습니다.",
  },
  {
    t: "2분",
    k: "마무리",
    v: "나중에 시제품을 보여드려도 될지, 비슷한 분을 소개해 주실 수 있을지 묻습니다.",
  },
  {
    t: "5분",
    k: "바로 기록",
    v: "헤어지자마자 적습니다. 둘이 갔다면 각자 따로 적고 나중에 맞춰 봅니다.",
  },
];

export default function PlanPage() {
  return (
    <div>
      <Nav />
      <PageHero
        num="02"
        label="Chapter 02"
        title={
          <>
            <Blue>문제 정의</Blue> — AI와 함께 기획서까지
          </>
        }
        sub={
          <>
            여기서 Claude Code를 처음 씁니다. 혼자 기획서를 쓰는 게 아니라,{" "}
            <b>AI와 주고받으며</b> 문제를 좁히고 → 기획서 → 요구사항 명세까지
            문서로 만듭니다. 3장은 이 문서를 근거로 앱을 만듭니다.
          </>
        }
      />

      <StepRail items={RAIL} />

      <main className="mx-auto w-full flex max-w-5xl flex-col gap-8 px-5 py-12 md:px-8">
        {/* 흐름 요약 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <p className="mb-5 text-[18px] font-extrabold">
            이 장에서 만들 것 — <Blue>문서 2개</Blue>
          </p>
          <div className="flex flex-wrap items-center gap-2.5">
            {FLOW.map((s, i) => (
              <span key={s.k} className="flex items-center gap-2.5">
                <span
                  className={`flex flex-col rounded-[14px] border px-4 py-2.5 ${
                    i === 1 || i === 2
                      ? "border-[var(--s2-blue)] bg-[var(--s2-blue-soft)]"
                      : "border-[var(--s2-line)] bg-[var(--s2-card)]"
                  }`}
                >
                  <span className="text-[14px] font-bold text-[var(--s2-strong)]">
                    {s.k}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--s2-gray)]">
                    {s.v}
                  </span>
                </span>
                {i < FLOW.length - 1 && (
                  <span className="font-mono text-[14px] text-[var(--s2-arrow)]">
                    -&gt;
                  </span>
                )}
              </span>
            ))}
          </div>
          <p className="mt-5 text-[14.5px] leading-[1.65] text-[var(--s2-body)]">
            파란 두 칸이 오늘의 산출물입니다. 이 문서가 있으면 AI는{" "}
            <b>매번 처음부터 설명하지 않아도</b> 같은 방향으로 일합니다 — 대화가
            길어져 새 세션을 열어도 문서만 읽히면 그대로 이어집니다.
          </p>
        </section>

        {/* 창업 초기 원칙 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>창업 초기 원칙</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            이제 질문은 &ldquo;만들 수 있나&rdquo;가 아니라{" "}
            <Blue>&ldquo;만들어야 하나&rdquo;</Blue>
          </h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-[var(--s2-body)]">
            에릭 리스는 『Running Lean』 서문에서, 만드는 비용이 싸질수록
            &ldquo;정말로 만들어야 할까?&rdquo;가 더 중요한 질문이 된다고
            말합니다. AI로 하루 만에 앱이 나오는 지금은 더 그렇습니다. 그래서 이
            장은 코드 대신 <b>세 가지 원칙</b>으로 시작합니다.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {PRINCIPLES.map((c, i) => (
              <div
                key={c.k}
                className="flex flex-col rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-5"
              >
                <p className="font-mono text-[12px] text-[var(--s2-blue)]">
                  {String(i + 1).padStart(2, "0")}
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
        </section>

        {/* 아이템 발전 사이클 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>아이템 발전 사이클</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            아이디어는 <Blue>네 단계를 돌며</Blue> 자랍니다
          </h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-[var(--s2-body)]">
            『Running Lean』은 아이디어를 키우는 과정을 하나의 틀로 반복합니다 —{" "}
            <b>문제를 이해하고, 해결책을 정의하고, 작게 확인한 뒤, 크게
            확인한다.</b> 단계마다 확인할 것, 데이터를 얻는 방법, 다음으로
            넘어가도 되는 기준이 다릅니다. 오늘 2장은 1·2단계를 대화와 문서로
            빠르게 한 바퀴 도는 것입니다.
          </p>
          <div className="mt-5">
            <StageCycle current={[0, 1]} />
          </div>

          <div className="mt-6 rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-5">
            <p className="mb-3 text-[15px] font-extrabold">
              단계 안에서 도는 <Blue>한 바퀴의 모양</Blue>
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {LOOP.map((s, i) => (
                <span key={s} className="flex items-center gap-2">
                  <span className="rounded-full border border-[var(--s2-line)] bg-[var(--s2-card)] px-3.5 py-1.5 text-[13.5px] font-bold text-[var(--s2-strong)]">
                    {s}
                  </span>
                  {i < LOOP.length - 1 && (
                    <span className="font-mono text-[13px] text-[var(--s2-arrow)]">
                      -&gt;
                    </span>
                  )}
                </span>
              ))}
              <span className="font-mono rounded-full bg-[var(--s2-blue-soft)] px-3 py-1.5 text-[12px] text-[var(--s2-blue)]">
                ↻ 반복
              </span>
            </div>
            <p className="mt-3 text-[14px] leading-[1.65] text-[var(--s2-body)]">
              가설은 틀렸는지 판정할 수 있게 씁니다 —{" "}
              <b>[이렇게 하면] → [이런 결과가 나올 것이다]</b>. 예) &ldquo;예비창업팀
              대표 10명을 인터뷰하면 → 7명 이상이 공고를 챙기느라 매주 시간을
              쓰고 있을 것이다.&rdquo; 결과가 기대보다 낮아도 괜찮습니다. 숫자를
              미리 적어 둔 것만으로 &ldquo;된 것 같다&rdquo;가 아니라 기준으로
              판단하게 됩니다. 한 번에 확인하는 가정은 <b>가장 위험한 것
              하나</b>입니다.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              『Running Lean』은 <Blue>이 사이클로 만들어진 책</Blue>입니다
            </p>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {BOOK_CASE.map((c, i) => (
                <div
                  key={c.k}
                  className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-4"
                >
                  <p className="font-mono text-[12px] text-[var(--s2-blue)]">
                    {String(i + 1).padStart(2, "0")} · {c.k}
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
                    {c.v}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              저자는 책을 다 쓴 뒤 팔지 않았습니다. 가장 위험한 가정(&lsquo;이
              목차를 원하는 사람이 있나&rsquo;)부터 가장 싼 방법으로 확인하고,
              신호가 올 때마다 조금씩 더 크게 걸었습니다. 『핑크 펭귄』의 저자도
              새 코칭 프로그램을 같은 방식으로 키웠습니다 — 기존 고객 25명에게
              먼저 무료로 해 보며 단계를 다듬고, 그다음에 요금을 받았습니다.
            </p>
          </div>
        </section>

        {/* 실제 사례 — 그늘로 */}
        <section className="rounded-[24px] border border-[var(--s2-info-line)] bg-[var(--s2-info-bg)] p-7 md:p-9">
          <Badge>실제 사례</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            &ldquo;여름에 걷다가 너무 덥다&rdquo; →{" "}
            <Blue>2주 만에 나온 서비스</Blue>
          </h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-[var(--s2-body)]">
            <Ext href="https://ttubeok.com/">그늘로</Ext> 는 <b>햇빛을 덜 받는
            길</b>을 찾아주는 길찾기 서비스입니다. 시간대별 그림자를 계산해
            도보 경로를 추천하고, 버스에서 덜 뜨거운 창가 자리까지 알려줍니다.
            뉴스에도 보도됐고,{" "}
            <b>문제를 정의한 뒤 2주 만에 만들어져 공개</b>됐습니다.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              {
                k: "누가",
                v: "한여름에 밖을 걸어야 하는 사람",
              },
              {
                k: "무엇 때문에",
                v: "같은 거리라도 어느 길이 덜 더운지 알 수 없다",
              },
              {
                k: "컴퓨터가 할 수 있는 일",
                v: "건물 높이·태양 위치로 그림자를 계산해 보여주기",
              },
            ].map((c, i) => (
              <div
                key={c.k}
                className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-5"
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
          <p className="mt-5 text-[14.5px] leading-[1.7] text-[var(--s2-body)]">
            거창한 아이디어가 아닙니다 — <b>누구나 겪지만 아무도 풀지 않던
            불편</b> 하나를, 컴퓨터가 계산할 수 있는 형태로 좁힌 것뿐입니다.
            여러분도 오늘 이걸 합니다.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Ext href="https://ttubeok.com/">서비스 보기 ↗</Ext>
            <span className="text-[var(--s2-faint)]">·</span>
            <Ext href="https://www.youtube.com/watch?v=oSBCKnIq-aY">
              뉴스 보도 영상 ↗
            </Ext>
          </div>
        </section>

        {/* 1. AI와 대화 시작 */}
        <StepCard
          no={1}
          total={TOTAL}
          id="plan-1"
          title="Claude Code 열고 대화 시작하기"
          intro={
            <>
              1장에서 만든 프로젝트 폴더에서 Claude Code를 실행합니다. 지금은{" "}
              <b>코드를 만들지 않습니다</b> — 오직 대화와 문서만.
            </>
          }
        >
          <p className="text-[14.5px] leading-[1.65] text-[var(--s2-body)]">
            Orca에서 내 프로젝트를 열고, 탭 옆 <b>+</b> → <b>Claude</b> 를
            선택합니다. (1장 9단계에서 해본 그 방법)
          </p>
          <Term
            title="첫 메시지 — 역할과 규칙부터 정해주기"
            lines={[
              {
                dim: true,
                text: "> 너는 나와 함께 창업 아이템을 기획하는 파트너야.",
              },
              {
                dim: true,
                text: "> 나는 코딩을 모르고, 오늘 첫 웹서비스 초안을 만들 거야.",
              },
              { dim: true, text: ">" },
              {
                dim: true,
                text: "> 규칙: 아직 코드는 만들지 마. 질문은 한 번에 2개까지만.",
              },
              {
                dim: true,
                text: "> 해결책보다 '누가, 무엇 때문에 불편한지'를 먼저 물어봐줘.",
              },
              {
                dim: true,
                text: "> 내가 막연하게 말하면 구체적으로 되물어줘.",
              },
            ]}
          />
          <Callout title="티키타카가 핵심입니다">
            한 번에 완벽한 요청을 쓰려고 하지 마세요. <b>대충 던지고 → 되묻게
            하고 → 답하고</b>를 반복하면, 혼자 30분 고민한 것보다 나은 기획이
            5분 만에 나옵니다. AI의 질문에는 <b>아는 만큼만</b> 답해도 됩니다.
          </Callout>
          <Callout title="해결책부터 말하고 싶어도 참으세요">
            창업자는 해결책을 가장 잘 알고 가장 좋아해서, 늘 거기서 이야기를
            시작합니다. 그래서 첫 메시지에 <b>&lsquo;문제부터 물어봐줘&rsquo;</b>
            를 규칙으로 걸어둡니다. AI가 기능 얘기로 달려가면{" "}
            <b>&ldquo;잠깐, 아직 문제 얘기 중이야&rdquo;</b>라고 끊으세요.
          </Callout>
        </StepCard>

        {/* 2. 문제 정의 */}
        <StepCard
          no={2}
          total={TOTAL}
          id="plan-2"
          title="문제 정의 — 아이디어를 한 문장으로"
          intro={
            <>
              막연한 아이디어를 AI에게 던지고, 1교시의 세 가지 질문으로 함께
              걸러냅니다. 그다음 <b>한 고객 · 한 문제</b>로 좁힙니다.
            </>
          }
        >
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                q: "①",
                title: "만들 수 있는가?",
                desc: "컴퓨터가 볼 수 있는 데이터가 있는가",
              },
              {
                q: "②",
                title: "만들어도 되는가?",
                desc: "약관 · 개인정보 · 권한을 넘지 않는가",
              },
              {
                q: "③",
                title: "만들면 해결되는가?",
                desc: "정보 제공과 문제 해결은 다르다",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-5"
              >
                <span className="font-mono text-[13px] font-bold text-[var(--s2-blue)]">
                  {c.q}
                </span>
                <p className="mt-1.5 text-[15.5px] font-extrabold">{c.title}</p>
                <p className="mt-1.5 text-[13px] leading-[1.6] text-[var(--s2-body)]">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
          <Term
            title="AI에게 아이디어 던지고 검증받기"
            lines={[
              {
                dim: true,
                text: "> 우리 팀은 예비창업자가 정부지원사업을 놓치는 문제를 다루고 싶어.",
              },
              {
                dim: true,
                text: "> (메모: 주변 창업팀 세 곳이 마감 지난 공고를 뒤늦게 알았다고 함)",
              },
              { dim: true, text: ">" },
              {
                dim: true,
                text: "> 이걸로 만들 수 있는 웹서비스 아이디어 3개를 제안하고,",
              },
              {
                dim: true,
                text: "> 각각 ①만들 수 있는가 ②만들어도 되는가 ③만들면 해결되는가로",
              },
              { dim: true, text: "> 냉정하게 평가해줘. 안 되는 건 안 된다고 해줘." },
            ]}
          />
          <div className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-5">
            <p className="text-[15px] font-extrabold">
              좋은 문제 문장 = <Blue>누가 · 언제 · 무엇 때문에</Blue> + 지금은
              어떻게 버티는지
            </p>
            <p className="mt-2 text-[14px] leading-[1.65] text-[var(--s2-body)]">
              마지막 칸이 비어 있다면 — 아무도 이 문제를 풀려고 애쓰지 않는다는
              뜻이고, 대개는 그만큼 급하지 않은 문제입니다. 반대로 엑셀 ·
              단톡방 · 매일 사이트 순회처럼 <b>불편한 방법을 참고 쓰고 있다면</b>{" "}
              진짜 문제일 가능성이 큽니다. 가장 큰 경쟁자는 다른 서비스가
              아니라 이런 임시방편이나 &lsquo;그냥 참기&rsquo;일 때가 많습니다.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-5">
              <p className="font-mono mb-2 text-[11.5px] text-[var(--s2-faint)]">
                BAD — 누구에게나, 해결책부터
              </p>
              <p className="text-[14.5px] leading-[1.6] text-[var(--s2-gray)]">
                &ldquo;창업자를 돕는 AI 올인원 플랫폼&rdquo;
              </p>
            </div>
            <div className="rounded-[16px] border border-[var(--s2-info-line)] bg-[var(--s2-info-bg)] p-5">
              <p className="font-mono mb-2 text-[11.5px] text-[var(--s2-blue)]">
                GOOD — 한 고객 · 한 문제 · 지금의 대안
              </p>
              <p className="text-[14.5px] leading-[1.6] text-[var(--s2-strong)]">
                &ldquo;3인 이하 예비창업팀 대표가 우리 조건에 맞는 지원사업
                공고를 <b>마감 전에 알기 어렵다</b> — 지금은 매일 여러 사이트를
                직접 뒤진다&rdquo;
              </p>
            </div>
          </div>
          <Callout title="&lsquo;모두&rsquo;를 노리면 아무에게도 닿지 않습니다">
            페이스북도 처음엔 하버드 학생만을 위한 서비스였습니다. 『핑크
            펭귄』에는 치과의사만 고객으로 삼기로 한 자산관리사가 나옵니다 —
            그렇게 정할 때 치과의사 고객은 5명뿐이었지만, 이후 300명을
            넘겼습니다. 오늘은 <b>가장 절실한 한 유형</b>만 고르세요. 고르기
            어렵다면 가장 함께하기 싫은 유형부터 지워 나가면 됩니다.
          </Callout>
          <div className="flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              그 문제, 진짜인가요? — <Blue>의견 말고 행동</Blue>을 물으세요
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[16px] border border-[var(--s2-bad-line)] bg-[var(--s2-bad-bg)] p-5">
                <p className="mb-2 text-[14.5px] font-extrabold text-[var(--s2-bad-ink)]">
                  ❌ 듣기 좋은 대답만 나오는 질문
                </p>
                <ul className="flex flex-col gap-1.5 text-[13.5px] leading-[1.6] text-[var(--s2-bad-body)]">
                  <li>&ldquo;이런 서비스 있으면 쓰시겠어요?&rdquo;</li>
                  <li>&ldquo;이 기능 필요하세요?&rdquo;</li>
                  <li>&ldquo;얼마면 사시겠어요?&rdquo;</li>
                </ul>
              </div>
              <div className="rounded-[16px] border border-[var(--s2-good-line)] bg-[var(--s2-good-bg)] p-5">
                <p className="mb-2 text-[14.5px] font-extrabold text-[var(--s2-good-ink)]">
                  ✅ 사실이 나오는 질문
                </p>
                <ul className="flex flex-col gap-1.5 text-[13.5px] leading-[1.6] text-[var(--s2-good-body)]">
                  <li>&ldquo;지금은 그 문제를 어떻게 해결하고 계세요?&rdquo;</li>
                  <li>&ldquo;그 과정을 순서대로 보여주실 수 있나요?&rdquo;</li>
                  <li>&ldquo;저희는 월 ○원을 생각하는데, 어떻게 보세요?&rdquo;</li>
                </ul>
              </div>
            </div>
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              고객은 원하는 기능을 설계해 주지 않습니다 — 해결책은 여러분 몫이고,
              고객에게서는 <b>문제와 지금의 행동</b>을 듣습니다. 친구·가족의
              &ldquo;좋다&rdquo;는 응원이지 데이터가 아닙니다.
            </p>
          </div>
          <Callout title="오늘은 1명, 강의가 끝나면 5명">
            완성한 문장을 옆 팀 한 명에게 읽어주고{" "}
            <b>&ldquo;지금은 어떻게 하세요?&rdquo;</b> 하나만 물어보세요.
            강의가 끝나면 첫 고객 유형에 맞는 사람 5명을 만나 보세요.
            『Running Lean』은 처음엔 그 정도로도 강한 신호가 보이고, 10명쯤
            만나면 &lsquo;꼭 필요한 문제&rsquo;인지 판단할 수 있다고 말합니다.
            만나는 방법과 대본은 이 페이지 아래{" "}
            <b>&lsquo;데이터를 모으는 법&rsquo;</b>에 있습니다.
          </Callout>
        </StepCard>

        {/* 3. 기획서 */}
        <StepCard
          no={3}
          total={TOTAL}
          id="plan-3"
          title="기획서 만들기 — 한 장짜리 캔버스"
          intro={
            <>
              문제가 잡혔으면 AI에게 <b>파일로 정리</b>시킵니다. 대화는
              날아가지만 파일은 남습니다. 형식은 『Running Lean』의{" "}
              <b>린 캔버스</b>를 오늘 실습에 맞게 줄인 한 장입니다.
            </>
          }
        >
          <div className="flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              캔버스를 채우기 전에 — <Blue>아이디어를 키우는 질문 네 개</Blue>
            </p>
            <Term
              title="AI에게 고객 입장에서 캐묻게 하기"
              lines={[
                {
                  dim: true,
                  text: "> 캔버스를 채우기 전에, 우리 첫 고객 입장에서 한 번에 하나씩 물어봐줘.",
                },
                {
                  dim: true,
                  text: ">   1) 이 사람의 가장 큰 문제는? 그 문제 때문에 생기는 더 큰 문제는?",
                },
                {
                  dim: true,
                  text: ">   2) 이대로 두면 이 사람에게 어떤 나쁜 일이 생기나?",
                },
                {
                  dim: true,
                  text: ">   3) 이 사람이 원래 되고 싶은 모습은? (지금 → 이후)",
                },
                {
                  dim: true,
                  text: ">   4) 그래서 우리가 줄 수 있는 최상의 이득 한 줄은?",
                },
              ]}
            />
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              『핑크 펭귄』에서 가져온 질문들입니다. 구명보트의 크기가 아니라
              배가 가라앉으면 벌어질 일을 이야기하라는{" "}
              <b>&lsquo;타이타닉 기법&rsquo;</b>, 고객의 지금과 이후를 그리는{" "}
              <b>&lsquo;변혁&rsquo;</b>, 여러 생각을 고객의 이득 하나로 묶는
              질문 순서. 여기서 나온 답이 ②문제와 ⑤핵심 가치 칸이 됩니다.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CANVAS.map((item) => (
              <div
                key={item.num}
                className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-4"
              >
                <p className="font-mono text-[14px] font-bold text-[var(--s2-blue)]">
                  {item.num}
                </p>
                <p className="mt-1 text-[15px] font-extrabold">{item.title}</p>
                <p className="mt-1.5 text-[12.5px] leading-[1.55] text-[var(--s2-gray)]">
                  {item.ex}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[13.5px] leading-[1.65] text-[var(--s2-gray)]">
            원래 린 캔버스에 있는 채널 · 비용 · 경쟁 우위 칸은 오늘은 비워
            둡니다 — 첫 고객에게 닿고 나서 채워도 늦지 않습니다.
          </p>
          <Term
            title="기획서를 파일로 뽑아내기"
            lines={[
              {
                dim: true,
                text: "> 지금까지 정한 내용으로 한 장짜리 기획서를 만들어서",
              },
              { dim: true, text: "> docs/plan.md 파일로 저장해줘." },
              { dim: true, text: ">" },
              {
                dim: true,
                text: "> 항목: 서비스 이름 / 문제(최대 3개) / 지금의 대안 / 첫 고객 /",
              },
              {
                dim: true,
                text: ">      핵심 가치 한 줄 / 해결책 / 화면 구성 / 수익 / 성공 신호",
              },
              {
                dim: true,
                text: "> 모르는 칸은 채우지 말고 '모름'이라고 적어줘.",
              },
              {
                dim: true,
                text: "> 맨 아래에 '아직 확인 안 된 가정'을 위험한 순서로 3개 적어줘.",
              },
              { text: "" },
              { dim: true, text: "✓ Created docs/plan.md" },
            ]}
          />
          <div className="flex flex-col gap-4 rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-5">
            <p className="text-[15px] font-extrabold">
              ⑤ 핵심 가치 한 줄 쓰는 법 —{" "}
              <Blue>기능 → 혜택 → 최상의 이득</Blue>
            </p>
            {VALUE_CHAINS.map((row) => (
              <div key={row.name} className="flex flex-col gap-2">
                <p className="font-mono text-[11.5px] text-[var(--s2-faint)]">
                  {row.name}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {row.steps.map((s, i) => (
                    <span key={s} className="flex items-center gap-2">
                      <span
                        className={`flex flex-col rounded-[12px] border px-3 py-2 ${
                          i === row.steps.length - 1
                            ? "border-[var(--s2-blue)] bg-[var(--s2-blue-soft)]"
                            : "border-[var(--s2-line)] bg-[var(--s2-card)]"
                        }`}
                      >
                        <span className="font-mono text-[10.5px] text-[var(--s2-gray)]">
                          {CHAIN_LABELS[i]}
                        </span>
                        <span className="text-[13.5px] font-bold text-[var(--s2-strong)]">
                          {s}
                        </span>
                      </span>
                      {i < row.steps.length - 1 && (
                        <span className="font-mono text-[13px] text-[var(--s2-arrow)]">
                          -&gt;
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              기능을 말하면 비교당하고, 고객이 원래 원하던 결과를 말하면
              기억됩니다. 『핑크 펭귄』의 말로는 &lsquo;2차적 이득&rsquo;이 아니라{" "}
              <b>&lsquo;최상의 이득&rsquo;</b> — 웹사이트 제작을 맡기는 사람이
              진짜 원하는 건 멋진 사이트가 아니라 손님이 늘어나는 것입니다.
            </p>
          </div>
          <Callout title="&lsquo;모름&rsquo; 칸이 가장 위험한 칸입니다">
            비어 있는 칸이 곧 가장 먼저 확인해야 할 부분입니다. AI는 빈칸을
            그럴듯하게 메꾸는 데 능숙해서, 채우게 두면 위험이 숨어버립니다.
            만들어진 파일을 열어 읽어보고, <b>내 생각과 다른 부분은
            &ldquo;③번을 이렇게 바꿔줘&rdquo;</b>처럼 항목을 짚어 고치게 하세요.
          </Callout>
          <Callout title="15분 안에 쓰고, 한 명에게 보여주기">
            첫 캔버스는 15분 안에 끝내는 스냅숏이면 충분합니다. 다 쓰면 옆
            팀에게 2분만 보여주세요. 규칙은 『핑크 펭귄』의 빅아이디어
            인큐베이터 — <b>① 좋은 점만 말하기 → ② 어떻게 하면 될지 → ③
            마지막에만 걸림돌</b>. 갓 나온 아이디어는 비판부터 들으면 싹이
            잘립니다. 『Running Lean』은 여기에 질문 하나를 더 권합니다 —{" "}
            <b>&ldquo;이 계획에서 가장 위험해 보이는 곳이 어디예요?&rdquo;</b>
          </Callout>
        </StepCard>

        {/* 4. 요구사항 명세 */}
        <StepCard
          no={4}
          total={TOTAL}
          id="plan-4"
          title="요구사항 명세 — 두 번째 문서"
          intro={
            <>
              기획서가 &ldquo;무엇을 왜&rdquo;라면, 요구사항 명세는{" "}
              <b>&ldquo;어떻게&rdquo;</b>입니다. 화면·기능·데이터를 못 박아 두면
              AI가 헤매지 않습니다.
            </>
          }
        >
          <Term
            title="요구사항 명세 뽑아내기"
            lines={[
              {
                dim: true,
                text: "> docs/plan.md 를 읽고, 이걸 개발할 수 있는",
              },
              {
                dim: true,
                text: "> 요구사항 명세를 docs/requirements.md 로 만들어줘.",
              },
              { dim: true, text: ">" },
              { dim: true, text: "> 포함할 것:" },
              {
                dim: true,
                text: ">   1) 화면 목록 — 각 화면에 무엇이 보이는지",
              },
              {
                dim: true,
                text: ">   2) 기능 목록 — '꼭 필요 / 있으면 좋음 / 필요 없음'으로 나눠서",
              },
              {
                dim: true,
                text: ">   3) 핵심 행동 1개 — 처음 온 사람이 가치를 느끼는 순간",
              },
              {
                dim: true,
                text: ">   4) 데이터 — 어떤 정보를 저장하는지 (표 형태)",
              },
              {
                dim: true,
                text: ">   5) 이번에 만들지 않을 것 (로그인, 관리자 등)",
              },
            ]}
          />
          <CheckList
            items={[
              <>
                기술 스택은 적을 필요가 없습니다 — 1장에서 만든{" "}
                <b className="font-mono text-[13.5px]">CLAUDE.md</b>에 이미
                적혀 있어서 Claude가 알아서 맞춥니다
              </>,
              <>
                이번엔 <b>&lsquo;꼭 필요&rsquo;만</b> 만듭니다 — 가장 중요한
                문제 1번을 푸는 기능부터. &lsquo;있으면 좋음&rsquo;은 버리지 말고
                4장 업데이트 목록으로 넘깁니다
              </>,
              <>
                <b>&ldquo;만들지 않을 것&rdquo;을 꼭 적으세요</b> — 이게 없으면
                AI가 로그인·알림·관리자까지 만들다가 아무것도 못 끝냅니다
              </>,
              <>
                <b>핵심 행동 1개</b>가 3장의{" "}
                <span className="font-mono text-[13px]">/goal</span> 완료 조건과
                4장의 확인 기준이 됩니다 — 예) &ldquo;처음 온 사람이 30초 안에
                맞는 공고 1개를 누른다&rdquo;
              </>,
              <>
                화면은 <b>3개 이내</b>, 핵심 기능은 <b>1개</b>면 충분합니다
              </>,
            ]}
          />
          <Callout title="MVP는 &lsquo;대충 만든 것&rsquo;이 아닙니다">
            『Running Lean』의 정의로 MVP는 버그 많은 시제품이 아니라,{" "}
            <b>가장 중요한 문제 하나를 충분히 풀어 주는 최소한</b>입니다.
            작게 만들되, 그 하나는 제대로.
          </Callout>
        </StepCard>

        {/* 5. 개발 지시 */}
        <StepCard
          no={5}
          total={TOTAL}
          id="plan-5"
          title="개발 지시 — 문서를 근거로 초안 만들기"
          intro={
            <>
              문서 두 개가 준비됐다면, 이제 &ldquo;알아서 잘&rdquo;이 아니라{" "}
              <b>&ldquo;이 문서대로&rdquo;</b>라고 시킬 수 있습니다.
            </>
          }
        >
          <Term
            title="AI에게 목표(goal)를 주는 방식"
            lines={[
              {
                dim: true,
                text: "> docs/plan.md 와 docs/requirements.md 를 읽어줘.",
              },
              { dim: true, text: ">" },
              {
                dim: true,
                text: "> [목표] 이 문서대로 웹앱 초안을 만든다.",
              },
              {
                dim: true,
                text: "> [범위] '꼭 필요' 기능까지만. '만들지 않을 것'은 건드리지 마.",
              },
              {
                dim: true,
                text: "> [첫 화면] 맨 위에 plan.md의 '핵심 가치 한 줄'을 크게 보여줘.",
              },
              {
                dim: true,
                text: "> [스택] Next.js + TypeScript, 배포는 Vercel",
              },
              {
                dim: true,
                text: "> [데이터] 실제 있을 법한 예시 데이터 8개 이상 (lorem ipsum 금지)",
              },
              { dim: true, text: ">" },
              {
                dim: true,
                text: "> 시작하기 전에 네가 이해한 계획을 먼저 요약해줘.",
              },
            ]}
          />
          <CheckList
            items={[
              <>
                <b>첫 화면 맨 위 한 줄</b> — 처음 온 사람은 몇 초 만에 머물지
                떠날지 정합니다(『Running Lean』은 8초로 봅니다). 무엇을 해주는
                서비스인지 첫 줄에서 보여야 합니다
              </>,
              <>
                <b>진짜 같은 예시 데이터</b> — 의미 없는 채움 글 대신 있을 법한
                공고명·날짜를 넣어야, 사람에게 보여줬을 때 제대로 된 반응이
                나옵니다
              </>,
            ]}
          />
          <Callout title="&ldquo;먼저 계획을 요약해줘&rdquo;가 사고를 막습니다">
            바로 만들게 하지 말고 <b>계획을 말하게 한 뒤</b> 확인하세요. 방향이
            틀렸다면 코드 한 줄 쓰기 전에 잡을 수 있습니다. 자주 쓰는 이 절차는
            5장의 <b>Skills</b>로 만들어 두면{" "}
            <code className="font-mono text-[13px]">/goal</code> 같은 나만의
            명령어 한 번으로 실행할 수 있습니다.
          </Callout>
          <div className="rounded-[16px] border border-[var(--s2-info-line)] bg-[var(--s2-info-bg)] p-5">
            <p className="mb-3 flex items-center gap-2 text-[14.5px] font-extrabold">
              <span className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-[var(--s2-blue)] text-[11px] font-black text-[var(--s2-on-blue)]">
                ✓
              </span>
              2장 완료 확인 — 이 두 파일이 있으면 성공
            </p>
            <CopyBlock label="터미널에 붙여넣기" command="ls docs/" />
            <div className="mt-3">
              <Term
                title="이렇게 나오면 3장으로"
                lines={[
                  { prompt: true, text: "ls docs/" },
                  { text: "plan.md   requirements.md" },
                ]}
              />
            </div>
          </div>
        </StepCard>

        {/* 데이터를 모으는 법 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>강의가 끝난 뒤 ①</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            추측을 사실로 — <Blue>데이터를 모으는 법</Blue>
          </h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-[var(--s2-body)]">
            오늘 만든 plan.md의 칸은 대부분 추측입니다. 추측을 사실로 바꾸는
            데이터는 <b>앱이 생기기 전에도</b> 모을 수 있습니다. 두 책이 권하는
            방법을 싸고 빠른 순서로 정리했습니다. 초기에는 설문지보다 직접
            만나는 쪽이 낫습니다 — 설문은 무엇을 물어야 할지 이미 안다고
            가정하고, 표정과 망설임을 보여주지 않기 때문입니다.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              먼저, 모든 대답이 같은 무게는 아닙니다 —{" "}
              <Blue>신호의 세기</Blue>
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] text-[var(--s2-faint)]">
                약함
              </span>
              {SIGNALS.map((s, i) => (
                <span key={s.k} className="flex items-center gap-2">
                  <span
                    className={`flex flex-col rounded-[12px] border px-3 py-2 ${signalClass(i)}`}
                  >
                    <span className="text-[13.5px] font-extrabold">{s.k}</span>
                    <span className="text-[12px]">{s.v}</span>
                  </span>
                  {i < SIGNALS.length - 1 && (
                    <span className="font-mono text-[13px] text-[var(--s2-arrow)]">
                      -&gt;
                    </span>
                  )}
                </span>
              ))}
              <span className="font-mono text-[11px] text-[var(--s2-faint)]">
                강함
              </span>
            </div>
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              『Running Lean』은 돈을 받는 것을 가장 강력한 검증으로 봅니다. 말로
              &ldquo;쓸게요&rdquo;를 들었다면 다음엔 연락처 · 시간 · 선결제 같은{" "}
              <b>행동으로</b> 확인하세요. 『핑크 펭귄』은 한발 더 나가,
              &ldquo;글쎄요&rdquo;는 대부분 정중한 &ldquo;아니요&rdquo;라고
              말합니다. 기록할 때도 그렇게 적으세요.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {METHODS.map((m) => (
              <div
                key={m.k}
                className="flex flex-col rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-5"
              >
                <p className="font-mono text-[11.5px] text-[var(--s2-blue)]">
                  {m.when}
                </p>
                <p className="mt-1 text-[15.5px] font-extrabold">{m.k}</p>
                <p className="mt-1.5 text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
                  {m.how}
                </p>
                <p className="mt-3 text-[12.5px] leading-[1.55] text-[var(--s2-strong)]">
                  <b>얻는 것</b> · {m.get}
                </p>
                <p className="mt-auto pt-3 font-mono text-[11px] text-[var(--s2-faint)]">
                  {m.src}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Term
              title="소개 페이지 — 문제와 핵심 가치만"
              lines={[
                {
                  dim: true,
                  text: "> docs/plan.md 의 문제와 핵심 가치 한 줄만 보여주는 소개 페이지를 만들어줘.",
                },
                {
                  dim: true,
                  text: "> 해결책은 자세히 보여주지 말고, '출시 알림 받기'로 이메일을 받게 해줘.",
                },
              ]}
            />
            <p className="text-[13.5px] leading-[1.65] text-[var(--s2-gray)]">
              받은 이메일을 저장하려면 5장의 Supabase 연동이 필요합니다. 여기에
              연락처를 남긴 사람은 이미 핵심 가치에 반응한 사람이라, 가장 좋은
              인터뷰 대상입니다.
            </p>
          </div>
        </section>

        {/* 인터뷰 — 만나고, 묻고, 적고, 읽기 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>강의가 끝난 뒤 ②</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            문제 인터뷰 — <Blue>만나고, 묻고, 적고, 읽기</Blue>
          </h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-[var(--s2-body)]">
            가장 빨리 배우는 방법은 사람과 직접 이야기하는 것입니다. 『Running
            Lean』의 문제 인터뷰를 오늘 쓸 수 있게 정리했습니다.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              누구를 만나나 — <Blue>가까운 곳에서 넓혀 가기</Blue>
            </p>
            <MiniSteps
              items={[
                <>
                  <b>아는 사람 중 첫 고객에 맞는 사람</b>부터 — 편향은 있어도
                  아무도 안 만나는 것보다 낫습니다. 처음엔 넓게 만나고 점점
                  좁힙니다.
                </>,
                <>
                  <b>소개 부탁</b> — 친구가 그대로 전달할 수 있는 짧은 소개 글을
                  만들어 건넵니다.
                </>,
                <>
                  <b>같은 지역 · 같은 모임</b>이라는 연결고리 — 훨씬 쉽게 만나
                  줍니다.
                </>,
                <>
                  <b>소개 페이지에 연락처를 남긴 사람</b> — 이미 관심을 보인
                  사람입니다.
                </>,
                <>
                  <b>무언가 돌려주기</b> — 인터뷰 내용을 정리해 드리겠다고
                  제안하면 응하기 쉬워집니다.
                </>,
                <>
                  <b>모르는 사람</b>에게는 상대의 문제를 정면으로 짚는 한 줄로
                  연락합니다.
                </>,
              ]}
            />
            <CopyBlock
              label="소개 부탁 메시지 만들기"
              command="첫 고객 유형에 맞는 사람을 소개해 달라고 친구에게 보낼 짧은 메시지를 써줘. 판매가 아니라 30분 이야기를 듣고 싶다는 점이 드러나게"
            />
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              무엇을 묻나 — <Blue>20~30분 대본</Blue>
            </p>
            <TimedList rows={INTERVIEW} />
            <CheckList
              items={[
                <>
                  <b>해결책은 꺼내지 않습니다</b> — 마무리에서 &ldquo;이런 걸
                  만들고 있어요&rdquo; 한 줄이면 충분합니다
                </>,
                <>
                  <b>녹음보다 메모</b> — 녹음을 의식하면 말을 아끼거나
                  과장합니다
                </>,
                <>
                  <b>사례비는 주지 않습니다</b> — 우리가 찾는 건 돈을 낼 고객이지,
                  돈을 받고 답해 주는 사람이 아닙니다
                </>,
                <>
                  <b>편한 장소, 둘이서</b> — 카페 같은 곳에서, 한 명은 묻고 한
                  명은 적습니다. 창업자는 무엇이든 좋게 해석하기 쉽습니다
                </>,
              ]}
            />
            <Term
              title="대본과 기록 양식을 문서로"
              lines={[
                {
                  dim: true,
                  text: "> docs/plan.md 를 읽고 20분 문제 인터뷰 대본을 docs/interview-script.md 로 만들어줘.",
                },
                { dim: true, text: "> 해결책을 꺼내지 않고, 지금의 행동을 묻는 질문으로." },
                { dim: true, text: ">" },
                {
                  dim: true,
                  text: "> 인터뷰마다 채울 기록 양식은 docs/interviews.md 로:",
                },
                {
                  dim: true,
                  text: ">   날짜 · 첫 고객에 맞는지 · 문제별 순위와 얼마나 아픈지 · 지금 쓰는 방법",
                },
                {
                  dim: true,
                  text: ">   · 고객이 쓴 표현 그대로 · 신호의 세기 · 소개받은 사람",
                },
              ]}
            />
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              어떻게 읽나 — <Blue>한 주씩 모아서</Blue>
            </p>
            <CheckList
              items={[
                <>
                  <b>한 주 동안은 대본을 바꾸지 않습니다</b> — 같은 질문이어야
                  서로 비교가 됩니다. 주말에 모아 보고 다음 주 대본을 고칩니다
                </>,
                <>
                  <b>가장 뜨거웠던 사람들의 공통점</b>을 찾습니다 — 그게 더 좁은
                  첫 고객입니다. 반응이 미지근한 유형은 뺍니다
                </>,
                <>
                  <b>아무도 공감하지 않은 문제는 지우고</b>, 새로 나온 절실한
                  문제는 더합니다. 끝내 남는 &lsquo;꼭 필요한 문제&rsquo; 하나가
                  핵심 가치가 됩니다
                </>,
                <>
                  <b>고객이 쓴 단어를 그대로</b> 모읍니다 — 나중에 첫 화면
                  문구가 됩니다
                </>,
                <>
                  <b>말과 행동이 다르면 행동을 믿습니다</b> — &ldquo;정말
                  불편해요&rdquo;라면서 아무것도 안 하고 잘 지낸다면 급한 문제가
                  아닙니다
                </>,
                <>
                  <b>새로 배우는 게 없으면 그만</b> — 대답이 예상대로만 나오기
                  시작하면 다음 단계로 갈 때입니다
                </>,
              ]}
            />
            <Term
              title="배운 것을 기획서로 되돌리기"
              lines={[
                {
                  dim: true,
                  text: "> docs/interviews.md 를 읽고, docs/plan.md 에서 바꿔야 할 칸과",
                },
                {
                  dim: true,
                  text: "> 그 근거가 된 인터뷰를 짝지어 보여줘. 내가 확인하면 반영해줘.",
                },
              ]}
            />
          </div>
        </section>

        {/* 마무리 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-7 md:p-9">
          <Badge>기억할 것</Badge>
          <p className="mt-4 text-[18px] font-extrabold leading-[1.5] md:text-[20px]">
            AI는 <Blue>내가 정한 만큼만</Blue> 잘 만듭니다 —
            <br />
            그래서 코드보다 <Blue>문서가 먼저</Blue>입니다.
          </p>
          <p className="mt-3 text-[14.5px] leading-[1.65] text-[var(--s2-body)]">
            지금 만든 두 문서는 3장의 개발, 4장의 수정, 그리고 다음 프로젝트에서
            계속 쓰입니다. 대화는 사라져도 문서는 남습니다.
          </p>
          <p className="mt-3 text-[14.5px] leading-[1.65] text-[var(--s2-body)]">
            단, 이 문서는 정답이 아니라 <b>첫 번째 가설(Plan A)</b>입니다.
            『Running Lean』의 부제처럼, 계획 A에서 시작해{" "}
            <b>실제로 통하는 계획</b>으로 고쳐 가는 것 — 인터뷰로 고치고, 4장에서
            만든 앱을 보여주며 또 고칩니다.
          </p>
        </section>
      </main>

      <Pager
        prev={{ href: "/setup", label: "01 환경 설정" }}
        next={{ href: "/build", label: "03 초기 구축 · 첫 배포" }}
      />
      <SiteFooter />
    </div>
  );
}
