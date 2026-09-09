'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function TrustBar() {
  const stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed' },
    { value: '15+', label: 'Tech Stacks' },
    { value: '4.9', label: 'Satisfaction Rate' },
    { value: '100%', label: 'Passion for Coding' },
  ];

  return (
    <section className="border-b border-line bg-bg-soft overflow-x-auto">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex md:grid md:grid-cols-5 min-w-[800px] md:min-w-full">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="flex-1 flex flex-col justify-center items-center text-center p-8 border-r border-line last:border-r-0 min-h-[142px]"
            >
              <ScrollReveal delay={index * 0.1}>
                <h3 className="font-display text-4xl md:text-5xl text-accent mb-2">{stat.value}</h3>
                <p className="font-mono text-xs text-muted uppercase tracking-wider">{stat.label}</p>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
