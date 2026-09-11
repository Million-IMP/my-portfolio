import React from "react";
import { cn } from "@/lib/utils";

/**
 * Button 컴포넌트의 Props 인터페이스
 */
export interface ButtonProps {
  /** 버튼 내부 콘텐츠 */
  children: React.ReactNode;
  /** 링크 이동 주소 (지정 시 <a> 태그 또는 as 컴포넌트로 렌더링) */
  href?: string;
  /** 버튼 스타일 변형 ('solid' | 'outline' | 'primary', 기본값: 'outline') */
  variant?: "solid" | "outline" | "primary";
  /** 버튼 크기 ('sm' | 'md' | 'lg', 기본값: 'md') */
  size?: "sm" | "md" | "lg" | string;
  /** 버튼 내부 아이콘 (선택 사항) */
  icon?: React.ReactNode;
  /** 커스텀 렌더링 컴포넌트 (선택 사항, 예: Next.js Link) */
  as?: React.ElementType;
  /** 추가 클래스명 */
  className?: string;
  /** 클릭 이벤트 핸들러 */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  /** 링크 오픈 타깃 (예: '_blank') */
  target?: string;
  /** 링크 관계 속성 (예: 'noopener noreferrer') */
  rel?: string;
  /** 버튼 타입 (button 요소 전용, 기본값: 'button') */
  type?: "button" | "submit" | "reset";
  /** 비활성화 상태 */
  disabled?: boolean;
}

/**
 * habix 스타일에서 영감을 받은 버튼/링크 컴포넌트
 * - href가 제공되면 <a> 태그로, 제공되지 않으면 <button> 태그로 렌더링됩니다. (as 지정 시 해당 컴포넌트 지원)
 * - outline: 현재 색상 테두리, 최소 높이 52px, 패딩 x-5, 굵은 폰트, 호버 시 위로 3px 이동 및 트랜지션
 * - solid / primary: 악센트 배경색, 악센트 잉크 텍스트, 악센트 테두리
 * - 두 변형 모두 focus-visible 링 스타일을 제공합니다.
 */
export function Button({
  children,
  href,
  variant = "outline",
  size = "md",
  icon,
  as: Component,
  className,
  onClick,
  target,
  rel,
  type = "button",
  disabled,
}: ButtonProps) {
  // 공통 기본 스타일 (min-h-[52px], px-5, font-bold, hover:translate-y-[-3px], focus-visible 링)
  const baseStyles =
    "inline-flex items-center justify-center gap-2 min-h-[52px] px-5 font-bold transition duration-200 ease-out select-none text-center cursor-pointer active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed";

  // 변형별 스타일 (primary는 solid와 동일한 악센트 스타일 적용)
  const isSolid = variant === "solid" || variant === "primary";
  const variantStyle = isSolid
    ? "bg-accent text-accent-ink border-2 border-accent hover:translate-y-[-3px] hover:shadow-lg"
    : "border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-accent-ink hover:translate-y-[-3px] hover:shadow-lg";

  // 크기별 추가 스타일
  const sizeStyle =
    size === "sm"
      ? "min-h-[40px] px-3 text-sm"
      : size === "lg"
      ? "min-h-[56px] px-6 text-base"
      : "";

  const combinedClasses = cn(baseStyles, variantStyle, sizeStyle, className);

  const content = (
    <>
      <span>{children}</span>
      {icon && <span className="inline-flex shrink-0 items-center">{icon}</span>}
    </>
  );

  // 커스텀 컴포넌트(as)가 명시된 경우
  if (Component) {
    return (
      <Component
        href={href}
        className={combinedClasses}
        target={target}
        rel={rel}
        onClick={onClick}
        disabled={disabled}
      >
        {content}
      </Component>
    );
  }

  // href가 제공된 경우 <a> 태그 렌더링
  if (href) {
    const isExternal =
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      target === "_blank";
    const resolvedRel = rel ?? (isExternal ? "noopener noreferrer" : undefined);

    return (
      <a
        href={href}
        className={combinedClasses}
        target={target}
        rel={resolvedRel}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </a>
    );
  }

  // href가 없으면 <button> 태그 렌더링
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      className={combinedClasses}
    >
      {content}
    </button>
  );
}

export default Button;
