'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { ExternalLink, GitBranch } from 'lucide-react';
import { projectsData } from '@/data/projects';

/**
 * 주요 프로젝트를 카드 형태로 표시하는 포트폴리오 섹션
 * - habix atlas-products 스타일의 카드 그리드
 * - 프로젝트 이미지 플레이스홀더 + 기술 태그 + 링크
 */
export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 md:py-32 border-b border-line bg-bg">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          
          {/* 좌측: 섹션 제목 (sticky) */}
          <div className="md:col-span-4 relative">
            <div className="sticky top-32">
              <ScrollReveal>
                <SectionTitle 
                  eyebrow="02 · Featured Projects" 
                  title={`주요\n프로젝트`} 
                  description="아이디어를 실현한 프로젝트들입니다. 각 프로젝트에서의 기술적 도전과 성과를 확인해보세요."
                />
              </ScrollReveal>
            </div>
          </div>

          {/* 우측: 프로젝트 카드 그리드 */}
          <div className="md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {projectsData.map((project, idx) => (
                <ScrollReveal key={project.id} delay={0.1 * idx}>
                  <Card className="h-full flex flex-col group overflow-hidden border border-line hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 bg-bg-soft">
                    {/* 상단 썸네일 영역 — 실제 이미지가 없으면 플레이스홀더 표시 */}
                    <div className="h-48 bg-bg-deep w-full relative overflow-hidden flex items-center justify-center">
                      {/* 장식 패턴 (이미지 대신) */}
                      <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'linear-gradient(135deg, var(--color-accent) 25%, transparent 25%), linear-gradient(225deg, var(--color-accent) 25%, transparent 25%)',
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 10px 0',
                      }} />
                      <span className="font-display text-4xl text-ink/20 relative z-10">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      {/* featured 뱃지 */}
                      {project.featured && (
                        <span className="absolute top-3 right-3 font-mono text-[9px] bg-accent text-accent-ink px-2 py-1 uppercase tracking-wider z-10">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    {/* 하단 내용 영역 */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <span className="font-mono text-[10px] py-1 px-2 bg-line rounded text-ink uppercase tracking-wider">
                          Project
                        </span>
                        <div className="flex gap-2">
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors p-1" aria-label="GitHub 링크">
                              <GitBranch size={16} />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors p-1" aria-label="라이브 데모">
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="font-display text-2xl text-ink mb-3 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted text-sm line-clamp-3 mb-6 font-sans flex-1 leading-relaxed">
                        {project.description}
                      </p>
                      
                      {/* 기술 태그 */}
                      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-line">
                        {project.tags.slice(0, 4).map(tech => (
                          <span key={tech} className="font-mono text-[10px] text-muted border border-line px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="font-mono text-[10px] text-muted border border-line px-2 py-1 rounded">
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
