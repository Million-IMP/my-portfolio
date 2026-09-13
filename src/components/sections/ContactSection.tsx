'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Mail, MapPin, GitBranch, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { sendContactEmail, type ContactFormState } from '@/app/actions/contact';

// 제출 버튼: useFormStatus로 로딩 상태 처리 (부모 form 내부에 위치해야 함)
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 min-h-[52px] px-8 font-bold bg-accent text-accent-ink hover:brightness-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      {pending ? (
        <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />발송 중...</>
      ) : (
        <><Send size={18} />메시지 보내기</>
      )}
    </button>
  );
}

export default function ContactSection() {
  const initialState: ContactFormState = { success: false, message: '' };
  const [state, formAction] = useActionState(sendContactEmail, initialState);

  const faqs = [
    { q: '어떤 형태의 협업을 선호하시나요?', a: '풀타임 정규직을 가장 선호하지만, 흥미로운 프로젝트라면 프리랜서나 파트타임 계약도 열려있습니다.' },
    { q: '사이드 프로젝트도 진행하시나요?', a: '네, 기술적 성장을 위한 오픈소스 기여나 사이드 프로젝트 참여를 좋아합니다.' },
    { q: '면접 진행 시 어떤 점을 중요하게 보시나요?', a: '팀의 문화적 핏과 기술적 비전을 중요하게 생각합니다. 함께 성장할 수 있는 환경을 찾고 있습니다.' },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#27594d] text-[#f2eadb]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">

          {/* 좌측: 안내 문구 + 연락처 정보 */}
          <div>
            <ScrollReveal>
              <p className="font-mono text-sm tracking-widest text-accent uppercase mb-6">04 · Contact</p>
              <h2 className="font-serif text-5xl md:text-6xl font-medium leading-tight mb-8">함께 일할<br />준비가 되었습니다</h2>
              <p className="text-[#f2eadb]/80 font-sans text-lg mb-12 max-w-md leading-relaxed">
                새로운 도전을 찾고 있습니다. 프로젝트 제안, 기술 논의, 혹은 가벼운 커피챗도 환영합니다.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#f2eadb]/20">
                <div className="flex flex-col gap-2">
                  <Mail className="text-accent" size={20} />
                  <span className="font-mono text-xs text-[#f2eadb]/50 uppercase tracking-wider">Email</span>
                  <span className="text-sm">contact@jk.dev</span>
                </div>
                <div className="flex flex-col gap-2">
                  <MapPin className="text-accent" size={20} />
                  <span className="font-mono text-xs text-[#f2eadb]/50 uppercase tracking-wider">Location</span>
                  <span className="text-sm">Seoul, Korea</span>
                </div>
                <div className="flex flex-col gap-2">
                  <GitBranch className="text-accent" size={20} />
                  <span className="font-mono text-xs text-[#f2eadb]/50 uppercase tracking-wider">GitHub</span>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent transition-colors">github.com/jk</a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* 우측: 실제 동작하는 문의 폼 */}
          <div>
            <ScrollReveal delay={0.2}>
              {/* 전송 결과 알림 */}
              {state.message && (
                <div className={`flex items-start gap-3 p-4 mb-6 border ${
                  state.success ? 'bg-green-900/30 border-green-500/30 text-green-300' : 'bg-red-900/30 border-red-500/30 text-red-300'
                }`}>
                  {state.success ? <CheckCircle size={18} className="shrink-0 mt-0.5" /> : <AlertCircle size={18} className="shrink-0 mt-0.5" />}
                  <p className="text-sm">{state.message}</p>
                </div>
              )}

              <form action={formAction} className="flex flex-col gap-5">
                {/* 허니팟: 실제 사용자에게는 보이지 않지만 봇은 채우는 경우가 많아 스팸 방지용으로 사용.
                    브라우저 자동완성이 값을 채워넣지 않도록 "company" 같은 흔한 토큰 대신 임의 이름 사용 */}
                <input
                  type="text"
                  name="hp_field"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] w-px h-px opacity-0"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-mono text-xs text-[#f2eadb]/60 uppercase tracking-wider">이름 *</label>
                    <input id="name" name="name" type="text" required placeholder="홍길동"
                      className="bg-[#f2eadb]/5 border border-[#f2eadb]/20 text-[#f2eadb] placeholder:text-[#f2eadb]/30 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-mono text-xs text-[#f2eadb]/60 uppercase tracking-wider">이메일 *</label>
                    <input id="email" name="email" type="email" required placeholder="example@email.com"
                      className="bg-[#f2eadb]/5 border border-[#f2eadb]/20 text-[#f2eadb] placeholder:text-[#f2eadb]/30 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="font-mono text-xs text-[#f2eadb]/60 uppercase tracking-wider">제목</label>
                  <input id="subject" name="subject" type="text" placeholder="프로젝트 협업 문의"
                    className="bg-[#f2eadb]/5 border border-[#f2eadb]/20 text-[#f2eadb] placeholder:text-[#f2eadb]/30 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-mono text-xs text-[#f2eadb]/60 uppercase tracking-wider">메시지 *</label>
                  <textarea id="message" name="message" required rows={5} placeholder="안녕하세요. 협업 제안드리고 싶어서 연락드립니다..."
                    className="bg-[#f2eadb]/5 border border-[#f2eadb]/20 text-[#f2eadb] placeholder:text-[#f2eadb]/30 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none" />
                </div>
                <SubmitButton />
              </form>
            </ScrollReveal>
          </div>
        </div>

        {/* FAQ 섹션 */}
        <ScrollReveal delay={0.3}>
          <div className="mt-24 pt-16 border-t border-[#f2eadb]/20">
            <h3 className="font-serif text-3xl mb-10">자주 묻는 질문</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#f2eadb]/20">
              {faqs.map((faq, idx) => (
                <details key={idx} className="group border-b border-r border-[#f2eadb]/20 last:border-r-0">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 p-6 font-medium list-none hover:text-accent transition-colors">
                    <span>{faq.q}</span>
                    <span className="shrink-0 text-accent text-xl font-light transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="px-6 pb-6 text-[#f2eadb]/70 text-sm leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
