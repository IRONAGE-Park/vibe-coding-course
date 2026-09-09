# 바이브 코딩 강의 (INVAIZ)

진주 지역문제 해결 웹서비스 프로토타입 실습을 위한 강의 자료 프로젝트.

## 구성

| 경로 | 용도 |
|------|------|
| `app/` (루트 Next.js 앱) | **2교시 실습용 랜딩 페이지** — Vercel로 배포해서 학생들에게 링크 공유 |
| `pdfs/session1-slides.html` | **1교시 이론 슬라이드** — Chrome에서 열어 PDF로 내보내기 (`pdfs/README.md` 참고) |

## 개발

```bash
npm run dev    # http://localhost:3000
npm run build  # 프로덕션 빌드
```

## 배포

```bash
npm i -g vercel
vercel --prod
```

배포 후 나온 URL을 `pdfs/session1-slides.html`의 `【배포 후 URL 기입】` 자리(슬라이드 13, 15)에 채워 넣으세요.

## 진행 현황 집계

참가자는 첫 방문 때 팀 이름을 한 번 입력하고, 각 스텝 카드 아래의 **완료했어요!** 버튼으로 진행을 남깁니다.
강사는 `/admin` 에서 비밀번호를 넣고 팀별 진행과 스텝별 완료 인원을 봅니다. 이 주소는 어디에도 링크되어 있지 않고 검색 노출도 막아두었습니다.

### 준비

1. **Supabase 연결** — Vercel 프로젝트 → Storage → Marketplace 에서 Supabase 를 추가합니다. 프로젝트 생성과 환경변수 주입을 Vercel 이 알아서 해주므로 이 방법을 권합니다. 이미 있는 Supabase 프로젝트를 쓰고 싶다면 대시보드 → Project Settings → API 에서 값을 복사해 Vercel 환경변수에 직접 넣어도 됩니다.
2. **표 만들기** — Supabase 대시보드 → SQL Editor 에 [`supabase/schema.sql`](supabase/schema.sql) 을 붙여넣고 한 번 실행합니다. 여러 번 실행해도 안전합니다.
3. **환경변수 추가** — Vercel 프로젝트 설정에 아래 두 개를 넣습니다. `NEXT_PUBLIC_` 접두사를 붙이면 브라우저에 그대로 노출되니 절대 붙이지 마세요.

   | 이름 | 값 |
   |------|-----|
   | `ADMIN_PASSWORD` | 강사가 `/admin` 입장에 쓸 비밀번호 |
   | `ADMIN_SECRET` | 로그인 쿠키 서명용 임의 문자열 (`openssl rand -hex 32`) |

4. **재배포** — 환경변수는 빌드 시점에 반영되므로 다시 배포해야 합니다.

### 키 이름이 두 가지인 이유

연결 방법에 따라 비밀 키의 환경변수 이름이 다릅니다. 코드는 둘 다 받으므로 어느 쪽이든 그대로 동작합니다.

| 연결 방법 | 주소 | 서버용 비밀 키 |
|---|---|---|
| Vercel 마켓플레이스 연동 | `SUPABASE_URL` | `SUPABASE_SECRET_KEY` |
| Supabase 대시보드에서 직접 복사 | `SUPABASE_URL` | `SUPABASE_SERVICE_ROLE_KEY` |

로컬에서 개발할 때는 마켓플레이스로 연동했다면 Vercel CLI 로 값을 그대로 내려받는 편이 가장 편합니다.

```bash
npm i -g vercel
vercel link
vercel env pull .env.local   # ADMIN_PASSWORD 는 덮어써지므로 다시 넣으세요
```

직접 복사하는 경우에는 위 두 값을 `.env.local` 에 넣으면 됩니다. Supabase 값을 비워두면 집계만 건너뛰고 사이트는 정상 동작합니다.

### 알아둘 점

- 방문자 수는 **사람 수가 아니라 브라우저 수**입니다. 한 사람이 폰과 노트북을 같이 쓰면 2로 잡힙니다.
- 완료 여부는 참가자 브라우저에도 남아서, 다시 들어와도 체크 상태가 유지됩니다. 버튼을 다시 누르면 취소됩니다.
- `/admin` 은 공용 비밀번호 하나로만 막혀 있습니다. 참가 현황 수준의 데이터에는 충분하지만 민감한 것을 두지 마세요.
- 집계 API는 누구나 호출할 수 있어 마음먹으면 숫자를 부풀릴 수 있습니다. 강의 진행용 참고 지표로만 쓰세요.
- **service role 키는 모든 권한을 가집니다.** 서버 라우트에서만 쓰고, 클라이언트로 내보내거나 저장소에 커밋하지 마세요.
- **무료 Supabase 프로젝트는 일주일 놀면 일시정지됩니다.** 강의 당일 아침에 대시보드에서 깨어 있는지 한 번 확인하세요. 무료 계정은 활성 프로젝트를 2개까지만 허용하니 자리도 미리 봐두시면 좋습니다.
- 2026년 4월 Vercel 내부 시스템 침해 사고 이후, Vercel 환경변수에 넣은 비밀값은 주기적으로 교체하는 편이 안전합니다. 강의가 끝나면 `ADMIN_PASSWORD` 와 service role 키를 갈아 끼우세요.

### 데이터를 직접 볼 때

Supabase 대시보드의 Table Editor 에서 `visitors` 와 `completions` 표를 그대로 열어볼 수 있습니다. 관리자 화면이 말썽이면 여기가 대안입니다. `completions.done_at` 에 완료 시각이 남아서, 강의가 끝난 뒤 어느 팀이 언제 어느 단계를 지났는지도 되짚어볼 수 있습니다.

### 스텝을 추가하거나 바꿀 때

집계 기준은 `app/lib/steps.ts` 한 곳입니다. 각 페이지 `StepCard` 의 `id` 와 이 목록의 `id` 가 일치해야 버튼이 나타나고 집계됩니다.
