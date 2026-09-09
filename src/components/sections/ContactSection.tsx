'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { Mail, MapPin, GitBranch, ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';

export default function ContactSection() {
  const faqs = [
    {
      q: '어떤 형태의 협업을 선호하시나요?',
      a: '풀타임 정규직을 가장 선호하지만, 흥미로운 프로젝트라면 프리랜서나 파트타임 계약도 열려있습니다. 팀과 밀접하게 소통하며 프로덕트를 개선해나가는 환경을 지향합니다.'
    },
    {
      q: '사이드 프로젝트도 진행하시나요?',
      a: '네, 기술적 성장을 위한 오픈소스 기여나 사이드 프로젝트 참여를 좋아합니다. 재미있는 아이디어가 있다면 언제든 제안해주세요.'
    },
    {
      q: '면접 진행 시 어떤 점을 중요하게 보시나요?',
      a: '팀의 문화적 핏과 기술적 비전을 중요하게 생각합니다. 단순히 주어진 업무를 수행하는 것을 넘어, 프로덕트의 방향성을 함께 고민할 수 있는 환경을 찾고 있습니다.'
    }
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#27594d] text-[#f2eadb]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          
          {/* 좌측 콘텐츠 */}
          <div>
            <ScrollReveal>
              <div className="font-mono text-sm tracking-widest text-[#d8532d] uppercase mb-6">
                04 · Contact
              </div>
              <h2 className="font-serif text-5xl md:text-6xl font-medium leading-tight mb-8">
                함께 일할<br/>준비가 되었습니다
              </h2>
              <p className="text-[#f2eadb]/80 font-sans text-lg mb-12 max-w-md leading-relaxed">
                새로운 도전을 찾고 있습니다. 프로젝트 제안, 기술 논의, 혹은 가벼운 커피챗도 환영합니다.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  as="a" 
                  href={`mailto:email@example.com`} 
                  variant="primary" 
                  size="lg" 
                  icon={<ArrowRight size={18} />}
                  className="bg-[#d8532d] text-white hover:bg-[#b04223] border-none"
                >
                  이메일 보내기
                </Button>
                <Button 
                  as="a" 
                  href="https://linkedin.com" 
                  target="_blank" 
                  variant="outline" 
                  size="lg"
                  className="border-[#f2eadb]/30 text-[#f2eadb] hover:bg-[#f2eadb]/10"
                >
                  LinkedIn
                </Button>
              </div>
            </ScrollReveal>
          </div>

          {/* 우측 연락처 및 FAQ */}
          <div className="flex flex-col gap-16">
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <Mail className="text-[#d8532d] mb-2" size={24} />
                  <span className="font-mono text-sm text-[#f2eadb]/60 uppercase tracking-wider">Email</span>
                  <a href={`mailto:email@example.com`} className="font-sans hover:text-[#d8532d] transition-colors">email@example.com</a>
                </div>
                <div className="flex flex-col gap-2">
                  <MapPin className="text-[#d8532d] mb-2" size={24} />
                  <span className="font-mono text-sm text-[#f2eadb]/60 uppercase tracking-wider">Location</span>
                  <span className="font-sans">Seoul, South Korea</span>
                </div>
              </div>
            </ScrollReveal>

            {/* FAQ 아코디언 */}
            <ScrollReveal delay={0.3}>
              <h3 className="font-serif text-2xl mb-8 border-b border-[#f2eadb]/20 pb-4">자주 묻는 질문</h3>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <details key={idx} className="group border-b border-[#f2eadb]/20 pb-4 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-sans text-lg font-medium">
                      {faq.q}
                      <span className="shrink-0 transition duration-300 group-open:-rotate-45 text-[#d8532d]">
                        <Plus size={20} />
                      </span>
                    </summary>
                    <p className="mt-4 leading-relaxed text-[#f2eadb]/70 font-sans text-sm pr-8">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </ScrollReveal>
          </div>
          
        </div>
      </div>
    </section>
  );
}
