# 강의 자료 (1교시 이론)

## 파일

- `바이브 코딩과 함께 살아남기_YYYYMMDD.pdf` — **발표용 PDF**, 내보낸 날짜별로 따로 보관 (최신 `_20260910`: 51장, 링크 클릭 가능)

- `session1-slides.html` — 1교시 강의 슬라이드 "바이브 코딩과 함께 살아남기" (16:9, 1280×720, 51장, 페이지 번호는 CSS 카운터 자동, 빈칸 없음 — 발표 준비 완료)
  - 7~8p: 시간에 따른 변화 2장, 서로 다른 그림 — 7p "코딩하는 사람은 계속 넓어져 왔습니다"는 해마다 넓어지는 막대(1957 FORTRAN → 1964 BASIC → 1977 Apple II → 2008 Stack Overflow → 2021 Copilot, 연도마다 그해에 실제로 일어난 변화만 적음), 8p "생성형 AI와 AI Agent — 5년의 변화"는 사람의 몫이 AI 쪽으로 옮겨가는 막대 4개 + "오늘 사람에게 남은 일" 카드 (2026-09-10 개편)
  - 10~11p: 10p 비유는 "전기 배선을 할 줄 안다고 수도꼭지 설치를 반드시 할 수 있는 것은 아니다" — 실사 사진 [가진 도구: 전기 공구] → [하려는 일: 수도꼭지 설치] + 안 맞는 이유 카드 2개(한계: 공구가 맞지 않음 / 수지타산: 억지로 하면 손해), 11p는 "반복과 기억"(컴퓨터, 서버 사진) / "발견과 판단"(사람, 관찰하는 사람 사진) — 잘하는/못하는 일 구도 대신 역할 분담으로 (2026-09-10 개편)
  - 예시에 나온 서비스는 카드 안에 바로 가는 링크(`.svc`, PDF에서 클릭 가능): 14p 서울시 상권분석서비스 · 21p 몰트북 · 40p 벚꽃지도 · 41p 러브버그.com / 거지맵.com / 야장맵.kr · 42p base44.com
  - 13~19p: 연습문제 3세트 (질문→판단: 데이터 해상도 / 이용 권한 / 현실의 규칙) + "세 번 다 다른 곳에서 막혔습니다" 정리 — 창업팀 맥락으로 교체(2026-09-10), 근거는 `docs/research/` 참고
  - 20~21p: 위험 2장 — "잘못되는 방식은 네 가지"(방법 자체 위법 / 남의 자료 / 정보 유출 / 과장 광고) + 실제 사례 3건 (2026-09-10 신규)
  - 39~46p: 사례 8장 (국내 2건 캡처 + 해외 1건 + 현실 점검 / 측정 질문 / 아이디어를 좋은 문제로 / 오늘 하루에 끝나는 과제) — 창업팀 맥락으로 교체(2026-09-10), 근거는 `docs/research/` 참고
  - 47~49p: 에이전트 활용 3장 (2026-09-10 신규) — 47p 질문 "꼭 바이브 코딩만 해야 할까요?" → 48p "만들지 않고 맡기기"(자료 수집·조사 / 자료 가공 / 문서·PPT, 인기 도구: Deep Research · 서브에이전트 · Claude Cowork · Claude for Excel/PowerPoint · pptx 스킬 · ppt-master) → 49p "남이 만든 일하는 요령, 스킬"(GitHub 저장소 7개 이름·설명 — 다이어그램 스킬 archify·diagram-design, 한국어 k-skill 포함 + 권한 주의)
  - 51p: 실습 안내 + 2교시 가이드 URL (vibe-coding-course-kappa.vercel.app)
  - 구성: 표지 → 목차 → 강사 소개(1장) → 컴퓨터와 코딩 → 바이브 코딩 → 어떤 문제를 해결해야 할까 → 감사합니다
  - 디자인: invaiz.com + dzero.run 웹사이트 디자인 언어 — ink `#111827` / 블루 `#3182f6` / 연블루 `#e6f0ff` / 라이트그레이 `#f5f6f8`, Fragment Mono 필 라벨, 파란 키워드·체크리스트·하이라이트 박스, 흰 라운드 카드, INVAIZ 워터마크 푸터
- `slides-structure.json` — 슬라이드별 내용·레이아웃 구조 정의 (내용 수정 시 이 파일 기준으로 논의)
- `DARFT.md` — 강의 내용 초안 (원본)
- `assets/` — 슬라이드에 삽입되는 로컬 에셋
  - 브랜드 아이콘 (Simple Icons CDN): `claude` `git` `supabase` `vercel` `githubcopilot` `cursor` `googlegemini` `windsurf` `v0` `openai` (.svg)
  - UI 아이콘 (Lucide, MIT): `ic-plug` `ic-shower` `ic-help` `ic-brain` `ic-bulb` (.svg)
  - `stateofai-agents.png` — State of AI 2026 코딩 에이전트 순위 상위 3 (출처: 2026.stateofai.dev)
  - `supabase-table.png` — Supabase 테이블 에디터 UI (출처: supabase.com/database)
  - `vercel-new.png` — Vercel 새 프로젝트/배포 화면 (출처: vercel.com/new)
  - `eniac.jpg` — ENIAC 사진, 1945 (U.S. Army · Public Domain)
  - `waterfall-model.png` — Waterfall 모델 다이어그램 (Wikimedia Commons · CC BY 3.0)
  - `analogy-tools.jpg` — 10p 전기 배선 공구 모음 (Dmitry G · Wikimedia Commons "Tools for electric works.JPG" · CC BY-SA 3.0)
  - `analogy-plumber.jpg` — 10p 세면대 배관 작업 중인 배관공 (ocean yamaha · Wikimedia Commons "Plumber at work 2010 USA.jpg" · CC BY 2.0)
  - `role-computer.jpg` — 11p 서버 랙 (Thomas Kvistholt · Unsplash via Wikimedia Commons "Beautiful technology (Unsplash).jpg" · CC0)
  - `role-person.jpg` — 11p 거리에서 수첩을 들고 관찰하는 사람 (Ron Jake Roque · Unsplash via Wikimedia Commons "Critical Thinking (Unsplash).jpg" · CC0)

## PDF로 내보내는 방법

1. `session1-slides.html`을 **Chrome**에서 연다 (더블클릭 또는 드래그).
2. `Ctrl + P` (인쇄) 실행.
3. 설정:
   - 대상: **PDF로 저장**
   - 여백: **없음**
   - **배경 그래픽** 체크 ✅
4. 저장 → 슬라이드 1장 = PDF 1페이지로 출력됨.

## 강의 전 채워야 할 부분

없음 — 모든 빈칸이 채워졌습니다. 2교시 가이드 URL: https://vibe-coding-course-kappa.vercel.app/

HTML 파일을 텍스트 에디터로 열어 `【` 를 검색하면 빠르게 찾을 수 있습니다.
