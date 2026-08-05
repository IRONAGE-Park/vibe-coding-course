# 강의 자료 (1교시 이론)

## 파일

- `session1-slides.html` — 1교시 강의 슬라이드 (16:9, 1280×720, 29장)
  - 구성: 표지 → 목차 → 강사 소개(1장) → 컴퓨터와 코딩 → 바이브 코딩 → 어떤 문제를 해결해야 할까 → 감사합니다
  - 디자인: invaiz.com + dzero.run 웹사이트 디자인 언어 — ink `#111827` / 블루 `#3182f6` / 연블루 `#e6f0ff` / 라이트그레이 `#f5f6f8`, Fragment Mono 필 라벨, 파란 키워드·체크리스트·하이라이트 박스, 흰 라운드 카드, INVAIZ 워터마크 푸터
- `slides-structure.json` — 슬라이드별 내용·레이아웃 구조 정의 (내용 수정 시 이 파일 기준으로 논의)
- `DARFT.md` — 강의 내용 초안 (원본)
- `assets/` — 슬라이드에 삽입되는 로컬 에셋
  - 브랜드 아이콘 (Simple Icons CDN): `claude` `git` `supabase` `vercel` `githubcopilot` `cursor` `googlegemini` `windsurf` `v0` `openai` (.svg)
  - `stateofai-agents.png` — State of AI 2026 Agents & Assistants 순위 차트 캡처 (출처: 2026.stateofai.dev)
  - `supabase-home.png` — Supabase 홈페이지 캡처 (출처: supabase.com)
  - `vercel-home.png` — Vercel 홈페이지 캡처 (출처: vercel.com)
  - `eniac.jpg` — ENIAC 사진, 1945 (U.S. Army · Public Domain)
  - `waterfall-model.png` — Waterfall 모델 다이어그램 (Wikimedia Commons · CC BY 3.0)
  - `agilemanifesto.png` — Agile 선언문 원문 캡처 (agilemanifesto.org, 2001)

## PDF로 내보내는 방법

1. `session1-slides.html`을 **Chrome**에서 연다 (더블클릭 또는 드래그).
2. `Ctrl + P` (인쇄) 실행.
3. 설정:
   - 대상: **PDF로 저장**
   - 여백: **없음**
   - **배경 그래픽** 체크 ✅
4. 저장 → 슬라이드 1장 = PDF 1페이지로 출력됨.

## 강의 전 채워야 할 부분

슬라이드 안의 **하이라이트**(`【 】`) 부분 — 1곳만 남았습니다:

- 슬라이드 28 (감사합니다): 2교시 실습 가이드 페이지의 **Vercel 배포 URL**

HTML 파일을 텍스트 에디터로 열어 `【` 를 검색하면 빠르게 찾을 수 있습니다.
