import React from "react";
import { cn } from "@/lib/utils";

/**
 * Card 컴포넌트의 Props 인터페이스
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 카드 내부 콘텐츠 */
  children: React.ReactNode;
  /** 추가 클래스명 */
  className?: string;
  /** 호버 시 입체감 및 그림자 효과 적용 여부 (기본값: true) */
  hoverable?: boolean;
}

/**
 * 재사용 가능한 카드 컴포넌트
 * - 라인 색상(line)의 테두리와 카드 배경색(card)을 적용합니다.
 * - hoverable이 true일 경우, 호버 시 위로 6px 이동하며 그림자 효과가 적용됩니다.
 * - 악센트 색상의 focus-visible 링 스타일을 제공합니다.
 */
export function Card({
  children,
  className,
  hoverable = true,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "border border-line bg-card p-6 md:p-8",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        hoverable && "transition duration-300 ease-out hover:translate-y-[-6px] hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
