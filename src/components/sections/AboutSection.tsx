'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionTitle } from '@/components/ui/SectionTitle';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 border-b border-line bg-bg">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          
          {/* 좌측 사이드바: 제목 영역 */}
          <div className="md:col-span-4 relative">
            <div className="sticky top-32">
              <ScrollReveal>
                <SectionTitle 
                  eyebrow="00 · About" 
                  title={`JK는\n누구인가?`} 
                />
              </ScrollReveal>
            </div>
          </div>

          {/* 우측 메인 콘텐츠 영역 */}
          <div className="md:col-span-8">
            <ScrollReveal delay={0.2}>
              <div className="prose prose-lg text-ink prose-p:text-muted prose-p:leading-relaxed max-w-3xl">
                <p className="text-xl md:text-2xl font-serif text-ink font-medium leading-snug mb-8">
                  사용자 경험을 최우선으로 생각하는 프론트엔드 개발자입니다.
                </p>
                <p className="mb-6 font-sans">
                  견고한 코드와 아름다운 UI로 사용자와 비즈니스 가치를 연결합니다.
                </p>
              </div>
            </ScrollReveal>

            {/* 특징 그리드 */}
            <ScrollReveal delay={0.3} className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16 pt-16 border-t border-line">
              <div>
                <h4 className="font-mono text-sm text-ink mb-3 font-semibold">Core Philosophy</h4>
                <p className="text-sm text-muted">사용자 중심의 사고방식으로 기술의 본질적 가치를 고민합니다. 단순한 구현을 넘어 비즈니스와 사용자의 접점을 만듭니다.</p>
              </div>
              <div>
                <h4 className="font-mono text-sm text-ink mb-3 font-semibold">Continuous Growth</h4>
                <p className="text-sm text-muted">새로운 기술 트렌드를 주시하며, 동료들과 지식을 나누고 함께 성장하는 문화를 지향합니다.</p>
              </div>
            </ScrollReveal>
          </div>
          
        </div>
      </div>
    </section>
  );
}
