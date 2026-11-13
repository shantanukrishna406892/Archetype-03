import React, { useEffect, useState } from 'react';
import { ArrowDownRight, Check, RotateCcw, Shield } from 'lucide-react';
import {
  CX_TIERS,
  JOURNEY_STAGES,
  K12_RAIL,
  SOLUTION_TABS,
  type SolutionKey,
} from '../data/presentationData';

interface SolutionsShowcaseProps {
  activeKey: SolutionKey;
  onChangeKey: (key: SolutionKey) => void;
}

const EOPS_RIPPLE_LANES = [
  { id: 'fa', name: 'F&A · Refunds & Reconciliation', detail: 'Same governed layer carries cash app & AR' },
  { id: 'hr', name: 'HR · Onboarding & People Ops', detail: 'Repetitive steps automated; sensitive decisions reviewed' },
  { id: 'tech', name: 'Tech Ops · IT & LMS Support', detail: 'Routine tickets deflected; rosters & SLAs protected' },
  { id: 'legal', name: 'Legal · Clause Risk Scoring', detail: 'Automated parse-and-flag with human sign-off retained' },
  { id: 'lead', name: 'Lead Gen · Demand Pipeline', detail: 'Validate, enrich & route — lifting conversion 11% → 42%' },
];

const CHANNELS = [
  'Email',
  'Chat',
  'Voice',
  'Social',
  'Messaging',
  'Self-Service Portal',
  'Case & Ticket Queues',
];

export const SolutionsShowcase: React.FC<SolutionsShowcaseProps> = ({
  activeKey,
  onChangeKey,
}) => {
  const activeTab =
    SOLUTION_TABS.find((s) => s.key === activeKey) || SOLUTION_TABS[0];

  // Tab 01 state: Tier selector
  const [selectedTierId, setSelectedTierId] = useState<string>('tier0');

  // Tab 02 state: "One Function, Then Five" Ripple
  const [eopsStep, setEopsStep] = useState<number>(5);
  const [runningEops, setRunningEops] = useState<boolean>(false);

  // Tab 03 state: 5-Stage Journey + Segment toggle
  const [journeyIdx, setJourneyIdx] = useState<number>(0);
  const [segment, setSegment] = useState<'highered' | 'k12'>('highered');

  // Tab 04 state: Compounding insight pass
  const [insightPass, setInsightPass] = useState<0 | 1 | 2>(2);

  useEffect(() => {
    if (!runningEops) return;
    if (eopsStep >= EOPS_RIPPLE_LANES.length) {
      setRunningEops(false);
      return;
    }
    const t = window.setTimeout(() => setEopsStep((p) => p + 1), 280);
    return () => window.clearTimeout(t);
  }, [runningEops, eopsStep]);

  const replayEopsRipple = () => {
    setEopsStep(0);
    setRunningEops(true);
  };

  const selectedTier =
    CX_TIERS.find((t) => t.id === selectedTierId) || CX_TIERS[0];
  const currentStage = JOURNEY_STAGES[journeyIdx];

  return (
    <section
      id="solutions"
      className="border-b border-[#DCD6C8] bg-[#EFECE3] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        {/* Section Heading */}
        <div className="max-w-2xl">
          <h2 className="font-display text-balance text-3xl font-bold tracking-tight text-[#111B2B] sm:text-4xl">
            Four core solutions.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#3A4250]">
            We unify front-of-house Customer Experience and back-office Enterprise Operations on one governed layer, so every learner journey moves without manual friction.
          </p>
        </div>

        {/* 4-Tab Selector Cards */}
        <div
          role="tablist"
          aria-label="Core solutions"
          className="mt-10 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SOLUTION_TABS.map((tab) => {
            const isSelected = tab.key === activeKey;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onChangeKey(tab.key)}
                className={`flex items-start gap-3.5 rounded-2xl border p-5 text-left transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2551B] ${
                  isSelected
                    ? 'border-[#111B2B] bg-[#111B2B] text-white shadow-sm'
                    : 'border-[#DCD6C8] bg-white text-[#111B2B] hover:border-[#9A8546]'
                }`}
              >
                <span
                  className="font-mono-tabular text-sm font-bold pt-0.5 shrink-0"
                  style={{
                    color: isSelected ? '#FF723F' : tab.accentColor,
                  }}
                >
                  {tab.index}
                </span>
                <div>
                  <h3 className="font-display text-base font-bold leading-snug">
                    {tab.title}
                  </h3>
                  <p
                    className={`mt-1.5 text-xs leading-relaxed ${
                      isSelected ? 'text-[#C6CEDB]' : 'text-[#5A6270]'
                    }`}
                  >
                    {tab.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Solution Panel */}
        <div
          key={activeTab.key}
          role="tabpanel"
          className="panel-enter mt-6 rounded-2xl border border-[#DCD6C8] bg-white p-6 lg:p-10"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left Column: Narrative + What's Included + Proof Callout */}
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#C8400D]">
                  <span className="font-mono-tabular">{activeTab.index}</span>
                  <span aria-hidden="true">·</span>
                  <span>Core Solution</span>
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold text-[#111B2B] sm:text-3xl">
                  {activeTab.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#3A4250]">
                  {activeTab.lead}
                </p>

                <h4 className="mt-7 font-mono-tabular text-[11px] font-semibold uppercase tracking-wider text-[#5A6270]">
                  What&apos;s included
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {activeTab.included.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-[#141A24]"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#F2551B]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 rounded-xl border border-[#DCD6C8] bg-[#FAF8F3] p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xs font-semibold text-[#C8400D]">
                    {activeTab.proofCallout.label}
                  </span>
                  <span className="font-mono-tabular text-xs font-bold text-[#111B2B]">
                    {activeTab.proofCallout.metric}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#3A4250]">
                  {activeTab.proofCallout.text}
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Micro-Demo */}
            <div className="lg:col-span-7">
              {activeTab.key === 'cx' && (
                <div className="space-y-5">
                  {/* Inbound Volume Funnel Breakdown */}
                  <div className="rounded-xl border border-[#DCD6C8] bg-[#FAF8F3] p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono-tabular text-[11px] font-semibold uppercase tracking-wider text-[#5A6270]">
                        Inbound Service Stack Breakdown (100% of Volume)
                      </span>
                      <span className="font-mono-tabular text-xs font-semibold text-[#C8400D]">
                        Select tier to inspect SLAs
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {CX_TIERS.map((tier) => {
                        const active = tier.id === selectedTierId;
                        return (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => setSelectedTierId(tier.id)}
                            className={`rounded-xl border p-3.5 text-left transition-colors cursor-pointer ${
                              active
                                ? 'border-[#111B2B] bg-[#111B2B] text-white'
                                : 'border-[#DCD6C8] bg-white text-[#111B2B] hover:border-[#F2551B]'
                            }`}
                          >
                            <div
                              className={`font-mono-tabular text-[11px] font-bold ${
                                active ? 'text-[#FF723F]' : 'text-[#C8400D]'
                              }`}
                            >
                              {tier.badge}
                            </div>
                            <div className="mt-1 font-display text-sm font-bold">
                              {tier.name}
                            </div>
                            <div
                              className={`mt-1.5 font-mono-tabular text-xs font-semibold ${
                                active ? 'text-[#E5E9F0]' : 'text-[#5A6270]'
                              }`}
                            >
                              {tier.metric}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-4 rounded-xl border border-[#DCD6C8] bg-white p-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div className="text-xs font-bold text-[#111B2B]">
                          {selectedTier.badge} · {selectedTier.name}
                        </div>
                        <div className="font-mono-tabular text-xs font-semibold text-[#C8400D]">
                          {selectedTier.inboundShare}
                        </div>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-[#3A4250]">
                        <strong className="text-[#111B2B]">Tools:</strong> {selectedTier.tools}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[#3A4250]">
                        <strong className="text-[#111B2B]">In education:</strong>{' '}
                        {selectedTier.educationExample}
                      </p>

                      <div className="mt-3.5 grid grid-cols-3 gap-2 border-t border-[#DCD6C8] pt-3">
                        {selectedTier.slas.map((s) => (
                          <div key={s.label}>
                            <div className="font-mono-tabular text-sm font-bold text-[#111B2B]">
                              {s.value}
                            </div>
                            <div className="text-[11px] text-[#5A6270]">{s.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Peak-Season Test + Channel Coverage */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-[#22314A] bg-[#111B2B] p-5 text-white">
                      <div className="text-[11px] font-semibold tracking-wider text-[#FF723F]">
                        A PEAK-SEASON TEST
                      </div>
                      <div className="mt-2 font-mono-tabular text-3xl font-bold">
                        97%+ quality held
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-[#C6CEDB]">
                        Enrollment peak arrived with the usual spike across chat, email, and voice. One capacity model absorbed it — no seasonal hiring scramble, no SLA breach.
                      </p>
                    </div>

                    <div className="flex flex-col justify-between rounded-xl border border-[#DCD6C8] bg-[#FAF8F3] p-5">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-[#111B2B]">
                          <Shield className="h-4 w-4 text-[#F2551B]" aria-hidden="true" />
                          <span>One Stack, Every Channel</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-[#3A4250]">
                          {CHANNELS.join(' · ')}
                        </p>
                      </div>

                      <a
                        href="#query-router"
                        className="mt-4 inline-flex items-center justify-between rounded-lg bg-[#111B2B] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#1E2E47]"
                      >
                        <span>Watch Live Query Router Below</span>
                        <ArrowDownRight className="h-4 w-4 text-[#FF723F]" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {activeTab.key === 'eops' && (
                <div className="space-y-5">
                  <div className="rounded-xl border border-[#DCD6C8] bg-[#FAF8F3] p-5">
                    <div className="font-mono-tabular text-[11px] font-semibold uppercase tracking-wider text-[#5A6270]">
                      Back-Office Transaction Ops
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
                      {[
                        ['Records', 'Transcripts & credentials'],
                        ['Billing', 'Invoicing, refunds, AR'],
                        ['Orders', 'Fulfillment & exceptions'],
                        ['Licensing', 'Entitlements & rights'],
                        ['Provisioning', 'Accounts & rostering'],
                      ].map(([name, sub]) => (
                        <div
                          key={name}
                          className="rounded-lg border border-[#DCD6C8] bg-white p-3"
                        >
                          <div className="text-xs font-bold text-[#111B2B]">
                            {name}
                          </div>
                          <div className="mt-0.5 text-[11px] text-[#5A6270]">
                            {sub}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive "One Function, Then Five" Ripple */}
                  <div className="rounded-xl border border-[#22314A] bg-[#111B2B] p-5 text-white">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono-tabular text-[11px] font-semibold uppercase tracking-wider text-[#FF723F]">
                        One Function, Then Five · Governed Expansion
                      </span>
                      <button
                        type="button"
                        onClick={replayEopsRipple}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#C6CEDB] hover:text-white cursor-pointer"
                      >
                        <RotateCcw className="h-3 w-3" aria-hidden="true" />
                        Replay
                      </button>
                    </div>

                    <div className="mt-3 rounded-lg border border-[#3D7FE6]/50 bg-[#182438] px-4 py-3 text-xs">
                      <span className="font-semibold text-[#6AA4FF]">
                        Anchor Function:
                      </span>{' '}
                      High-volume AR &amp; Collections AI Workboard — faster cash recovery, zero added headcount.
                    </div>

                    <div className="mt-3 space-y-2">
                      {EOPS_RIPPLE_LANES.map((lane, idx) => {
                        const connected = eopsStep >= idx + 1;
                        return (
                          <div
                            key={lane.id}
                            className={`flex items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5 text-xs transition-all ${
                              connected
                                ? 'border-white/15 bg-[#182438] text-white'
                                : 'border-white/5 bg-[#182438]/40 text-[#8B97AB]'
                            }`}
                          >
                            <div>
                              <div className="font-semibold">{lane.name}</div>
                              <div className="text-[11px] text-[#B6C0D0]">
                                {lane.detail}
                              </div>
                            </div>
                            <span
                              className={`font-mono-tabular text-[11px] font-semibold shrink-0 ${
                                connected ? 'text-[#46C98F]' : 'text-[#64748B]'
                              }`}
                            >
                              {connected ? 'On Layer' : 'Queued'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {activeTab.key === 'journey' && (
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono-tabular text-[11px] font-semibold uppercase tracking-wider text-[#5A6270]">
                      Interactive 5-Stage Operating Map
                    </span>
                    <div className="inline-flex rounded-lg border border-[#DCD6C8] bg-[#FAF8F3] p-1">
                      <button
                        type="button"
                        onClick={() => setSegment('highered')}
                        className={`rounded-md px-3 py-1 text-xs font-semibold cursor-pointer ${
                          segment === 'highered'
                            ? 'bg-[#111B2B] text-white'
                            : 'text-[#5A6270]'
                        }`}
                      >
                        Higher Ed
                      </button>
                      <button
                        type="button"
                        onClick={() => setSegment('k12')}
                        className={`rounded-md px-3 py-1 text-xs font-semibold cursor-pointer ${
                          segment === 'k12'
                            ? 'bg-[#111B2B] text-white'
                            : 'text-[#5A6270]'
                        }`}
                      >
                        K–12 &amp; EdTech
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {JOURNEY_STAGES.map((st, idx) => (
                      <button
                        key={st.step}
                        type="button"
                        onClick={() => setJourneyIdx(idx)}
                        className={`rounded-lg border p-3 text-left transition-colors cursor-pointer ${
                          idx === journeyIdx
                            ? 'border-[#111B2B] bg-[#111B2B] text-white'
                            : 'border-[#DCD6C8] bg-[#FAF8F3] text-[#111B2B] hover:border-[#1F9E6A]'
                        }`}
                      >
                        <div
                          className={`font-mono-tabular text-[11px] font-bold ${
                            idx === journeyIdx ? 'text-[#46C98F]' : 'text-[#1F9E6A]'
                          }`}
                        >
                          {st.step} · {st.pillar}
                        </div>
                        <div className="mt-1 text-xs font-bold leading-snug">
                          {st.name}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-[#DCD6C8] bg-[#FAF8F3] p-4">
                      <div className="text-xs font-bold text-[#C8400D]">
                        Customer Experience · Front of House
                      </div>
                      <ul className="mt-3 space-y-2 text-xs text-[#111B2B]">
                        {currentStage.cx.map((c) => (
                          <li key={c} className="flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-[#F2551B]" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-[#22314A] bg-[#111B2B] p-4 text-white">
                      <div className="text-xs font-bold text-[#46C98F]">
                        Enterprise Operations · Back Office
                      </div>
                      <ul className="mt-3 space-y-2 text-xs text-[#E5E9F0]">
                        {currentStage.eops.map((e) => (
                          <li key={e} className="flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-[#46C98F]" />
                            <span>{e}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {segment === 'k12' && (
                    <div className="rounded-xl border border-[#DCD6C8] bg-[#EFECE3] p-4">
                      <div className="text-xs font-bold text-[#111B2B]">
                        K–12 &amp; EdTech District Motion
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-medium text-[#3A4250]">
                        {K12_RAIL.map((step, i) => (
                          <React.Fragment key={step}>
                            <span className="text-[#111B2B] font-semibold">
                              {step}
                            </span>
                            {i < K12_RAIL.length - 1 && (
                              <span aria-hidden="true" className="text-[#F2551B]">
                                →
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab.key === 'insight' && (
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono-tabular text-[11px] font-semibold uppercase tracking-wider text-[#5A6270]">
                      What Leadership Gets Back
                    </span>
                    <div className="inline-flex rounded-lg border border-[#DCD6C8] bg-[#FAF8F3] p-1">
                      {(['Pass 1', 'Pass 2', 'Pass 3'] as const).map((label, idx) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setInsightPass(idx as 0 | 1 | 2)}
                          className={`rounded-md px-3 py-1 text-xs font-semibold cursor-pointer ${
                            insightPass === idx
                              ? 'bg-[#111B2B] text-white'
                              : 'text-[#5A6270]'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 rounded-xl border border-[#22314A] bg-[#111B2B] p-5 text-white">
                    {[
                      {
                        ix: '01',
                        title: 'Where it drops off (Journey Analytics)',
                        desc: [
                          'Initial baseline maps inquiry-to-enrollment drop points across channels.',
                          'Correlates transcript upload delays directly with aid-window ticket surges.',
                          'Predicts pre-census cohort drop risk and triggers proactive outreach.',
                        ][insightPass],
                      },
                      {
                        ix: '02',
                        title: 'What keeps repeating (Exception Analytics)',
                        desc: [
                          'Captures raw aid-verification, refund, and contract rework tickets.',
                          'Isolates the top 3 document and clause types driving 70% of exceptions.',
                          'Eliminates recurring handoffs upstream before peak enrollment begins.',
                        ][insightPass],
                      },
                      {
                        ix: '03',
                        title: 'What to fix next (Prioritized Agenda)',
                        desc: [
                          'The first operating report ranks workflows by volume and manual touch time.',
                          'Delivers targeted redesign blueprints for finance and registrar teams.',
                          'The third pass runs smarter than the first — turning operations into a decision system.',
                        ][insightPass],
                      },
                    ].map((row) => (
                      <div
                        key={row.ix}
                        className="rounded-lg border border-white/12 bg-[#182438] p-4"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono-tabular text-xs font-bold text-[#FF723F]">
                            {row.ix}
                          </span>
                          <span className="font-display text-sm font-bold">
                            {row.title}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-[#C6CEDB]">
                          {row.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
