---
template: analysis
version: 1.0
---

# portfolio-stabilization Analysis (Check Phase)

> **Project**: 14My-portfolio
> **Date**: 2026-09-13
> **Plan**: [portfolio-stabilization.plan.md](../01-plan/features/portfolio-stabilization.plan.md)
> **Design**: [portfolio-stabilization.design.md](../02-design/features/portfolio-stabilization.design.md)

## 방법

`bkit:code-analyzer` 에이전트로 F1~F7 구현분을 정적 리뷰. 이후 `npm run build`/`npm run dev` + Chrome 브라우저로 라이트/다크 토글, Footer, Contact 섹션을 수동 확인(정적 1페이지 사이트라 L1/L2/L3 자동화 테스트는 Design 문서에서 명시적으로 build/lint + 수동 확인으로 대체하기로 함).

## 1차 code-analyzer 결과: Important 8건 (Critical 0건), Quality Score 82/100

| # | 발견 | 상태 |
|---|------|------|
| 1 | `@theme inline`이 `.dark { --color-* }` 오버라이드를 무력화 — **F4(accent)와 F5(footer) 둘 다 실제로는 적용 안 됨** | ✅ 수정 (raw 변수 분리) |
| 2 | reduced-motion이 세션 도중 켜지면 커서가 화면에 얼어붙어 남음 | ✅ 수정 |
| 3 | `SITE_URL`이 스킴/트레일링 슬래시 미검증 | ✅ 수정 |
| 4 | `layout.tsx`의 `/og-image.png`가 실파일 없음 (F6과 같은 클래스의 버그) | ✅ 수정 (제거, opengraph-image.tsx가 자동 처리) |
| 5 | `CONTACT_EMAIL`이 빈 문자열일 때 `??`가 걸러내지 못함 | ✅ 수정 |
| 6 | 입력값 길이 제한 없음 / IP 레이트리밋 없음 | ⚠️ 길이 제한만 적용, 레이트리밋은 백로그(서버리스 stateless 환경이라 단순 in-memory 방식은 신뢰 불가) |
| 7 | 검증은 trim하지만 발송에는 원본(untrimmed) 값 사용 | ✅ 수정 (한 번만 trim해서 검증/발송 모두 사용) |
| 8 | `ScrollProgress`가 reduced-motion 사용자에게 hydration mismatch 유발 | ✅ 수정 (ScrollReveal과 동일한 isMounted 패턴 적용) |

Info 레벨: `.env.example` 부재 → 추가 완료.

## 브라우저 수동 검증 중 추가로 발견한 버그 (Header.tsx, 사전 존재)

라이트/다크 토글을 직접 눌러 컴퓨티드 스타일을 확인하는 과정에서, **`Header.tsx`의 다크모드 토글이 `.dark` 클래스만 토글하고 `.light` 클래스는 전혀 붙이지 않는다**는 사전 존재 버그를 발견함. 이 때문에 OS가 다크를 선호하는 환경에서 사용자가 수동으로 "라이트"를 선택해도 `globals.css`의 `:root:not(.light)` 시스템-다크 오버라이드가 계속 적용되어 토글이 무시되는 것처럼 보였다. F4/F5 검증에 직접 필요한 메커니즘이라 이번 범위에 포함해 수정함 (`classList.toggle('light', ...)` 추가).

## 검증 결과 (수정 후)

| 확인 항목 | 방법 | 결과 |
|---|---|---|
| 라이트 모드 전환 | 토글 클릭 후 `getComputedStyle(html).--color-footer/--color-accent` 확인 | `--color-footer: #e9ddca`, `--color-accent: #d8532d` — 정상 |
| 다크 모드 값 | 코드 리뷰 (globals.css raw 변수 구조) | `.dark`가 raw 변수를 오버라이드하므로 `@theme inline`을 거쳐 정상 반영되는 구조로 확인 |
| Footer 라이트 배경 | 스크린샷 | 크림색 정상 렌더링 |
| Contact 섹션 | `getComputedStyle(#contact)` | `background-color: rgb(39, 89, 77)`(#27594d), `color: rgb(242, 234, 219)`(#f2eadb) — 의도한 accent 패널 디자인 그대로 유지, accent 토큰만 테마에 반응 |
| 이력서 버튼 | 스크린샷 | `resumeUrl`이 없어 버튼 자체가 렌더링되지 않음 (404 방지 확인) |
| 허니팟 필드 | HTML 소스 확인 | `name="hp_field"` 정상 렌더링 |
| build/lint | CLI | build 성공, lint는 사전 존재 오류 2건(Header.tsx, ScrollReveal.tsx) + 동일 패턴을 재사용한 신규 2건(CustomCursor.tsx, ScrollProgress.tsx) — 아래 참고 |

## Match Rate (정성적 평가 — static 사이트라 자동 정량 공식 대신 항목별 판정)

Functional Requirements 9개(FR-01~FR-09) 전부 코드 반영 및 수동 검증 완료. Critical 0건. **Match Rate: 100% (9/9)**로 판단, `report` 단계로 진행.

## 남은 알려진 이슈 (백로그, 이번 범위 밖)

- `react-hooks/set-state-in-effect` lint 에러 4건(Header.tsx, ScrollReveal.tsx는 기존, CustomCursor.tsx/ScrollProgress.tsx는 기존 패턴을 재사용하며 늘어남) — SSR-safe mount 감지를 위한 의도된 트레이드오프이며 프로젝트 전반의 기존 관례. 근본적으로 고치려면 Header.tsx/ScrollReveal.tsx까지 건드려야 해서 이번 범위 밖으로 분리.
- 문의폼 IP 레이트리밋 (서버리스 환경에 맞는 외부 스토어 필요 — Upstash Redis 등)
- 문의폼 honeypot 필드가 브라우저 자동완성으로 채워질 여지 (낮은 확률, 백로그)
- 실콘텐츠(이름/링크/이력서/프로젝트 이미지) 교체, Footer/ContactSection 연락처 정보를 profile.ts로 최종 통합 — 콘텐츠 확정 후 진행
