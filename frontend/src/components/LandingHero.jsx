import React from 'react';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle,
  FileSpreadsheet,
  Users2,
  Lock,
  Sparkles,
  HeartHandshake,
  Check,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export default function LandingHero({ onStart, onLoadDemo }) {
  const pillars = [
    {
      icon: <FileSpreadsheet className="w-5 h-5 text-teal-600" />,
      title: 'Field Records & Beneficiaries',
      desc: 'Eliminate lost paper registers. Switch to mobile-first offline survey tools tailored for frontline volunteers.',
      tag: 'Data Reliability',
    },
    {
      icon: <Users2 className="w-5 h-5 text-teal-600" />,
      title: 'Safe Team Coordination',
      desc: 'Centralize communications without exposing sensitive beneficiary data or children\'s photos in personal messaging apps.',
      tag: 'Data Governance',
    },
    {
      icon: <Clock className="w-5 h-5 text-teal-600" />,
      title: 'Donor & Grant Reporting',
      desc: 'Shorten quarterly reporting cycles from 5 days to 2 hours using standardized digital indicator templates.',
      tag: 'Time-to-Impact',
    },
    {
      icon: <Lock className="w-5 h-5 text-teal-600" />,
      title: 'Non-Profit Software Grants',
      desc: 'Unlock over $10,000/year in 100% free software programs via Google for Nonprofits, TechSoup, and Canva Pro.',
      tag: 'Zero Software Cost',
    },
  ];

  const maturityMatrix = [
    {
      tier: 'Tier 1: Basic',
      score: '0 – 40',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      dotColor: 'bg-amber-500',
      dayToDay: 'Physical paper registers, individual offline Excel sheets, ad-hoc phone calls',
      dataPrivacy: 'Informal passwords, sensitive beneficiary photos shared in open group chats',
      reportingSpeed: '5 to 7 days of stressful manual paper consolidation before donor deadlines',
      nextMilestone: 'Deploy free Google Workspace for Nonprofits & centralize files in shared cloud drive',
    },
    {
      tier: 'Tier 2: Emerging',
      score: '41 – 75',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
      dotColor: 'bg-teal-600',
      dayToDay: 'Shared Google Sheets, project WhatsApp groups, occasional digital forms',
      dataPrivacy: 'Basic folder permissions, staff aware of verbal guidelines, device screen locks',
      reportingSpeed: '1 to 2 days using pre-built cloud calculation templates',
      nextMilestone: 'Adopt KoboToolbox mobile offline surveys & establish standardized privacy SOPs',
    },
    {
      tier: 'Tier 3: Established',
      score: '76 – 100',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      dotColor: 'bg-emerald-600',
      dayToDay: 'Offline mobile syncing, dedicated beneficiary database, cross-trained staff',
      dataPrivacy: 'Two-factor authentication, explicit photo consent logs, role-based access',
      reportingSpeed: 'Real-time or within 3 hours using automated live donor dashboards',
      nextMilestone: 'Pilot donor automation workflows & mentor neighboring grassroots organizations',
    },
  ];

  return (
    <div className="space-y-20 py-8">
      {/* SaaS Hero Section */}
      <section className="relative rounded-3xl bg-white border border-slate-200/90 shadow-xs p-8 sm:p-14 overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
            <span>Digital Transformation Framework for Grassroots Non-Profits</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Clear, actionable technology guidance for{' '}
            <span className="text-teal-600">grassroots changemakers</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            ATLAS provides community non-profits with a practical 5-minute digital maturity diagnostic and an interactive, free-tool roadmap tailored to frontline realities.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onStart}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-xs hover:shadow-sm transition-all"
            >
              <span>Start Free Self-Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onLoadDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-sm border border-slate-200/80 transition-colors"
            >
              <HeartHandshake className="w-4 h-4 text-teal-600" />
              <span>Load Sample NGO Case Study</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              100% Free & Confidential
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-600" />
              Takes 5 Minutes
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-teal-600" />
              Zero Technical Jargon
            </span>
          </div>
        </div>
      </section>

      {/* 4 Feature Pillars */}
      <section className="space-y-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Core Transformation Pillars
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Engineered for resource-constrained community teams
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Most technology frameworks assume large enterprise IT budgets. ATLAS focuses strictly on zero-cost, high-leverage digital interventions for frontline teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                  {p.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md">
                  {p.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clean Maturity Framework Table (Enterprise SaaS Table View) */}
      <section className="space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Operational Benchmarking
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Grassroots Digital Maturity Framework
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Every non-profit operates on a continuous maturity spectrum. ATLAS evaluates your operational posture across three calibrated tiers:
          </p>
        </div>

        {/* Professional SaaS Matrix Table */}
        <div className="overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-700 uppercase tracking-wider text-[11px] font-bold">
                  <th className="py-3.5 px-5">Maturity Tier</th>
                  <th className="py-3.5 px-4 font-mono">Score Band</th>
                  <th className="py-3.5 px-5">Operational Reality</th>
                  <th className="py-3.5 px-5">Data & Privacy Posture</th>
                  <th className="py-3.5 px-5">Reporting Speed</th>
                  <th className="py-3.5 px-5">Immediate Strategic Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {maturityMatrix.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 px-5 align-top">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-bold text-xs whitespace-nowrap shadow-2xs"
                        style={{}}
                      >
                        <span className={`w-2 h-2 rounded-full ${row.dotColor}`} />
                        <span className={row.badgeColor.split(' ')[1]}>{row.tier}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top font-mono font-bold text-slate-800 text-xs whitespace-nowrap">
                      {row.score} pts
                    </td>
                    <td className="py-4 px-5 align-top text-slate-700 max-w-xs leading-relaxed">
                      {row.dayToDay}
                    </td>
                    <td className="py-4 px-5 align-top text-slate-700 max-w-xs leading-relaxed">
                      {row.dataPrivacy}
                    </td>
                    <td className="py-4 px-5 align-top text-slate-700 whitespace-nowrap font-medium">
                      {row.reportingSpeed}
                    </td>
                    <td className="py-4 px-5 align-top text-teal-900 font-medium max-w-xs leading-relaxed">
                      {row.nextMilestone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50/80 px-6 py-3.5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-3">
            <span>
              Dynamic score calculation adapts automatically to your organization's focus area and frontline capacity.
            </span>
            <button
              onClick={onStart}
              className="inline-flex items-center gap-1.5 text-teal-700 hover:text-teal-800 font-bold hover:underline"
            >
              <span>Assess Your NGO Now</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
