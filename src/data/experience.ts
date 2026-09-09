import { Experience } from "@/types";

/**
 * 업무 경력 및 이력 데이터
 */
export const experienceData: Experience[] = [
  {
    company: "TechCorp",
    role: "Senior Frontend Developer",
    period: "2022-현재",
    description:
      "엔터프라이즈 B2B SaaS 플랫폼의 프론트엔드 아키텍처를 주도하고, 웹 성능 최적화 및 공통 디자인 시스템 컴포넌트 구축을 총괄하고 있습니다.",
    achievements: [
      "Next.js App Router 기반의 점진적 마이그레이션을 리드하여 초기 페이지 로딩 속도 42% 향상",
      "사내 UI 컴포넌트 라이브러리 개발 및 전사 배포를 통해 프론트엔드 개발 생산성 30% 개선",
      "주니어 엔지니어 멘토링 및 정기적인 프론트엔드 기술 세미나 주관",
    ],
  },
  {
    company: "StartupXYZ",
    role: "Full-Stack Developer",
    period: "2020-2022",
    description:
      "초기 스타트업 멤버로 참여하여 0 to 1 신규 프로덕트 기획, 풀스택 설계, 클라우드 인프라 구축까지 전 과정을 담당했습니다.",
    achievements: [
      "React 및 Node.js 기반 실시간 서비스 MVP 출시 후 6개월 만에 활성 사용자(MAU) 10만 명 달성",
      "마이크로서비스 아키텍처 및 RESTful API 설계로 시스템 가용성 99.9% 유지",
      "CI/CD 자동화 파이프라인(GitHub Actions, Docker, AWS) 구축으로 배포 주기 단축",
    ],
  },
  {
    company: "WebStudio",
    role: "Junior Developer",
    period: "2018-2020",
    description:
      "다양한 클라이언트의 반응형 웹사이트 및 프로모션 페이지를 제작하고, 웹 접근성 및 크로스 브라우징을 개선했습니다.",
    achievements: [
      "20개 이상의 반응형 웹사이트 및 모바일 웹 구축 프로젝트 성공적 론칭",
      "웹 표준 및 웹 접근성(WA 인증) 준수 프로젝트 수행",
      "공통 JavaScript 유틸리티 모듈을 표준화하여 유지보수 비용 절감",
    ],
  },
];
