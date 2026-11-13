import React from 'react';

interface TopNavProps {
  activeSectionId: string;
}

const NAV_ITEMS = [
  { id: 'pressures', label: 'Pressures' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'proof', label: 'Proof' },
  { id: 'why', label: 'Why Straive' },
];

export const TopNav: React.FC<TopNavProps> = ({ activeSectionId }) => {
  return (
    <header className="sticky top-0 z-40 border-b border-[#DCD6C8] bg-[#FAF8F3]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-8 px-6 lg:px-10">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#top"
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 text-[#111B2B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2551B]"
          aria-label="Straive home"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect x="3" y="4" width="13" height="7" rx="3.5" fill="#F2551B" />
            <rect x="12" y="11" width="13" height="7" rx="3.5" fill="#111B2B" />
            <rect x="6" y="18" width="13" height="7" rx="3.5" fill="#F2551B" />
          </svg>
          <span className="font-display text-lg font-bold tracking-tight text-[#111B2B]">
            Straive
          </span>
        </a>

        {/* Zone 2: 5 concise single-line text nav links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive =
              activeSectionId === item.id ||
              (item.id === 'pressures' && activeSectionId === 'position');
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#111B2B]'
                    : 'text-[#5A6270] hover:text-[#111B2B]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-[2px] bg-[#F2551B] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary CTA */}
        <div className="flex items-center shrink-0">
          <a
            href="#contact"
            className="rounded-lg bg-[#F2551B] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#D9440E] whitespace-nowrap shrink-0"
          >
            Talk to Us
          </a>
        </div>
      </div>
    </header>
  );
};
