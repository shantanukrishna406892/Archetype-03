export type SolutionKey = 'cx' | 'eops' | 'journey' | 'insight';

export interface PressureCard {
  id: string;
  stageLabel: string;
  title: string;
  detail: string;
  solutionKeys: SolutionKey[];
  accentColor: string;
}

export const PRESSURES: PressureCard[] = [
  {
    id: 'discovery',
    stageLabel: '01 · Discovery & Nurturing',
    title: 'Inquiries spike; follow-up slips',
    detail:
      'Prospective students wait days for an answer. Intent cools before anyone calls back or qualifies the lead.',
    solutionKeys: ['cx', 'journey'],
    accentColor: '#F2551B',
  },
  {
    id: 'application',
    stageLabel: '02 · Application & Enrollment',
    title: 'Peak load stretches the cycle',
    detail:
      'Applications, transcripts, and financial aid inquiries arrive together. Manual checks delay admission decisions.',
    solutionKeys: ['cx', 'eops', 'journey'],
    accentColor: '#3D7FE6',
  },
  {
    id: 'onboarding',
    stageLabel: '03 · Onboarding',
    title: 'The first weeks decide retention',
    detail:
      'Records, accounts, LMS access, and rosters are provisioned by separate teams. Every gap returns as a support ticket.',
    solutionKeys: ['eops', 'journey'],
    accentColor: '#1F9E6A',
  },
  {
    id: 'learning',
    stageLabel: '04 · Learning & Engagement',
    title: 'Support volume outruns staff',
    detail:
      'Helpdesk, billing, and platform inquiries compete for the same specialists. Cost-to-serve climbs without better outcomes.',
    solutionKeys: ['cx', 'eops'],
    accentColor: '#F2551B',
  },
  {
    id: 'continuity',
    stageLabel: '05 · Continuity & Alumni',
    title: 'Re-enrollment is left to chance',
    detail:
      'Transcripts, credentials, and retention outreach remain manual. Churn surfaces only after the student has left.',
    solutionKeys: ['journey', 'insight'],
    accentColor: '#9A8546',
  },
  {
    id: 'point-tools',
    stageLabel: '06 · Operating Reality',
    title: 'Point bots inside old handoffs',
    detail:
      'Adding a chatbot to the inquiry form and a separate workflow to finance still leaves the learner feeling every seam.',
    solutionKeys: ['cx', 'eops', 'insight'],
    accentColor: '#3D7FE6',
  },
];

export interface SolutionTab {
  key: SolutionKey;
  index: string;
  title: string;
  tagline: string;
  accentColor: string;
  lead: string;
  included: string[];
  capabilities: string[];
  proofCallout: {
    label: string;
    metric: string;
    text: string;
  };
}

export const SOLUTION_TABS: SolutionTab[] = [
  {
    key: 'cx',
    index: '01',
    title: 'Customer Experience Stack',
    tagline: 'Resolve more upfront. Escalate with full context.',
    accentColor: '#F2551B',
    lead: 'Unified omni-channel support across email, chat, voice, social, messaging, self-service portals, and case queues. Tier 0 self-service, smart triage, digital workers, and SME expert assist operate as one connected stack — lowering average cost per query by ~40–50%.',
    included: [
      'Tier 0 Cortexa RAG with citations and guardrails (45–50% of inbound volume)',
      'Smart triage across intent, sentiment, and urgency (>90% routing accuracy)',
      'Tier 1 & 1.5 Digital Workers (30–40% of inbound: autonomous + human-reviewed)',
      'Tier 2 SME Copilots for complex escalations (10–25% of inbound; -30–35% AHT)',
      'One omni-channel capacity model built to absorb peak enrollment surges',
    ],
    capabilities: [
      '24/7 Self-Service (<5s avg. response)',
      'Policy-Gated Routing & Escalation',
      'Human-Audited Tier 1.5 Actions (<4hr SLA)',
      'Real-Time Agent Assist (+5–9pt CSAT uplift)',
    ],
    proofCallout: {
      label: 'Education CX · Global Publisher',
      metric: '97%+ quality · ~60% savings',
      text: 'Consolidated nine stakeholder groups and ~360K annual interactions onto one 24x7 CRM and pod model, holding 4.5 CSAT across ~150 transitioned roles.',
    },
  },
  {
    key: 'eops',
    index: '02',
    title: 'Enterprise Operations',
    tagline: 'Land one function. Expand on the same layer.',
    accentColor: '#3D7FE6',
    lead: 'Back-office transaction operations — student records, billing, collections, licensing, and provisioning — integrated with five core enterprise functions. Start with one high-volume bottleneck and expand adjacent workflows on the exact same governed foundation.',
    included: [
      'F&A: Cash application, AP, refunds, and AI-prioritized AR and collections',
      'HR: Hiring, onboarding, and people-ops workflows with human review gates',
      'Tech Ops: IT and LMS helpdesk, account access, and district roster provisioning',
      'Legal: Clause extraction, policy mapping, and HITL risk scoring',
      'Lead Gen: Contact validation, CRM enrichment, and pipeline routing',
    ],
    capabilities: [
      'Records, Billing, Collections & Licensing Ops',
      'AI-Assisted Workboards & Cash Forecasting',
      'Clause-Level Legal Risk Flagging (HITL)',
      'Structured Demand & Conversion Cadence',
    ],
    proofCallout: {
      label: 'AR & Collections + Lead Gen',
      metric: '$475M+ collected · 11% → 42% conv.',
      text: 'Stood up AR operations in 2 months and reached 95%+ collection effectiveness within 4 months (22%+ DSO drop), while demand ops lifted conversion from 11% to 42% (2021–2025).',
    },
  },
  {
    key: 'journey',
    index: '03',
    title: 'Unified Learner Journey',
    tagline: 'Front of house and back office on one rail.',
    accentColor: '#1F9E6A',
    lead: 'Every stage from Discovery through Alumni operates on a shared record. When a student submits an aid question or a district requests a roster update, the front-of-house conversation and back-office workflow move together without manual re-entry.',
    included: [
      '01 Discovery: Agentic lead engagement and intent scoring',
      '02 Application: AI form and aid assistance with transcript mapping',
      '03 Onboarding: First-30-days support with LMS and roster provisioning',
      '04 Learning: Persistent assistant alongside IT helpdesk, billing, and retention',
      '05 Continuity: Alumni hub with credential verification and re-enrollment',
    ],
    capabilities: [
      'Higher Ed & Online Degree Journey Map',
      'K–12 & EdTech District-to-Renewal Rail',
      'Zero-Handoff Exception Resolution',
    ],
    proofCallout: {
      label: 'Multi-Division Education Operations',
      metric: '~360K interactions · 1 CRM',
      text: 'Unified enrollment, invoicing, digital access, support, and renewals across K–12, Higher Ed, research, and workforce divisions (~25% CRM infrastructure savings).',
    },
  },
  {
    key: 'insight',
    index: '04',
    title: 'Compounding Insight',
    tagline: 'Operated volume becomes decision advantage.',
    accentColor: '#9A8546',
    lead: 'Efficiency is only the entry point. Because Customer Experience and Enterprise Operations run on one governed layer, every resolved interaction and back-office exception feeds analytics back to leadership — turning operations into a continuous decision system.',
    included: [
      '01 Reimagine: First-principles redesign — never apply AI to a broken process',
      '02 Build & Run: People and AI operating CX and E-Ops on one layer',
      '03 Journey Analytics: Pinpoint exactly where applications and learners drop off',
      '04 Exception Analytics: Surface recurring aid, billing, and clause failures',
      '05 Prioritized Fix Agenda: Resolve top friction drivers before peak surge',
    ],
    capabilities: [
      'Closed-Loop Exception Telemetry',
      'Cross-Pillar Root-Cause Attribution',
      'Cycle-Over-Cycle Redesign Packs',
    ],
    proofCallout: {
      label: 'Compounding Operating Loop',
      metric: '3rd pass smarter than the 1st',
      text: 'Isolates the handful of document types driving enrollment backlogs and the exact contract clauses causing legal rework.',
    },
  },
];

export interface CxTierItem {
  id: 'tier0' | 'routing' | 'tier1' | 'tier2';
  badge: string;
  name: string;
  metric: string;
  inboundShare: string;
  tools: string;
  educationExample: string;
  slas: { label: string; value: string }[];
}

export const CX_TIERS: CxTierItem[] = [
  {
    id: 'tier0',
    badge: 'Tier 0',
    name: 'Self-Service',
    metric: '45–50% inbound',
    inboundShare: '45–50% of all inbound volume (~40–50% deflection)',
    tools: 'Cortexa RAG · Voice & chat FAQ · WikiFlow KB Copilot',
    educationExample: 'Fee deadlines, portal resets, and document receipt status.',
    slas: [
      { label: 'Availability', value: '24/7' },
      { label: 'Avg. response', value: '<5s' },
      { label: 'Deflection', value: '~45%' },
    ],
  },
  {
    id: 'routing',
    badge: 'Routing',
    name: 'Smart Triage',
    metric: '>90% accuracy',
    inboundShare: 'Evaluates all remaining intake post-Tier 0',
    tools: 'Intent, sentiment & urgency detection · Clean stack handoff',
    educationExample: 'Aid inquiries, billing disputes, and IT access sorted on arrival.',
    slas: [
      { label: 'Routing accuracy', value: '>90%' },
      { label: 'Context retained', value: '100%' },
      { label: 'Gateway check', value: 'Pre-call' },
    ],
  },
  {
    id: 'tier1',
    badge: 'Tier 1 / 1.5',
    name: 'Digital Workers',
    metric: '30–40% inbound',
    inboundShare: '18–25% autonomous Tier 1 + 10–15% human-reviewed Tier 1.5',
    tools: 'Autonomous + supervised workflows · Audited high-risk actions',
    educationExample: 'Refund status, document chase, and enrollment or roster updates.',
    slas: [
      { label: 'Tier 1 resolve', value: '<90s' },
      { label: 'Tier 1.5 SLA', value: '<4hr' },
      { label: 'FCR / Audit', value: '92% / 100%' },
    ],
  },
  {
    id: 'tier2',
    badge: 'Tier 2',
    name: 'Expert Assist',
    metric: '10–25% inbound',
    inboundShare: '10–25% of all inbound volume (complex escalations)',
    tools: 'Chat & case copilots · SME L1–L3 acceleration',
    educationExample: 'Escalated aid appeals, transcript exceptions, and complex accounts.',
    slas: [
      { label: 'Productivity', value: '+25–32%' },
      { label: 'Handle time', value: '-30–35%' },
      { label: 'CSAT uplift', value: '+5–9pt' },
    ],
  },
];

export interface QuerySimulationScenario {
  id: string;
  label: string;
  channel: string;
  persona: string;
  query: string;
  routedTierId: 'tier0' | 'tier1' | 'tier2';
  assignedTierLabel: string;
  intent: string;
  confidence: string;
  urgency: 'Standard' | 'Elevated' | 'High';
  slaBadge: string;
  gatewayChecks: { name: string; status: string }[];
  triageRationale: string;
  frontOfficeOutcome: string;
  targetSystem: string;
  backOfficeAction: string;
}

export const SIMULATOR_PRESETS: QuerySimulationScenario[] = [
  {
    id: 'fee-deadline',
    label: 'Tuition deadline & FAFSA',
    channel: 'Web Chat · Student Portal',
    persona: 'Undergraduate Applicant',
    query: 'What is the fall tuition deadline and did you receive my FAFSA verification?',
    routedTierId: 'tier0',
    assignedTierLabel: 'Tier 0 · Self-Service',
    intent: 'Fee Schedule + Document Verification Status',
    confidence: '96% Confidence',
    urgency: 'Standard',
    slaBadge: '<4s · Zero-Touch Deflected',
    gatewayChecks: [
      { name: 'PII Masking', status: 'Student ID masked' },
      { name: 'Grounding', status: 'Fall 2026 Policy RAG' },
      { name: 'Access Scope', status: 'Read-only SIS lookup' },
    ],
    triageRationale:
      'High-confidence informational inquiry with verified SIS connector read — resolved instantly in Tier 0 without creating a queue ticket.',
    frontOfficeOutcome:
      'Delivered cited fall payment deadline and confirmed FAFSA verification receipt timestamp directly in chat.',
    targetSystem: 'SIS · Student Record',
    backOfficeAction:
      'Interaction summary appended to unified student timeline; zero manual queue load.',
  },
  {
    id: 'refund-hold',
    label: 'Drop refund & hold',
    channel: 'Email · Billing Queue',
    persona: 'Continuing Learner',
    query: 'I dropped my lab course two weeks ago—why is a $1,450 balance hold blocking registration?',
    routedTierId: 'tier1',
    assignedTierLabel: 'Tier 1.5 · Digital Worker + F&A',
    intent: 'Drop-Course Refund & Registration Hold Release',
    confidence: '92% Confidence',
    urgency: 'Elevated',
    slaBadge: '92% FCR · <4hr Audit SLA',
    gatewayChecks: [
      { name: 'PII Tokenization', status: 'Account redacted' },
      { name: 'Policy Threshold', status: 'Under $2,500 limit' },
      { name: 'Writeback Gate', status: 'HITL audit required' },
    ],
    triageRationale:
      'Detects registration blocker and billing discrepancy; routes to Tier 1.5 Digital Worker for cross-system reconciliation.',
    frontOfficeOutcome:
      'Sent learner transparent status update confirming drop-date match and queued hold removal within <4hr SLA.',
    targetSystem: 'SAP S/4HANA · AR & Refunds',
    backOfficeAction:
      'LMS drop timestamp matched against ERP ledger; $1,450 credit staged for one-click F&A audit release.',
  },
  {
    id: 'aid-appeal',
    label: 'Escalated aid appeal',
    channel: 'Voice + Case Portal',
    persona: 'Transfer Student',
    query: 'My transfer credits were misclassified and dropped me below full-time aid eligibility.',
    routedTierId: 'tier2',
    assignedTierLabel: 'Tier 2 · Expert Assist',
    intent: 'Complex Aid Appeal + Credit Equivalency',
    confidence: '94% Confidence',
    urgency: 'High',
    slaBadge: '-33% AHT · HITL Sign-Off',
    gatewayChecks: [
      { name: 'FERPA Scope', status: 'Transcript protected' },
      { name: 'Model Route', status: 'Private Bedrock' },
      { name: 'Approval Gate', status: 'SME sign-off locked' },
    ],
    triageRationale:
      'Multi-domain policy exception with high attrition risk; bypasses lower tiers straight to Tier 2 SME Case Copilot.',
    frontOfficeOutcome:
      'SME received complete syllabus precedent pack and drafted appeal resolution, cutting handle time by ~33%.',
    targetSystem: 'Registrar + Aid Packaging',
    backOfficeAction:
      'Credit equivalency re-evaluation and financial aid packaging updated together on one governed record.',
  },
  {
    id: 'lms-roster',
    label: 'K–12 LMS roster gap',
    channel: 'District Admin Portal',
    persona: 'District IT Coordinator',
    query: '140 Grade 8 students at Oakridge Middle are missing from our LMS math cohort.',
    routedTierId: 'tier1',
    assignedTierLabel: 'Tier 1.5 · Tech Ops Worker',
    intent: 'Bulk Roster Sync & Provisioning Exception',
    confidence: '95% Confidence',
    urgency: 'High',
    slaBadge: '<90s Triage · Zero SLA Breach',
    gatewayChecks: [
      { name: 'COPPA Safeguard', status: 'Dedicated AWS plane' },
      { name: 'Diff Validator', status: 'CSV schema checked' },
      { name: 'Bulk Provision', status: 'Allowlisted writeback' },
    ],
    triageRationale:
      'Urgent district-wide provisioning gap affecting Monday instruction; routed to Tech Ops Digital Worker.',
    frontOfficeOutcome:
      'Notified district coordinator with exact root cause and verified clean 140-student sync before class.',
    targetSystem: 'LMS · District Provisioning',
    backOfficeAction:
      'Isolated malformed section IDs, staged repaired roster batch, and updated district account record.',
  },
];

export function classifyCustomQuery(raw: string): QuerySimulationScenario {
  const q = raw.toLowerCase();
  if (
    q.includes('appeal') ||
    q.includes('legal') ||
    q.includes('contract') ||
    q.includes('clause') ||
    q.includes('credit')
  ) {
    return {
      ...SIMULATOR_PRESETS[2],
      id: 'custom-tier2',
      label: 'Custom Query',
      persona: 'Custom Inquiry',
      query: raw,
    };
  }
  if (
    q.includes('roster') ||
    q.includes('lms') ||
    q.includes('access') ||
    q.includes('provision') ||
    q.includes('login')
  ) {
    return {
      ...SIMULATOR_PRESETS[3],
      id: 'custom-techops',
      label: 'Custom Query',
      persona: 'Custom Inquiry',
      query: raw,
    };
  }
  if (
    q.includes('refund') ||
    q.includes('bill') ||
    q.includes('invoice') ||
    q.includes('hold') ||
    q.includes('pay') ||
    q.includes('tuition') && q.includes('balance')
  ) {
    return {
      ...SIMULATOR_PRESETS[1],
      id: 'custom-eops',
      label: 'Custom Query',
      persona: 'Custom Inquiry',
      query: raw,
    };
  }
  return {
    ...SIMULATOR_PRESETS[0],
    id: 'custom-tier0',
    label: 'Custom Query',
    persona: 'Custom Inquiry',
    query: raw,
  };
}

export interface JourneyStage {
  step: string;
  name: string;
  pillar: string;
  breakNote: string;
  cx: string[];
  eops: string[];
}

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    step: '01',
    name: 'Discovery & Nurturing',
    pillar: 'CX',
    breakNote: 'Inquiries spike and follow-up slips; intent cools before callback.',
    cx: ['Agentic Lead Engagement', 'AI Program Recommender', 'RFI & Query Assist', 'Voice Self-Service Bot'],
    eops: ['Lead Intent Scoring', 'Marketing Funnel Analytics', 'Pipeline Routing & Follow-Up'],
  },
  {
    step: '02',
    name: 'Application & Enrollment',
    pillar: 'CX + E-OPS',
    breakNote: 'Peak load stretches decision cycles with manual verification.',
    cx: ['AI Form Assist', 'Financial Aid Bot', 'Application Status Inquiries'],
    eops: ['Agentic Enrollment Copilot', 'Transcript & Credit Mapping', 'Aid Verification & Refunds'],
  },
  {
    step: '03',
    name: 'Onboarding',
    pillar: 'E-OPS',
    breakNote: 'Disconnected records, LMS access, and roster gaps become tickets.',
    cx: ['AI Onboarding Assistant', 'First-30-Days Inquiry Support'],
    eops: ['Onboarding Tracking Copilot', 'Account, LMS & Roster Provisioning', 'Student Records Setup'],
  },
  {
    step: '04',
    name: 'Learning & Engagement',
    pillar: 'CX + E-OPS',
    breakNote: 'Helpdesk, billing, and platform volume outruns staff capacity.',
    cx: ['Persistent Assistant', 'Video Chat & IM Support', 'Tier 1–2 Student Support'],
    eops: ['LMS & IT Helpdesk at Scale', 'Billing, Refunds & Collections', 'Retention Analytics'],
  },
  {
    step: '05',
    name: 'Continuity & Alumni',
    pillar: 'CX + E-OPS',
    breakNote: 'Transcripts and outreach stay manual; churn appears too late.',
    cx: ['Alumni Engagement Hub', 'Exit Interview Bot'],
    eops: ['Credential Verification', 'Transcripts & Records', 'Re-Enrollment Outreach Ops'],
  },
];

export const K12_RAIL = [
  'Score the district',
  'Win the bid',
  'Clear trust review',
  'Launch & roster',
  'Show adoption',
  'Renew with proof',
];

export const PLATFORM_PILLARS = [
  {
    title: 'Reusable foundation (~60%)',
    detail: 'Pre-built connectors, orchestration, model routing, and audit telemetry paired with ~40% client configuration — live in 8–14 weeks.',
    color: '#F2551B',
  },
  {
    title: 'Dedicated control plane',
    detail: 'Dedicated client AWS landing zone, never a multi-tenant data pool. Six-layer defense with allowlisted tools behind approval gates.',
    color: '#3D7FE6',
  },
  {
    title: 'Privacy policy gateway',
    detail: 'Every model call passes the gateway first to allow, mask, tokenize, block, or escalate. Customer data never trains external models.',
    color: '#1F9E6A',
  },
  {
    title: 'Model governance & compliance',
    detail: 'Amazon Bedrock private inference, SOC 2 Type II, ISO/IEC 27001, GDPR, FERPA, COPPA, and PCI DSS with human sign-off on high-risk actions.',
    color: '#9A8546',
  },
];

export interface ProofCaseStudy {
  id: string;
  category: 'Customer Experience' | 'F&A & Collections' | 'Legal Ops' | 'Lead Gen';
  pillarTag: string;
  title: string;
  subtitle: string;
  headlineMetric: string;
  scope: string;
  challenges: string[];
  approaches: string[];
  metrics: { value: string; label: string }[];
}

export const PROOF_CASE_STUDIES: ProofCaseStudy[] = [
  {
    id: 'education-cx',
    category: 'Customer Experience',
    pillarTag: 'Customer Experience · Education CX',
    title: 'Consolidating Nine Stakeholder Groups Into One Operating Model',
    subtitle: 'Multi-division education publisher across K–12, Higher Ed, research, and workforce.',
    headlineMetric: '97%+ quality · 4.5 CSAT',
    scope: '~360K interactions/year · ~67K orders/year · ~83K leads/year · Omni-channel',
    challenges: [
      'Nine internal stakeholders running fragmented processes and CRMs',
      'Duplicate infrastructure cost with no single learner or customer view',
      'Knowledge leakage and no 24x7 peak-season coverage',
    ],
    approaches: [
      'Dedicated pods organized by product line so domain knowledge stays intact',
      'Standardized on one CRM across divisions (~25% infrastructure cost reduction)',
      '24x7 omni-channel coverage across enrollment, invoicing, access, and renewals',
    ],
    metrics: [
      { value: '~60%', label: 'Annual Savings (2 yrs)' },
      { value: '360K', label: 'Interactions / Year' },
      { value: '~25%', label: 'CRM Savings' },
      { value: '24x7', label: 'Global Coverage' },
    ],
  },
  {
    id: 'written-off-collections',
    category: 'F&A & Collections',
    pillarTag: 'Enterprise Ops · Global Collections',
    title: 'Recovering Written-Off Debt at 100,000 Invoices per Month',
    subtitle: 'Global STM publisher across APAC, EMEA, and the Americas on SAP S/4HANA & Five9.',
    headlineMetric: '€520M+ total collected',
    scope: '100K+ invoices/month · 50+ FTEs · AI contact search, email assistant, Power BI',
    challenges: [
      'Collectors could not manually prioritize high-volume aging books',
      'Low right-party contact rates stalled written-off debt recovery',
      'Regional silos lacked a unified forecast and recovery worklist',
    ],
    approaches: [
      'Prioritized worklist targeting 60+ day aging accounts with pre-due dunning checks',
      'AI Contact Search surfacing verified phone and email for right-party outreach',
      'Dedicated write-off recovery desk integrated with predictive analytics',
    ],
    metrics: [
      { value: '€520M+', label: 'Total Collected' },
      { value: '€75M+', label: 'Debt Recovered (6 mo)' },
      { value: '42%', label: '60+ Day Aging Lift' },
      { value: '25%+', label: 'CEI Uplift' },
    ],
  },
  {
    id: 'ar-ai-workboard',
    category: 'F&A & Collections',
    pillarTag: 'Enterprise Ops · Collections & AR',
    title: 'Accelerating Collections to $475M With an AI Workboard',
    subtitle: 'AR stand-up in two months, followed by an AI workboard ranking who to call and why.',
    headlineMetric: '$475M+ collected · 22%+ DSO drop',
    scope: '35+ multilingual agents (EN/DE) · Transcript audit, ML cash forecast, DataChat',
    challenges: [
      'Required a two-month receivables stand-up rather than a multi-quarter rebuild',
      'Disputes and broken promises sat in disconnected reports',
      'Root causes of non-payment lived inside transcripts, invisible to next-day queues',
    ],
    approaches: [
      'Two-month AR stand-up with automated dispute and promise-to-pay dashboards',
      'Diagnostic AI scanning call transcripts for payment intent and objections',
      'Prescriptive ML workboard and conversational DataChat embedded in daily huddles',
    ],
    metrics: [
      { value: '$475M+', label: 'Total Collected' },
      { value: '22%+', label: 'DSO Reduction' },
      { value: '95%+', label: 'CEI (Within 4 mo)' },
      { value: '2 mo', label: 'Ramp to Live' },
    ],
  },
  {
    id: 'legal-ops',
    category: 'Legal Ops',
    pillarTag: 'Enterprise Ops · Legal',
    title: 'Clause-Level Risk Scoring With Human Approval Retained',
    subtitle: 'Legal and procurement agreement processing with automated parsing and HITL sign-off.',
    headlineMetric: '12–15% efficiency gain',
    scope: 'Legal & procurement agreements · Multi-label clause classification · HITL loop',
    challenges: [
      'Verbose agreements created slow, error-prone manual reviews',
      'Clause-level risk was discovered late in review instead of at intake',
      'No consistent scoring standard or feedback loop across reviewers',
    ],
    approaches: [
      'Custom LLMs trained on the legal corpus for category and risk classification',
      'Automated intake parsing that flags high-risk clauses immediately',
      'Reviewer–approver HITL workflow where corrections retrain subsequent runs',
    ],
    metrics: [
      { value: '12–15%', label: 'Efficiency Gain' },
      { value: 'Parse → Flag', label: 'Automated Intake' },
      { value: 'HITL', label: 'Sign-Off Retained' },
      { value: 'Closed Loop', label: 'Continuous Learning' },
    ],
  },
  {
    id: 'lead-gen',
    category: 'Lead Gen',
    pillarTag: 'Enterprise Ops · Lead Gen',
    title: 'Lead Conversion Improved From 11% to 42%',
    subtitle: 'U.S. education technology provider — contact and demand development that validates, enriches, and routes pipeline.',
    headlineMetric: '11% → 42% conversion',
    scope: '1,000+ accounts · 23 FTEs (US, Canada & EMEA) · 8-business-day validation cadence',
    challenges: [
      'Raw inquiries failed to become qualified leads without validation or ownership',
      'Sales inherited noisy, incomplete CRM records',
      'Follow-up cadence depended on individual habit instead of structure',
    ],
    approaches: [
      'Email-first contact validation executed across an 8-business-day cadence',
      'CRM enrichment with product, course, semester, seats, and decision type',
      'Structured routing to named sales reps with monthly peak-season KPI governance',
    ],
    metrics: [
      { value: '11% → 42%', label: 'Conversion (2021–25)' },
      { value: '7,000+', label: 'Monthly Volume' },
      { value: '78K+', label: 'Qualified Leads' },
      { value: '23 FTEs', label: 'Global Coverage' },
    ],
  },
];

export const WHY_CARDS = [
  {
    title: 'Two pillars, one layer',
    detail: 'Customer Experience stack and Enterprise Operations functions (F&A, HR, Tech Ops, Legal, Lead Gen) unified on one governed model.',
  },
  {
    title: 'Reimagine, then operate',
    detail: 'End-to-end process redesign delivered via dedicated pods, managed services, or outcome-based models until value sticks.',
  },
  {
    title: 'Efficiency, accuracy, productivity — then insight',
    detail: 'Measurable outcomes matched to your operating model, plus decision intelligence brought back from operated volume.',
  },
  {
    title: 'On your stack, governed',
    detail: 'Dedicated control plane, policy enforced prior to every model call, and human approval retained on high-risk actions.',
  },
];
