'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Landmark, Users2, Map, Clock3 } from 'lucide-react';

type KeyFigure = {
  id: 'directions' | 'agents' | 'regions' | 'service';
  label: string;
};

type KeyFiguresSectionProps = {
  title: string;
  figures: KeyFigure[];
};

const FINAL_VALUES = {
  directions: 12,
  agents: 9000,
  regions: 23,
} as const;

export default function KeyFiguresSection({ title, figures }: KeyFiguresSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [countDirections, setCountDirections] = useState(0);
  const [countAgents, setCountAgents] = useState(0);
  const [countRegions, setCountRegions] = useState(0);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    if (reduceMotion) {
      setCountDirections(FINAL_VALUES.directions);
      setCountAgents(FINAL_VALUES.agents);
      setCountRegions(FINAL_VALUES.regions);
      return;
    }

    const startTime = performance.now();
    const duration = 900;

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCountDirections(Math.round(FINAL_VALUES.directions * eased));
      setCountAgents(Math.round(FINAL_VALUES.agents * eased));
      setCountRegions(Math.round(FINAL_VALUES.regions * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, reduceMotion]);

  const figureItems = useMemo(
    () => ({
      directions: {
        icon: Landmark,
        value: `${countDirections}`,
      },
      agents: {
        icon: Users2,
        value: `+${countAgents}`,
      },
      regions: {
        icon: Map,
        value: `${countRegions}`,
      },
      service: {
        icon: Clock3,
        value: '24/7',
      },
    }),
    [countDirections, countAgents, countRegions]
  );

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-slate-900">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {figures.map((figure) => {
            const entry = figureItems[figure.id];
            const Icon = entry.icon;

            return (
              <div key={figure.id} className="bg-white border border-stone-200 p-6">
                <Icon className="w-6 h-6 text-amber-700 mb-4" strokeWidth={1.8} />
                <div
                  className={`text-3xl md:text-4xl font-bold text-slate-900 mb-2 ${
                    figure.id === 'service' && !reduceMotion
                      ? isVisible
                        ? 'opacity-100 translate-y-0 transition-all duration-700'
                        : 'opacity-0 translate-y-1'
                      : ''
                  }`}
                >
                  {entry.value}
                </div>
                <div className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
                  {figure.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
