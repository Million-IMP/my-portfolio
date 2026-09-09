import Link from 'next/link';
import { GitBranch, ExternalLink, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-footer border-t border-line text-ink pt-16 pb-8">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* 브랜드 영역 */}
          <div>
            <Link href="/" className="flex items-baseline gap-1 group inline-block mb-4">
              <span className="font-serif text-3xl font-bold">JK</span>
              <span className="font-mono text-sm text-accent">.DEV</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              단순한 코딩을 넘어, 사용자와 비즈니스 가치를 연결하는 프론트엔드 개발자입니다.
            </p>
          </div>

          {/* 링크 영역 */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted mb-6">Quick Links</h4>
            <ul className="space-y-4 font-sans text-sm">
              <li><Link href="#about" className="hover:text-accent transition-colors">About</Link></li>
              <li><Link href="#skills" className="hover:text-accent transition-colors">Skills</Link></li>
              <li><Link href="#projects" className="hover:text-accent transition-colors">Projects</Link></li>
              <li><Link href="#contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* 소셜 영역 */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted mb-6">Connect</h4>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-muted hover:text-ink hover:border-ink transition-all">
                <GitBranch size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-muted hover:text-ink hover:border-ink transition-all">
                <ExternalLink size={18} />
              </a>
              <a href="https://blog.example.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-muted hover:text-ink hover:border-ink transition-all">
                <BookOpen size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* 바텀 바 */}
        <div className="border-t border-line/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted font-mono">
            © {new Date().getFullYear()} JK. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted font-mono">
            <span>Built with Next.js & Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
