import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  PROOF_CASE_STUDIES,
  WHY_CARDS,
  type ProofCaseStudy,
} from '../data/presentationData';

const CATEGORIES: Array<'All' | ProofCaseStudy['category']> = [
  'All',
  'Customer Experience',
  'F&A & Collections',
  'Legal Ops',
  'Lead Gen',
];

export const ProofAndContactSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<
    'All' | ProofCaseStudy['category']
  >('All');
  const [selectedId, setSelectedId] = useState<string>(PROOF_CASE_STUDIES[0].id);

  // Contact form state
  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [email, setEmail] = useState('');
  const [segment, setSegment] = useState('Higher Ed / Online University');
  const [interest, setInterest] = useState('Customer Experience Stack');
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const visibleStudies =
    activeCategory === 'All'
      ? PROOF_CASE_STUDIES
      : PROOF_CASE_STUDIES.filter((s) => s.category === activeCategory);

  const activeStudy =
    visibleStudies.find((s) => s.id === selectedId) || visibleStudies[0];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !org.trim()) {
      setFormError('Please enter your name and organization.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('Please enter a valid work email address.');
      return;
    }
    setFormError('');
    setSubmitted(true);
  };

  return (
    <>
      {/* Production Proof (5 Filterable Outcomes) */}
      <section
        id="proof"
        className="border-b border-[#DCD6C8] bg-[#EFECE3] py-16 lg:py-24"
      >
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <h2 className="font-display text-balance text-3xl font-bold tracking-tight text-[#111B2B] sm:text-4xl">
                Outcomes already delivered in production.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#3A4250]">
                None of these began as an AI project. Each started by redesigning one process end to end, then operating it — ensuring gains held after go-live.
              </p>
            </div>

            <div
              role="group"
              aria-label="Filter proof outcomes"
              className="flex flex-wrap items-center gap-1 rounded-xl border border-[#DCD6C8] bg-[#FAF8F3] p-1"
            >
              {CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat);
                      const next =
                        cat === 'All'
                          ? PROOF_CASE_STUDIES
                          : PROOF_CASE_STUDIES.filter((s) => s.category === cat);
                      if (next.length > 0 && !next.some((x) => x.id === selectedId)) {
                        setSelectedId(next[0].id);
                      }
                    }}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#111B2B] text-white'
                        : 'text-[#5A6270] hover:text-[#111B2B]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Case Selector Row */}
          <div className="mt-9 grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-5">
            {visibleStudies.map((cs) => {
              const isSelected = activeStudy?.id === cs.id;
              return (
                <button
                  key={cs.id}
                  type="button"
                  onClick={() => setSelectedId(cs.id)}
                  className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#111B2B] bg-[#111B2B] text-white'
                      : 'border-[#DCD6C8] bg-white text-[#111B2B] hover:border-[#9A8546]'
                  }`}
                >
                  <div>
                    <div
                      className={`text-[11px] font-semibold ${
                        isSelected ? 'text-[#FF723F]' : 'text-[#C8400D]'
                      }`}
                    >
                      {cs.category}
                    </div>
                    <div className="mt-2 font-mono-tabular text-lg font-bold leading-tight">
                      {cs.headlineMetric}
                    </div>
                  </div>
                  <div
                    className={`mt-3 text-xs font-medium leading-snug ${
                      isSelected ? 'text-[#C6CEDB]' : 'text-[#3A4250]'
                    }`}
                  >
                    {cs.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Proof Detail Panel */}
          {activeStudy && (
            <div
              key={activeStudy.id}
              className="panel-enter mt-5 rounded-2xl border border-[#DCD6C8] bg-white p-6 lg:p-9"
            >
              <div className="flex flex-col justify-between gap-4 border-b border-[#DCD6C8] pb-5 lg:flex-row lg:items-end">
                <div>
                  <div className="text-xs font-semibold text-[#C8400D]">
                    {activeStudy.pillarTag}
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-bold text-[#111B2B]">
                    {activeStudy.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#3A4250]">
                    {activeStudy.subtitle}
                  </p>
                </div>
                <div className="font-mono-tabular text-xs font-medium text-[#5A6270]">
                  {activeStudy.scope}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <div className="font-mono-tabular text-[11px] font-semibold uppercase tracking-wider text-[#5A6270]">
                    Challenge
                  </div>
                  <ul className="mt-3 space-y-2.5 text-sm text-[#3A4250]">
                    {activeStudy.challenges.map((ch) => (
                      <li key={ch} className="leading-relaxed">
                        · {ch}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-4">
                  <div className="font-mono-tabular text-[11px] font-semibold uppercase tracking-wider text-[#5A6270]">
                    Operated Approach
                  </div>
                  <ul className="mt-3 space-y-2.5 text-sm text-[#141A24]">
                    {activeStudy.approaches.map((ap) => (
                      <li key={ap} className="flex items-start gap-2 leading-relaxed">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#F2551B]"
                          aria-hidden="true"
                        />
                        <span>{ap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-3 lg:col-span-4">
                  {activeStudy.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-[#DCD6C8] bg-[#FAF8F3] p-4"
                    >
                      <div className="font-mono-tabular text-xl font-bold text-[#C8400D]">
                        {m.value}
                      </div>
                      <div className="mt-1 text-xs font-medium text-[#111B2B]">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Straive Dark Navy Band (Publisher.html #pv-why) */}
      <section
        id="why"
        className="bg-[#111B2B] py-16 text-white lg:py-24"
      >
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="max-w-2xl">
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Built to run the work, not to license a chatbot.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#C6CEDB]">
              A low-risk path from discovery to scale: Workshop → Pilot → Prove → Scale on one governed layer.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CARDS.map((card) => (
              <div key={card.title}>
                <h3 className="font-display text-lg font-bold text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#C6CEDB]">
                  {card.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 border-t border-white/12 pt-8 lg:grid-cols-4">
            {[
              ['01', 'Workshop', 'Map CX + Enterprise Ops pressures and handoffs'],
              ['02', 'Pilot', 'One CX lane or Enterprise Ops function'],
              ['03', 'Prove', 'Measured outcomes + first insight pack'],
              ['04', 'Scale', 'Expand across functions on the same layer'],
            ].map(([num, step, desc]) => (
              <div
                key={num}
                className="rounded-xl border border-white/12 bg-[#182438] p-4"
              >
                <div className="font-mono-tabular text-xs font-bold text-[#FF723F]">
                  {num} · {step}
                </div>
                <div className="mt-1.5 text-xs leading-relaxed text-[#C6CEDB]">
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Working Session Band (Publisher.html #pv-contact) */}
      <section
        id="contact"
        className="bg-[#FAF8F3] py-16 lg:py-24"
      >
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className="font-display text-balance text-3xl font-bold tracking-tight text-[#111B2B] sm:text-4xl">
                Show us one CX lane or back-office function. We&apos;ll show you what one governed operating model looks like.
              </h2>
              <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-[#3A4250]">
                Start with a focused working session to map volumes, systems, and handoff breakpoints — with an indicative 8–14 week configuration blueprint to first live process.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#DCD6C8] pt-6 sm:grid-cols-3">
                <div>
                  <div className="font-mono-tabular text-xl font-bold text-[#111B2B]">
                    Workshop → Pilot
                  </div>
                  <div className="mt-0.5 text-xs text-[#5A6270]">
                    Map handoffs, prove one lane first
                  </div>
                </div>
                <div>
                  <div className="font-mono-tabular text-xl font-bold text-[#111B2B]">
                    Zero Rebuild
                  </div>
                  <div className="mt-0.5 text-xs text-[#5A6270]">
                    Integrates with CRM, ERP, SIS &amp; LMS
                  </div>
                </div>
                <div>
                  <div className="font-mono-tabular text-xl font-bold text-[#111B2B]">
                    HITL Governed
                  </div>
                  <div className="mt-0.5 text-xs text-[#5A6270]">
                    Human approval on high-risk actions
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#DCD6C8] bg-white p-6 lg:col-span-6 lg:p-8">
              {submitted ? (
                <div className="py-6">
                  <CheckCircle2 className="h-9 w-9 text-[#F2551B]" />
                  <h3 className="mt-4 font-display text-2xl font-bold text-[#111B2B]">
                    Working session requested
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#3A4250]">
                    Thank you, <strong>{name}</strong>. Your Archetype 3 session request for <strong>{org}</strong> ({segment} · {interest}) is ready for follow-up at <span className="font-mono-tabular">{email}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-lg border border-[#DCD6C8] px-4 py-2 text-xs font-semibold text-[#111B2B] hover:border-[#111B2B] cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="c-name"
                        className="block text-xs font-semibold text-[#111B2B]"
                      >
                        Name
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="mt-1.5 w-full rounded-lg border border-[#DCD6C8] bg-[#FAF8F3] px-3.5 py-2.5 text-sm text-[#111B2B] focus:border-[#F2551B] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="c-org"
                        className="block text-xs font-semibold text-[#111B2B]"
                      >
                        Organization
                      </label>
                      <input
                        id="c-org"
                        type="text"
                        value={org}
                        onChange={(e) => setOrg(e.target.value)}
                        placeholder="University / EdTech"
                        className="mt-1.5 w-full rounded-lg border border-[#DCD6C8] bg-[#FAF8F3] px-3.5 py-2.5 text-sm text-[#111B2B] focus:border-[#F2551B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="c-email"
                      className="block text-xs font-semibold text-[#111B2B]"
                    >
                      Work Email
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex.morgan@institution.edu"
                      className="mt-1.5 w-full rounded-lg border border-[#DCD6C8] bg-[#FAF8F3] px-3.5 py-2.5 text-sm text-[#111B2B] focus:border-[#F2551B] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="c-seg"
                        className="block text-xs font-semibold text-[#111B2B]"
                      >
                        Segment
                      </label>
                      <select
                        id="c-seg"
                        value={segment}
                        onChange={(e) => setSegment(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-[#DCD6C8] bg-[#FAF8F3] px-3.5 py-2.5 text-sm text-[#111B2B] focus:border-[#F2551B] focus:outline-none"
                      >
                        <option>Higher Ed / Online University</option>
                        <option>K–12 District / Provider</option>
                        <option>EdTech / Education Publisher</option>
                        <option>Workforce Learning</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="c-int"
                        className="block text-xs font-semibold text-[#111B2B]"
                      >
                        Area of Interest
                      </label>
                      <select
                        id="c-int"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-[#DCD6C8] bg-[#FAF8F3] px-3.5 py-2.5 text-sm text-[#111B2B] focus:border-[#F2551B] focus:outline-none"
                      >
                        <option>Customer Experience Stack</option>
                        <option>Enterprise Operations (F&amp;A / Legal / HR)</option>
                        <option>Unified Learner Journey</option>
                        <option>Compounding Insight &amp; Analytics</option>
                      </select>
                    </div>
                  </div>

                  {formError && (
                    <p className="text-xs font-semibold text-[#C8400D]" role="alert">
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F2551B] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#D9440E] cursor-pointer"
                  >
                    Book a Working Session
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <footer className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[#DCD6C8] pt-6 text-xs text-[#5A6270] sm:flex-row sm:items-center">
            <div>© 2026 Straive · AI-Transformed Customer Experience &amp; Enterprise Operations</div>
            <div>www.straive.com</div>
          </footer>
        </div>
      </section>
    </>
  );
};
