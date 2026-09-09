import React from "react";
import { cn } from "@/lib/utils";

/**
 * SectionTitle 컴포넌트의 Props 인터페이스
 */
export interface SectionTitleProps {
  /** 섹션 상단 인덱스/라벨 (모노스페이스 폰트, 대문자) */
  eyebrow: string;
  /** 메인 섹션 타이틀 (\n으로 줄바꿈 가능) */
  title: string;
  /** 설명 문구 (선택 사항) */
  description?: string;
  /** 추가 클래스명 */
  className?: string;
}

/**
 * 재사용 가능한 섹션 타이틀 컴포넌트
 * - eyebrow: 대문자, 모노 폰트, 악센트 색상, 자간 확장, 10px
 * - title: 세리프 폰트, 30px-60px 클램프 크기, 굵은 폰트, 좁은 자간, 다크 잉크 색상
 * - description: 뮤트 색상, 최대 너비 600px, 17px, 여유로운 행간
 */
export function SectionTitle({
  eyebrow,
  title,
  description,
  className,
}: SectionTitleProps) {
  // 개행 문자(\n)를 기준으로 제목 분할
  const titleLines = title.split("\n");

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* 상단 라벨 (Eyebrow) */}
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </span>

      {/* 메인 타이틀 (Title) */}
      <h2 className="font-serif text-[clamp(30px,5vw,60px)] font-bold tracking-tight text-ink leading-[1.15]">
        {titleLines.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < titleLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h2>

      {/* 서브 설명 (Description) */}
      {description && (
        <p className="max-w-[600px] text-[17px] leading-relaxed text-ink-muted">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;
