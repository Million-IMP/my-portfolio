"use client";

import React from "react";
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
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
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
