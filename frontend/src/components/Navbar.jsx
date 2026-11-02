import React from 'react';
import { Compass, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';

export default function Navbar({ currentStep, setStep, onReset, hasStarted }) {
  const navLinks = [
    { id: 1, label: 'Overview' },
    { id: 2, label: 'NGO Profile' },
    { id: 3, label: 'Assessment' },
    { id: 4, label: 'Diagnostic Results' },
    { id: 5, label: 'Action Plan' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            onClick={() => setStep(1)}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-xs group-hover:bg-teal-700 transition-colors">
              <Compass className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-slate-900">
                  ATLAS
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  by People4Good
                </span>
              </div>
              <span className="text-[11px] text-slate-500 hidden sm:block font-medium">
                Digital Transformation Platform for Grassroots NGOs
              </span>
            </div>
          </div>

          {/* Navigation Stepper / Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentStep === link.id;
              const isPast = currentStep > link.id;
              const isAccessible = link.id <= currentStep;

              return (
                <button
                  key={link.id}
                  onClick={() => {
                    if (isAccessible) setStep(link.id);
                  }}
                  disabled={!isAccessible}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : isPast
                      ? 'text-teal-700 hover:bg-teal-50/80 cursor-pointer'
                      : 'text-slate-400 cursor-not-allowed opacity-60'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      isActive
                        ? 'bg-teal-400 text-slate-950 font-bold'
                        : isPast
                        ? 'bg-teal-100 text-teal-800'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" /> : link.id}
                  </span>
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA (Clean, No Tech Badges) */}
          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button
                onClick={onReset}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                title="Restart Assessment"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset</span>
              </button>
            )}

            {currentStep === 1 ? (
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all"
              >
                <span>Start Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : currentStep < 5 ? (
              <button
                onClick={() => setStep(currentStep + 1)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
