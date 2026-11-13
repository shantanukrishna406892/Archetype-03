import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Database,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import {
  CX_TIERS,
  SIMULATOR_PRESETS,
  classifyCustomQuery,
  type QuerySimulationScenario,
} from '../data/presentationData';

export const InteractiveQueryRouterBand: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [scenario, setScenario] = useState<QuerySimulationScenario>(
    SIMULATOR_PRESETS[0]
  );
  const [presetIdx, setPresetIdx] = useState<number>(0);
  const [queryInput, setQueryInput] = useState<string>(SIMULATOR_PRESETS[0].query);
  const [pipelineStage, setPipelineStage] = useState<1 | 2 | 3>(1);

  const [hasEnteredView, setHasEnteredView] = useState<boolean>(false);
  const [userPaused, setUserPaused] = useState<boolean>(false);
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const rm =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduceMotion(rm);
    if (rm) {
      setPipelineStage(3);
    }
  }, []);

  // Trigger auto-run when scrolled into view
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setHasEnteredView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEnteredView(true);
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const isAutoRunning = hasEnteredView && !userPaused && !reduceMotion;

  // Stage progression timer (1 -> 2 -> 3)
  useEffect(() => {
    if (reduceMotion) return;
    if (!hasEnteredView) return;

    if (pipelineStage < 3) {
      const stageTimer = window.setTimeout(() => {
        setPipelineStage((prev) => (prev < 3 ? ((prev + 1) as 1 | 2 | 3) : 3));
      }, 450);
      return () => window.clearTimeout(stageTimer);
    }

    // If auto-running and stage 3 is complete, advance to next preset after 3.8s
    if (isAutoRunning) {
      const nextTimer = window.setTimeout(() => {
        const nextIdx = (presetIdx + 1) % SIMULATOR_PRESETS.length;
        const nextScenario = SIMULATOR_PRESETS[nextIdx];
        setPresetIdx(nextIdx);
        setScenario(nextScenario);
        setQueryInput(nextScenario.query);
        setPipelineStage(1);
      }, 3800);
      return () => window.clearTimeout(nextTimer);
    }
  }, [hasEnteredView, isAutoRunning, pipelineStage, presetIdx, reduceMotion]);

  const handleSelectPreset = (idx: number) => {
    setUserPaused(true);
    const chosen = SIMULATOR_PRESETS[idx];
    setPresetIdx(idx);
    setScenario(chosen);
    setQueryInput(chosen.query);
    setPipelineStage(reduceMotion ? 3 : 1);
  };

  const handleSelectFunnelTier = (tierId: 'tier0' | 'routing' | 'tier1' | 'tier2') => {
    setUserPaused(true);
    if (tierId === 'routing') {
      setPipelineStage(reduceMotion ? 3 : 1);
      return;
    }
    const matchIdx = SIMULATOR_PRESETS.findIndex((p) => p.routedTierId === tierId);
    if (matchIdx !== -1) {
      handleSelectPreset(matchIdx);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = queryInput.trim();
    if (!trimmed) return;
    setUserPaused(true);
    const exactIdx = SIMULATOR_PRESETS.findIndex(
      (p) => p.query.toLowerCase() === trimmed.toLowerCase()
    );
    if (exactIdx !== -1) {
      handleSelectPreset(exactIdx);
      return;
    }
    setScenario(classifyCustomQuery(trimmed));
    setPipelineStage(reduceMotion ? 3 : 1);
  };

  const handleReplay = () => {
    setPipelineStage(reduceMotion ? 3 : 1);
  };

  return (
    <section
      ref={sectionRef}
      id="query-router"
      className="border-b border-[#22314A] bg-[#111B2B] py-16 text-white lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        {/* Top Header + Auto-Run Controls */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wide text-[#FF723F]">
              Interactive Query Router
            </div>
            <h2 className="mt-2 font-display text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Watch one governed layer route front-office queries and sync back-office work.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#C6CEDB]">
              Every inquiry passes the Privacy Policy Gateway, routes to the optimal CX Funnel tier, and updates back-office systems of record together.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setUserPaused((prev) => !prev)}
              aria-pressed={isAutoRunning}
              className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isAutoRunning
                  ? 'border-[#F2551B] bg-[#F2551B]/15 text-[#FF8559]'
                  : 'border-white/20 bg-[#182438] text-white hover:border-white/45'
              }`}
            >
              {isAutoRunning ? (
                <>
                  <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                  Pause Auto-Run
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" aria-hidden="true" />
                  Resume Auto-Run
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleReplay}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-[#182438] px-3.5 py-2 text-xs font-semibold text-[#C6CEDB] transition-colors hover:border-white/45 hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Replay
            </button>
          </div>
        </div>

        {/* Scenario Selector Tabs + Custom Query Input */}
        <div className="mt-8 rounded-2xl border border-white/12 bg-[#182438] p-4 sm:p-5">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-wrap items-center gap-2">
              {SIMULATOR_PRESETS.map((p, idx) => {
                const isSelected = scenario.id === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectPreset(idx)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'border-[#F2551B] bg-[#F2551B] text-white'
                        : 'border-white/12 bg-[#111B2B] text-[#C6CEDB] hover:border-white/35 hover:text-white'
                    }`}
                  >
                    0{idx + 1} · {p.label}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleCustomSubmit} className="flex w-full gap-2 lg:w-[430px]">
              <label htmlFor="router-custom-query" className="sr-only">
                Test custom student, billing, or LMS query
              </label>
              <input
                id="router-custom-query"
                type="text"
                value={queryInput}
                onFocus={() => setUserPaused(true)}
                onChange={(e) => {
                  setUserPaused(true);
                  setQueryInput(e.target.value);
                }}
                placeholder="Type any tuition, refund, LMS roster, or appeal query..."
                className="min-w-0 flex-1 rounded-lg border border-white/15 bg-[#111B2B] px-3.5 py-2 text-xs text-white placeholder-[#8B97AB] focus:border-[#F2551B] focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#F2551B] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#D9440E] whitespace-nowrap shrink-0 cursor-pointer"
              >
                Route Query
              </button>
            </form>
          </div>
        </div>

        {/* 3-Stage Visual Pipeline */}
        <div className="mt-6 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
          {/* STAGE 1: Intake & Privacy Policy Gateway */}
          <div
            className={`flex flex-col justify-between rounded-2xl border p-6 transition-all lg:col-span-4 ${
              pipelineStage >= 1
                ? 'border-[#F2551B]/60 bg-[#182438]'
                : 'border-white/10 bg-[#182438]/50 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3.5">
                <span className="font-mono-tabular text-xs font-bold text-[#FF723F]">
                  01 · Intake &amp; Policy Gateway
                </span>
                <span className="text-[11px] font-medium text-[#C6CEDB]">
                  {scenario.channel}
                </span>
              </div>

              {/* Query Bubble */}
              <div className="mt-4 rounded-xl border border-white/12 bg-[#111B2B] p-4">
                <div className="text-[11px] font-medium text-[#9BA6B8]">
                  {scenario.persona}
                </div>
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-white">
                  &ldquo;{scenario.query}&rdquo;
                </p>
              </div>

              {/* 3 Gateway Security Checks */}
              <div className="mt-5 space-y-2.5">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#9BA6B8]">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#FF723F]" aria-hidden="true" />
                  <span>Pre-Call Policy Enforcement</span>
                </div>
                {scenario.gatewayChecks.map((check) => (
                  <div
                    key={check.name}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-[#111B2B]/70 px-3.5 py-2.5 text-xs"
                  >
                    <span className="font-medium text-[#E5E9F0]">{check.name}</span>
                    <span className="font-mono-tabular font-semibold text-[#46C98F]">
                      {check.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-1.5 pt-3 text-xs font-semibold text-[#FF723F]">
              <span>Cleared for Triage</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </div>
          </div>

          {/* STAGE 2: Smart Triage & Highlighted CX Tier Funnel */}
          <div
            className={`flex flex-col justify-between rounded-2xl border p-6 transition-all lg:col-span-4 ${
              pipelineStage >= 2
                ? 'border-[#F2551B] bg-[#182438] shadow-[0_0_0_1px_rgba(242,85,27,0.3)]'
                : 'border-white/10 bg-[#182438]/40 opacity-50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3.5">
                <span className="font-mono-tabular text-xs font-bold text-[#FF723F]">
                  02 · Smart Triage &amp; CX Funnel
                </span>
                <span className="font-mono-tabular text-[11px] font-semibold text-white">
                  {pipelineStage >= 2 ? scenario.confidence : 'Evaluating...'}
                </span>
              </div>

              <div className="mt-4 text-xs text-[#C6CEDB]">
                <span className="font-semibold text-white">Detected Intent:</span>{' '}
                {scenario.intent}
              </div>

              {/* Vertical 4-Tier Visual Funnel */}
              <div className="mt-4 flex flex-col items-center gap-2">
                {CX_TIERS.map((tier, idx) => {
                  const isRouted =
                    pipelineStage >= 2 && scenario.routedTierId === tier.id;
                  const isTriageBridge =
                    pipelineStage >= 2 && tier.id === 'routing';
                  const widths = ['w-full', 'w-[92%]', 'w-[84%]', 'w-[76%]'];
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => handleSelectFunnelTier(tier.id)}
                      className={`${widths[idx]} rounded-xl border px-4 py-2.5 text-left transition-all cursor-pointer ${
                        isRouted
                          ? 'border-[#F2551B] bg-[#F2551B] text-white shadow-sm'
                          : isTriageBridge
                            ? 'border-[#6AA4FF]/60 bg-[#111B2B] text-white'
                            : 'border-white/10 bg-[#111B2B]/70 text-[#9BA6B8] hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-bold">
                          {tier.badge} · {tier.name}
                        </span>
                        <span className="font-mono-tabular text-[11px] font-semibold">
                          {isRouted ? 'ROUTED' : tier.metric}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="mt-4 text-xs leading-relaxed text-[#C6CEDB]">
                {scenario.triageRationale}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
              <span className="font-mono-tabular font-semibold text-[#FF723F]">
                {pipelineStage >= 2 ? scenario.slaBadge : 'Selecting tier...'}
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-[#FF723F]" aria-hidden="true" />
            </div>
          </div>

          {/* STAGE 3: Resolution & Enterprise Ops Sync */}
          <div
            className={`flex flex-col justify-between rounded-2xl border p-6 transition-all lg:col-span-4 ${
              pipelineStage >= 3
                ? 'border-[#46C98F]/60 bg-[#182438]'
                : 'border-white/10 bg-[#182438]/40 opacity-50'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3.5">
                <span className="font-mono-tabular text-xs font-bold text-[#46C98F]">
                  03 · Resolution &amp; E-Ops Sync
                </span>
                <span className="font-mono-tabular text-[11px] text-[#C6CEDB]">
                  {pipelineStage >= 3 ? 'Completed' : 'Awaiting Tier'}
                </span>
              </div>

              {/* Front-of-House Outcome */}
              <div className="mt-4 rounded-xl border border-white/12 bg-[#111B2B] p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 text-[#46C98F]"
                    aria-hidden="true"
                  />
                  <span>Front-of-House Outcome</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#C6CEDB]">
                  {scenario.frontOfficeOutcome}
                </p>
              </div>

              {/* Back-Office Writeback */}
              <div className="mt-4 rounded-xl border border-[#46C98F]/30 bg-[#111B2B] p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#46C98F]">
                    <Database className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Enterprise Ops Writeback</span>
                  </div>
                  <span className="font-mono-tabular text-[11px] font-semibold text-white">
                    {scenario.targetSystem}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#E5E9F0]">
                  {scenario.backOfficeAction}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-[#C6CEDB]">
              <span>Unified on one governed record</span>
              <span className="font-mono-tabular font-semibold text-[#46C98F]">
                {pipelineStage >= 3 ? 'Synced' : 'Pending'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
