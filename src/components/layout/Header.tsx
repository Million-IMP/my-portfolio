'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';

const NAV_LINKS = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // 현재 화면에 보이는 섹션 id를 추적
  const [activeSection, setActiveSection] = useState('');
  // 다크모드 상태
  const [isDark, setIsDark] = useState(false);

  // 스크롤 상태 추적
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver로 현재 보이는 섹션 감지 (스크롤 스파이)
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        // 화면 상단 20%~하단 70% 사이에 들어올 때 활성화
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // 다크모드 초기화 (localStorage + 시스템 설정)
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved === 'dark' || (!saved && prefersDark);
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  // 다크모드 수동 토글
  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', next);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-bg/80 backdrop-blur-md border-line py-4'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-baseline gap-1 group z-50">
          <span className="font-serif text-2xl font-bold text-ink">JK</span>
          <span className="font-mono text-sm text-accent">.DEV</span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-mono transition-colors relative group ${
                  isActive ? 'text-accent font-bold' : 'text-muted hover:text-ink'
                }`}
              >
                {link.name}
                {/* 활성 섹션이면 항상 full-width 밑줄 표시 */}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* 우측 액션: 다크모드 토글 + 모바일 햄버거 */}
        <div className="flex items-center gap-3">
          {/* 다크모드 토글 버튼 */}
          <button
            onClick={toggleDark}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-line text-muted hover:text-ink hover:border-ink transition-all"
            aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* 모바일 햄버거 버튼 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-50 text-ink hover:text-accent transition-colors p-2"
            aria-label="메뉴 열기/닫기"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 모바일 네비게이션 드로어 */}
      <div
        className={`fixed inset-0 bg-bg z-40 transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center gap-8 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className={`text-2xl font-serif transition-colors ${
              activeSection === link.id ? 'text-accent' : 'text-ink hover:text-accent'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
}
