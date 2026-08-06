import type { Metadata } from "next";
import Nav from "../components/Nav";
import CopyBlock from "../components/CopyBlock";
import StepRail from "../components/StepRail";
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
} from "../components/ui";

export const metadata: Metadata = {
  title: "02 문제 정의 | 바이브코딩과 함께 살아남기",
  description:
    "Claude Code와 대화하며 문제를 정의하고, 기획서와 요구사항 명세를 만들어 앱 초안 개발까지 지시하는 과정.",
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

      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-12 md:px-8">
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
                text: "> 너는 나와 함께 웹서비스를 기획하는 파트너야.",
              },
              {
                dim: true,
                text: "> 나는 코딩을 모르는 대학생이고, 지역문제를 푸는 서비스를 만들고 싶어.",
              },
              { dim: true, text: ">" },
              {
                dim: true,
                text: "> 규칙: 아직 코드는 만들지 마. 질문은 한 번에 2개까지만.",
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
              걸러냅니다.
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
                text: "> 우리 팀은 진주의 고령자·교통약자 문제를 다루고 싶어.",
              },
              {
                dim: true,
                text: "> 부산에서 저상버스 안내 시스템을 보고 왔어. (메모: ~~~)",
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
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[16px] border border-[var(--s2-line)] bg-[var(--s2-tint)] p-5">
              <p className="font-mono mb-2 text-[11.5px] text-[var(--s2-faint)]">
                BAD — 너무 추상적
              </p>
              <p className="text-[14.5px] leading-[1.6] text-[var(--s2-gray)]">
                &ldquo;청년들이 지역을 떠나지 않게 하는 앱&rdquo;
              </p>
            </div>
            <div className="rounded-[16px] border border-[var(--s2-info-line)] bg-[var(--s2-info-bg)] p-5">
              <p className="font-mono mb-2 text-[11.5px] text-[var(--s2-blue)]">
                GOOD — 누가·언제·무엇 때문에
              </p>
              <p className="text-[14.5px] leading-[1.6] text-[var(--s2-strong)]">
                &ldquo;진주 취업 준비 청년이 조건에 맞는 채용공고와 주거지원
                정책을 <b>한 번에 찾기 어렵다</b>&rdquo;
              </p>
            </div>
          </div>
        </StepCard>

        {/* 3. 기획서 */}
        <StepCard
          no={3}
          total={TOTAL}
          id="plan-3"
          title="기획서 만들기 — 첫 번째 문서"
          intro={
            <>
              문제가 잡혔으면 AI에게 <b>파일로 정리</b>시킵니다. 대화는
              날아가지만 파일은 남습니다.
            </>
          }
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { num: "①", title: "서비스 이름", ex: "진주살이" },
              { num: "②", title: "문제 정의 (한 문장)", ex: "2단계에서 정한 그 문장" },
              { num: "③", title: "타겟 사용자", ex: "진주 20대 취업준비생" },
              { num: "④", title: "핵심 기능 3개", ex: "그중 1개가 킬러 기능" },
              { num: "⑤", title: "화면 구성", ex: "메인 + 상세 1~2개" },
              { num: "⑥", title: "벤치마킹 인사이트", ex: "부산에서 훔쳐올 것 1가지" },
            ].map((item) => (
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
          <Term
            title="기획서를 파일로 뽑아내기"
            lines={[
              {
                dim: true,
                text: "> 지금까지 정한 내용으로 기획서를 만들어서",
              },
              { dim: true, text: "> docs/plan.md 파일로 저장해줘." },
              { dim: true, text: ">" },
              {
                dim: true,
                text: "> 항목: 서비스 이름 / 문제 정의 / 타겟 사용자 /",
              },
              {
                dim: true,
                text: ">      핵심 기능 3개 / 화면 구성 / 참고한 사례",
              },
              {
                dim: true,
                text: "> 빠진 정보가 있으면 채우지 말고 나한테 물어봐.",
              },
              { text: "" },
              { dim: true, text: "✓ Created docs/plan.md" },
            ]}
          />
          <Callout title="AI가 마음대로 채운 내용은 반드시 확인하세요">
            AI는 빈칸을 그럴듯하게 메꾸는 데 능숙합니다. 만들어진 파일을 열어
            읽어보고, <b>내 생각과 다른 부분은 &ldquo;③번을 이렇게
            바꿔줘&rdquo;</b>처럼 항목을 짚어 고치게 하세요.
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
                text: ">   2) 기능 목록 — 사용자가 할 수 있는 행동",
              },
              {
                dim: true,
                text: ">   3) 데이터 — 어떤 정보를 저장하는지 (표 형태)",
              },
              {
                dim: true,
                text: ">   4) 이번에 만들지 않을 것 (로그인, 관리자 등)",
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
                <b>&ldquo;만들지 않을 것&rdquo;을 꼭 적으세요</b> — 이게 없으면
                AI가 로그인·알림·관리자까지 만들다가 아무것도 못 끝냅니다
              </>,
              <>
                화면은 <b>3개 이내</b>, 핵심 기능은 <b>1개</b>면 충분합니다
              </>,
            ]}
          />
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
                text: "> [범위] requirements.md의 화면 목록까지만. '만들지 않을 것'은 건드리지 마.",
              },
              {
                dim: true,
                text: "> [스택] Next.js + TypeScript, 배포는 Vercel",
              },
              {
                dim: true,
                text: "> [데이터] 지금은 예시 데이터 8개 이상으로 채워줘",
              },
              { dim: true, text: ">" },
              {
                dim: true,
                text: "> 시작하기 전에 네가 이해한 계획을 먼저 요약해줘.",
              },
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
              <span className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-[var(--s2-blue)] text-[11px] font-black text-white">
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
