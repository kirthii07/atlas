import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  FileSpreadsheet,
  MessageSquare,
  GraduationCap,
  Clock,
  Printer,
  Sparkles,
  Layers,
  Check,
} from 'lucide-react';

export default function ResultsScoringScreen({ assessment, orgProfile, onProceedToRoadmap }) {
  const { overallScore, maturityTier, domainScores, aiSummary } = assessment;

  useEffect(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const getTierConfig = (tier) => {
    switch (tier) {
      case 'Established':
        return {
          label: 'Tier 3: Established (Catalytic)',
          color: 'emerald',
          badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          desc: 'High operational discipline, structured beneficiary data, role-based security, and near real-time donor transparency.',
        };
      case 'Emerging':
        return {
          label: 'Tier 2: Emerging (Developing)',
          color: 'teal',
          badgeBg: 'bg-teal-50 text-teal-800 border-teal-200',
          desc: 'Active digital momentum with cloud spreadsheets and messaging groups. Ready to eliminate data silos and standardize field workflows.',
        };
      case 'Basic':
      default:
        return {
          label: 'Tier 1: Basic (Foundational)',
          color: 'amber',
          badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
          desc: 'Heavily reliant on physical registers and personal messaging; significant opportunity for low-cost, high-leverage quick wins.',
        };
    }
  };

  const tierConfig = getTierConfig(maturityTier);

  const domainList = [
    {
      key: 'dataStorage',
      label: 'Beneficiary & Program Data',
      icon: <FileSpreadsheet className="w-4 h-4 text-teal-600" />,
      data: domainScores?.dataStorage,
    },
    {
      key: 'communication',
      label: 'Team Communication & Privacy',
      icon: <MessageSquare className="w-4 h-4 text-teal-600" />,
      data: domainScores?.communication,
    },
    {
      key: 'teamSkills',
      label: 'Staff Digital Literacy & Safety',
      icon: <GraduationCap className="w-4 h-4 text-teal-600" />,
      data: domainScores?.teamSkills,
    },
    {
      key: 'operations',
      label: 'Operational Workflows & Donors',
      icon: <Clock className="w-4 h-4 text-teal-600" />,
      data: domainScores?.operations,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6 print:py-0 print:space-y-4">
      {/* SaaS Scorecard Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              Diagnostic Results
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Digital Readiness Scorecard
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Assessed for {orgProfile?.name || 'Grassroots NGO'} • {new Date().toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold print:hidden transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Report</span>
          </button>
        </div>

        {/* Score & Tier Metric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Dial / Numerical Score */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50/60 rounded-xl border border-slate-200/70 text-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-slate-200"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className={
                    overallScore >= 75
                      ? 'stroke-emerald-600'
                      : overallScore >= 45
                      ? 'stroke-teal-600'
                      : 'stroke-amber-600'
                  }
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 42}
                  strokeDashoffset={2 * Math.PI * 42 * (1 - overallScore / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                  style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-slate-900 font-mono tracking-tight">
                  {overallScore}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Out of 100
                </span>
              </div>
            </div>

            <div className="mt-3 text-center">
              <span className="text-xs font-bold text-slate-800">
                Overall Digital Maturity
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Composite readiness across 4 operational domains
              </p>
            </div>
          </div>

          {/* Tier Designation & Diagnostic Summary */}
          <div className="md:col-span-7 space-y-4">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Maturity Designation
              </span>
              <div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-extrabold border ${tierConfig.badgeBg}`}
                >
                  {tierConfig.label}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {tierConfig.desc}
              </p>
            </div>

            {/* AI Executive Summary Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Executive Diagnostic Analysis</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">
                {aiSummary?.headline}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {aiSummary?.narrative}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Domain Breakdown Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-teal-600" />
            <span>Domain Capability Breakdown</span>
          </h3>
          <span className="text-xs text-slate-500">Benchmark against grassroots peers</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {domainList.map((dom) => {
            const pct = dom.data?.percentage || 0;
            const level = dom.data?.level || 'Basic';

            return (
              <div
                key={dom.key}
                className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-teal-50 border border-teal-100">
                      {dom.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{dom.label}</h4>
                      <span className="text-[11px] text-slate-500 font-medium">
                        Level: {level}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-800">
                    {pct}%
                  </span>
                </div>

                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      pct >= 70
                        ? 'bg-emerald-600'
                        : pct >= 40
                        ? 'bg-teal-600'
                        : 'bg-amber-600'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strengths & Bottlenecks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs space-y-2.5">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>Identified Operational Strengths</span>
          </h4>
          <ul className="space-y-2">
            {aiSummary?.keyStrengths?.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <Check className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs space-y-2.5">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Critical Operational Vulnerabilities</span>
          </h4>
          <ul className="space-y-2">
            {aiSummary?.criticalBottlenecks?.map((bot, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>{bot}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Immediate Strategic Opportunity Alert */}
      {aiSummary?.quickWinsTip && (
        <div className="bg-teal-50/60 rounded-xl p-4 border border-teal-200/80 flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-teal-600 text-white shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wider">
              Immediate High-Leverage Opportunity
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {aiSummary.quickWinsTip}
            </p>
          </div>
        </div>
      )}

      {/* Clean SaaS Next Steps CTA */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs print:hidden">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold">
            Prioritized Action Roadmap Ready
          </h4>
          <p className="text-xs text-slate-400">
            We’ve calibrated 3-4 concrete, free-tool actions to elevate your score to the next tier.
          </p>
        </div>

        <button
          onClick={onProceedToRoadmap}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors"
        >
          <span>Open Interactive Action Tracker</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
