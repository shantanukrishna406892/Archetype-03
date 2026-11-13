import React, { useEffect, useRef, useState } from 'react';
import { PLATFORM_PILLARS } from '../data/presentationData';

const FLOW_LANES = [
  {
    id: 'cx',
    color: '#F2551B',
    source: 'Web Chat · Email · Voice',
    target: 'Salesforce · Five9 · SIS',
  },
  {
    id: 'fa',
    color: '#3D7FE6',
    source: 'Billing · AR · Refunds',
    target: 'SAP S/4HANA · ERP Ledger',
  },
  {
    id: 'tech',
    color: '#1F9E6A',
    source: 'Roster · Access · Helpdesk',
    target: 'SIS · Canvas / LMS · IAM',
  },
  {
    id: 'legal',
    color: '#9A8546',
    source: 'Contracts · MQLs',
    target: 'CLM · CRM Pipeline',
  },
];

export const GovernedPlatformSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedPillarIdx, setSelectedPillarIdx] = useState<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let rafId = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const particles = FLOW_LANES.flatMap((lane, laneIdx) =>
      [0, 0.34, 0.68].map((offset, pIdx) => ({
        laneIdx,
        color: lane.color,
        offset,
        speed: 0.00017 + pIdx * 0.00003,
      }))
    );

    const drawBezierPoint = (
      x0: number,
      y0: number,
      cx1: number,
      cy1: number,
      cx2: number,
      cy2: number,
      x1: number,
      y1: number,
      t: number
    ) => {
      const u = 1 - t;
      return {
        x:
          u * u * u * x0 +
          3 * u * u * t * cx1 +
          3 * u * t * t * cx2 +
          t * t * t * x1,
        y:
          u * u * u * y0 +
          3 * u * u * t * cy1 +
          3 * u * t * t * cy2 +
          t * t * t * y1,
      };
    };

    const render = (now: number) => {
      if (!width || !height) {
        if (!reduceMotion) rafId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Subtle architectural dot grid
      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
      for (let gx = 24; gx < width; gx += 32) {
        for (let gy = 20; gy < height - 24; gy += 32) {
          ctx.fillRect(gx, gy, 1.5, 1.5);
        }
      }

      const xLeft = width < 640 ? width * 0.12 : width * 0.18;
      const xMid = width * 0.5;
      const xRight = width < 640 ? width * 0.88 : width * 0.82;
      const topPad = 44;
      const usableH = height - 92;
      const coreCenterY = topPad + usableH * 0.5;
      const coreSpread = 16;

      // Central Governed Core Ring / Pill
      ctx.fillStyle = 'rgba(24, 36, 56, 0.92)';
      ctx.strokeStyle = 'rgba(242, 85, 27, 0.55)';
      ctx.lineWidth = 1.5;
      const hubW = width < 640 ? 132 : 176;
      const hubH = 128;
      const hubX = xMid - hubW / 2;
      const hubY = coreCenterY - hubH / 2;
      ctx.beginPath();
      ctx.roundRect(hubX, hubY, hubW, hubH, 14);
      ctx.fill();
      ctx.stroke();

      ctx.font = '600 11px "JetBrains Mono", ui-monospace, monospace';
      ctx.fillStyle = '#FF723F';
      ctx.textAlign = 'center';
      ctx.fillText('ONE GOVERNED CORE', xMid, hubY + 26);

      ctx.font = '500 11.5px "DM Sans", ui-sans-serif, system-ui, sans-serif';
      ctx.fillStyle = '#E5E9F0';
      ctx.fillText('Policy Gateway', xMid, hubY + 54);
      ctx.fillText('Smart Triage & RAG', xMid, hubY + 76);
      ctx.fillText('HITL Approval Gates', xMid, hubY + 98);

      // Converging curves into shared central core
      FLOW_LANES.forEach((lane, idx) => {
        const y = topPad + (usableH / (FLOW_LANES.length - 1)) * idx;
        const yCore = coreCenterY + (idx - 1.5) * coreSpread;
        const isActive = idx === selectedPillarIdx;

        ctx.strokeStyle = isActive
          ? 'rgba(255, 255, 255, 0.36)'
          : 'rgba(255, 255, 255, 0.13)';
        ctx.lineWidth = isActive ? 2 : 1.1;

        // Left -> Central Hub
        ctx.beginPath();
        ctx.moveTo(xLeft, y);
        ctx.bezierCurveTo(
          (xLeft + hubX) / 2,
          y,
          (xLeft + hubX) / 2,
          yCore,
          hubX,
          yCore
        );
        ctx.stroke();

        // Central Hub -> Right
        ctx.beginPath();
        ctx.moveTo(hubX + hubW, yCore);
        ctx.bezierCurveTo(
          (hubX + hubW + xRight) / 2,
          yCore,
          (hubX + hubW + xRight) / 2,
          y,
          xRight,
          y
        );
        ctx.stroke();

        // Left & Right Nodes
        [
          { x: xLeft, y, text: lane.source, align: 'left' as const },
          { x: xRight, y, text: lane.target, align: 'right' as const },
        ].forEach((node) => {
          ctx.beginPath();
          ctx.arc(node.x, node.y, isActive ? 5.5 : 4.2, 0, Math.PI * 2);
          ctx.fillStyle = isActive ? lane.color : '#E5E9F0';
          ctx.fill();

          if (width >= 600) {
            ctx.font =
              '500 11.5px "DM Sans", ui-sans-serif, system-ui, sans-serif';
            ctx.fillStyle = isActive
              ? 'rgba(255,255,255,0.96)'
              : 'rgba(198,206,219,0.78)';
            ctx.textAlign = node.align;
            const labelX =
              node.align === 'left' ? node.x + 10 : node.x - 10;
            ctx.fillText(node.text, labelX, node.y - 10);
          }
        });
      });

      // Moving particles converging through central hub
      if (!reduceMotion) {
        particles.forEach((p) => {
          const y = topPad + (usableH / (FLOW_LANES.length - 1)) * p.laneIdx;
          const yCore = coreCenterY + (p.laneIdx - 1.5) * coreSpread;
          const progress = (now * p.speed + p.offset) % 1;
          let pt;
          if (progress < 0.45) {
            const t = progress / 0.45;
            pt = drawBezierPoint(
              xLeft,
              y,
              (xLeft + hubX) / 2,
              y,
              (xLeft + hubX) / 2,
              yCore,
              hubX,
              yCore,
              t
            );
          } else if (progress < 0.55) {
            const t = (progress - 0.45) / 0.1;
            pt = { x: hubX + hubW * t, y: yCore };
          } else {
            const t = (progress - 0.55) / 0.45;
            pt = drawBezierPoint(
              hubX + hubW,
              yCore,
              (hubX + hubW + xRight) / 2,
              yCore,
              (hubX + hubW + xRight) / 2,
              y,
              xRight,
              y,
              t
            );
          }

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 3.2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        });
        rafId = requestAnimationFrame(render);
      }
    };

    if (reduceMotion) {
      render(0);
    } else {
      rafId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [selectedPillarIdx]);

  return (
    <section
      id="architecture"
      className="border-b border-[#DCD6C8] bg-[#FAF8F3] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <h2 className="font-display text-balance text-3xl font-bold tracking-tight text-[#111B2B] sm:text-4xl">
              Built on one governed layer: configured to your stack, protected at every call.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#3A4250]">
              Configuration, not rebuild: a ~60% reusable Straive foundation paired with ~40% client configuration integrates directly with Salesforce, ERP, SIS, LMS, and contact centers in 8–14 weeks.
            </p>
          </div>
          <div className="font-mono-tabular text-xs font-semibold text-[#C8400D]">
            8–14 weeks → first live process
          </div>
        </div>

        {/* Shared-Core Converging Canvas */}
        <div className="relative mt-9 overflow-hidden rounded-2xl border border-[#22314A] bg-[#111B2B] p-4 sm:p-6">
          <canvas
            ref={canvasRef}
            className="block h-[290px] w-full sm:h-[310px]"
            aria-label="Live architectural flow converging four operational lanes through one shared Privacy Policy Gateway into enterprise systems"
          />
          <div className="mt-2 grid grid-cols-3 border-t border-white/10 pt-3 text-center font-mono-tabular text-[11px] uppercase tracking-wider text-[#9BA6B8]">
            <span>Intake &amp; Functions</span>
            <span className="text-[#FF723F]">Shared Governed Layer</span>
            <span>Client Systems of Record</span>
          </div>
        </div>

        {/* 4 Architectural & Security Pillars */}
        <dl className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORM_PILLARS.map((pillar, idx) => {
            const active = idx === selectedPillarIdx;
            return (
              <button
                key={pillar.title}
                type="button"
                onClick={() => setSelectedPillarIdx(idx)}
                className={`rounded-xl border p-5 text-left transition-all cursor-pointer ${
                  active
                    ? 'border-[#111B2B] bg-[#111B2B] text-white'
                    : 'border-[#DCD6C8] bg-[#EFECE3] text-[#111B2B] hover:border-[#9A8546]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ backgroundColor: pillar.color }}
                    aria-hidden="true"
                  />
                  <span
                    className={`font-mono-tabular text-[11px] ${
                      active ? 'text-[#FF723F]' : 'text-[#5A6270]'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </div>
                <dt className="mt-3 font-display text-base font-bold">
                  {pillar.title}
                </dt>
                <dd
                  className={`mt-1.5 text-xs leading-relaxed ${
                    active ? 'text-[#C6CEDB]' : 'text-[#3A4250]'
                  }`}
                >
                  {pillar.detail}
                </dd>
              </button>
            );
          })}
        </dl>
      </div>
    </section>
  );
};
