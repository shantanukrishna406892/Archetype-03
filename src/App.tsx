import { useEffect, useState } from 'react';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { PressuresAndPosition } from './components/PressuresAndPosition';
import { SolutionsShowcase } from './components/SolutionsShowcase';
import { InteractiveQueryRouterBand } from './components/InteractiveQueryRouterBand';
import { GovernedPlatformSection } from './components/GovernedPlatformSection';
import { ProofAndContactSection } from './components/ProofAndContactSection';
import type { SolutionKey } from './data/presentationData';

export default function App() {
  const [activeSectionId, setActiveSectionId] = useState<string>('pressures');
  const [activeSolutionKey, setActiveSolutionKey] = useState<SolutionKey>('cx');

  useEffect(() => {
    const ids = [
      'pressures',
      'position',
      'solutions',
      'query-router',
      'architecture',
      'proof',
      'why',
      'contact',
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.35] }
    );

    ids.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const handleJumpToSolution = (key: SolutionKey) => {
    setActiveSolutionKey(key);
    const el = document.getElementById('solutions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#141A24]">
      <TopNav
        activeSectionId={
          activeSectionId === 'query-router' ? 'solutions' : activeSectionId
        }
      />
      <main>
        <HeroSection />
        <PressuresAndPosition onJumpToSolution={handleJumpToSolution} />
        <SolutionsShowcase
          activeKey={activeSolutionKey}
          onChangeKey={setActiveSolutionKey}
        />
        <InteractiveQueryRouterBand />
        <GovernedPlatformSection />
        <ProofAndContactSection />
      </main>
    </div>
  );
}
