---
template: design
version: 1.3
---

# portfolio-stabilization Design Document

> **Summary**: 회귀/버그 7건(F1~F7)을 최소 변경으로 복구하는 경량 설계 문서. 신규 아키텍처 도입 없음.
>
> **Project**: 14My-portfolio
> **Version**: 0.1.0
> **Author**: Claude
> **Date**: 2026-09-13
> **Status**: Draft
> **Planning Doc**: [portfolio-stabilization.plan.md](../../01-plan/features/portfolio-stabilization.plan.md)

---

## Context Anchor

| Key | Value |
|-----|-------|
| **WHY** | Gemini 세션 회귀 + 기존 버그 복구, 다음 콘텐츠 작업 전 안정화 |
| **WHO** | 사이트 소유자, 유지보수 담당(Claude) |
| **RISK** | 실도메인 미정 상태에서 URL fallback을 잘못 고르면 재배포 시 또 깨짐 |
| **SUCCESS** | build/lint 통과, F1~F7 반영, Critical 이슈 0건 |
| **SCOPE** | 코드/구조만. 실콘텐츠 교체·타이핑 애니메이션 실구현은 제외 |

---

## 1. Overview

### 1.1 Design Goals
기존 패턴(예: `ScrollReveal.tsx`의 `useReducedMotion` 사용법, 기존 Tailwind 테마 토큰)을 그대로 재사용해 최소 diff로 회귀를 복구한다.

### 1.2 Design Principles
- 최소 변경, 최대 재사용 (신규 의존성/아키텍처 도입 금지)
- 기존 컴포넌트의 기존 관례를 그대로 따름 (예: 다른 애니메이션 컴포넌트가 이미 쓰는 reduced-motion 가드 패턴)
- 콘텐츠 값 자체는 건드리지 않고 구조만 정리

---

## 2. Architecture Options

### 2.0 Architecture Comparison

이번 작업은 순수 버그 수정/리팩터이며 아키텍처 대안이 실질적으로 갈리지 않는다. **Option A(Minimal Changes)를 직접 선택**했다 — 신규 파일 없이 기존 파일만 최소 수정하는 것이 유일하게 합리적인 접근이라 별도 체크포인트 확인 없이 확정.

**Selected**: Option A — **Rationale**: 회귀 복구/버그 수정 작업에 Clean Architecture 재설계는 과잉이며, 기존 패턴 재사용이 리스크와 diff를 모두 최소화함.

### 2.1 Component Diagram

N/A — 정적 1페이지 사이트, 클라이언트-서버 구분은 Next.js Server Action(`sendContactEmail`) 하나뿐이며 기존 구조 변경 없음.

---

## 3~4. Data Model / API Specification

N/A — DB/외부 API 없음. 유일한 서버측 로직은 기존 `src/app/actions/contact.ts`의 Resend 호출이며 엔드포인트 형태를 바꾸지 않고 내부 로직만 보강.

---

## 5. UI/UX Design

### 5.3 Component List (변경 대상만)

| Component | Location | Responsibility (변경 내용) |
|-----------|----------|----------------|
| RootLayout | `src/app/layout.tsx` | metadataBase/OG url을 `NEXT_PUBLIC_BASE_URL` 단일 소스로 |
| robots/sitemap | `src/app/robots.ts`, `src/app/sitemap.ts` | 동일 base URL 참조 |
| opengraph-image | `src/app/opengraph-image.tsx` | 동일 base URL 참조 (필요 시) |
| CustomCursor | `src/components/ui/CustomCursor.tsx` | `useReducedMotion()` 가드 추가 |
| ScrollProgress | `src/components/ui/ScrollProgress.tsx` | `useReducedMotion()` 가드 추가 |
| globals.css | `src/app/globals.css` | `cursor:none`을 JS 클래스 토글 기반으로 전환, `--color-footer` `:root` 추가 |
| ContactSection | `src/components/sections/ContactSection.tsx` | 하드코딩 hex → 테마 토큰, 허니팟 필드 |
| contact action | `src/app/actions/contact.ts` | placeholder 키 시 무음 성공 방지, HTML 이스케이프 |
| Footer | `src/components/layout/Footer.tsx` | (globals.css 수정으로 해결, 컴포넌트 자체 변경 없을 수 있음) |
| profile 데이터 | `src/data/profile.ts` + Hero/About/Footer/Contact | 단일 소스화 |
| HeroSection | `src/components/sections/HeroSection.tsx` | resume.pdf 링크 조건부 처리 |
| README | `README.md` | 셋업 문서화 |

### 5.4 Page UI Checklist

단일 페이지(`/`)이며 시각적 신규 요소 추가 없음 — 기존 섹션(Hero/TrustBar/About/Skills/Projects/Experience/Contact)의 동작 방식만 수정. 체크리스트 대신 §8 Test Plan의 수동 확인 절차로 대체.

---

## 6. Error Handling

| 대상 | 현재 | 변경 |
|------|------|------|
| 문의폼 placeholder 키 | `console.log` 후 성공 메시지 반환 | 개발 모드임을 UI에 명시하거나, 최소한 서버 로그에 경고 레벨로 남기고 상태를 구분해 반환 |
| 문의폼 이메일 본문 | 사용자 입력 미이스케이프 HTML 삽입 | 간단한 HTML 이스케이프 유틸 적용 |

---

## 7. Security Considerations

- [x] 문의폼 입력값 HTML 이스케이프 (이메일 본문 삽입 시)
- [x] 허니팟 필드로 기본 봇 방어 (레이트리밋/CAPTCHA 등 고급 방어는 백로그)
- [ ] 인증/인가 — 해당 없음 (정적 사이트)

---

## 8. Test Plan (경량 — 수동 검증)

자동화 테스트 스위트가 없는 프로젝트이므로 L1(API)/L2(UI)/L3(E2E)를 Playwright로 신규 구축하지 않고, **build/lint + 수동 브라우저 확인**으로 대체한다.

| # | 항목 | 확인 방법 | 기대 결과 |
|---|------|----------|----------|
| 1 | URL 단일화 | `.env.local`의 `NEXT_PUBLIC_BASE_URL` 변경 후 `layout.tsx`/`robots.ts`/`sitemap.ts` 출력 확인 | 세 곳 모두 동일 URL 사용 |
| 2 | reduced-motion | 브라우저에서 "동작 줄이기" 활성화 후 사이트 로드 | 커스텀 커서/스크롤 프로그레스 비활성, 네이티브 커서 항상 표시 |
| 3 | 문의폼 placeholder 키 | `RESEND_API_KEY`를 placeholder로 두고 폼 제출 | 무음 성공이 아닌 명확한 상태 표시 |
| 4 | 문의폼 다크모드 | 다크/라이트 토글 후 ContactSection 확인 | 테마 토큰에 반응 |
| 5 | Footer 라이트모드 | 라이트모드에서 Footer 배경 확인 | 배경색 정상 렌더링 |
| 6 | resume 링크 | 빌드 후 `/resume.pdf` 접근 | 404 대신 의도된 처리(링크 숨김 등) |
| 7 | lint/build | `npm run lint && npm run build` | 무오류 |

---

## 9~10. Clean Architecture / Coding Convention

기존 구조·컨벤션 그대로 유지 (변경 없음). `src/components/{layout,sections,ui}`, `src/data`, `src/lib` 구조 유지.

---

## 11. Implementation Guide

### 11.2 Implementation Order

1. [ ] F1 URL 단일화
2. [ ] F2 reduced-motion 가드
3. [ ] F5 Footer 라이트모드 버그 (globals.css 수정, F2와 같은 파일이라 묶어서 처리)
4. [ ] F3 문의폼 신뢰성/보안
5. [ ] F4 ContactSection 테마 토큰화
6. [ ] F6 콘텐츠 구조 정리 + 깨진 링크 가드
7. [ ] F7 README 문서화

### 11.3 Session Guide

단일 세션 내에서 순차 구현 — 모듈 분할 불필요 (총 diff가 작음).

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | 2026-09-13 | Initial draft | Claude |
