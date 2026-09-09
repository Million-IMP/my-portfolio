'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Code2, Database, Wrench, Layers } from 'lucide-react';
import { skillsData } from '@/data/skills';

/**
 * 기술 스택을 카테고리별로 그룹핑하여 표시하는 섹션
 * - habix 스타일의 2열 atlas-grid 레이아웃 적용
 * - 스킬 레벨을 프로그레스 바로 시각화
 */
export default function SkillsSection() {
  // 카테고리별로 스킬 그룹핑
  const grouped = skillsData.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skillsData>);

  // 카테고리별 아이콘 매핑
  const getIcon = (category: string) => {
    switch (category) {
      case 'Frontend': return <Code2 size={20} />;
      case 'Backend': return <Database size={20} />;
      case 'DevOps & Tools': return <Wrench size={20} />;
      default: return <Layers size={20} />;
    }
  };

  // 스킬 레벨(1~5)을 퍼센트로 변환
  const levelToPercent = (level: number) => `${level * 20}%`;
  const levelToLabel = (level: number) => {
    if (level >= 5) return 'Expert';
    if (level >= 4) return 'Advanced';
    if (level >= 3) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <section id="skills" className="py-24 md:py-32 border-b border-line bg-bg-soft">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          
          {/* 좌측: 섹션 제목 (sticky) */}
          <div className="md:col-span-4 relative">
            <div className="sticky top-32">
              <ScrollReveal>
                <SectionTitle 
                  eyebrow="01 · Skills & Expertise" 
                  title={`다양한\n기술 스택`} 
                  description="프론트엔드부터 백엔드, DevOps까지 폭넓은 기술 역량을 보유하고 있습니다."
                />
              </ScrollReveal>
            </div>
          </div>

          {/* 우측: 카테고리별 스킬 카드 */}
          <div className="md:col-span-8 flex flex-col gap-16">
            {Object.entries(grouped).map(([category, skills], idx) => (
              <div key={category}>
                <ScrollReveal delay={0.1}>
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-line">
                    <span className="text-accent">{getIcon(category)}</span>
                    <h3 className="font-serif text-2xl text-ink">{category}</h3>
                    <span className="font-mono text-xs text-muted ml-auto">{skills.length} skills</span>
                  </div>
                </ScrollReveal>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skills.map((skill, skillIdx) => (
                    <ScrollReveal key={skill.name} delay={0.1 + (skillIdx * 0.05)}>
                      <Card className="p-5 h-full flex flex-col gap-4 group hover:border-accent/50 transition-colors">
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-sm font-semibold text-ink group-hover:text-accent transition-colors">
                            {skill.name}
                          </span>
                          <span className="font-mono text-xs text-muted">
                            {levelToLabel(skill.level)}
                          </span>
                        </div>
                        {/* 스킬 레벨 프로그레스 바 */}
                        <div className="w-full bg-line/50 h-1.5 rounded-full overflow-hidden mt-auto">
                          <div 
                            className="bg-accent h-full rounded-full opacity-70 group-hover:opacity-100 transition-opacity" 
                            style={{ width: levelToPercent(skill.level) }}
                          />
                        </div>
                      </Card>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
