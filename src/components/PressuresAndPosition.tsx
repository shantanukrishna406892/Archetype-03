import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { PRESSURES, type SolutionKey } from '../data/presentationData';

interface PressuresAndPositionProps {
  onJumpToSolution: (key: SolutionKey) => void;
}

export const PressuresAndPosition: React.FC<PressuresAndPositionProps> = ({
  onJumpToSolution,
}) => {
  const [selectedPressureId, setSelectedPressureId] = useState<string | null>(null);
  const activePressure = PRESSURES.find((p) => p.id === selectedPressureId);

  return (
    <>
      {/* Band 1: Six Pressures Grid (Publisher.html #pv-challenges) */}
      <section
        id="pressures"
        className="border-b border-[#DCD6C8] bg-[#EFECE3] py-16 lg:py-24"
      >
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="max-w-2xl">
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight text-[#111B2B] sm:text-4xl">
              Six pressures breaking the learner journey.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#3A4250]">
              From inquiry to alumni, front-of-house conversations and back-office records fail at the handoffs. Select any pressure to inspect the operating fix.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PRESSURES.map((card, idx) => {
              const isSelected = card.id === selectedPressureId;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() =>
                    setSelectedPressureId(isSelected ? null : card.id)
                  }
                  className={`group flex items-start gap-4 rounded-2xl border p-6 text-left transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2551B] ${
                    isSelected
                      ? 'border-[#111B2B] bg-[#111B2B] text-white shadow-sm'
                      : 'border-[#DCD6C8] bg-white text-[#111B2B] hover:border-[#9A8546]'
                  }`}
                >
                  <span
                    className="font-mono-tabular text-sm font-bold shrink-0 pt-0.5"
                    style={{
                      color: isSelected ? '#FF723F' : card.accentColor,
                    }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div
                      className={`text-[11px] font-medium ${
                        isSelected ? 'text-[#9BA6B8]' : 'text-[#5A6270]'
                      }`}
                    >
                      {card.stageLabel}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-bold leading-snug">
                      {card.title}
                    </h3>
                    <p
                      className={`mt-2 text-sm leading-relaxed ${
                        isSelected ? 'text-[#C6CEDB]' : 'text-[#3A4250]'
                      }`}
                    >
                      {card.detail}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {activePressure && (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#22314A] bg-[#111B2B] px-6 py-4 text-white">
              <div className="text-sm">
                <span className="font-semibold text-[#FF723F]">
                  {activePressure.title}
                </span>{' '}
                <span className="text-[#C6CEDB]">
                  is resolved on one governed layer connecting front-of-house CX and back-office records.
                </span>
              </div>
              <button
                type="button"
                onClick={() => onJumpToSolution(activePressure.solutionKeys[0])}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#F2551B] px-4 py-2 text-xs font-semibold text-white hover:bg-[#D9440E] whitespace-nowrap shrink-0 cursor-pointer"
              >
                Inspect Operating Solution
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Band 2: Clean Editorial Position Statement (Publisher.html #pv-position) */}
      <section
        id="position"
        className="border-b border-[#DCD6C8] bg-[#FAF8F3] py-16 lg:py-24"
      >
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
          <div className="lg:col-span-7">
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight text-[#111B2B] sm:text-4xl">
              Two pillars, one operating model.
            </h2>
            <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-[#3A4250]">
              The value isn&apos;t another bot in the stack. It&apos;s what the institution becomes when Customer Experience at the front of house and Enterprise Operations in the back office are redesigned and run as one system of work — so student conversations and institutional records move together.
            </p>
          </div>

          <ul className="divide-y divide-[#DCD6C8] border-y border-[#DCD6C8] lg:col-span-5">
            {[
              'Customer Experience across every channel — self-service, smart triage, digital workers & SME assist',
              'Enterprise Operations across back-office transactions and five functions (F&A, HR, Tech Ops, Legal, Lead Gen)',
              'Staff time returned to students, not spent stitching disconnected systems together',
            ].map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 py-4 text-sm font-medium leading-relaxed text-[#111B2B]"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#F2551B]"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
