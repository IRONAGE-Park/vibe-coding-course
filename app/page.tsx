const NAV_ITEMS = [
  { href: "#schedule", label: "일정" },
  { href: "#topics", label: "팀 주제" },
  { href: "#step-1", label: "1. 환경 세팅" },
  { href: "#step-2", label: "2. 기획서" },
  { href: "#step-3", label: "3. 바이브 코딩" },
  { href: "#step-4", label: "4. 배포·공유" },
  { href: "#faq", label: "막혔을 때" },
];

function SectionTitle({
  step,
  title,
  subtitle,
}: {
  step?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10">
      {step && (
        <span className="inline-block rounded-full bg-violet-100 px-4 py-1 text-sm font-bold text-violet-700">
          {step}
        </span>
      )}
      <h2 className="mt-3 text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 max-w-2xl text-lg text-zinc-500">{subtitle}</p>}
    </div>
  );
}

function PromptBlock({ label, children }: { label: string; children: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-lg">
      <div className="flex items-center gap-2 border-b border-zinc-800 px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs font-medium text-zinc-400">{label}</span>
      </div>
      <pre className="whitespace-pre-wrap px-5 py-4 font-sans text-sm leading-relaxed text-zinc-100">
        {children}
      </pre>
    </div>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
        ✓
      </span>
      <div className="text-zinc-700">{children}</div>
    </li>
  );
}

export default function Home() {
  return (
    <main className="flex-1 bg-zinc-50 text-zinc-900">
      {/* ─── 헤더 ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#top" className="text-lg font-black tracking-tight text-zinc-900">
            VIBE<span className="text-violet-600">CODING</span>
          </a>
          <nav className="hidden gap-5 text-sm font-medium text-zinc-600 md:flex">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-violet-600">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ─── 히어로 ───────────────────────────────────────── */}
      <section id="top" className="relative overflow-hidden bg-zinc-950 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(600px circle at 20% 30%, rgba(139,92,246,.5), transparent 60%), radial-gradient(700px circle at 80% 70%, rgba(59,130,246,.35), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
          <p className="mb-4 inline-block rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-200">
            경상국립대 지역혁신 프로젝트 × INVAIZ
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            코딩을 몰라도,
            <br />
            오늘 밤 <span className="text-violet-400">나만의 서비스</span>가 생깁니다
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
            부산에서 발견한 인사이트로 진주의 문제를 푸는 웹서비스 프로토타입 만들기.
            생성형 AI에게 말로 시키는 <strong className="text-white">바이브 코딩</strong>으로
            기획부터 배포까지 직접 경험해 보세요.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#step-1"
              className="rounded-xl bg-violet-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-violet-900/40 transition hover:bg-violet-500"
            >
              실습 시작하기 →
            </a>
            <a
              href="#step-2"
              className="rounded-xl border border-zinc-600 px-7 py-3.5 font-bold text-zinc-200 transition hover:border-zinc-400 hover:text-white"
            >
              기획서 템플릿 보기
            </a>
          </div>
        </div>
      </section>

      {/* ─── 일정 ─────────────────────────────────────────── */}
      <section id="schedule" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
        <SectionTitle
          title="오늘 밤의 여정"
          subtitle="총 7.5시간. 짧지만, 프로토타입 하나를 완성하기엔 충분합니다."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              time: "19:00 – 21:00",
              title: "강의 & 연습",
              desc: "바이브 코딩 이해하기, 환경 세팅, 첫 프롬프트 던져보기. 여기까지 따라오면 절반은 성공입니다.",
              badge: "2시간",
            },
            {
              time: "21:00 – 24:00",
              title: "실전 제작",
              desc: "팀별로 기획서를 완성하고, 메인 페이지와 핵심 기능 페이지를 만듭니다. 막히면 손 들기!",
              badge: "3시간",
            },
            {
              time: "다음날 09:00 – 11:30",
              title: "마무리 & 배포",
              desc: "디테일을 다듬고 배포해서 공유 링크를 만듭니다. 발표 준비까지 끝내면 완주!",
              badge: "2.5시간",
            },
          ].map((item, i) => (
            <div
              key={item.time}
              className="relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <span className="absolute -top-3 left-6 rounded-full bg-zinc-900 px-3 py-1 text-xs font-bold text-white">
                {item.badge}
              </span>
              <p className="text-sm font-bold text-violet-600">{item.time}</p>
              <h3 className="mt-1 text-xl font-black text-zinc-900">
                {i + 1}. {item.title}
              </h3>
              <p className="mt-2 leading-relaxed text-zinc-600">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50 p-6">
          <p className="font-bold text-violet-900">🎯 산출물 목표</p>
          <p className="mt-1 text-violet-800">
            <strong>메인 페이지 1개 + 상세 기능 페이지 1~2개</strong>면 충분합니다. 더 만들 수
            있다면 자유롭게 확장하세요. 완성도보다 &ldquo;내 아이디어가 화면으로 살아있는
            경험&rdquo;이 목표입니다.
          </p>
        </div>
      </section>

      {/* ─── 팀 주제 ──────────────────────────────────────── */}
      <section id="topics" className="scroll-mt-20 bg-zinc-100 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle
            title="3대 주제, 6개 팀"
            subtitle="부산 벤치마킹에서 가져온 자료(사진·캡처·인터뷰 메모)가 여러분 서비스의 재료입니다."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                emoji: "🏠",
                title: "청년 정착",
                desc: "진주를 떠나지 않아도 되는 이유 만들기 — 주거, 일자리, 커뮤니티 서비스",
                examples: "예: 청년 공간 지도, 로컬 일자리 매칭, 정착 지원금 내비게이터",
              },
              {
                emoji: "🛍️",
                title: "관광 · 로컬 상권",
                desc: "진주의 매력을 발견하게 만드는 서비스 — 관광 코스, 로컬 가게, 축제",
                examples: "예: 진주 원데이 코스 추천, 로컬 상점 스탬프 투어, 야시장 가이드",
              },
              {
                emoji: "🚌",
                title: "고령자 · 교통약자",
                desc: "이동이 어려운 이웃을 돕는 서비스 — 교통, 접근성, 생활 지원",
                examples: "예: 저상버스 알리미, 병원 동행 매칭, 쉬운 글자 민원 도우미",
              },
            ].map((topic) => (
              <div
                key={topic.title}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-4xl">{topic.emoji}</div>
                <h3 className="mt-3 text-xl font-black text-zinc-900">{topic.title}</h3>
                <p className="mt-2 leading-relaxed text-zinc-600">{topic.desc}</p>
                <p className="mt-3 rounded-lg bg-zinc-50 p-3 text-sm text-zinc-500">
                  {topic.examples}
                </p>
                <p className="mt-3 text-xs font-bold text-violet-600">각 주제당 2팀</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STEP 1: 환경 세팅 ────────────────────────────── */}
      <section id="step-1" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
        <SectionTitle
          step="STEP 1 · 10분"
          title="환경 세팅"
          subtitle="설치할 프로그램은 없습니다. 브라우저만 있으면 됩니다."
        />
        <ul className="grid gap-4 md:grid-cols-2">
          <Check>
            <strong>노트북 + 전원 + 와이파이</strong> 연결 확인 — 세미나실 와이파이 정보는
            현장에서 안내합니다.
          </Check>
          <Check>
            <strong>claude.ai 로그인</strong> — 팀당 2개씩 제공된 <strong>Claude 팀 계정</strong>
            으로 로그인하세요. 역할을 나누면 좋습니다(한 계정은 화면 제작, 한 계정은 자료 정리).
          </Check>
          <Check>
            <strong>벤치마킹 자료 모으기</strong> — 오후에 찍은 현장 사진, 캡처, 인터뷰 메모를
            팀 채팅방 한곳에 모아두세요. 프롬프트에 바로 활용합니다.
          </Check>
          <Check>
            <strong>(배포 담당 1명) Vercel 가입</strong> —{" "}
            <a
              href="https://vercel.com/signup"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-violet-600 underline"
            >
              vercel.com/signup
            </a>
            에서 이메일로 가입해 두면 STEP 4가 빨라집니다. (선택)
          </Check>
        </ul>
        <div className="mt-8 rounded-2xl bg-zinc-900 p-6 text-zinc-200">
          <p className="font-bold text-white">💡 세팅 완료 테스트</p>
          <p className="mt-1">
            Claude에게 이렇게 보내보세요 —{" "}
            <code className="rounded bg-zinc-700 px-2 py-0.5 text-sm">
              &ldquo;간단한 자기소개 웹페이지를 만들어줘&rdquo;
            </code>{" "}
            오른쪽에 미리보기 화면(Artifact)이 뜨면 준비 끝입니다.
          </p>
        </div>
      </section>

      {/* ─── STEP 2: 기획서 ──────────────────────────────── */}
      <section id="step-2" className="scroll-mt-20 bg-zinc-100 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle
            step="STEP 2 · 40분"
            title="프로토타입 기획서"
            subtitle="바이브 코딩의 절반은 기획입니다. AI는 여러분이 정한 만큼만 잘 만듭니다. 아래 6칸을 팀원들과 채워보세요."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                num: "①",
                title: "서비스 이름",
                desc: "부르기 쉽고 기억에 남는 이름",
                example: "예: 진주살이, 야시장플리즈, 느린버스",
              },
              {
                num: "②",
                title: "문제 정의 (한 문장)",
                desc: "누가 · 언제 · 무엇 때문에 불편한가?",
                example: "예: 진주 청년은 지역 일자리 정보를 한곳에서 볼 수 없다.",
              },
              {
                num: "③",
                title: "타겟 사용자",
                desc: "이 서비스를 여는 사람은 정확히 누구인가?",
                example: "예: 진주에 사는 20대 취업준비생",
              },
              {
                num: "④",
                title: "핵심 기능 3개",
                desc: "많이 말고, 딱 3개. 그중 1개가 '킬러 기능'",
                example: "예: 지도 보기 / 후기 남기기 / 즐겨찾기",
              },
              {
                num: "⑤",
                title: "화면 구성",
                desc: "메인 페이지 + 상세 페이지 1~2개. 각 화면에 뭐가 보이는지 손그림도 OK",
                example: "예: 메인(지도+검색) → 상세(가게 정보+후기)",
              },
              {
                num: "⑥",
                title: "부산 벤치마킹 인사이트",
                desc: "오늘 부산에서 본 것 중 훔쳐올 아이디어 1가지",
                example: "예: ○○시장의 QR 스탬프 투어를 진주 중앙시장에 적용",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <p className="text-2xl font-black text-violet-600">{item.num}</p>
                <h3 className="mt-1 text-lg font-black text-zinc-900">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600">{item.desc}</p>
                <p className="mt-3 rounded-lg bg-violet-50 p-3 text-sm text-violet-800">
                  {item.example}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <PromptBlock label="기획이 막힐 때 — Claude에게 이렇게 물어보세요">
              {`우리 팀은 "진주 고령자·교통약자" 문제를 다루는 대학생 팀이야.
오늘 부산에서 저상버스 안내 시스템을 보고 왔어. (인터뷰 메모: ~~~)

이 인사이트로 진주에서 만들 수 있는 웹서비스 아이디어 5개를 제안해줘.
각 아이디어마다 [타겟 사용자 / 핵심 기능 3개 / 예상 화면 구성]을 표로 정리해줘.`}
            </PromptBlock>
          </div>
        </div>
      </section>

      {/* ─── STEP 3: 바이브 코딩 ─────────────────────────── */}
      <section id="step-3" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
        <SectionTitle
          step="STEP 3 · 실전"
          title="바이브 코딩"
          subtitle="코드를 쓰는 게 아니라, 원하는 것을 정확하게 '말하는' 시간입니다."
        />

        <h3 className="mb-4 text-xl font-black text-zinc-900">
          🚀 첫 프롬프트 — 복사해서 채워 쓰세요
        </h3>
        <PromptBlock label="첫 프롬프트 템플릿 (기획서 ①~⑥을 그대로 붙여넣기)">
          {`너는 웹 서비스를 만드는 시니어 개발자야. 아래 기획서로 웹사이트를 만들어줘.

[서비스 이름] 진주살이
[문제] 진주 청년은 지역 일자리·주거 정보를 한곳에서 볼 수 없다
[타겟] 진주에 사는 20대 청년
[핵심 기능] ① 청년 지원사업 모아보기 ② 관심 등록 ③ 마감 임박 표시
[화면] 메인 페이지(오늘의 추천 + 카테고리별 목록), 상세 페이지(지원사업 정보 + 신청 방법)

요구사항:
- 모바일에서 보기 좋게 만들어줘
- 색상은 따뜻한 주황 계열, 둥근 모서리의 친근한 느낌
- 실제 서비스처럼 보이도록 그럴듯한 예시 데이터를 8개 이상 채워줘
- 하나의 HTML 파일로 만들어줘`}
        </PromptBlock>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6">
            <h3 className="text-lg font-black text-red-800">❌ 이렇게 말하면 실패합니다</h3>
            <ul className="mt-3 space-y-2 text-red-900/80">
              <li>&ldquo;웹사이트 만들어줘&rdquo; — 뭘 만들지 AI가 찍어야 함</li>
              <li>&ldquo;더 예쁘게 해줘&rdquo; — &lsquo;예쁘게&rsquo;의 기준이 없음</li>
              <li>&ldquo;전부 다시 만들어&rdquo; — 잘 된 부분까지 잃어버림</li>
              <li>한 번에 기능 10개 요청 — 다 어중간해짐</li>
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-6">
            <h3 className="text-lg font-black text-green-800">✅ 이렇게 말하면 성공합니다</h3>
            <ul className="mt-3 space-y-2 text-green-900/80">
              <li>&ldquo;메인 상단에 검색창을 추가해줘&rdquo; — 위치 + 대상이 명확</li>
              <li>&ldquo;버튼 색을 주황색으로, 글자는 더 크게&rdquo; — 구체적 기준</li>
              <li>&ldquo;나머지는 그대로 두고 지도 부분만 수정해줘&rdquo; — 범위 지정</li>
              <li>한 번에 한 가지씩 → 확인 → 다음 요청</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-zinc-900 p-8 text-zinc-200">
          <h3 className="text-xl font-black text-white">🔁 바이브 코딩 황금 루프</h3>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-lg font-bold">
            <span className="rounded-xl bg-violet-600 px-5 py-3 text-white">1. 말한다</span>
            <span className="text-zinc-500">→</span>
            <span className="rounded-xl bg-zinc-700 px-5 py-3">2. 결과를 본다</span>
            <span className="text-zinc-500">→</span>
            <span className="rounded-xl bg-zinc-700 px-5 py-3">3. 다른 점을 찾는다</span>
            <span className="text-zinc-500">→</span>
            <span className="rounded-xl bg-zinc-700 px-5 py-3">4. 구체적으로 고쳐 말한다</span>
            <span className="text-zinc-500">↩︎</span>
          </div>
          <p className="mt-5 text-zinc-400">
            이 루프를 빨리 도는 팀이 이깁니다. 한 바퀴에 10분을 넘기지 마세요. 마음에 든 버전이
            나오면 반드시 <strong className="text-white">버전 이름을 붙여 기억</strong>해 두세요
            (&ldquo;방금 버전 좋았어, 여기서 ○○만 바꿔줘&rdquo;).
          </p>
        </div>

        <div className="mt-12">
          <h3 className="mb-4 text-xl font-black text-zinc-900">
            📸 벤치마킹 자료를 재료로 쓰기
          </h3>
          <p className="mb-4 max-w-3xl text-zinc-600">
            부산에서 가져온 사진·캡처·메모는 그냥 발표 자료가 아니라{" "}
            <strong>프롬프트의 재료</strong>입니다. Claude에 이미지를 첨부하고 이렇게 말해보세요.
          </p>
          <PromptBlock label="이미지 첨부 + 프롬프트 예시">
            {`(부산 ○○서비스 안내판 사진 첨부)

이 사진은 부산에서 본 ○○ 안내 시스템이야.
이 화면 구성과 정보 배치 방식을 참고해서,
우리 서비스의 상세 페이지를 만들어줘.
단, 대상은 진주 ○○이고, 어르신도 읽기 쉽게 글자를 크게 해줘.`}
          </PromptBlock>
        </div>
      </section>

      {/* ─── STEP 4: 배포 ────────────────────────────────── */}
      <section id="step-4" className="scroll-mt-20 bg-zinc-100 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle
            step="STEP 4 · 20분"
            title="배포 & 공유"
            subtitle="내 컴퓨터에만 있으면 작품이 아닙니다. 링크가 생겨야 서비스입니다."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                기본 코스 — 5분
              </span>
              <h3 className="mt-3 text-2xl font-black text-zinc-900">Claude Artifact 게시</h3>
              <ol className="mt-4 space-y-3 text-zinc-700">
                <li>
                  <strong>1.</strong> 완성된 Artifact(미리보기 화면) 우측 상단의{" "}
                  <strong>게시(Publish)</strong> 버튼 클릭
                </li>
                <li>
                  <strong>2.</strong> 생성된 공유 링크 복사
                </li>
                <li>
                  <strong>3.</strong> 팀 채팅방과 발표 자료에 링크 붙여넣기 — 끝!
                </li>
              </ol>
              <p className="mt-4 rounded-lg bg-zinc-50 p-3 text-sm text-zinc-500">
                누구나 링크로 접속해 볼 수 있습니다. 수정하면 다시 게시해서 링크를 갱신하세요.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-violet-300 bg-white p-7 shadow-sm">
              <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                도전 코스 — 15분
              </span>
              <h3 className="mt-3 text-2xl font-black text-zinc-900">Vercel 배포 (진짜 URL)</h3>
              <ol className="mt-4 space-y-3 text-zinc-700">
                <li>
                  <strong>1.</strong> Claude에게 &ldquo;지금까지 만든 것을{" "}
                  <strong>HTML 파일로 다운로드</strong>할 수 있게 해줘&rdquo; 요청 → 파일 저장
                </li>
                <li>
                  <strong>2.</strong> 폴더를 하나 만들고 파일 이름을{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">index.html</code>
                  로 바꿔서 넣기
                </li>
                <li>
                  <strong>3.</strong>{" "}
                  <a
                    href="https://vercel.com/new"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-violet-600 underline"
                  >
                    vercel.com/new
                  </a>
                  에서 폴더를 <strong>드래그 &amp; 드롭</strong>
                </li>
                <li>
                  <strong>4.</strong> 몇 초 뒤 <strong>내 서비스만의 주소</strong>(
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">
                    팀이름.vercel.app
                  </code>
                  ) 완성 🎉
                </li>
              </ol>
              <p className="mt-4 rounded-lg bg-violet-50 p-3 text-sm text-violet-800">
                지금 보고 있는 이 페이지도 똑같은 방식으로 Vercel에 배포된 것입니다.
              </p>
            </div>
          </div>
          <div className="mt-8 rounded-2xl bg-zinc-900 p-6 text-center">
            <p className="text-lg font-bold text-white">
              ✅ 완주 조건: 팀 채팅방에 <span className="text-violet-400">공유 링크</span>가
              올라오면 완주입니다!
            </p>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────── */}
      <section id="faq" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
        <SectionTitle
          title="막혔을 때"
          subtitle="10분 이상 혼자 고민하지 마세요. 아래를 먼저 확인하고, 그래도 안 되면 손을 드세요."
        />
        <div className="space-y-4">
          {[
            {
              q: "AI가 만든 화면이 이상하게 깨져요",
              a: '당황하지 말고 "화면이 깨졌어. 방금 수정 전 버전으로 되돌리고, ○○만 다시 바꿔줘"라고 하세요. 이전 버전은 대화 기록에 남아 있습니다.',
            },
            {
              q: "AI가 요청을 반만 반영해요",
              a: '요청을 쪼개세요. 3가지를 한 번에 시켰다면 1가지씩 나눠서 다시 요청하면 됩니다. 그리고 "나머지는 절대 바꾸지 마"를 붙이세요.',
            },
            {
              q: "대화가 너무 길어져서 AI가 느려지고 엉뚱해져요",
              a: '새 대화를 여세요. 첫 메시지에 기획서 + "지금까지 만든 HTML"을 통째로 붙여넣고 이어서 작업하면 됩니다.',
            },
            {
              q: "팀원들과 어떻게 분업하나요?",
              a: "계정이 2개니까 화면을 나누세요. 계정 A는 메인 페이지, 계정 B는 상세 페이지. 색상·글꼴 같은 스타일 기준만 먼저 합의하면 나중에 자연스럽게 이어집니다.",
            },
            {
              q: "진짜 데이터가 없어요",
              a: '프로토타입은 가짜 데이터로 충분합니다. "그럴듯한 예시 데이터 10개를 채워줘"라고 하세요. 부산에서 찍은 사진 속 실제 정보를 몇 개 섞으면 훨씬 진짜 같아집니다.',
            },
          ].map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <summary className="cursor-pointer list-none text-lg font-bold text-zinc-900">
                <span className="mr-2 text-violet-600">Q.</span>
                {item.q}
              </summary>
              <p className="mt-3 leading-relaxed text-zinc-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ─── 푸터 ─────────────────────────────────────────── */}
      <footer className="border-t border-zinc-200 bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 text-center text-sm text-zinc-500">
          <p className="font-bold text-zinc-700">
            경상국립대 지역혁신 프로젝트 — 바이브 코딩 실습
          </p>
          <p>부산 벤치마킹 → 진주 문제 해결 웹서비스 프로토타입 | INVAIZ</p>
          <p className="mt-2 text-xs text-zinc-400">
            이 페이지 역시 바이브 코딩으로 만들어 Vercel에 배포되었습니다.
          </p>
        </div>
      </footer>
    </main>
  );
}
