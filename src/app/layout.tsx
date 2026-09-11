import type { Metadata } from "next";
import { Noto_Sans_KR, IBM_Plex_Mono } from "next/font/google";
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
  metadataBase: new URL('https://my-portfolio-teal-zeta-57.vercel.app'),
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
    url: "https://jk.dev",
    title: "JK | Portfolio",
    description:
      "사용자 경험을 코드로 설계하는 풀스택 개발자 JK의 포트폴리오입니다.",
    siteName: "JK | Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JK Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JK | Portfolio",
    description:
      "사용자 경험을 코드로 설계하는 풀스택 개발자 JK의 포트폴리오입니다.",
    images: ["/og-image.png"],
  },
};

// 루트 레이아웃 컴포넌트
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${ibmPlexMono.variable} h-full antialiased`}
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
