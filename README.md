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
