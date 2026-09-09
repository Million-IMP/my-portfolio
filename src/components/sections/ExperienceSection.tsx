'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { experienceData } from '@/data/experience';

/**
 * 경력 사항을 타임라인 형태로 표시하는 섹션
 * - 좌측 수직 라인 + 각 경력 항목의 점(dot) 연결
 * - habix atlas-case 스타일 참고
 */
export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 md:py-32 border-b border-line bg-bg-deep">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          
          {/* 좌측: 섹션 제목 (sticky) */}
          <div className="md:col-span-4 relative">
            <div className="sticky top-32">
              <ScrollReveal>
                <SectionTitle 
                  eyebrow="03 · Experience" 
                  title={`경력 및\n활동`}
                  description="다양한 환경에서 쌓아온 실무 경험과 성과입니다."
                />
              </ScrollReveal>
            </div>
          </div>

          {/* 우측: 타임라인 */}
          <div className="md:col-span-8">
            <div className="relative border-l-2 border-line/50 pl-8 ml-4 md:ml-0">
              {experienceData.map((item, idx) => (
                <div key={item.company + item.period} className="mb-16 last:mb-0 relative">
                  {/* 타임라인 연결 점 */}
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-bg border-[3px] border-accent" />
                  
                  <ScrollReveal delay={0.1 * idx}>
                    <div className="flex flex-col gap-2 mb-4">
                      {/* 기간 */}
                      <span className="font-mono text-sm text-accent uppercase tracking-wider">
                        {item.period}
                      </span>
                      {/* 회사명 */}
                      <h3 className="font-serif text-3xl text-ink font-bold">
                        {item.company}
                      </h3>
                      {/* 직책 */}
                      <span className="font-sans text-muted text-lg">
                        {item.role}
                      </span>
                    </div>
                    
                    {/* 업무 설명 */}
                    {item.description && (
                      <p className="text-muted text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>
                    )}

                    {/* 주요 성과 목록 */}
                    <ul className="space-y-3 mt-4">
                      {item.achievements.map((achievement, achIdx) => (
                        <li key={achIdx} className="font-sans text-muted text-sm leading-relaxed flex items-start gap-3">
                          <span className="text-accent mt-1.5 text-[10px] shrink-0">■</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
