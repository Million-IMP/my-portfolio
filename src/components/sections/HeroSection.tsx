'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 overflow-hidden border-b border-line flex items-center">
      {/* 우측 장식용 그리드 패턴 (habix 스타일) */}
      <div className="absolute right-0 top-0 w-1/2 h-full hidden md:block opacity-30 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'linear-gradient(to left, black, transparent)'
        }}></div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* 좌측 콘텐츠 영역 */}
        <div className="md:col-span-8 flex flex-col items-start gap-8">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span className="font-mono text-sm tracking-widest text-accent uppercase">Frontend Developer</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.1] text-ink tracking-tight">
              Crafting<br />
              <span className="text-muted italic">Digital</span><br />
              Experiences.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-muted max-w-xl font-sans leading-relaxed">
              견고한 아키텍처와 섬세한 사용자 경험을 설계합니다.<br className="hidden md:block"/>
              문제 해결을 즐기며, 따뜻하고 직관적인 인터페이스를 만듭니다.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3} className="flex flex-wrap items-center gap-4 pt-4">
            <Button as={Link} href="#contact" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
              연락하기
            </Button>
            <Button as={Link} href="/resume.pdf" target="_blank" variant="outline" size="lg" icon={<FileText size={18} />}>
              이력서 보기
            </Button>
          </ScrollReveal>
        </div>

        {/* 상태 표시 인디케이터 */}
        <div className="absolute bottom-12 left-6 md:left-12 flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
          <span className="font-mono text-xs tracking-widest text-muted uppercase">CURRENTLY AVAILABLE</span>
        </div>
      </div>
    </section>
  );
}
