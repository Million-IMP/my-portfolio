---
template: plan
version: 1.3
---

# portfolio-stabilization Planning Document

> **Summary**: Gemini가 부재중에 추가한 4개 커밋에서 발생한 회귀(SEO URL 불일치, 접근성 미대응)와 기존 버그(다크모드 미대응 섹션, footer 라이트모드 버그, 문의폼 신뢰성)를 정리하고, 콘텐츠 구조를 정비한다.
>
> **Project**: 14My-portfolio
> **Version**: 0.1.0
> **Author**: Claude (with user approval via plan-mode audit)
> **Date**: 2026-09-13
> **Status**: Draft

---

## Executive Summary

| Perspective | Content |
|-------------|---------|
| **Problem** | Gemini가 작업한 4개 커밋 중 일부가 SEO(도메인 하드코딩)와 접근성(reduced-motion 미대응) 회귀를 만들었고, 기존에도 있던 footer/문의폼 버그가 방치되어 있음 |
| **Solution** | 회귀 항목부터 우선 복구하고, 인접 버그를 같은 파이프라인에서 함께 수정. 콘텐츠(실명/실링크 등) 교체는 범위 밖으로 명시적으로 제외 |
| **Function/UX Effect** | 재배포 시에도 SEO 메타데이터 깨지지 않음, reduced-motion 사용자에게 커스텀 커서/스크롤바 강제되지 않음, 다크모드 토글이 전 섹션에서 일관됨, 문의폼이 실패를 성공으로 위장하지 않음 |
| **Core Value** | 다음 실제 콘텐츠 작업(백로그) 전에 코드베이스를 안정된 상태로 되돌려, 이후 작업이 깨진 기반 위에 쌓이지 않도록 함 |

---

## Context Anchor

| Key | Value |
|-----|-------|
| **WHY** | Gemini 세션 중 발생한 회귀 + 기존 버그를 정리해 코드베이스를 안정 상태로 복원 |
| **WHO** | 사이트 소유자(1인 포트폴리오), 향후 이 코드를 유지보수할 나(Claude) |
| **RISK** | 실도메인 미정 상태에서 URL 로직을 잘못 고치면 또 다른 하드코딩을 만들 수 있음 |
| **SUCCESS** | `npm run build`/`lint` 통과, 6개 항목(F1~F6) 모두 코드 반영, gap/code 분석에서 Critical 이슈 0건 |
| **SCOPE** | 코드/구조 수정만. 실콘텐츠(이름/링크/이력서/이미지) 교체와 "타이핑 애니메이션" 실구현 여부는 백로그로 이월 |

---

## 1. Overview

### 1.1 Purpose
사용자 부재 중 다른 AI(Gemini)가 작업한 변경사항을 점검한 결과 발견된 회귀·버그를 체계적으로 복구한다.

### 1.2 Background
`348a957`(커스텀 커서/스크롤 프로그레스/타이핑 애니메이션), `a0c28f6`(다크모드), `40cbd3e`(Vercel URL 수정), `2f0045c`(문의폼 서버 액션) 4개 커밋을 Explore 에이전트로 감사. 상세 근거는 승인된 plan-mode 계획서(`C:\Users\JK\.claude\plans\composed-munching-sutton.md`) 참조.

### 1.3 Related Documents
- Audit 근거: plan-mode 세션에서 작성한 감사 요약 (본 문서 §「감사 근거 요약」에 재수록)

---

## 감사 근거 요약 (Context)

| # | 발견 사항 | 위치 | 성격 |
|---|---|---|---|
| 1 | Vercel 프리뷰 URL 하드코딩, OG url은 존재하지 않는 jk.dev로 서로 불일치, `NEXT_PUBLIC_BASE_URL` 죽은 변수화 | `layout.tsx:23,42`, `robots.ts:5`, `sitemap.ts:5` | 회귀 (`40cbd3e`) |
| 2 | `CustomCursor`/`ScrollProgress` reduced-motion 미대응, 전역 `cursor:none`이 JS 마운트 전 커서 실종 구간 생성 | `CustomCursor.tsx`, `ScrollProgress.tsx`, `globals.css:77-85` | 접근성 회귀 (`348a957`) |
| 3 | `ContactSection` 하드코딩 hex로 다크모드 미반응 | `ContactSection.tsx:38-121` | 일관성 버그 |
| 4 | `--color-footer`가 `:root`에 없어 라이트모드 Footer 배경 미정의 | `globals.css:99,114`, `Footer.tsx:6` | 기존 버그 |
| 5 | Resend 키 placeholder 시 무음 성공, 스팸 방지 없음, 이메일 HTML 미이스케이프 | `contact.ts:33-37,52-57` | 신뢰성/보안 |
| 6 | `resume.pdf` 링크가 실파일 없이 참조 → 404 | `HeroSection.tsx:65` | 깨진 링크 |
| 7 | `src/data/profile.ts` 미사용, 콘텐츠가 4곳에 중복 하드코딩 | `profile.ts` | 구조 |
| 8 | README가 create-next-app 기본 템플릿 그대로 | `README.md` | 문서화 부재 |
| (보류) | jk.dev/github.com/jk/"10+ Years" 플레이스홀더, 프로젝트 webp 이미지 부재 | 다수 | 콘텐츠 — 범위 제외 |

---

## 2. Scope

### 2.1 In Scope

- [ ] F1: `NEXT_PUBLIC_BASE_URL` 단일 소스로 URL 로직 복원 (layout/robots/sitemap/opengraph-image)
- [ ] F2: `CustomCursor`/`ScrollProgress`에 reduced-motion 가드, `cursor:none` 조건부 적용
- [ ] F3: 문의폼 — placeholder 키일 때 무음 성공 방지, 허니팟, 이메일 HTML 이스케이프
- [ ] F4: `ContactSection` 하드코딩 hex → 테마 토큰 치환
- [ ] F5: `--color-footer` 라이트모드 값 추가
- [ ] F6: `profile.ts`를 단일 소스로 승격 + 4개 섹션 리팩터링, 깨진 리소스 링크(resume.pdf 등) 조건부 처리
- [ ] F7: README에 실제 셋업/배포/환경변수 안내 반영

### 2.2 Out of Scope

- 실명/실링크/이력서 PDF/프로젝트 스크린샷 등 실제 콘텐츠 교체 (백로그)
- "타이핑 애니메이션" 실제 타이프라이터 구현 여부 결정 (백로그, 낮은 우선순위)
- 실도메인 확정 (아직 미정 — env var 기반으로만 정리)

---

## 3. Requirements

### 3.1 Functional Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-01 | 모든 URL 관련 메타데이터(og:url, canonical, robots, sitemap)가 동일한 base URL을 참조 | High | Pending |
| FR-02 | reduced-motion 설정 시 커스텀 커서/스크롤 프로그레스 비활성화, 항상 네이티브 커서가 보이는 상태 보장 | High | Pending |
| FR-03 | Resend 키 미설정/placeholder 시 사용자에게 성공으로 위장하지 않음 | High | Pending |
| FR-04 | 문의폼에 기본 스팸 방어(허니팟) 추가, 이메일 본문 HTML 이스케이프 | Medium | Pending |
| FR-05 | ContactSection이 다크/라이트 테마 토큰을 사용해 토글에 반응 | Medium | Pending |
| FR-06 | Footer가 라이트모드에서도 배경색 정상 렌더링 | Medium | Pending |
| FR-07 | 프로필 콘텐츠가 단일 소스(`profile.ts`)에서 파생 | Low | Pending |
| FR-08 | 존재하지 않는 리소스(resume.pdf 등) 링크가 404 대신 안전하게 처리 | Medium | Pending |
| FR-09 | README에 Resend API 키 등 실제 셋업 안내 포함 | Low | Pending |

### 3.2 Non-Functional Requirements

| Category | Criteria | Measurement Method |
|----------|----------|-------------------|
| Accessibility | prefers-reduced-motion 준수 (기존 `ScrollReveal.tsx` 패턴과 일관) | 브라우저에서 reduced-motion 토글 후 육안 확인 |
| Security | 문의폼 입력값이 이메일 HTML에 그대로 삽입되지 않음 | 코드 리뷰 + 테스트 입력으로 확인 |
| Build | 린트/빌드 무오류 | `npm run lint`, `npm run build` |

---

## 4. Success Criteria

### 4.1 Definition of Done

- [ ] F1~F7 전부 코드에 반영
- [ ] `npm run lint`, `npm run build` 통과
- [ ] gap-detector/code-analyzer Critical 이슈 0건

### 4.2 Quality Criteria

- [ ] Zero lint errors
- [ ] Build succeeds
- [ ] (자동 테스트 스위트 없는 프로젝트이므로 unit test coverage는 해당 없음 — 수동 검증으로 대체)

---

## 5. Risks and Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| 실도메인 미정 상태에서 fallback URL을 잘못 고르면 재배포 시 또 깨짐 | Medium | Low | env var 우선, fallback은 현재 Vercel URL 유지, 도메인 확정 시 `.env`만 바꾸면 되도록 |
| reduced-motion 가드 추가 시 커서/스크롤바 완전 제거로 인한 시각적 회귀 | Low | Low | `ScrollReveal.tsx`의 기존 패턴을 그대로 재사용해 일관성 유지 |
| 문의폼 스팸방지(허니팟) 추가가 실제 제출 흐름을 깨뜨릴 가능성 | Low | Low | 기존 필드 구조 최소 변경, 폼 제출 직접 테스트 |

---

## 6. Impact Analysis

### 6.1 Changed Resources

| Resource | Type | Change Description |
|----------|------|--------------------|
| `layout.tsx`, `robots.ts`, `sitemap.ts`, `opengraph-image.tsx` | Config/Metadata | base URL 단일화 |
| `CustomCursor.tsx`, `ScrollProgress.tsx`, `globals.css` | Component/CSS | reduced-motion 가드 |
| `contact.ts`, `ContactSection.tsx` | Server Action/Component | 신뢰성/보안/테마 토큰화 |
| `Footer.tsx`, `globals.css` | Component/CSS | 라이트모드 색상 버그 수정 |
| `profile.ts`, `HeroSection.tsx`, `AboutSection.tsx`, `Footer.tsx`, `ContactSection.tsx` | Data/Component | 단일 소스화, 깨진 링크 가드 |
| `README.md` | Docs | 셋업 안내 |

### 6.2 Current Consumers

정적 1페이지 사이트이며 DB/API 소비자가 없음 — 위 컴포넌트들은 `page.tsx`에서만 조합되어 렌더링됨. 별도 API 소비자 인벤토리 불필요.

### 6.3 Verification

- [x] 이 프로젝트에 DB/외부 API consumer 없음 (정적 렌더링 컴포넌트만 해당)
- [ ] 빌드/린트로 회귀 없음 확인
- [ ] 다크모드 토글 수동 확인

---

## 7. Architecture Considerations

### 7.1 Project Level Selection

| Level | Selected |
|-------|:--------:|
| **Starter** | ✅ |

정적 1페이지 Next.js 포트폴리오 — 기존 구조(`src/components`, `src/data`, `src/lib`) 유지, 새 아키텍처 도입 없음.

### 7.2 Key Architectural Decisions

이번 작업은 순수 버그 수정/리팩터 범위이므로 새로운 아키텍처 결정 없음. 기존 스택(Next.js App Router, Tailwind v4 테마 토큰, Framer Motion, Resend) 그대로 사용.

---

## 8. Convention Prerequisites

기존 ESLint(`eslint-config-next`)/TypeScript strict 설정 그대로 사용. 새 환경변수 추가 없음 (`NEXT_PUBLIC_BASE_URL`은 기존 `.env.local`에 이미 존재, 코드에서 다시 읽도록 복원만 함).

---

## 9. Next Steps

1. [x] Plan 문서 작성 (본 문서)
2. [ ] 경량 Design 문서 작성
3. [ ] 구현 (F1→F7 순)
4. [ ] code-analyzer/gap-detector로 Check
5. [ ] Report 작성

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | 2026-09-13 | Initial draft (plan-mode 감사 결과 기반) | Claude |
