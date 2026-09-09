import { Project } from "@/types";

/**
 * 주요 프로젝트 목록 데이터
 */
export const projectsData: Project[] = [
  {
    id: "ai-chatbot-platform",
    title: "AI 챗봇 플랫폼",
    description:
      "OpenAI API를 연동하여 맞춤형 프롬프트와 지식 베이스를 바탕으로 실시간 질의응답을 제공하는 대화형 AI 챗봇 서비스입니다. 스트리밍 응답과 대화 세션 관리 기능을 지원합니다.",
    image: "/images/projects/chatbot.webp",
    tags: ["React", "Node.js", "OpenAI API", "Tailwind CSS"],
    liveUrl: "https://chatbot.jk.dev",
    githubUrl: "https://github.com/jk-dev/ai-chatbot-platform",
    featured: true,
  },
  {
    id: "ecommerce-dashboard",
    title: "E-Commerce Dashboard",
    description:
      "대규모 이커머스 비즈니스를 위한 실시간 주문, 매출 통계, 재고 추적 관리자 대시보드입니다. 동적 차트 시각화 및 반응형 데이터 테이블 필터링 기능을 제공합니다.",
    image: "/images/projects/dashboard.webp",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
    liveUrl: "https://dashboard.jk.dev",
    githubUrl: "https://github.com/jk-dev/ecommerce-dashboard",
    featured: true,
  },
  {
    id: "realtime-collab-editor",
    title: "실시간 협업 에디터",
    description:
      "WebSocket과 CRDT 알고리즘을 활용하여 다수의 사용자가 동시에 문서를 작성하고 동기화할 수 있는 마크다운 기반 웹 협업 에디터 플랫폼입니다.",
    image: "/images/projects/editor.webp",
    tags: ["React", "WebSocket", "MongoDB", "Node.js"],
    liveUrl: "https://editor.jk.dev",
    githubUrl: "https://github.com/jk-dev/realtime-collab-editor",
    featured: true,
  },
  {
    id: "personal-blog-platform",
    title: "개인 블로그 플랫폼",
    description:
      "MDX 문서를 정적 페이지로 자동 빌드하여 빠른 로딩 속도와 SEO 최적화를 달성한 기술 블로그 플랫폼입니다. 다크모드, 카테고리 태그 및 검색 기능을 지원합니다.",
    image: "/images/projects/blog.webp",
    tags: ["Next.js", "MDX", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://blog.jk.dev",
    githubUrl: "https://github.com/jk-dev/personal-blog-platform",
    featured: false,
  },
];
