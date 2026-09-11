"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * ScrollReveal 컴포넌트의 Props 인터페이스
 */
export interface ScrollRevealProps {
  /** 래핑할 자식 요소 */
  children: React.ReactNode;
  /** 추가 클래스명 */
  className?: string;
  /** 애니메이션 지연 시간 (초 단위, 기본값: 0) */
  delay?: number;
  /** 진입 방향 (기본값: 'up') */
  direction?: "up" | "down" | "left" | "right";
}

/**
 * 스크롤 위치에 따라 요소를 부드럽게 나타나게 하는 Framer Motion 래퍼 컴포넌트
 * - prefers-reduced-motion 설정을 준수하여 접근성을 보장합니다.
 *
 * [Hydration Mismatch 방지 전략]
 * SSR 단계에서 서버는 애니메이션 초기값(opacity: 0, transform: translateY)을 모르고,
 * 클라이언트 hydration 시 framer-motion이 이 값을 주입하면서 불일치가 발생합니다.
 * isMounted 상태로 클라이언트 마운트 이후에만 motion.div를 렌더링하여 이를 방지합니다.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  // 클라이언트 마운트 여부 - SSR과 CSR 간 Hydration Mismatch 방지용
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // useEffect는 브라우저(클라이언트)에서만 실행되므로 안전하게 마운트 상태를 설정
    setIsMounted(true);
  }, []);

  // 사용자의 모션 감소 설정 여부 확인
  const shouldReduceMotion = useReducedMotion();

  // 방향에 따른 초기 이동 오프셋 계산 (22px)
  const getInitialOffset = (dir: "up" | "down" | "left" | "right") => {
    switch (dir) {
      case "up":
        return { x: 0, y: 22 };
      case "down":
        return { x: 0, y: -22 };
      case "left":
        return { x: 22, y: 0 };
      case "right":
        return { x: -22, y: 0 };
      default:
        return { x: 0, y: 22 };
    }
  };

  const initialOffset = shouldReduceMotion ? { x: 0, y: 0 } : getInitialOffset(direction);

  // 마운트 전(SSR 단계)에는 서버와 동일한 구조의 일반 div를 렌더링하여 Hydration 불일치 방지
  if (!isMounted) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{
        opacity: 0,
        ...initialOffset,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-7% 0px",
      }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.65,
        ease: "easeOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;

