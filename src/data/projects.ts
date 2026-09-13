import { Project } from "@/types";

/**
 * 주요 프로젝트 목록 데이터
 */
export const projectsData: Project[] = [
  {
    id: "pang-site-network",
    title: "Pang 사이트 네트워크 — AI 콘텐츠 자동화 파이프라인",
    description:
      "bluepang·cutepang·freepang·fiftywiz·globalkshop·fastcartmall과 자매 사이트 nicepang.co.kr까지, 워드프레스 기반 콘텐츠 사이트를 대상으로 Python 멱등(idempotent) 발행 파이프라인과 Windows 작업 스케줄러 기반 무인 운영 체계를 직접 설계·구축했습니다. 자체 AI-SEO 툴킷과 오픈소스 SEO 플러그인을 결합해 IndexNow(Bing/Naver/Yandex) 자동 제출, Google/Bing 서치콘솔 연동, 정기 SEO 회귀(드리프트) 감지까지 자동화했습니다.",
    image: "/images/projects/pang-network.webp",
    tags: ["Python", "WordPress REST API", "SEO Automation", "Windows Task Scheduler", "IndexNow"],
    siteLinks: [
      { label: "nicepang.co.kr", url: "https://nicepang.co.kr" },
      { label: "bluepang.co.kr", url: "https://bluepang.co.kr" },
      { label: "cutepang.com", url: "https://cutepang.com" },
      { label: "freepang.co.kr", url: "https://freepang.co.kr" },
      { label: "fiftywiz.com", url: "https://fiftywiz.com" },
      { label: "globalkshop.com", url: "https://globalkshop.com" },
      { label: "fastcartmall.com", url: "https://fastcartmall.com" },
    ],
    featured: true,
  },
  {
    id: "paperclip-agent-orchestration",
    title: "AI 에이전트 오케스트레이션 플랫폼 운영",
    description:
      "AI 에이전트 관제 플랫폼(Paperclip) 위에 콘텐츠 자동화·영상 제작·레거시 블로그 마이그레이션 등 여러 자율 에이전트 조직을 CEO·CTO·Writer·QC 역할 구조로 구성해 무인 운영했습니다. 좀비 프로세스 감지, 정체(wedge) 자동 복구, 크래시 방지 정책 등 신뢰성 엔지니어링을 직접 설계해 장기 자율 운영 안정성을 확보했습니다.",
    image: "/images/projects/agent-orchestration.webp",
    tags: ["AI Agents", "Automation", "Reliability Engineering", "Node.js", "Process Monitoring"],
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
