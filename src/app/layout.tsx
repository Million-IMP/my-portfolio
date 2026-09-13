import type { Metadata } from "next";
import { Noto_Sans_KR, IBM_Plex_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// 한글 본문 기본 폰트 설정 (Noto Sans KR)
const notoSansKr = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

// 코드 및 고정폭 기본 폰트 설정 (IBM Plex Mono)
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// 포트폴리오 웹사이트 메타데이터 및 Open Graph 설정
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "JK | Portfolio",
  description:
    "사용자 경험을 코드로 설계하는 풀스택 개발자 JK의 포트폴리오입니다. 직관적이고 완성도 높은 웹 애플리케이션을 제작합니다.",
  keywords: [
    "JK",
    "포트폴리오",
    "개발자 포트폴리오",
    "풀스택 개발자",
    "프론트엔드 개발자",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "JK" }],
  creator: "JK",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    title: "JK | Portfolio",
    description:
      "사용자 경험을 코드로 설계하는 풀스택 개발자 JK의 포트폴리오입니다.",
    siteName: "JK | Portfolio",
    // og:image는 별도로 지정하지 않음 — src/app/opengraph-image.tsx가 파일 기반 규칙으로
    // 자동 생성해 주입하므로, 존재하지 않는 /og-image.png를 여기서 다시 참조하면 깨진 링크가 됨
  },
  twitter: {
    card: "summary_large_image",
    title: "JK | Portfolio",
    description:
      "사용자 경험을 코드로 설계하는 풀스택 개발자 JK의 포트폴리오입니다.",
    // twitter:image도 opengraph-image.tsx의 자동 생성 결과를 그대로 사용
  },
};

// 루트 레이아웃 컴포넌트
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${ibmPlexMono.variable} scroll-smooth`}
    >
      <head>
        {/* Noto Serif KR 및 Oswald 웹폰트 로드 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700&family=Oswald:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-bg text-ink">
        {children}
      </body>
    </html>
  );
}
