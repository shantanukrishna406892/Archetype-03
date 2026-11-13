import React from 'react';
import { ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="top"
      className="bg-[#111B2B] py-16 text-white lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Editorial Statement */}
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold tracking-wide text-[#FF723F]">
              Education Customer Experience &amp; Enterprise Operations
            </div>

            <h1 className="mt-4 font-display text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.6rem] lg:leading-[1.06]">
              Education doesn&apos;t need another AI go-live.
            </h1>

            <p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-[#C6CEDB]">
              It needs an operating model where the learner journey and the back office run as one system of work. Stop layering isolated chatbots onto legacy handoffs — run Customer Experience and Enterprise Operations on one governed layer.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#solutions"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F2551B] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#D9440E] whitespace-nowrap shrink-0"
              >
                See How It Works
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/50 whitespace-nowrap shrink-0"
              >
                Talk to Us
              </a>
            </div>
          </div>

          {/* Right Animated Shift Graphic */}
          <div className="border-t border-white/15 pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div className="shift-strike font-display text-2xl font-medium tracking-tight text-[#8E9AAF] sm:text-3xl">
              Point bots &amp; manual handoffs
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display font-mono-tabular text-6xl font-bold tracking-tighter text-[#FF723F] sm:text-7xl">
                ~40–50%
              </span>
              <span className="text-base font-medium text-white">
                lower cost per query
              </span>
            </div>

            {/* Animated comparison bars */}
            <div className="mt-7 space-y-3.5" aria-hidden="true">
              <div>
                <div className="flex items-center justify-between text-xs text-[#9BA6B8]">
                  <span>Fragmented SaaS Stack</span>
                  <span className="font-mono-tabular">100% baseline</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-full rounded-full bg-[#475569]" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-white">
                  <span>One Governed Operating Layer</span>
                  <span className="font-mono-tabular font-semibold text-[#FF723F]">
                    50–60% cost · 97%+ quality
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[55%] rounded-full bg-[#F2551B]" />
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-[#9BA6B8]">
              Measured across integrated CX service stacks and back-office functions. When AI is framed as another seat license, value gets benchmarked against software; when institutions lead with the operating model, they are measured on the work itself.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
