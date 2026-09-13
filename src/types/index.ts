/**
 * 소셜 미디어 및 외부 링크 인터페이스
 */
export interface SocialLink {
  /** 플랫폼 이름 (예: GitHub, LinkedIn, Blog) */
  platform: string;
  /** 연결 링크 URL */
  url: string;
  /** Lucide 아이콘 이름 식별자 */
  icon: string;
}

/**
 * 프로젝트 인터페이스
 */
export interface Project {
  /** 고유 식별자 */
  id: string;
  /** 프로젝트 제목 */
  title: string;
  /** 프로젝트 설명 */
  description: string;
  /** 대표 이미지 경로 */
  image: string;
  /** 사용 기술 태그 목록 */
  tags: string[];
  /** 배포 사이트 URL (선택) */
  liveUrl?: string;
  /** GitHub 저장소 URL (선택) */
  githubUrl?: string;
  /** 여러 사이트로 구성된 프로젝트일 때, 사이트별 링크 목록 (선택) */
  siteLinks?: { label: string; url: string }[];
  /** 주요 프로젝트 여부 */
  featured: boolean;
}

/**
 * 기술 스택 인터페이스
 */
export interface Skill {
  /** 기술 이름 */
  name: string;
  /** 기술 카테고리 (예: Frontend, Backend, DevOps & Tools) */
  category: 'Frontend' | 'Backend' | 'DevOps & Tools' | string;
  /** Lucide 아이콘 이름 식별자 */
  icon: string;
  /** 숙련도 레벨 (1~5) */
  level: number;
}

/**
 * 업무 경력 인터페이스
 */
export interface Experience {
  /** 회사 또는 조직명 */
  company: string;
  /** 직무 / 역할 */
  role: string;
  /** 재직 기간 (예: 2022-현재) */
  period: string;
  /** 주요 업무 설명 */
  description: string;
  /** 주요 성과 목록 */
  achievements: string[];
}

/**
 * 프로필 정보 인터페이스
 */
export interface ProfileData {
  /** 이름 */
  name: string;
  /** 직책 / 직무명 */
  title: string;
  /** 서브타이틀 / 한 줄 소개 */
  subtitle: string;
  /** 자기소개 문단 목록 (단락별) */
  bio: string[];
  /** 이메일 주소 */
  email: string;
  /** 활동 지역 / 거주지 */
  location: string;
  /** 이력서 다운로드 URL (선택) */
  resumeUrl?: string;
  /** 소셜 링크 목록 */
  socialLinks: SocialLink[];
}
