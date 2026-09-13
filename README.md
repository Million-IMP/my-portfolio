# 14My-portfolio

Next.js 15(App Router) + Tailwind CSS v4 + Framer Motion으로 만든 1페이지 개발자 포트폴리오.

## 시작하기

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## 환경 변수

`.env.local`에 다음 값을 설정해야 합니다 (`.env.local`은 git에 커밋되지 않음):

| 변수 | 필수 | 설명 |
|------|:----:|------|
| `RESEND_API_KEY` | 문의폼 실전송 시 필수 | [Resend](https://resend.com) API 키. 비어있거나 `re_placeholder`로 시작하면 문의폼은 실제 발송 없이 개발 모드로 동작하며 사용자에게 발송 실패를 명확히 알림 |
| `CONTACT_EMAIL` | 선택 | 문의폼 메일을 받을 주소. 미설정 시 코드의 기본값 사용 |
| `NEXT_PUBLIC_BASE_URL` | 배포 시 필수 | 사이트의 실제 base URL. `metadataBase`, OG url, `robots.ts`, `sitemap.ts`가 모두 이 값 하나를 참조함(`src/lib/site.ts`). 커스텀 도메인이 정해지면 이 값만 바꾸면 됨 |

## 배포 (Vercel)

이 프로젝트는 Vercel에 연결되어 있습니다 (`.vercel/` — git에는 커밋되지 않음).

1. Vercel 프로젝트 환경변수에 위 표의 값을 설정
2. 커스텀 도메인을 연결한 경우 `NEXT_PUBLIC_BASE_URL`을 그 도메인으로 갱신
3. `main`/`master` 브랜치 push 시 자동 배포

## 알려진 제약 (백로그)

- 이름/GitHub/LinkedIn/블로그/이력서/프로젝트 스크린샷 등 실제 콘텐츠가 아직 플레이스홀더 상태
- `src/data/profile.ts`가 향후 콘텐츠 단일 소스가 되도록 예약되어 있으나 현재는 각 섹션이 자체 텍스트를 하드코딩

## 주요 스크립트

```bash
npm run dev     # 개발 서버
npm run build   # 프로덕션 빌드
npm run start   # 빌드된 앱 실행
npm run lint    # ESLint
```
