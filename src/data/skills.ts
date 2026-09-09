import { Skill } from "@/types";

/**
 * 기술 스택 목록 데이터
 * Frontend, Backend, DevOps & Tools 카테고리별 기술 및 Lucide 아이콘 식별자 정의
 */
export const skillsData: Skill[] = [
  // 프론트엔드 (Frontend)
  {
    name: "React",
    category: "Frontend",
    icon: "Atom",
    level: 5,
  },
  {
    name: "Next.js",
    category: "Frontend",
    icon: "Globe",
    level: 5,
  },
  {
    name: "TypeScript",
    category: "Frontend",
    icon: "FileCode2",
    level: 4,
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    icon: "Palette",
    level: 5,
  },
  {
    name: "HTML/CSS",
    category: "Frontend",
    icon: "Layout",
    level: 5,
  },

  // 백엔드 (Backend)
  {
    name: "Node.js",
    category: "Backend",
    icon: "Server",
    level: 4,
  },
  {
    name: "Express",
    category: "Backend",
    icon: "Cpu",
    level: 4,
  },
  {
    name: "Python",
    category: "Backend",
    icon: "Terminal",
    level: 3,
  },
  {
    name: "PostgreSQL",
    category: "Backend",
    icon: "Database",
    level: 4,
  },
  {
    name: "MongoDB",
    category: "Backend",
    icon: "Boxes",
    level: 3,
  },

  // 데브옵스 및 도구 (DevOps & Tools)
  {
    name: "Docker",
    category: "DevOps & Tools",
    icon: "Container",
    level: 3,
  },
  {
    name: "AWS",
    category: "DevOps & Tools",
    icon: "Cloud",
    level: 3,
  },
  {
    name: "Git",
    category: "DevOps & Tools",
    icon: "GitBranch",
    level: 4,
  },
  {
    name: "Figma",
    category: "DevOps & Tools",
    icon: "PenTool",
    level: 4,
  },
  {
    name: "Vercel",
    category: "DevOps & Tools",
    icon: "Zap",
    level: 4,
  },
];
