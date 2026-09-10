# [리서치 A] 좋은 문제 정의·아이디어 발굴 방법론

- 작성일: 2026-09-10
- 목적: 2026-09-11 창업팀 대상 4.5시간 강의(session1-slides.html, 48장) 중 앞부분 30~40분을 "어떻게 좋은 문제를 정의하는가"로 재구성하기 위한 근거 조사
- 조사 방법: 웹 검색(WebSearch/WebFetch). 아래 모든 주장에 출처 URL과 확인된 발행일을 병기함. 발행일을 확인하지 못한 것은 **"발행일 확인 못 함"**으로 표기.

---

## 0. 한 줄 결론 (강의 설계에 쓸 것)

> **"만들기가 싸졌기 때문에, 무엇을 만들지 고르는 판단이 유일한 병목이 됐다."**
> 이 문장은 2026년 HBR·CB Insights·국내 강연에서 모두 독립적으로 확인되는 주장이며, 강의의 축을 "코딩 원론"에서 "문제 정의"로 옮기는 근거로 그대로 쓸 수 있음.

강의에 쓸 수 있는 근거 숫자 3개:

| 숫자 | 내용 | 출처 / 발행일 |
|---|---|---|
| **43%** | 2023년 이후 폐업한 VC 투자 스타트업 431곳(사유 식별 가능 385곳) 중 **"제품-시장 적합성 부족(poor product-market fit)"**을 실패 원인으로 든 비율. 1위는 "자본 소진 70%"이지만 리포트 자체가 이를 "최종 결과이지 근본 원인이 아니다"라고 명시. PMF 실패의 2/3는 초기 단계 기업. | [CB Insights, "Top reasons startups fail"](https://www.cbinsights.com/research/report/startup-failure-reasons-top/) / **2026-03-05** |
| **42%** | (구버전) CB Insights의 유명한 "No Market Need 42%" 통계. **주의: 2014년 데이터**이며 위 2026년 리포트에서는 해당 항목이 그대로 유지되지 않음. 슬라이드에 쓸 거면 2026년 43% 쪽을 쓰는 게 안전. | [SegmentOS 정리](https://segmentos.io/blog/why-startups-fail) / 발행일 확인 못 함 |
| **63%** | AI 앱 빌더 Lovable 사용자의 63%가 코드를 한 번도 써본 적 없다고 밝힌 수치. (2차 인용 — 원출처 Lovable 공식 발표를 직접 확인하지 못함) | [Museum of Vibe Coding, "Vibe Coding for Startups and Founders"](https://museumofvibecoding.org/vibe-coding-for-startups-and-founders-building-commercial-products-unbiased-research-2026/) / 발행일 확인 못 함(2026년 자료로 표기됨) |

---

## Part 1. 창업팀에게 실효성이 검증된 문제 정의 방법론

### 1-1. Paul Graham — "유기적(organic) 아이디어" (원전, 2012-11)

원문: <https://paulgraham.com/startupideas.html> (**2012년 11월**)

핵심 주장(원문 인용):

- 좋은 아이디어의 3요소: *"something the founders themselves want, that they themselves can build, and that few others realize are worth doing"*
- 검증 질문: *"Who wants this right now? Who wants this so much that they'll use it even when it's a crappy version one made by a two-person startup they've never heard of?"*
- 우물 vs 사막: **"소수가 아주 많이 원하는 것"**을 고를 것. 다수가 조금 원하는 것은 사막.
- *"Live in the future, then build what's missing."*
- **Schlep blindness / unsexy filter**: 귀찮고 폼 안 나는 일이라서 남들이 피한 문제에 기회가 있다. (Stripe = 결제라는 schlep을 남들이 피한 덕에 순항)

**"유기적 아이디어 vs 만들어낸 아이디어" 구분**은 창업팀 강의에서 가장 즉시 쓸모 있는 프레임:
- 유기적 = 내 삶에서 나온 문제. 최소 1명(=나)이 이미 검증된 사용자.
- 만들어낸 = 브레인스토밍 자리를 채우려고 만든 것. 그럴듯하게 피칭되지만 아무에게도 급하지 않음.
  (요약 출처: [Academy of PM, "Organic Startup Ideas Win"](https://blog.academyofpm.com/p/organic-startup-ideas) / 발행일 확인 못 함)

> **한계 비판:** PG의 조언은 "아직 유기적 아이디어가 없다면 만들어내지 말고, 그런 아이디어가 자랄 만한 경험을 쌓으러 가라"로 귀결됨. **오늘 하루짜리 워크숍에는 그대로 적용 불가**. 강의에서는 "평가 기준"으로만 쓰고, "지금 당장 아이디어를 만들어라"는 용도로는 쓰지 말 것.

---

### 1-2. Y Combinator — 아이디어가 아니라 "문제"부터 채점하기

**(a) Michael Seibel**
출처: [Startup Archive, "Michael Seibel on how to get and test startup ideas"](https://www.startuparchive.org/p/michael-seibel-on-how-to-get-and-test-startup-ideas) (**2023-12-07**)

- *"Starting with ideas is tricky because people immediately want to grade your idea. It's a lot easier to start with a problem and think about how you grade a problem."*
- 자문할 것: **"why am I uniquely qualified to work on this problem?"**
- 초기 제품은 사용자를 **넓히지 말고 걸러라**: *"The best startups very heavily filter the people who are able to use the initial product."*
- 아이디어가 완벽할 필요 없음(Justin.tv → Twitch 사례).

> **확인 못 함:** 검색으로는 Seibel이 문제를 "채점"하는 **명시적 기준 목록(체크리스트)**을 제시했다는 근거를 찾지 못했음. 슬라이드에 "YC의 N가지 기준"처럼 목록화해서 쓰지 말 것.

**(b) Dalton Caldwell — Tarpit(타르 웅덩이) 아이디어**
출처: [Lenny's Newsletter, "Lessons from 1,000+ YC startups"](https://www.lennysnewsletter.com/p/lessons-from-1000-yc-startups) (발행일 확인 못 함 / 팟캐스트 에피소드는 [Apple Podcasts 기준 2024년](https://podcasts.apple.com/us/podcast/lessons-from-1-000-yc-startups-resilience-tar-pit-ideas/id1627920305?i=1000652852710))

- Tarpit 아이디어 = **많은 사람이 동시에 떠올리고, 미해결 문제처럼 보이고, 주변에서 칭찬을 잔뜩 받는 아이디어.** 논리적으로도 그럴듯함. 그래서 빠져나오지 못함.
- 초기 반응은 좋지만 **사용자가 반복해서 쓰지 않음.**
- **소비자(consumer) 스타트업이 가장 큰 타르 웅덩이.**

> **강의 활용도 높음.** 창업팀 10팀 중 상당수가 "다들 좋다고 하는 아이디어"를 들고 올 가능성이 크므로, "칭찬 = 위험 신호"라는 반전 메시지로 쓰기 좋음. 슬라이드 1~2장.

**(c) YC 일반 조언 — 기술에서 문제로 역산하지 말 것**
출처: [YC Startup Library, "How To Pick A Startup Idea"](https://www.ycombinator.com/library/Ri-how-to-pick-a-startup-idea) — **본문 직접 확인 못 함(페이지가 JS 렌더링이라 WebFetch 실패).** 아래는 2차 정리 인용.
- 가장 흔한 실수는 기술(특히 AI)에서 출발해 문제를 찾는 것 = **SISP(Solution In Search of a Problem)**.
- 아이디어의 잠재력은 현실과 충돌해야만 판단 가능 — 고객과 대화하고, 프로토타입을 만들고, 실제 반응을 봐야 함. 노트북 앞이나 친구와의 토론으로는 신호가 안 나옴.
  (2차 출처: [UCI ANTrepreneur Center, "How Startup Ideas Really Form: Lessons From Y Combinator"](https://antrepreneur.uci.edu/2025/12/03/how-startup-ideas-really-form-lessons-from-y-combinator-part-1-of-3/) / **2025-12-03**)

---

### 1-3. Jobs To Be Done (JTBD) — 그리고 그 한계

**무엇인가:** 고객이 제품을 "고용(hire)"해서 처리하려는 **일(job)**이 무엇인지로 수요를 정의하는 틀.

**검증된 한계 (창업팀 강의에 반드시 같이 말할 것):**
출처: [Shah Mohammed, "Exploring the Limitations of the Jobs to be Done Framework"](https://shahmm.medium.com/exploring-the-limitations-of-the-jobs-to-be-done-framework-ebd387fd12e0) 및 [Wassim, "Why the JTBD Framework Isn't a One-Size-Fits-All"](https://medium.com/@wassimrb/why-the-jobs-to-be-done-framework-isnt-a-one-size-fits-all-for-product-development-f2368fb97513) — **둘 다 발행일 확인 못 함**

1. **본질적으로 후행적(backward-looking).** 기존 고객 경험과 현재의 job에 의존하므로, 시장이 아직 원하는 줄 모르는 급진적 혁신에는 약함.
2. **정체성·감정·열망 기반 수요를 못 잡음.** 기능적 니즈에는 강하지만.
3. **기술·패션처럼 빠르게 변하는 시장**에서는 "현재의 job"이 곧 낡음.
4. **가장 흔한 실패: 모호한 문장 수집.** "사용자는 시간을 아끼고 싶어한다" 같은 진술은 너무 넓어서 어떤 제품 결정도 이끌지 못함.
5. **JTBD가 그냥 페르소나 언어 교체로 끝남.** 우선순위 결정 방식을 실제로 바꾸지 않으면 무의미.
6. B2B 다중 이해관계자 상황에서 다루기 무거워짐. 가격 민감도·브랜드 인식은 커버 못 함.

> **강의 판단:** JTBD를 "정답 프레임"으로 가르치지 말고, **4번(모호한 문장의 함정)만 반례로 보여주는 게 훨씬 효율적.** 슬라이드 1장.

---

### 1-4. Design Thinking — 그리고 그 한계

**검증된 비판:**
- **표면적 니즈에 머무름.** 공감(empathy)만으로는 체계적·분석적 접근이 필요한 복잡한 문제를 못 푼다.
  ([Toptal, "Exploring the Reasons for Design Thinking Criticism"](https://www.toptal.com/designers/product-design/design-thinking-criticism) / 발행일 확인 못 함)
- **과학적 근거 부족.** 디자인 씽킹이 기업 성과나 ROI에 미치는 영향에 대한 설명은 대부분 이론적이며, 정작 혁신의 실패율은 **70~90%**로 여전히 높다.
  ([Toptal, 위와 동일](https://www.toptal.com/designers/product-design/design-thinking-criticism) / 발행일 확인 못 함 — **이 70~90% 수치의 1차 출처는 확인 못 함. 슬라이드에 인용할 거면 "일부 비판에서는"이라고 완충할 것.**)
- **조직 문화 없이는 실패.** 많은 관리자가 문제 공간을 충분히 탐색하지 않고 해법 공간으로 점프한다.
  ([Designorate, "Why Design Thinking Doesn't Work"](https://www.designorate.com/why-design-thinking-doesnt-work/) / 발행일 확인 못 함)
- Bruce Nussbaum(디자인 씽킹을 대중화한 BusinessWeek 편집자 본인)이 **"실패한 실험(a failed experiment)"**이라고 선언.
  ([The Design Gym 정리](https://www.thedesigngym.com/designthinkingfailed/) / 발행일 확인 못 함 — **Nussbaum 원문(Fast Company, 2011)을 직접 확인하지 못함**)

> **강의 판단:** 창업팀에게 "공감 인터뷰 → 페르소나 → 아이디에이션" 풀코스는 **4.5시간 중 30~40분에 절대 안 들어감.** 디자인 씽킹은 언급만 하고, 그중 **"문제 공간을 충분히 안 보고 해법으로 점프한다"**는 비판 한 줄만 가져오는 것을 권장.

---

### 1-5. 5 Whys — 그리고 그 한계

**검증된 비판:**
- **단일 원인으로 수렴.** 하나의 질문 사슬만 따라가면 원인이 하나만 나오지만, 실제로는 각 "왜"마다 여러 원인이 갈라진다. ([ThinkReliability, "Top Criticisms of the 5-Why Approach"](https://blog.thinkreliability.com/top-criticisms-of-the-5-why-approach) / 발행일 확인 못 함)
- **재현성 없음.** 같은 문제에 대해 사람마다 다른 원인에 도달한다. ([Wikipedia, "Five whys"](https://en.wikipedia.org/wiki/Five_whys) / 상시 갱신)
- **조사자의 현재 지식을 못 넘어섬**, 증상에서 멈추는 경향.
- 상류(upstream) 원인을 놓치고 오류 사슬의 맨 끝만 잡음. ([AHRQ PSNet, "Rethinking Root Cause Analysis"](https://psnet.ahrq.gov/perspective/rethinking-root-cause-analysis) / 발행일 확인 못 함)

> **강의 판단:** 5 Whys는 **5분 실습으로는 최고의 가성비**(설명 30초, 실행 3분)이지만, "정답이 하나 나온다"는 착각을 반드시 깨줘야 함. 권장 사용법: **"5 Whys를 두 갈래로 나눠서 두 번 돌려보고, 답이 다르면 당신 문제는 아직 정의된 게 아니다."** ← 이 반전이 강의 포인트.

---

### 1-6. The Mom Test (Rob Fitzpatrick) — 5분 실습에 가장 잘 맞음

출처: [Sachin Rekhi, "A Primer on Talking to Customers From Rob Fitzpatrick's The Mom Test"](https://www.sachinrekhi.com/p/the-mom-test-rob-fitzpatrick), [mtlynch.io 서평](https://mtlynch.io/book-reports/the-mom-test/) — **발행일 각각 확인 못 함.** 원서는 2013년 출간(Amazon ISBN 9781492180746).

- 전제: 사람들은(특히 가까운 사람은) 듣고 싶은 말을 해준다. 대부분의 창업자는 **정중한 격려**를 끌어내는 방식으로 질문한다.
- 경계할 나쁜 데이터 3종: **칭찬(compliments), 가정형 빈말(hypothetical fluff), 위시리스트(wishlists).**
- 나쁜 질문 예: "이 아이디어 괜찮은 것 같아요?" / "X를 해주는 제품이 있으면 사시겠어요?" / "쓰시겠어요?" / "얼마 내시겠어요?" — **검증(validation)을 구하는 모든 질문이 위반.**
- 가장 반직관적인 조언: **초기 고객 대화에서 당신의 아이디어를 아예 꺼내지 마라.** 대신 **과거 행동을 아주 구체적으로** 물어라(과거 행동은 거짓말하지 않음).

> **강의 판단:** 30~40분 안에 넣을 수 있는 **가장 즉시 실행 가능한 방법론.** 규칙 3개 + 나쁜 질문/좋은 질문 대조표면 슬라이드 2~3장으로 끝남. 팀끼리 5분 롤플레이 가능.

---

### 1-7. Amazon Working Backwards (PR/FAQ)

출처: [Working Backwards 공식 리소스](https://workingbackwards.com/resources/working-backwards-pr-faq/), [Working Backwards, "The Amazon Working Backwards PR/FAQ Process"](https://workingbackwards.com/concepts/working-backwards-pr-faq-process/) — 발행일 확인 못 함. Amazon 공식 소개: [aboutamazon.com](https://www.aboutamazon.com/news/workplace/an-insider-look-at-amazons-culture-and-processes) / 발행일 확인 못 함.

- 설계·엔지니어링·로드맵 작업 **이전에** 가상의 보도자료와 FAQ를 쓴다. 이미 출시된 것처럼, **고객 관점에서** 서술.
- Kindle, Prime, AWS, Alexa가 이 프로세스로 만들어짐.
- 정식 PR/FAQ는 1~3주에 걸쳐 **5~15시간** 소요.
  ([Product Management Resources, "Amazon working backwards"](https://productmanagementresources.com/amazon-working-backwards/) / 발행일 확인 못 함)

> **강의 판단:** 정식 버전은 시간상 불가. 그러나 **"보도자료 헤드라인 한 줄 + 고객 인용문 한 줄"로 축약한 5분 버전**은 매우 강력함. AI로 프로토타입을 30분 만에 뽑을 수 있는 오늘의 강의 구조와 궁합이 좋음(만들기 전에 결과를 먼저 쓴다). **슬라이드 2장 + 실습 5분.**

---

### 1-8. Opportunity Solution Tree (Teresa Torres)

출처: [Product Talk, "Opportunity Solution Trees"](https://www.producttalk.org/opportunity-solution-trees/) / 발행일 확인 못 함(개념 발표는 2016년), 저서 *Continuous Discovery Habits* (**2021년**).

- 4개 층: **원하는 성과(outcome) → 기회 공간(opportunities) → 솔루션 → 가정 검증(assumption tests).**
- 핵심 습관: 제품을 만드는 사람이 직접, 최소 주 1회 고객을 인터뷰.

> **강의 판단:** 개념은 좋으나 **"주 1회 지속 인터뷰"는 하루짜리 워크숍과 맞지 않음.** 단, **"성과 → 기회 → 솔루션" 3층 구조를 A4 한 장에 그리게 하는 것**은 팀이 자기 아이디어를 정리하는 데 5분이면 충분하고, 수준 편차가 큰 10팀에게 공통 언어를 주기에 효과적. **슬라이드 1장.**

---

### 1-9. 한국 창업지원기관의 문제정의 프레임 — PSST

**PSST = Problem(문제인식) / Solution(실현가능성) / Scale-up(성장전략) / Team(팀구성)**
대부분의 정부지원사업 사업계획서 양식(예비창업패키지·초기창업패키지 등)이 이 틀을 따름.
출처: [imweb 블로그, "예비창업패키지 합격 전략"](https://imweb.me/blog?idx=215) / 발행일 확인 못 함, [창업진흥원 예비창업패키지 공식 안내](https://www.kised.or.kr/menu.es?mid=a10205010000) / 상시.

**P(문제인식) 항목이 실제로 요구하는 것** (출처: [브런치 "예비창업패키지 사례 (PSST)"](https://brunch.co.kr/@asdkorea1811/25) / **발행일 확인 못 함**):

- **1-1. 개발동기**: *"해결 방안 보다는 문제에 대한 현상 자체를 기술하는 것"* 이 핵심.
  - 목표 고객 입장에서 **심각한 문제를 먼저** 언급
  - 기존 기술/상품/서비스의 **한계점** 강조
  - **현장 확인 내용이나 신뢰할 만한 통계 데이터** 기반의 사실 중심 작성
- **1-2. 창업아이템 목적**: 문제 현상과 연결한 해결 필요성·방향 제시, 기대효과를 고객/시장 측면에서 **정량적으로**.

> **강의 판단: 이게 이번 강의의 숨은 킬러 포인트.** 창업팀 10팀은 거의 확실히 정부지원사업 사업계획서를 쓰게 됨. "오늘 배우는 문제 정의가 곧 PSST의 P다"라고 연결해주면 동기부여가 즉시 생김. 특히 **"해결책이 아니라 현상을 써라"**는 요구는 위 1-2(SISP 회피), 1-4(해법 공간으로 점프하지 마라)와 정확히 같은 말. **슬라이드 1~2장.**
>
> ※ 참고: P 파트 서술에 PEST(정치/경제/사회/기술) 분석을 쓰라는 조언도 있으나, 이는 개인 블로그 조언이지 공식 양식 요구사항이 아님 — **공식 요구사항인지는 확인 못 함.**

---

## Part 2. AI 시대에 달라진 부분 (2025~2026 자료 우선)

### 2-1. HBR: "AI가 만들기를 쉽게 만들었다. 무엇을 만들지 고르는 게 더 어려워졌다"

출처: [Harvard Business Review, "AI Makes Building Easy. Choosing What to Build Is Harder."](https://hbr.org/2026/08/ai-makes-building-easy-choosing-what-to-build-is-harder) — **2026-08-12**, 저자 J.P. Eggers, Sarah Ryan, Asha Dinesh

- AI가 **혁신 라이프사이클 전반의 실행(execution)을 상품화(commoditized)**했다.
- *"AI tools are powerful enough to make solo-founding increasingly viable"*
- PM이 코드 한 줄 없이 동작하는 프로토타입을 만든다.

> **확인 못 함:** 무료로 접근 가능한 발췌 범위에서는 **"그래서 무엇을 어떻게 고를 것인가"에 대한 구체적 프레임워크는 제시되지 않음.** 문제 제기용 인용으로만 쓸 것. (HBR 페이월)

### 2-2. 병목이 "코딩 역량"에서 "창업자의 판단"으로 이동

출처: [mean.ceo, "Vibecoding News | June 2026 (STARTUP EDITION)"](https://blog.mean.ceo/vibecoding-news-june-2026/) — **2026-06-02**

- *"Almost anyone can now produce a flashy prototype. The hard part starts after the demo."*
- *"The real bottleneck is moving from demo to dependable product"*
- 소프트웨어 초안이 싸지면, **유통(distribution)·신뢰·브랜드·창업자의 판단**이 결정적 변수가 된다.
- ※ 이 글은 **정량 데이터가 없는 오피니언 분석**임(수치 인용 불가).

관련(2차, 검색 스니펫 기준 / 개별 발행일 확인 못 함):
- 50만 달러짜리 개발 외주 견적이 **1,000달러짜리 vibe-coded 프로토타입**으로 대체되어 초기 검증에 쓰인 사례. ([Museum of Vibe Coding](https://museumofvibecoding.org/vibe-coding-for-startups-and-founders-building-commercial-products-unbiased-research-2026/))
- vibe coder의 **36%가 QA를 아예 건너뛰고** 디버깅 대신 재프롬프팅에 의존. (같은 출처)
- *"Vibe coding will hand almost anyone a working prototype, but it can't provide the judgment to know whether that prototype deserves to become a real business."* (같은 출처)
- 병목이 코딩 → **유통(distribution)**으로 이동했다는 별도 논의. ([VibeCom, "The Vibe Coder's Distribution Problem: How the Bottleneck Shifted in 2026"](https://www.vibecom.app/blog/the-vibe-coders-distribution-problem-how-the-bottleneck-shifted-in-2026) / 발행일 확인 못 함)

### 2-3. 한국: "AI 시대 투자 기준은 기술이 아니라 문제 해결 능력"

출처: [전국인력신문, "AI 시대 투자 기준은 '기술'이 아닌 '문제 해결 능력'…KMF 2026 투자마켓, 57건 상담 성사"](https://www.kjob.news/news/497265) — **2026-06-17**
행사: 2026 대한민국 가상융합산업대전(KMF 2026). 발언자: 스타트업성장연구소 최성진 대표.

투자 판단의 핵심 요소 5가지(기사 인용):
1. **명확한 문제 정의**
2. **구매 권한을 가진 고객**
3. 매출로 연결되는 사업 모델
4. 데이터와 워크플로 기반 경쟁력
5. 산업과 기술에 대한 깊은 이해

> **강의 활용:** 1번과 2번이 오늘 다룰 주제. 특히 **"구매 권한을 가진 고객"**은 창업팀이 가장 자주 빼먹는 항목(사용자와 결제자가 다른 경우). 슬라이드 1장으로 강력.

### 2-4. 관련: 'AI 워싱' 경고 (국내)

출처: [브런치, "'AI 워싱'의 유혹과 진정한 혁신의 길"](https://brunch.co.kr/@mymonica/13) / **발행일 확인 못 함**
- 많은 AI 스타트업이 자기 기술에 매료되어 사용자가 실제로 신경 쓰는 것을 잊고, 화려한 데모는 만들지만 실제 문제는 못 푼다.
- 정부 자금 사업에서 AI 워싱 기업을 못 걸러내거나, 스타트업이 지원금만 노려 AI 워싱에 시간을 쓰면 생태계가 뒤처진다.

> 개인 블로그이므로 **"업계 우려"** 수준으로만 인용할 것.

### 2-5. AI 시대에도 "안 바뀐 것" — 강의에서 균형 잡기

| 바뀐 것 | 안 바뀐 것 |
|---|---|
| 프로토타입 제작 비용/시간 (주 → 일, $500K → $1K) | 사람이 돈을 내고 반복해서 쓰는 이유 |
| 비개발자도 만들 수 있음 (Lovable 사용자 63% 무코딩) | "칭찬은 데이터가 아니다"(Mom Test, 2013) |
| 실행이 상품화됨(HBR 2026-08) | 소수가 아주 많이 원하는 것을 골라야 함(PG, 2012) |
| 데모 만들기 → 신뢰할 만한 제품으로 가는 구간이 새 병목 | PMF 실패가 초기 폐업의 주된 원인(CB Insights 2026-03) |

> **메시지:** "AI가 답을 바꾼 게 아니라, **틀린 질문에 대한 답을 훨씬 빨리 만들어주게 됐다.**"

---

## Part 3. 30~40분 안에 전달 가능한 방법론만 추리기

강의 전제: 4.5시간 중 **2.5시간이 팀별 MVP 제작**. 앞부분 방법론 파트는 최대 40분.
아래는 **"넣을 것 / 언급만 할 것 / 뺄 것"** 판단.

### ✅ 넣을 것 (합계 약 34분, 슬라이드 약 12~14장)

| # | 방법론 | 한 줄 정의 | 왜 창업팀에 맞는가 | 슬라이드 | 즉석 실습 | 소요 |
|---|---|---|---|---|---|---|
| 1 | **왜 지금 문제 정의인가** (HBR 2026-08 + CB Insights 2026-03 + KMF 2026-06) | 만들기가 싸져서 고르기가 병목이 됐다 | 수준 편차 큰 10팀에게 공통의 위기감·동기 제공. 오늘 코딩 시간을 왜 앞부분에 안 쓰는지 정당화 | 3 | ✕ | 5분 |
| 2 | **PG의 우물 vs 사막 + "지금 당장 누가 원하나"** | 다수가 조금 원하는 것보다 소수가 아주 많이 원하는 것 | 팀들이 시장 규모부터 말하는 습관을 즉시 교정 | 2 | ✕ | 4분 |
| 3 | **Tarpit 아이디어 (YC/Dalton Caldwell)** | 다들 좋다고 하는데 아무도 반복해서 안 쓰는 아이디어 | 10팀 중 다수가 해당될 가능성 큼. 충격 요법으로 효과적 | 2 | △ (자가 진단 1분) | 4분 |
| 4 | **The Mom Test 3규칙** | 검증을 구하지 말고 과거 행동을 물어라 | 오늘 오후에 바로 서로에게 써먹을 수 있음. 가장 실행 가능 | 3 | ✅ 5분 롤플레이 | 10분 |
| 5 | **PR/FAQ 축약판 (Working Backwards)** | 만들기 전에 출시 보도자료 헤드라인을 먼저 쓴다 | AI로 2.5시간 만에 뭔가 만들 거라면, 그 "뭔가"의 정의를 먼저 고정해야 함. MVP 제작 파트로 자연스럽게 연결 | 2 | ✅ 5분 작성 | 8분 |
| 6 | **PSST의 P로 연결** | 오늘 만든 문제 정의가 곧 정부 사업계획서 1-1 문항 | 국내 창업팀의 실질적 보상. 강의 이탈 방지 | 2 | ✕ | 3분 |

### 🔸 언급만 할 것 (각 30초, 슬라이드 1장에 몰아서)

- **5 Whys** — 쓰되 "두 갈래로 돌려보고 답이 다르면 아직 정의 안 된 것"이라는 경고와 함께. (단독 실습으로 쓸 거면 위 표의 #4를 대체 가능)
- **JTBD** — "사용자는 시간을 아끼고 싶어한다" 같은 모호한 문장의 함정 사례로만.
- **Opportunity Solution Tree** — 성과→기회→솔루션 3층 그림 한 장만.

### ❌ 뺄 것

- **Design Thinking 풀코스** (공감→정의→아이디에이션→프로토타입→테스트). 40분에 불가능하고, 근거도 약함(위 1-4). 만약 넣는다면 **"해법 공간으로 점프하지 마라"는 비판 한 줄**로만.
- **정식 PR/FAQ** (5~15시간 소요) — 축약판만.
- **지속 발견(주 1회 인터뷰) 습관화** — 하루짜리 강의 형식과 불일치.
- **PEST 분석** — 공식 요구사항인지 확인 못 했고, 문제 정의 훈련과 직접 연결이 약함.

---

## Part 4. 슬라이드에 바로 넣을 즉석 실습 문제 3개

> 설계 원칙: 각 팀이 **자기 아이디어에** 5분 안에 적용 가능, 결과물이 **한 문장 또는 한 칸**으로 나와서 발표가 30초면 끝날 것. 수준 편차가 크므로 **양식을 빈칸 채우기로** 제공.

---

### 실습 1. "지금 당장 누구?" 테스트 (5분) — 근거: PG 2012, KMF 2026

**빈칸 채우기 (팀당 1문장):**

> 우리 서비스가 없어도 **［ 누가 ］**는 지금도 **［ 어떤 방법 ］**으로 이 문제를 억지로 해결하고 있고, 거기에 매주 **［ 몇 시간 / 몇 원 ］**을 쓰고 있다.
> 그리고 이 사람은 **［ 스스로 결제할 수 있다 / 결제 권한이 없다 ］**.

**채점 규칙(슬라이드에 같이 띄울 것):**
- "누가" 칸에 **"20~30대 여성", "중소기업"**처럼 집단이 들어가면 **실패**. 어제 실제로 만나본 사람 한 명의 이름이나 직함이 들어가야 함.
- "어떤 방법" 칸이 **비어 있으면 = 아무도 이 문제를 안 풀고 있다 = 대개 아무도 이 문제를 안 겪는다**는 뜻.
- 결제 권한이 없다면, **결제 권한자를 다시 찾아서 한 번 더 쓸 것.**

*근거: "Who wants this right now?"([PG, 2012-11](https://paulgraham.com/startupideas.html)) / "구매 권한을 가진 고객"([전국인력신문, 2026-06-17](https://www.kjob.news/news/497265))*

---

### 실습 2. Mom Test 질문 교정 + 3분 롤플레이 (5분) — 근거: Fitzpatrick, 2013

**1단계 (1분):** 각 팀이 자기 아이디어를 검증하려고 물어보려던 질문 **1개**를 그대로 쓴다.

**2단계 (1분):** 아래 표로 자가 판정.

| 나쁜 질문 (검증을 구함) | 좋은 질문 (과거 행동을 캠) |
|---|---|
| "이 아이디어 어때요?" | "마지막으로 그 일 때문에 곤란했던 게 언제였어요?" |
| "이런 게 있으면 쓰시겠어요?" | "그때 어떻게 해결하셨어요?" |
| "얼마면 사시겠어요?" | "그거 해결하려고 지금 돈이나 시간을 쓰고 계신 게 있나요? 얼마나요?" |
| "이 기능 필요하세요?" | "지금 그 일을 어떤 순서로 하시는지 화면 좀 보여주실 수 있어요?" |

**3단계 (3분):** 옆 팀과 짝을 지어 **인터뷰어/고객 역할 교대(각 90초).**
**철칙: 인터뷰어는 자기 아이디어를 절대 말하지 않는다.**

**끝나고 물을 것:** "상대가 칭찬만 했나요? 그럼 데이터를 하나도 못 얻은 겁니다."

*근거: 나쁜 데이터 3종 = 칭찬/가정형 빈말/위시리스트, "초기 대화에서 아이디어를 꺼내지 말라"([Sachin Rekhi 정리](https://www.sachinrekhi.com/p/the-mom-test-rob-fitzpatrick), [mtlynch.io](https://mtlynch.io/book-reports/the-mom-test/) — 발행일 확인 못 함, 원서 2013)*

---

### 실습 3. 30초 보도자료 (5분) — 근거: Amazon Working Backwards

**오늘 오후 2.5시간 뒤에 만들 것이 이미 출시됐다고 가정하고, 아래 3줄을 채운다.**

> **［ 헤드라인 ］** — 한 문장, 기능이 아니라 **고객에게 생긴 변화**로.
> **［ 부제 ］** — 누구를 위한 것인지 한 문장.
> **［ 고객 인용문 ］** — *"예전엔 ［ 어떻게 ］ 했는데, 이제는 ［ 어떻게 ］ 됐어요."* — ［ 실제 만나본 사람의 직함 ］

**채점 규칙:**
- 헤드라인에 **"AI", "플랫폼", "솔루션"** 단어가 들어가면 다시 쓴다. (AI 워싱 회피 / SISP 회피)
- 고객 인용문의 "예전엔" 칸을 못 쓰면 → **당신은 아직 문제를 모른다. 오늘 만들 대상이 아니다.**
- 이 3줄이 **오후 MVP 제작의 스펙 문서**가 된다. (AI에게 그대로 프롬프트로 넣을 수 있음 → 강의 후반부와 직결)

*근거: 설계·엔지니어링 이전에 고객 관점의 보도자료를 먼저 쓴다([Working Backwards 공식](https://workingbackwards.com/concepts/working-backwards-pr-faq-process/) — 발행일 확인 못 함); 기술에서 문제로 역산하지 말 것(SISP, [UCI/YC 정리 2025-12-03](https://antrepreneur.uci.edu/2025/12/03/how-startup-ideas-really-form-lessons-from-y-combinator-part-1-of-3/))*

---

### (예비) 실습 4. Tarpit 자가 진단 (1분) — 시간 남을 때만

세 질문에 **모두 예**면 tarpit 경보:
1. 이 아이디어를 다른 팀이나 지인도 떠올린 적 있다?
2. 말했을 때 대부분 "좋다"고 했다?
3. 그런데 **지금 당장 쓰겠다고 연락처를 준 사람은 0명**이다?

*근거: tarpit = 많은 사람이 떠올리고, 칭찬을 잔뜩 받지만, 사용자가 반복해서 쓰지 않는 아이디어([Lenny's Newsletter / Dalton Caldwell](https://www.lennysnewsletter.com/p/lessons-from-1000-yc-startups) — 발행일 확인 못 함)*

---

## Part 5. 확인 못 한 것 (슬라이드에 쓰기 전 검증 필요)

1. **YC 공식 "How To Pick A Startup Idea" 본문** — 페이지가 JS 렌더링이라 직접 확인 실패. 현재 문서의 YC 관련 서술 중 1-2(b)(Lenny's)·1-2(a)(Startup Archive)를 제외한 나머지는 **2차 정리 인용**임. "YC가 이렇게 말했다"고 단정해서 슬라이드에 쓰려면 원문 확인 권장.
2. **Michael Seibel의 "문제 채점 기준 목록"** — 존재 근거를 못 찾음. 목록으로 만들지 말 것.
3. **CB Insights "No Market Need 42%"** — 2014년 데이터. 2026-03-05 최신판에서는 해당 항목이 그대로 유지되지 않음(최신판 상위: 자본 소진 70% / PMF 부족 43% / 타이밍·거시환경 29% / 단위경제성 19%). **최신 수치를 쓸 것.**
4. **"혁신 실패율 70~90%"** — Toptal 글에서 인용됐으나 1차 출처 미확인.
5. **Bruce Nussbaum의 "failed experiment" 원문**(Fast Company, 2011로 알려짐) — 원문 미확인.
6. **Lovable 사용자 63% 무코딩 / vibe coder 36% QA 생략** — Museum of Vibe Coding이라는 2차 사이트 기준. 원출처 미확인, 사이트 신뢰도 미검증. **슬라이드 핵심 수치로는 쓰지 말 것.**
7. **HBR 2026-08 기사의 구체적 처방** — 페이월로 인해 본문 전체 미확인. 문제 제기 인용까지만.
8. **한국 창업지원기관의 "문제정의 전용 교육 프로그램"** — 중소벤처기업부/창업진흥원이 별도로 운영하는 린스타트업·고객발굴 교육 프로그램은 검색으로 특정하지 못함. **확인된 것은 PSST 사업계획서 양식 구조뿐.**
9. **PSST의 P 항목 세부 요구사항** — 개인 브런치 글(발행일 미상) 기준. 2026년 실제 예비창업패키지 공고문 양식으로 재확인 권장 ([K-Startup](https://www.k-startup.go.kr/web/main/mainSection0.do)).
10. **a16z / Paul Graham의 2025~2026년 신규 발언** — a16z의 "Big Ideas 2026"은 **"어떤 분야를 할 것인가"**(아웃컴 기반 비즈니스 모델, AI 네이티브 산업기반, 개인화 등)에 대한 것이지 **"좋은 문제를 고르는 방법론"이 아님.** 따라서 이 문서에서는 방법론 근거로 채택하지 않음. ([a16z Big Ideas 2026 Part 1](https://www.a16z.news/p/big-ideas-2026-part-1)) PG의 2025~2026년 관련 신규 에세이는 확인하지 못함 — 2012년 원전이 여전히 최신 참조점.

---

## 부록: 인용 출처 전체 목록

| 출처 | 발행일 | URL |
|---|---|---|
| CB Insights, Top reasons startups fail | 2026-03-05 | https://www.cbinsights.com/research/report/startup-failure-reasons-top/ |
| HBR, AI Makes Building Easy. Choosing What to Build Is Harder. | 2026-08-12 | https://hbr.org/2026/08/ai-makes-building-easy-choosing-what-to-build-is-harder |
| 전국인력신문, AI 시대 투자 기준은 '기술'이 아닌 '문제 해결 능력' | 2026-06-17 | https://www.kjob.news/news/497265 |
| mean.ceo, Vibecoding News June 2026 | 2026-06-02 | https://blog.mean.ceo/vibecoding-news-june-2026/ |
| UCI ANTrepreneur Center, How Startup Ideas Really Form (YC) | 2025-12-03 | https://antrepreneur.uci.edu/2025/12/03/how-startup-ideas-really-form-lessons-from-y-combinator-part-1-of-3/ |
| Startup Archive, Michael Seibel on how to get and test startup ideas | 2023-12-07 | https://www.startuparchive.org/p/michael-seibel-on-how-to-get-and-test-startup-ideas |
| Paul Graham, How to Get Startup Ideas | 2012-11 | https://paulgraham.com/startupideas.html |
| Teresa Torres, Continuous Discovery Habits (저서) | 2021 | https://www.producttalk.org/opportunity-solution-trees/ |
| Rob Fitzpatrick, The Mom Test (저서) | 2013 | https://www.sachinrekhi.com/p/the-mom-test-rob-fitzpatrick |
| Lenny's Newsletter, Lessons from 1,000+ YC startups (Dalton Caldwell) | 확인 못 함 | https://www.lennysnewsletter.com/p/lessons-from-1000-yc-startups |
| Working Backwards, PR/FAQ Process | 확인 못 함 | https://workingbackwards.com/concepts/working-backwards-pr-faq-process/ |
| Toptal, Design Thinking Criticism | 확인 못 함 | https://www.toptal.com/designers/product-design/design-thinking-criticism |
| Designorate, Why Design Thinking Doesn't Work | 확인 못 함 | https://www.designorate.com/why-design-thinking-doesnt-work/ |
| ThinkReliability, Top Criticisms of the 5-Why Approach | 확인 못 함 | https://blog.thinkreliability.com/top-criticisms-of-the-5-why-approach |
| Wikipedia, Five whys | 상시 갱신 | https://en.wikipedia.org/wiki/Five_whys |
| AHRQ PSNet, Rethinking Root Cause Analysis | 확인 못 함 | https://psnet.ahrq.gov/perspective/rethinking-root-cause-analysis |
| Shah Mohammed, Limitations of JTBD | 확인 못 함 | https://shahmm.medium.com/exploring-the-limitations-of-the-jobs-to-be-done-framework-ebd387fd12e0 |
| 브런치, 예비창업패키지 사례 (PSST) | 확인 못 함 | https://brunch.co.kr/@asdkorea1811/25 |
| 창업진흥원, 예비창업패키지 안내 | 상시 | https://www.kised.or.kr/menu.es?mid=a10205010000 |
| a16z, Big Ideas 2026 Part 1 (방법론 아님 — 참고용) | 확인 못 함 | https://www.a16z.news/p/big-ideas-2026-part-1 |
