'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  // 모션 감소 설정 시 커스텀 커서 자체를 비활성화하여 네이티브 커서를 그대로 사용
  const shouldReduceMotion = useReducedMotion();

  // 마우스 좌표 추적
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // 부드러운 따라오기 효과 (스프링 애니메이션)
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // 세션 도중 OS/브라우저의 reduce-motion이 켜지는 경우(배터리 세이버 등)에도
    // 이미 떠 있던 커서를 즉시 치우고 네이티브 커서로 되돌림
    if (shouldReduceMotion) {
      setIsVisible(false);
      return;
    }
    // 터치 디바이스(스마트폰 등)에서는 커서를 렌더링하지 않음
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // 상호작용 가능한 요소 위에 있는지 확인 (버튼, 링크 등)
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible, shouldReduceMotion]);

  useEffect(() => {
    // 커스텀 커서가 실제로 화면에 나타난 순간에만 네이티브 커서를 숨김.
    // 마운트 전/reduced-motion/터치 환경(또는 세션 도중 reduce-motion으로 전환된 경우)에는
    // 네이티브 커서가 항상 보이도록 보장.
    if (!isVisible || shouldReduceMotion) return;

    document.documentElement.classList.add('custom-cursor-active');
    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [isVisible, shouldReduceMotion]);

  // 화면에 진입하기 전에는 렌더링 생략
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-accent flex items-center justify-center"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: isHovering ? 64 : 16,
        height: isHovering ? 64 : 16,
        opacity: isHovering ? 0.3 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* 호버 시 내부에 작은 점 유지 */}
      <motion.div
        className="bg-accent-ink rounded-full absolute"
        animate={{
          width: isHovering ? 4 : 0,
          height: isHovering ? 4 : 0,
          opacity: isHovering ? 1 : 0,
        }}
      />
    </motion.div>
  );
}
