import { ProfileData } from "@/types";

/**
 * 기본 프로필 정보 데이터
 *
 * 현재 Hero/About/Footer/Contact 섹션은 각자 텍스트를 하드코딩하고 있어
 * 이 값과 실제 화면에 보이는 내용(GitHub/블로그 URL 등)이 서로 다르다.
 * 콘텐츠(실명/실링크) 확정 작업 시 이 파일을 단일 소스로 삼아
 * 각 섹션이 여기서 import하도록 정리할 것 — 지금은 구조만 우선 정비하는 단계라
 * 서로 다른 값 중 무엇이 맞는지 결정하는 콘텐츠 교체는 포함하지 않는다.
 */
export const profileData: ProfileData = {
  name: "JK",
  title: "Full-Stack Developer",
  subtitle: "사용자 경험을 코드로 설계하는 개발자",
  bio: [
    "기술의 본질은 사람의 문제를 해결하는 데 있다고 믿습니다. 직관적인 인터페이스와 견고한 백엔드 설계를 통해 사용자가 편안하게 몰입할 수 있는 웹 경험을 만들어가고 있습니다. 단순히 동작하는 코드를 넘어, 읽기 쉽고 확장 가능한 아키텍처를 지향합니다.",
    "빠르게 변화하는 웹 생태계 속에서 최신 기술 트렌드를 민첩하게 학습하고 프로젝트에 적극적으로 도입합니다. React, Next.js, TypeScript 생태계에 깊은 관심을 두고 있으며, 디자인과 엔지니어링의 경계를 허무는 완성도 높은 제품을 만드는 일에 열정을 쏟고 있습니다.",
  ],
  email: "contact@jk.dev",
  location: "Seoul, South Korea",
  // public/resume.pdf가 아직 없어 undefined로 둠 — 실제 PDF를 추가하면 "/resume.pdf"로 복원
  resumeUrl: undefined,
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/jk-dev",
      icon: "FolderGit2",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/jk-dev",
      icon: "Briefcase",
    },
    {
      platform: "Blog",
      url: "https://blog.jk.dev",
      icon: "BookOpen",
    },
  ],
};
