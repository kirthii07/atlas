import React, { useState } from 'react';
import {
  FileSpreadsheet,
  MessageSquare,
  GraduationCap,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info,
  Check,
} from 'lucide-react';

export default function GuidedAssessment({
  questions,
  orgProfile,
  onSubmit,
  isSubmitting,
  onBack,
}) {
  const [answers, setAnswers] = useState({});
  const [activeDomainIdx, setActiveDomainIdx] = useState(0);

  const domainTabs = [
    { key: 'dataStorage', label: 'Beneficiary Data', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { key: 'communication', label: 'Team Communication', icon: <MessageSquare className="w-4 h-4" /> },
    { key: 'teamSkills', label: 'Staff Skills & Safety', icon: <GraduationCap className="w-4 h-4" /> },
    { key: 'operations', label: 'Donor Reporting', icon: <Clock className="w-4 h-4" /> },
  ];

  const currentDomain = domainTabs[activeDomainIdx].key;
  const currentQuestions = questions.filter((q) => q.domain === currentDomain);

  const totalAnswered = Object.keys(answers).length;
  const totalQuestions = questions.length;
  const progressPercent = totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0;

  const handleSelectOption = (q, opt) => {
    setAnswers((prev) => ({
      ...prev,
      [q.id]: {
        questionId: q.id,
        domain: q.domain,
        questionText: q.title,
        selectedOptionText: opt.text,
        scoreValue: opt.score,
      },
    }));
  };

  const handlePreloadGrassrootsAnswers = () => {
    const baselineAnswers = {};
    questions.forEach((q, idx) => {
      const chosenOpt = q.options[idx % 2 === 0 ? 0 : 1] || q.options[0];
      baselineAnswers[q.id] = {
        questionId: q.id,
        domain: q.domain,
        questionText: q.title,
        selectedOptionText: chosenOpt.text,
        scoreValue: chosenOpt.score,
      };
    });
    setAnswers(baselineAnswers);
  };

  const handleComplete = () => {
    if (totalAnswered < totalQuestions) {
      const confirmIncomplete = window.confirm(
        `You have completed ${totalAnswered} of ${totalQuestions} questions. Unanswered questions will be scored as foundational tier. Proceed with calculation?`
      );
      if (!confirmIncomplete) return;
    }

    const completeArray = questions.map((q) => {
      return (
        answers[q.id] || {
          questionId: q.id,
          domain: q.domain,
          questionText: q.title,
          selectedOptionText: q.options[0].text,
          scoreValue: 1,
        }
      );
    });

    onSubmit(completeArray);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      {/* Header & Clean Progress Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              Step 2 of 3: Operational Assessment
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              {orgProfile?.name || 'Grassroots NGO'} Diagnostic
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Select the option that most accurately describes your current operations.
            </p>
          </div>

          <button
            type="button"
            onClick={handlePreloadGrassrootsAnswers}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Fill Standard Grassroots Baseline</span>
          </button>
        </div>

        {/* Linear Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>Overall Progress</span>
            <span className="font-mono text-teal-700">
              {totalAnswered} of {totalQuestions} answered ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Domain Stepper Filter Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {domainTabs.map((tab, idx) => {
          const isActive = idx === activeDomainIdx;
          const questionsInDomain = questions.filter((q) => q.domain === tab.key);
          const answeredInDomain = questionsInDomain.filter((q) => answers[q.id]).length;
          const isComplete = questionsInDomain.length > 0 && answeredInDomain === questionsInDomain.length;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveDomainIdx(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isActive
                  ? 'border-teal-600 bg-white shadow-xs ring-1 ring-teal-600'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`p-1.5 rounded-lg ${
                    isActive ? 'bg-teal-50 text-teal-700' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {tab.icon}
                </span>
                {isComplete ? (
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                ) : (
                  <span className="text-[11px] font-mono text-slate-400">
                    {answeredInDomain}/{questionsInDomain.length}
                  </span>
                )}
              </div>
              <div className="mt-2 text-xs font-bold text-slate-900">
                {tab.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Questions List */}
      <div className="space-y-5">
        {currentQuestions.map((q, qIndex) => {
          const selectedAnswer = answers[q.id];

          return (
            <div
              key={q.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4"
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold flex items-center justify-center shrink-0">
                  {qIndex + 1}
                </span>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {q.title}
                </h3>
              </div>

              {/* Radio Card Options */}
              <div className="space-y-2.5 pt-1">
                {q.options.map((opt, optIndex) => {
                  const isSelected = selectedAnswer?.scoreValue === opt.score;

                  return (
                    <div
                      key={optIndex}
                      onClick={() => handleSelectOption(q, opt)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/40 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'border-teal-600 bg-teal-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>

                        <div className="space-y-1 text-sm flex-1">
                          <p
                            className={`leading-relaxed text-xs sm:text-sm ${
                              isSelected ? 'font-bold text-slate-900' : 'text-slate-700'
                            }`}
                          >
                            {opt.text}
                          </p>

                          {opt.insight && (
                            <p className="text-[11px] text-slate-500 font-medium italic pt-0.5">
                              Operational Context: {opt.insight}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => {
            if (activeDomainIdx > 0) {
              setActiveDomainIdx(activeDomainIdx - 1);
              window.scrollTo({ top: 100, behavior: 'smooth' });
            } else {
              onBack();
            }
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{activeDomainIdx > 0 ? 'Previous Section' : 'Back to Profile'}</span>
        </button>

        {activeDomainIdx < domainTabs.length - 1 ? (
          <button
            type="button"
            onClick={() => {
              setActiveDomainIdx(activeDomainIdx + 1);
              window.scrollTo({ top: 100, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-all"
          >
            <span>Next Section</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleComplete}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-all disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Computing Score...' : 'Calculate Maturity & Roadmap'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
