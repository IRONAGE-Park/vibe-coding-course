import type { Metadata } from "next";
import Nav from "../components/Nav";
import CopyBlock from "../components/CopyBlock";
import SdlcLoop from "../components/SdlcLoop";
import StageCycle from "../components/StageCycle";
import StepRail from "../components/StepRail";
import Tip from "../components/Tip";
import {
  Badge,
  Blue,
  Callout,
  CheckList,
  Ext,
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
    "Claude Code에게 인터뷰받으며 문제를 좁히고, intent.md(무엇을 · 왜)와 spec.md(어떻게) 두 문서로 제품을 시작하는 과정.",
};

/* 배경 설명 · 사례 · 진행 요령은 강사 노트(app/lib/lecture-notes.ts)에 있습니다 */

const TOTAL = 5;

const RAIL = [
  { id: "plan-1", num: "01", label: "AI에게 인터뷰받기" },
  { id: "plan-2", num: "02", label: "문제 정의" },
  { id: "plan-3", num: "03", label: "intent.md" },
  { id: "plan-4", num: "04", label: "spec.md" },
  { id: "plan-5", num: "05", label: "개발 지시" },
];

const FLOW = [
  { k: "문제 정의", v: "무엇이 불편한가" },
  { k: "intent.md", v: "무엇을 · 왜 · 제약" },
  { k: "spec.md", v: "화면 · 기능 · 데이터" },
  { k: "개발 지시", v: "계획 → 앱 초안" },
];

/* Claude · Codex 공식 가이드가 공통으로 권하는 시작 순서 — 근거는 강사 노트 */
const START = [
  {
    k: "인터뷰받기",
    v: "막연한 아이디어를 던지고, AI가 범위 · 사용자 · 제약 · 성공 기준을 묻게 합니다.",
  },
  {
    k: "intent.md",
    v: "무엇을 · 왜 · 어떤 제약으로 — 내 말로 쓴 한 장. 사람도 AI도 읽습니다.",
  },
  {
    k: "spec.md",
    v: "AI가 intent.md를 읽고 요구사항과 설계를 한 번에. 걸리는 점은 따로 표시.",
  },
  {
    k: "계획 먼저",
    v: "새 대화 · 계획 모드에서 구현 계획부터. 승인한 뒤에 만듭니다(3장).",
  },
];

const PROMPT_PARTS = [
  { k: "목표", v: "무엇을 만들거나 바꾸나" },
  { k: "맥락", v: "읽어야 할 문서 · 참고할 예시" },
  { k: "제약", v: "지킬 규칙 · 하지 말 것" },
  { k: "완료 조건", v: "끝났다고 볼 확인 방법" },
];

const PRINCIPLES = [
  {
    k: "제품이 아니라 고객부터",
    v: "‘○○ 앱을 만든다’가 아니라 ‘누구를 돕는가’에서 출발합니다.",
  },
  {
    k: "해결책은 최대한 늦게",
    v: "고객은 우리 해결책이 아니라 자기 문제에 관심이 있습니다.",
  },
  {
    k: "오늘 문서는 가설",
    v: "완벽한 기획보다, 빨리 확인하고 고칠 수 있는 기획.",
  },
];

const LOOP = [
  "가장 위험한 가정 고르기",
  "가설 한 문장",
  "가장 작은 실험",
  "기록",
  "intent.md 고치기",
];

/* 린 캔버스를 오늘 실습용으로 줄인 9칸 — to 는 intent.md 에서 들어갈 자리 */
const CANVAS = [
  { num: "①", title: "서비스 이름", ex: "공고레이더 — 임시여도 OK", to: "제목" },
  {
    num: "②",
    title: "문제 (최대 3개)",
    ex: "공고가 흩어져 있다 · 우리 조건인지 모른다 · 마감을 놓친다",
    to: "문제",
  },
  { num: "③", title: "지금의 대안", ex: "매일 사이트 순회 · 단톡방 · 그냥 놓침", to: "문제" },
  { num: "④", title: "첫 고객", ex: "3인 이하 예비창업팀 대표", to: "대상" },
  {
    num: "⑤",
    title: "핵심 가치 한 줄",
    ex: "받을 수 있는 지원금을 놓치지 않는다",
    to: "원하는 결과",
  },
  { num: "⑥", title: "해결책", ex: "문제마다 가장 간단한 기능 하나", to: "원하는 결과" },
  { num: "⑦", title: "화면 구성", ex: "메인 + 상세 1~2개", to: "spec.md 에서" },
  { num: "⑧", title: "수익", ex: "누가, 얼마를 — 모르면 ‘모름’", to: "열린 질문" },
  { num: "⑨", title: "성공 신호", ex: "첫 방문 30초 안에 공고 1개 클릭", to: "성공 신호" },
];

const CHAIN_LABELS = ["기능", "혜택", "고객이 끝내 원하는 것"];
const VALUE_CHAINS = [
  {
    name: "이력서 서비스라면",
    steps: ["전문가급 템플릿", "돋보이는 이력서", "원하던 회사에 합격"],
  },
  {
    name: "오늘의 예 — 지원사업 서비스",
    steps: ["조건 필터", "맞는 공고만 모아 보기", "받을 수 있는 지원금을 놓치지 않기"],
  },
];

const SIGNALS = [
  { k: "칭찬", v: "“좋네요”" },
  { k: "말로 수락", v: "“나오면 쓸게요”" },
  { k: "연락처", v: "출시 알림 신청" },
  { k: "시간", v: "30분 인터뷰 · 소개" },
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

const METHODS = [
  {
    k: "관찰",
    when: "문제 이해",
    how: "고객이 그 일을 하는 모습을 옆에서 봅니다.",
    get: "말로 설명 못 하는 불편",
  },
  {
    k: "문제 인터뷰",
    when: "문제 이해",
    how: "20~30분. 해결책은 꺼내지 않고 지금 어떻게 하는지 묻습니다.",
    get: "꼭 필요한 문제 · 지금의 대안",
  },
  {
    k: "소개 페이지",
    when: "문제 → 해결책",
    how: "문제와 핵심 가치만 적고 ‘출시 알림 받기’를 답니다.",
    get: "관심 있는 사람의 연락처",
  },
  {
    k: "데모 · 목업",
    when: "해결책 정의",
    how: "만들기 전에 화면 그림이나 짧은 영상으로 보여줍니다.",
    get: "꼭 필요한 기능과 빼도 되는 기능",
  },
  {
    k: "가격 제시",
    when: "해결책 정의",
    how: "‘얼마면 사겠어요?’ 대신 ‘월 ○원 생각합니다’라고 말하고 반응을 적습니다.",
    get: "받을 수 있는 가격",
  },
  {
    k: "손으로 먼저 · 무료 시범",
    when: "해결책 → 작게 검증",
    how: "몇 명에게 손으로 먼저 해 주고, 끝나면 ‘예 / 아니요’를 받습니다.",
    get: "실제로 쓰는지 · 돈을 낼지",
  },
];

const INTERVIEW = [
  { t: "2분", k: "인사 · 목적", v: "파는 게 아니라 배우러 왔다고 먼저 말합니다." },
  { t: "2분", k: "기본 정보", v: "첫 고객 유형에 맞는 사람인지 확인합니다." },
  { t: "2분", k: "문제 이야기", v: "우리가 생각한 문제 상황을 짧게 들려줍니다." },
  { t: "4분", k: "문제 순위", v: "문제 3개의 순위를 매겨 달라고 합니다." },
  {
    t: "15분",
    k: "지금은 어떻게 하나",
    v: "핵심. 지금 쓰는 방법 · 도구 · 과정을 자세히 묻습니다.",
  },
  { t: "2분", k: "마무리", v: "시제품을 보여드려도 될지, 소개해 주실 분이 있는지." },
  { t: "5분", k: "바로 기록", v: "헤어지자마자 적습니다." },
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
            <Blue>문제 정의</Blue> — 문서 두 장으로 제품 시작하기
          </>
        }
        sub={
          <>
            Claude Code에게 인터뷰받으며 문제를 좁히고,{" "}
            <b>intent.md와 spec.md</b> 두 문서를 만듭니다. 3장은 이 문서로
            앱을 만듭니다.
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
            두 문서는 <b>사람도 AI도 읽는 파일</b>입니다. 있으면 새 대화를 열어도
            AI가 같은 방향으로 일합니다.
          </p>
        </section>

        {/* 제품을 시작하는 순서 — Claude · Codex 공통 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>AI 네이티브 개발 주기</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            제품은 코드가 아니라 <Blue>문서 두 장</Blue>으로 시작합니다
          </h2>
          <p className="mt-3 text-[15px] leading-[1.7] text-[var(--s2-body)]">
            Claude와 Codex의 공식 가이드가 권하는 순서는 같습니다 —{" "}
            <b>인터뷰 → 문서 → 계획 → 구현</b>.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {START.map((c, i) => (
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
          <p className="mb-3 mt-6 text-[15px] font-extrabold">
            개발 주기로 보면 — <Blue>1 · 2단계</Blue>
          </p>
          <SdlcLoop current={[0, 1]} />
          <p className="mt-4 text-[13px] leading-[1.65] text-[var(--s2-gray)]">
            출처 —{" "}
            <Ext href="https://academy.claude.com/ko/courses/ai-native-sdlc-playbook/capture-intent">
              AI-Native SDLC Playbook
            </Ext>{" "}
            ·{" "}
            <Ext href="https://code.claude.com/docs/ko/best-practices">
              Claude Code 모범 사례
            </Ext>{" "}
            ·{" "}
            <Ext href="https://learn.chatgpt.com/guides/best-practices">
              Codex 모범 사례
            </Ext>
          </p>
        </section>

        {/* 창업 초기 원칙 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>창업 초기 원칙</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            이제 질문은 &ldquo;만들 수 있나&rdquo;가 아니라{" "}
            <Blue>&ldquo;만들어야 하나&rdquo;</Blue>
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {PRINCIPLES.map((c, i) => (
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

        {/* 아이템 발전 사이클 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>아이템 발전 사이클</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            아이디어는 <Blue>네 단계를 돌며</Blue> 자랍니다
          </h2>
          <p className="mt-3 text-[15px] leading-[1.7] text-[var(--s2-body)]">
            오늘 2장은 1·2단계를 대화와 문서로 한 바퀴 돕니다.
          </p>
          <div className="mt-5">
            <StageCycle current={[0, 1]} />
          </div>
          <div className="mt-6 rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-5">
            <p className="mb-3 text-[15px] font-extrabold">
              단계 안에서 도는 <Blue>한 바퀴</Blue>
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
              <Tip tip="틀렸는지 판정할 수 있게 쓴 예상입니다. 예) 대표 10명을 인터뷰하면 → 7명 이상이 공고를 챙기느라 매주 시간을 쓰고 있을 것이다.">
                가설
              </Tip>
              은 <b>[이렇게 하면] → [이런 결과가 나올 것이다]</b>로 씁니다.
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
            <Ext href="https://ttubeok.com/">그늘로</Ext> 는 햇빛을 덜 받는 길을
            찾아주는 서비스입니다. 문제를 정의한 뒤 <b>2주 만에</b> 공개됐습니다.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              { k: "누가", v: "한여름에 밖을 걸어야 하는 사람" },
              { k: "무엇 때문에", v: "어느 길이 덜 더운지 알 수 없다" },
              { k: "컴퓨터가 할 수 있는 일", v: "건물 높이·태양 위치로 그림자 계산" },
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
          <div className="mt-5 flex flex-wrap gap-3">
            <Ext href="https://ttubeok.com/">서비스 보기 ↗</Ext>
            <span className="text-[var(--s2-faint)]">·</span>
            <Ext href="https://www.youtube.com/watch?v=oSBCKnIq-aY">
              뉴스 보도 영상 ↗
            </Ext>
          </div>
        </section>

        {/* 1. AI에게 인터뷰받기 */}
        <StepCard
          no={1}
          total={TOTAL}
          id="plan-1"
          title="AI에게 인터뷰받기 — 대화 시작"
          intro={
            <>
              지금은 <b>코드를 만들지 않습니다</b>. 질문은 AI가, 답은 여러분이.
            </>
          }
        >
          <p className="text-[14.5px] leading-[1.65] text-[var(--s2-body)]">
            Orca에서 내 프로젝트를 열고, 탭 옆 <b>+</b> → <b>Claude</b>.
          </p>
          <Term
            title="첫 메시지 — 역할을 정하고, 인터뷰를 부탁하기"
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
                text: "> 규칙: 아직 코드는 만들지 마. 나를 인터뷰해줘. 질문은 한 번에 2개까지.",
              },
              {
                dim: true,
                text: "> 해결책보다 '누가, 무엇 때문에 불편한지'부터 묻고,",
              },
              {
                dim: true,
                text: "> 범위 · 사용자 · 제약 · 성공 기준까지 — 뻔한 질문 말고 내가 놓친 부분을.",
              },
              {
                dim: true,
                text: "> 충분해지면 알려줘. 그 내용을 docs/intent.md 로 정리할 거야.",
              },
            ]}
          />
          <Callout title="대충 던지고, 되묻게 하세요">
            <b>던지고 → 되묻게 하고 → 답하기</b>를 반복합니다. AI가 기능
            얘기로 달려가면 <b>&ldquo;잠깐, 아직 문제 얘기 중이야&rdquo;</b>.
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
              세 가지 질문으로 거르고, <b>한 고객 · 한 문제</b>로 좁힙니다.
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
              좋은 문제 문장 = <Blue>누가 · 언제 · 무엇 때문에</Blue> +{" "}
              <Tip tip="엑셀 · 단톡방 · 매일 사이트 순회 · 그냥 참기처럼 지금 쓰는 임시방편. 가장 큰 경쟁자는 대개 이것입니다.">
                지금은 어떻게 버티는지
              </Tip>
            </p>
            <p className="mt-2 text-[14px] leading-[1.65] text-[var(--s2-body)]">
              마지막 칸이 비어 있으면 급하지 않은 문제일 가능성이 큽니다.
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
          </div>
          <Callout title="옆 팀 한 명에게 확인">
            완성한 문장을 읽어주고 <b>&ldquo;지금은 어떻게 하세요?&rdquo;</b>{" "}
            하나만 물어보세요. 강의 뒤에 할 일은 이 페이지 아래에 있습니다.
          </Callout>
        </StepCard>

        {/* 3. intent.md */}
        <StepCard
          no={3}
          total={TOTAL}
          id="plan-3"
          title="intent.md 만들기 — 무엇을 · 왜 · 어떤 제약으로"
          intro={
            <>
              문제가 잡혔으면{" "}
              <Tip tip="제품을 시작하는 첫 문서. 무엇을 원하는지, 왜 필요한지, 어떤 제약이 있는지를 내 말로 적은 한 장입니다. 사람도 읽고, AI도 바로 다음 단계에 씁니다.">
                intent.md
              </Tip>{" "}
              한 장으로 남깁니다. 대화는 날아가도 파일은 남고, 다음 단계가 이
              파일을 읽고 시작합니다.
            </>
          }
        >
          <div className="flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              먼저, <Blue>아이디어를 키우는 질문 네 개</Blue>
            </p>
            <Term
              title="AI에게 고객 입장에서 캐묻게 하기"
              lines={[
                {
                  dim: true,
                  text: "> 정리하기 전에, 우리 첫 고객 입장에서 한 번에 하나씩 물어봐줘.",
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
                  text: ">   4) 그래서 우리가 줄 수 있는, 이 사람이 끝내 원하는 것 한 줄은?",
                },
              ]}
            />
          </div>
          <p className="text-[15px] font-extrabold">
            캔버스로 생각하고 — <Blue>intent.md로 남기기</Blue>
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CANVAS.map((item) => (
              <div
                key={item.num}
                className="flex flex-col rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-[14px] font-bold text-[var(--s2-blue)]">
                    {item.num}
                  </p>
                  <span className="font-mono rounded-full bg-[var(--s2-blue-soft)] px-2.5 py-0.5 text-[11px] text-[var(--s2-blue)]">
                    → {item.to}
                  </span>
                </div>
                <p className="mt-1 text-[15px] font-extrabold">{item.title}</p>
                <p className="mt-1.5 text-[12.5px] leading-[1.55] text-[var(--s2-gray)]">
                  {item.ex}
                </p>
              </div>
            ))}
          </div>
          <Term
            title="intent.md 로 뽑아내기"
            lines={[
              {
                dim: true,
                text: "> 지금까지 정한 내용으로 docs/intent.md 를 만들어줘.",
              },
              {
                dim: true,
                text: "> 항목: 문제 / 원하는 결과 / 대상 / 제약 / 성공 신호 / 열린 질문",
              },
              {
                dim: true,
                text: "> 캔버스 내용은 칸마다 표시한 자리에 넣어줘.",
              },
              {
                dim: true,
                text: "> 모르는 칸은 채우지 말고 '모름'. 확인 안 된 가정은 '열린 질문'에 위험한 순서로 3개.",
              },
              { text: "" },
              { dim: true, text: "✓ Created docs/intent.md" },
            ]}
          />
          <Term
            title="이렇게 생긴 파일입니다 — docs/intent.md"
            lines={[
              { text: "# Intent: 공고레이더 — 맞는 지원사업 놓치지 않기" },
              { text: "작성: 우리 팀 · 상태: 초안" },
              { text: "## 문제" },
              { text: "3인 이하 예비창업팀 대표는 조건에 맞는 공고를 마감 전에 알기 어렵다." },
              { text: "지금은 매일 여러 사이트를 직접 뒤진다." },
              { text: "## 원하는 결과" },
              { text: "조건을 한 번 넣으면, 맞는 공고만 마감 임박순으로 본다." },
              { text: "## 대상" },
              { text: "3인 이하 예비창업팀 대표" },
              { text: "## 제약" },
              { text: "로그인 없이 · 공개된 공고만 · 개인정보는 받지 않는다." },
              { text: "## 성공 신호" },
              { text: "처음 온 사람이 30초 안에 공고 1개를 누른다." },
              { text: "## 열린 질문" },
              { text: "1. 공고를 매일 새로 가져올 방법이 있나?  2. 누가 돈을 내나? (모름)" },
            ]}
          />
          <div className="flex flex-col gap-4 rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-5">
            <p className="text-[15px] font-extrabold">
              원하는 결과 한 줄 —{" "}
              <Blue>기능이 아니라 고객이 끝내 원하는 것</Blue>
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
          </div>
          <Callout title="&lsquo;모름&rsquo;은 그대로, 틀린 곳은 짚어서">
            AI가 빈칸을 그럴듯하게 채우면 위험이 숨어버립니다. 파일을 열어
            읽고, 다른 부분은 <b>&ldquo;제약을 이렇게 바꿔줘&rdquo;</b>처럼
            항목을 짚어 고치세요. 이 파일의 주인은 여러분입니다.
          </Callout>
          <Callout title="15분 안에 쓰고, 옆 팀에 2분">
            듣는 쪽은 <b>① 좋은 점 → ② 어떻게 하면 될지 → ③ 걸림돌</b> 순서로
            말합니다. 마지막엔{" "}
            <b>&ldquo;가장 위험해 보이는 곳은 어디예요?&rdquo;</b>
          </Callout>
        </StepCard>

        {/* 4. spec.md */}
        <StepCard
          no={4}
          total={TOTAL}
          id="plan-4"
          title="spec.md 만들기 — 요구사항과 설계를 한 번에"
          intro={
            <>
              intent.md가 &ldquo;무엇을 왜&rdquo;라면,{" "}
              <Tip tip="intent.md를 만들 수 있게 풀어 쓴 명세. 화면 · 기능 · 데이터 · 만들지 않을 것 · 걱정되는 점 · 확인 방법이 들어갑니다. 쓰는 건 AI, 검토와 승인은 사람.">
                spec.md
              </Tip>
              는 <b>&ldquo;어떻게&rdquo;</b>입니다. 쓰는 건 AI, 여러분은
              검토합니다.
            </>
          }
        >
          <Term
            title="spec.md 뽑아내기"
            lines={[
              {
                dim: true,
                text: "> docs/intent.md 를 읽고, 이걸 만들 수 있는 요구사항·설계 명세를",
              },
              {
                dim: true,
                text: "> docs/spec.md 로 써줘. CLAUDE.md 의 규칙을 지켜서.",
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
              {
                dim: true,
                text: ">   6) 걱정되는 점 — 서로 부딪히거나 확실하지 않은 부분은 따로 표시",
              },
              {
                dim: true,
                text: ">   7) 확인 방법 — 처음 온 사람의 흐름을 처음부터 끝까지 확인하는 순서",
              },
            ]}
          />
          <p className="text-[15px] font-extrabold">
            검토는 <Blue>이 순서로</Blue>
          </p>
          <CheckList
            items={[
              <>
                <b>&lsquo;걱정되는 점&rsquo;부터</b> — 문서일 때 고치는 게 가장
                쌉니다
              </>,
              <>
                intent.md의 <b>문제를 푸는가</b>, 열린 질문은 답했거나 넘겼는가
              </>,
              <>
                <b>&lsquo;꼭 필요&rsquo;만</b> — 화면 3개 이내, 핵심 기능 1개.
                이게 오늘의{" "}
                <Tip tip="Minimum Viable Product. 대충 만든 시제품이 아니라, 가장 중요한 문제 하나를 충분히 풀어 주는 최소한의 제품입니다.">
                  MVP
                </Tip>
                입니다. &lsquo;있으면 좋음&rsquo;은 4장 목록으로
              </>,
              <>
                <b>&ldquo;만들지 않을 것&rdquo;을 꼭</b> — 없으면 AI가
                로그인·관리자까지 만들다가 못 끝냅니다
              </>,
              <>
                <Tip tip="처음 온 사람이 ‘이거 좋다’를 처음 느끼는 행동. 예) 30초 안에 맞는 공고 1개를 누른다.">
                  핵심 행동
                </Tip>
                과 <b>확인 방법</b>은 3장 /goal 완료 조건이 됩니다
              </>,
            ]}
          />
        </StepCard>

        {/* 5. 개발 지시 */}
        <StepCard
          no={5}
          total={TOTAL}
          id="plan-5"
          title="개발 지시 — 목표 · 맥락 · 제약 · 완료 조건"
          intro={
            <>
              이제 &ldquo;알아서 잘&rdquo;이 아니라{" "}
              <b>&ldquo;이 문서대로&rdquo;</b>라고 시킵니다. 좋은 지시는 네
              칸으로 나뉩니다.
            </>
          }
        >
          <div className="grid gap-3 md:grid-cols-4">
            {PROMPT_PARTS.map((c) => (
              <div
                key={c.k}
                className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-4"
              >
                <p className="text-[15px] font-extrabold">{c.k}</p>
                <p className="mt-1 text-[13px] leading-[1.55] text-[var(--s2-body)]">
                  {c.v}
                </p>
              </div>
            ))}
          </div>
          <Term
            title="AI에게 보내는 개발 지시"
            lines={[
              {
                dim: true,
                text: "> [목표] docs/spec.md 대로 웹앱 초안을 만든다.",
              },
              {
                dim: true,
                text: "> [맥락] docs/intent.md 와 docs/spec.md 를 읽어줘.",
              },
              {
                dim: true,
                text: "> [제약] '꼭 필요' 기능까지만. '만들지 않을 것'은 건드리지 마.",
              },
              {
                dim: true,
                text: ">        첫 화면 맨 위에 intent.md 의 '원하는 결과'를 한 줄로 크게.",
              },
              {
                dim: true,
                text: ">        예시 데이터는 실제 있을 법한 것 8개 이상 (lorem ipsum 금지).",
              },
              {
                dim: true,
                text: "> [완료 조건] spec.md 의 확인 방법이 통과하고 npm run build 가 오류 없이 끝남.",
              },
              { dim: true, text: ">" },
              {
                dim: true,
                text: "> 코드는 아직. 네가 이해한 구현 계획부터 보여줘.",
              },
            ]}
          />
          <Callout title="새 대화 · 계획 모드로 보내면 더 확실합니다">
            <b className="font-mono">/clear</b> 로 대화를 비우고,{" "}
            <b className="font-mono">Shift+Tab</b>으로{" "}
            <b className="font-mono">⏸ plan mode on</b>을 켠 뒤 보내세요. 문서가
            있으니 새 대화도 같은 방향으로 이어지고, Claude는 읽기만 하며 계획을
            내놓습니다. 계획이 나오면{" "}
            <b>&ldquo;가장 위험한 단계는 어디야?&rdquo;</b>를 물어보세요.
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
                  { text: "intent.md   spec.md" },
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
          <p className="mt-3 text-[15px] leading-[1.7] text-[var(--s2-body)]">
            intent.md의 칸은 대부분 추측입니다. 앱이 없어도 데이터는 모을 수
            있고, 초기엔{" "}
            <Tip tip="설문은 무엇을 물어야 할지 이미 안다고 가정하고, 표정과 망설임을 보여주지 않습니다. 가설이 선 뒤 크게 확인할 때 씁니다.">
              설문보다 직접 만나는 쪽
            </Tip>
            이 낫습니다.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              대답의 무게 — <Blue>신호의 세기</Blue>
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
              말로 들은 건 행동으로 한 번 더 확인하세요.{" "}
              <b>&ldquo;글쎄요&rdquo;는 대부분 &ldquo;아니요&rdquo;</b>입니다.
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
                <p className="mt-auto pt-3 text-[12.5px] leading-[1.55] text-[var(--s2-strong)]">
                  <b>얻는 것</b> · {m.get}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <Term
              title="소개 페이지 — 문제와 원하는 결과만"
              lines={[
                {
                  dim: true,
                  text: "> docs/intent.md 의 문제와 원하는 결과 한 줄만 보여주는 소개 페이지를 만들어줘.",
                },
                {
                  dim: true,
                  text: "> 해결책은 자세히 보여주지 말고, '출시 알림 받기'로 이메일을 받게 해줘.",
                },
              ]}
            />
            <p className="text-[13px] text-[var(--s2-gray)]">
              이메일 저장은 6장 Supabase 연동 후에 됩니다.
            </p>
          </div>
        </section>

        {/* 인터뷰 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>강의가 끝난 뒤 ②</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            문제 인터뷰 — <Blue>만나고, 묻고, 적고, 읽기</Blue>
          </h2>

          <div className="mt-6 flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">누구를 만나나</p>
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              아는 사람 → 소개받은 사람 → 같은 모임 → 소개 페이지 신청자 순으로
              넓혀 갑니다.
            </p>
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
            <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
              <b>해결책은 꺼내지 않기 · 녹음보다 메모 · 사례비 없음 · 둘이서</b>
            </p>
            <Term
              title="대본과 기록 양식을 문서로"
              lines={[
                {
                  dim: true,
                  text: "> docs/intent.md 를 읽고 20분 문제 인터뷰 대본을 docs/interview-script.md 로 만들어줘.",
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
                <>한 주는 대본을 고정하고, 주말에 모아 봅니다</>,
                <>
                  <b>가장 뜨거웠던 사람들의 공통점</b> = 더 좁은 첫 고객
                </>,
                <>
                  <b>고객이 쓴 단어 그대로</b> = 나중의 첫 화면 문구
                </>,
                <>
                  말과 행동이 다르면 <b>행동을 믿습니다</b>
                </>,
              ]}
            />
            <Term
              title="배운 것을 intent.md 로 되돌리기"
              lines={[
                {
                  dim: true,
                  text: "> docs/interviews.md 를 읽고, docs/intent.md 에서 바꿔야 할 칸과",
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
            이 문서는 정답이 아니라 <b>첫 번째 가설</b>입니다. 인터뷰와 4장에서
            고쳐 가며 통하는 계획으로 만듭니다.
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
