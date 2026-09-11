'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // 마우스 좌표 추적
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // 부드러운 따라오기 효과 (스프링 애니메이션)
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
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
  }, [cursorX, cursorY, isVisible]);

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
