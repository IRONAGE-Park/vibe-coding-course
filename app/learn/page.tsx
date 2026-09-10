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
  MiniSteps,
  PageHero,
  Pager,
  SiteFooter,
  StepCard,
  Term,
  TimedList,
} from "../components/ui";

export const metadata: Metadata = {
  title: "05 배우는 법 | 바이브코딩과 함께 살아남기",
  description:
    "배포 다음에 할 일 — 무엇을 볼지 정하고, 모니터링으로 지켜보고, 사용자 인터뷰로 이유를 듣고, 배운 것으로 서비스를 강화하는 사이클.",
};

/* 배경 설명 · 사례 · 진행 요령은 강사 노트(app/lib/lecture-notes.ts)에 있습니다.
   강의가 끝난 뒤 스스로 하는 장이라 완료 집계 단계는 두지 않습니다. */

const TOTAL = 5;

const RAIL = [
  { id: "learn-1", num: "01", label: "무엇을 볼지" },
  { id: "learn-2", num: "02", label: "모니터링" },
  { id: "learn-3", num: "03", label: "사용자 인터뷰" },
  { id: "learn-4", num: "04", label: "읽기" },
  { id: "learn-5", num: "05", label: "강화하기" },
];

const LEARN_PARTS = ["① 무엇을 볼지", "② 모니터링", "③ 인터뷰", "④ 읽기", "⑤ 강화하기"];

const FUNNEL = [
  { k: "알게 됨", en: "획득", v: "첫 화면에서 목록을 내려 본다" },
  { k: "첫 가치", en: "활성화", v: "조건에 맞는 공고 1개를 누른다 — 핵심 행동" },
  { k: "다시 옴", en: "유지", v: "일주일 안에 다시 온다 · 알림을 신청한다" },
  { k: "돈", en: "수익", v: "유료 전환 · 선결제 (아직이면 연락처로 대신)" },
  { k: "추천", en: "추천", v: "링크를 다른 창업팀에 공유한다" },
];

/* 모니터링의 종류 — 설치법이 아니라 ‘목적에 따라 이런 눈이 있다’를 보여주는 지도 */
const MONITOR_TYPES = [
  {
    en: "Uptime",
    k: "가동 확인",
    q: "사이트가 지금 열리는가 — 안 열리면 알림",
    tools: [
      { n: "UptimeRobot", href: "https://uptimerobot.com" },
      { n: "Better Stack", href: "https://betterstack.com" },
    ],
  },
  {
    en: "Errors",
    k: "오류 추적",
    q: "어느 화면 · 어느 코드에서 깨졌는가",
    tools: [{ n: "Sentry", href: "https://sentry.io" }],
  },
  {
    en: "Logs",
    k: "로그",
    q: "서버에서 언제 무슨 일이 있었나 — 원인을 찾을 때",
    tools: [
      { n: "Vercel Logs", href: "https://vercel.com/docs/observability" },
      { n: "Supabase Logs", href: "https://supabase.com/docs/guides/telemetry/logs" },
    ],
  },
  {
    en: "Performance",
    k: "속도",
    q: "느려서 떠나지 않는가 — 실제 방문자 기준 로딩 속도",
    tools: [
      { n: "Vercel Speed Insights", href: "https://vercel.com/docs/speed-insights" },
      { n: "PageSpeed Insights", href: "https://pagespeed.web.dev" },
    ],
  },
  {
    en: "Analytics",
    k: "방문 분석",
    q: "몇 명이, 어디서 와서, 어떤 페이지를 보나",
    tools: [
      { n: "Vercel Web Analytics", href: "https://vercel.com/docs/analytics" },
      { n: "Google Analytics", href: "https://marketingplatform.google.com/about/analytics/" },
    ],
  },
  {
    en: "Product analytics",
    k: "사용자 행동 패턴",
    q: "어느 단계에서 빠지나 · 다시 오나 — ①에서 정한 칸별 숫자",
    tools: [
      { n: "PostHog", href: "https://posthog.com" },
      { n: "Amplitude", href: "https://amplitude.com" },
      { n: "Mixpanel", href: "https://mixpanel.com" },
    ],
  },
  {
    en: "Heatmap · Replay",
    k: "히트맵 · 세션 녹화",
    q: "어디를 누르고, 어디까지 내리고, 어디서 멈칫하나",
    tools: [
      { n: "Microsoft Clarity", href: "https://clarity.microsoft.com" },
      { n: "Hotjar", href: "https://www.hotjar.com" },
    ],
  },
  {
    en: "Feedback",
    k: "사용자 목소리",
    q: "왜 불편한가 — 숫자가 알려주지 못하는 이유 (③ 인터뷰로)",
    tools: [
      { n: "Tally", href: "https://tally.so" },
      { n: "Google Forms", href: "https://forms.google.com" },
    ],
  },
];

/* 사용자 인터뷰 — 누구를 만나나 */
const PEOPLE = [
  {
    k: "첫 고객",
    when: "출시 직후",
    v: "2장에서 인터뷰했던 ‘따뜻한’ 사람에게 먼저 보여주고 옆에서 봅니다.",
  },
  {
    k: "떠난 사람",
    when: "안 쓰게 됐을 때",
    v: "“무엇 때문에 안 쓰게 되셨어요? 지금은 대신 어떻게 하세요?”",
  },
  {
    k: "남은 사람",
    when: "계속 쓸 때",
    v: "“왜 계속 쓰세요? 어디서 알게 되셨어요?” — 짧은 후기도 부탁합니다.",
  },
  {
    k: "의견 보낸 사람",
    when: "연락이 왔을 때",
    v: "직접 답하고 20분 통화를 청합니다. 투표로 기능을 정하지 않습니다.",
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
  { k: "방향 전환", v: "다른 고객·문제에서 반응이 더 좋다 → intent.md의 대상·문제부터 다시" },
  { k: "멈춤", v: "신호가 없거나, 오래 풀고 싶은 문제가 아니다 → 배운 것을 남기고 새 아이디어로" },
];

export default function LearnPage() {
  return (
    <div>
      <Nav />
      <PageHero
        num="05"
        label="Chapter 05"
        title={
          <>
            <Blue>배우는 법</Blue> — 배포 다음에 할 일
          </>
        }
        sub={
          <>
            무엇을 볼지 정하고, <b>모니터링</b>으로 지켜보고,{" "}
            <b>사용자 인터뷰</b>로 이유를 듣고, 배운 것으로 서비스를 강화합니다.
            강의가 끝난 뒤 매주 돌리는 장입니다.
          </>
        }
      />

      <StepRail items={RAIL} />

      <main className="mx-auto w-full flex max-w-5xl flex-col gap-8 px-5 py-12 md:px-8">
        {/* 개요 */}
        <section className="rounded-[24px] border border-[var(--s2-line)] bg-[var(--s2-card)] p-7 shadow-[var(--s2-shadow-lg)] md:p-9">
          <Badge>배우는 법</Badge>
          <h2 className="mt-4 text-[22px] font-extrabold leading-[1.4] md:text-[26px]">
            배포는 끝이 아니다 — <Blue>배운 것</Blue>이 생겨야 끝
          </h2>
          <p className="mt-3 text-[15px] leading-[1.7] text-[var(--s2-body)]">
            앱이 생긴 지금은 아이템 발전 사이클의 3·4단계입니다.
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
          <p className="mb-3 mt-6 text-[15px] font-extrabold">
            개발 주기로 보면 — 마지막 <Blue>운영</Blue> 단계, 그리고 다시 1단계
          </p>
          <SdlcLoop current={[5]} />
        </section>

        {/* 1. 무엇을 볼지 */}
        <StepCard
          no={1}
          total={TOTAL}
          id="learn-1"
          title={
            <>
              무엇을 볼지 — <Blue>단계마다 행동 하나</Blue>
            </>
          }
          intro={
            <>
              칸마다 행동 하나를 정하면 <b>어디서 사람이 빠지는지</b> 보입니다.
            </>
          }
        >
          <ol className="flex flex-col rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)]">
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
        </StepCard>

        {/* 2. 모니터링 */}
        <StepCard
          no={2}
          total={TOTAL}
          id="learn-2"
          title={
            <>
              모니터링 — <Blue>목적에 맞는 눈</Blue>을 달기
            </>
          }
          intro={
            <>
              모니터링은 서비스가 <b>지금 어떤 상태인지 계속 지켜보는 일</b>
              입니다. 방법은 하나가 아니라, <b>무엇을 알고 싶은지</b>에 따라
              다릅니다.
            </>
          }
        >
          <CheckList
            items={[
              <>
                <b>사용자는 오류를 알려주지 않고 떠납니다</b> — 먼저 알아야
                되돌릴 수 있습니다
              </>,
              <>
                <b>자주 배포할수록 자주 깨질 수 있습니다</b> — 지켜보는 눈이
                있어야 마음 놓고 배포합니다
              </>,
              <>
                <b>숫자와 기록은 AI에게 주는 근거</b> — 붙여넣으면 Claude가
                원인을 훨씬 정확히 찾습니다
              </>,
            ]}
          />

          <div className="flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              모니터링의 종류 — <Blue>무엇을 알고 싶은가</Blue>
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {MONITOR_TYPES.map((m) => (
                <div
                  key={m.k}
                  className="flex flex-col rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-5"
                >
                  <p className="font-mono text-[11.5px] text-[var(--s2-blue)]">
                    {m.en}
                  </p>
                  <p className="mt-1 text-[15.5px] font-extrabold">{m.k}</p>
                  <p className="mt-1 text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
                    {m.q}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {m.tools.map((t) => (
                      <a
                        key={t.n}
                        href={t.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono rounded-full border border-[var(--s2-line)] bg-[var(--s2-card)] px-2.5 py-1 text-[11.5px] text-[var(--s2-gray)] transition-colors hover:border-[var(--s2-blue)] hover:text-[var(--s2-blue)]"
                      >
                        {t.n} ↗
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Callout title="처음부터 다 달 필요는 없습니다">
            처음엔 <b>가동 확인 · 오류 · 방문 분석</b> 정도면 충분합니다.
            &ldquo;사람들이 어디서 멈추지?&rdquo;가 궁금해지면 그때 행동 분석이나
            히트맵을 붙이세요. 붙이는 방법은 Claude에게 &ldquo;○○를
            붙여줘&rdquo;라고 물으면 됩니다.
          </Callout>
          <p className="text-[14px] leading-[1.65] text-[var(--s2-body)]">
            개발 주기의 <b>운영</b> 단계가 바로 이것입니다 — 지켜보다 이상한
            신호가 보이면, 그 내용을 새 intent.md로 적어 2장의 순서대로 다시
            고칩니다.
          </p>
        </StepCard>

        {/* 3. 사용자 인터뷰 */}
        <StepCard
          no={3}
          total={TOTAL}
          id="learn-3"
          title={
            <>
              사용자 인터뷰 — <Blue>숫자가 &lsquo;무엇&rsquo;이면, 사람은 &lsquo;왜&rsquo;</Blue>
            </>
          }
          intro={
            <>
              모니터링은 어디서 빠지는지 알려주지만, 왜 빠지는지는 알려주지
              않습니다. 사용자가 적은 지금은 <b>사람 쪽이 훨씬 빠릅니다</b>.
            </>
          }
        >
          <div className="flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              누구를 만나나 — <Blue>네 부류</Blue>
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {PEOPLE.map((p) => (
                <div
                  key={p.k}
                  className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-5"
                >
                  <p className="font-mono text-[11.5px] text-[var(--s2-blue)]">
                    {p.when}
                  </p>
                  <p className="mt-1 text-[15.5px] font-extrabold">{p.k}</p>
                  <p className="mt-1.5 text-[13.5px] leading-[1.6] text-[var(--s2-body)]">
                    {p.v}
                  </p>
                </div>
              ))}
            </div>
            <CopyBlock
              label="의견 창구 달기"
              command="모든 화면 오른쪽 아래에 '의견 보내기' 버튼을 달고, 누르면 내 이메일로 보내는 메일 창이 열리게 해줘"
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[15px] font-extrabold">
              보여주며 관찰하기 — <Blue>20~30분 대본</Blue>
            </p>
            <TimedList rows={MVP_INTERVIEW} />
            <CheckList
              items={[
                <>
                  <b>설명하지 말고 보여주기만</b> — 설명해야 쓰는 화면이면 그게
                  고칠 거리입니다
                </>,
                <>
                  <b>도와주지 말고 멈칫한 곳을 적기</b> — 헤매는 자리가 다음
                  업데이트 거리입니다
                </>,
                <>
                  <b>&ldquo;좋네요&rdquo;는 흘려듣기</b> — 칭찬보다 행동을 믿습니다
                </>,
                <>
                  <b>5명이면 충분히 시작</b> — 큰 문제는 대부분 그 안에서
                  드러납니다
                </>,
              ]}
            />
          </div>

          <Term
            title="인터뷰를 기록으로"
            lines={[
              {
                dim: true,
                text: "> 오늘 인터뷰 메모야: (붙여넣기)",
              },
              {
                dim: true,
                text: "> docs/interviews.md 양식대로 정리하고, 가장 큰 문제 3가지와 고객이 쓴 표현을 뽑아줘.",
              },
            ]}
          />
          <p className="text-[13.5px] leading-[1.65] text-[var(--s2-gray)]">
            출시 전 문제 인터뷰 대본과 기록 양식은 2장 &lsquo;강의가 끝난 뒤
            ②&rsquo;에 있습니다.
          </p>

          <Callout title="사용자가 쌓이면 한 가지 질문">
            <b>
              &ldquo;더 이상 못 쓰게 되면 얼마나 실망하시겠어요?&rdquo;
            </b>{" "}
            &lsquo;매우 실망&rsquo;이 40%를 넘으면 꼭 필요한 제품이 되어 가는
            신호입니다.
          </Callout>
        </StepCard>

        {/* 4. 읽기 */}
        <StepCard
          no={4}
          total={TOTAL}
          id="learn-4"
          title={
            <>
              읽기 — <Blue>가장 큰 구멍 하나</Blue>부터
            </>
          }
          intro={
            <>
              모니터링 숫자와 인터뷰 메모를 <b>한 주 단위로</b> 함께 봅니다.
            </>
          }
        >
          <CheckList
            items={[
              <>
                <b>가장 많이 빠지는 칸 하나부터</b> — 여러 곳을 동시에 고치지
                않습니다
              </>,
              <>
                <b>사람이 적을 땐 강한 신호만</b> — 첫 결과 하나에 방향을 통째로
                바꾸지 않습니다
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
        </StepCard>

        {/* 5. 강화하기 */}
        <StepCard
          no={5}
          total={TOTAL}
          id="learn-5"
          title={
            <>
              배운 것으로 <Blue>강화하기</Blue>
            </>
          }
          intro={
            <>
              방향은 <b>내 생각이 아니라 고객의 반응</b>이 정합니다.
            </>
          }
        >
          <div className="grid gap-4 md:grid-cols-2">
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
          <Term
            title="배포 직후 — 배운 것 남기기"
            lines={[
              {
                dim: true,
                text: "> 방금 배포한 변경을 docs/learning.md 에 추가해줘.",
              },
              { dim: true, text: ">   - 바꾼 것:" },
              { dim: true, text: ">   - 예상한 것: (4장 1단계에서 적은 가설)" },
              { dim: true, text: ">   - 실제로 본 것: (모니터링 숫자 + 만난 사람의 말)" },
              { dim: true, text: ">   - 다음에 할 것:" },
            ]}
          />
          <Term
            title="한 주가 끝나면 — intent.md 로 되돌리기"
            lines={[
              {
                dim: true,
                text: "> docs/learning.md 를 읽고, docs/intent.md 에서 바뀌어야 할 칸과",
              },
              {
                dim: true,
                text: "> 그 근거가 된 기록을 짝지어 보여줘. 내가 확인하면 반영해줘.",
              },
            ]}
          />
          <div className="flex flex-col gap-3">
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
        </StepCard>

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
                  <b>숫자 보기</b> — 모니터링에서 가장 많이 빠지는 칸 · 늘어난
                  오류 찾기
                </>,
                <>
                  <b>사람 만나기</b> — 그 칸에서 빠진 사람에게 이유 묻기
                </>,
                <>
                  <b>가설 한 줄</b> — [이렇게 바꾸면] → [이 숫자가 오를 것이다]
                </>,
                <>
                  <b>작게 바꿔 배포</b> — 이번 주엔 하나만, 4장 순서대로
                </>,
                <>
                  <b>기록</b> —{" "}
                  <span className="font-mono text-[13.5px]">learning.md</span> →{" "}
                  <span className="font-mono text-[13.5px]">intent.md</span>
                </>,
              ]}
            />
          </div>
        </section>

        {/* 마무리 */}
        <section className="rounded-[24px] border border-[var(--s2-info-line)] bg-[var(--s2-info-bg)] p-7 md:p-9">
          <p className="text-[18px] font-extrabold leading-[1.5] md:text-[20px]">
            배포하고, <Blue>지켜보고, 듣고, 고치기</Blue>
          </p>
          <p className="mt-3 text-[14.5px] leading-[1.7] text-[var(--s2-body)]">
            이 한 바퀴가 서비스를 키웁니다. <b>완벽해질 때까지 기다리지 말고</b>,
            이번 주에 한 바퀴를 돌려보세요.
          </p>
        </section>
      </main>

      <Pager
        prev={{ href: "/update", label: "04 업데이트 배포" }}
        next={{ href: "/tools", label: "06 유용한 도구들" }}
      />
      <SiteFooter />
    </div>
  );
}
