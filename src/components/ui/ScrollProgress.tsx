'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  // ScrollReveal.tsx와 동일한 전략: 서버는 reduce-motion 여부를 모르므로
  // 마운트 전에는 항상 아무것도 렌더링하지 않아 hydration mismatch를 방지
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  // 스프링 효과를 주어 스크롤 바가 부드럽게 늘어나도록 처리
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 마운트 전이거나 모션 감소 설정 시 렌더링하지 않음
  if (!isMounted || shouldReduceMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent z-[9999] origin-left"
      style={{ scaleX }}
    />
  );
}
