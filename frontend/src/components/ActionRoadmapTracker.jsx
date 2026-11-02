import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Clock,
  Printer,
  RotateCcw,
  Plus,
  Save,
  Check,
  ChevronDown,
  ChevronUp,
  Tag,
  Sparkles,
} from 'lucide-react';
import { updateActionStatus, addCustomAction } from '../api';

export default function ActionRoadmapTracker({
  roadmap,
  orgProfile,
  onRoadmapUpdate,
  onReset,
}) {
  const [updatingActionId, setUpdatingActionId] = useState(null);
  const [expandedActionId, setExpandedActionId] = useState(null);
  const [notesState, setNotesState] = useState({});
  const [saveIndicator, setSaveIndicator] = useState('All changes saved');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newActionTitle, setNewActionTitle] = useState('');
  const [newActionRationale, setNewActionRationale] = useState('');
  const [newActionEffort, setNewActionEffort] = useState('Low (1-3 days)');
  const [isAddingAction, setIsAddingAction] = useState(false);

  const actions = roadmap?.actions || [];
  const progressPercentage = roadmap?.progressPercentage || 0;
  const completedCount = actions.filter((a) => a.status === 'Completed').length;
  const inProgressCount = actions.filter((a) => a.status === 'In Progress').length;

  const handleStatusChange = async (action, newStatus) => {
    if (action.status === newStatus) return;

    setUpdatingActionId(action.actionId);
    setSaveIndicator('Saving changes...');

    try {
      const updatedNotes = notesState[action.actionId] ?? action.notes;
      const res = await updateActionStatus(roadmap._id, action.actionId, newStatus, updatedNotes);

      if (res.success && res.data) {
        onRoadmapUpdate(res.data);
        setSaveIndicator('Saved');

        if (newStatus === 'Completed') {
          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 },
            });
          } catch (e) {
            // ignore
          }
        }
      }
    } catch (err) {
      console.error('Failed to update action status:', err);
      setSaveIndicator('Failed to save');
    } finally {
      setUpdatingActionId(null);
      setTimeout(() => setSaveIndicator('All changes saved'), 3000);
    }
  };

  const handleSaveNotes = async (action) => {
    const noteText = notesState[action.actionId];
    if (noteText === undefined) return;

    setUpdatingActionId(action.actionId);
    setSaveIndicator('Saving notes...');

    try {
      const res = await updateActionStatus(roadmap._id, action.actionId, action.status, noteText);
      if (res.success && res.data) {
        onRoadmapUpdate(res.data);
        setSaveIndicator('Notes saved');
      }
    } catch (err) {
      console.error('Failed to save notes:', err);
      setSaveIndicator('Error saving');
    } finally {
      setUpdatingActionId(null);
      setTimeout(() => setSaveIndicator('All changes saved'), 3000);
    }
  };

  const handleCreateCustomAction = async (e) => {
    e.preventDefault();
    if (!newActionTitle.trim() || !newActionRationale.trim()) return;

    setIsAddingAction(true);
    try {
      const res = await addCustomAction(roadmap._id, {
        title: newActionTitle.trim(),
        rationale: newActionRationale.trim(),
        effort: newActionEffort,
        impact: 'High Impact',
        priority: 'Medium (Priority 3)',
        concreteSteps: ['Initial team discussion', 'Field pilot with 2 animators', 'Full operational rollout'],
        recommendedFreeTools: ['Custom Field Tools'],
      });

      if (res.success && res.data) {
        onRoadmapUpdate(res.data);
        setNewActionTitle('');
        setNewActionRationale('');
        setShowAddModal(false);
        setSaveIndicator('Custom milestone added');
      }
    } catch (err) {
      console.error('Failed to add custom action:', err);
    } finally {
      setIsAddingAction(false);
      setTimeout(() => setSaveIndicator('All changes saved'), 3000);
    }
  };

  const getEffortBadge = (effort) => {
    if (effort.includes('Low')) return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    if (effort.includes('Medium')) return 'bg-amber-50 text-amber-800 border-amber-200';
    return 'bg-purple-50 text-purple-800 border-purple-200';
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6 print:py-0 print:space-y-4">
      {/* Header & Progress Metrics */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              Step 3 of 3: Execution Tracker
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Digital Transformation Action Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Prioritized practical steps tailored for {orgProfile?.name || 'Grassroots NGO'}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold print:hidden transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Export</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs print:hidden transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Milestone</span>
            </button>
          </div>
        </div>

        {/* Progress Tracker Bar */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Roadmap Execution Progress
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-slate-900 font-mono">
                  {progressPercentage}%
                </span>
                <span className="text-xs text-slate-600 font-medium">
                  ({completedCount} completed, {inProgressCount} in progress of {actions.length} total)
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-600" />
              <span>{saveIndicator}</span>
            </div>
          </div>

          <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Prioritized Action Items */}
      <div className="space-y-4">
        {actions.map((act, index) => {
          const isExpanded = expandedActionId === act.actionId;
          const isUpdating = updatingActionId === act.actionId;
          const isCompleted = act.status === 'Completed';
          const isInProgress = act.status === 'In Progress';

          return (
            <div
              key={act.actionId}
              className={`bg-white rounded-2xl border transition-all ${
                isCompleted
                  ? 'border-slate-200 bg-slate-50/40 opacity-90'
                  : isInProgress
                  ? 'border-teal-300 ring-1 ring-teal-200/50 shadow-xs'
                  : 'border-slate-200/90 shadow-2xs hover:border-slate-300'
              } p-6 space-y-4`}
            >
              {/* Card Header & Status Selector */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200/60">
                      Milestone #{index + 1}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                      {act.priority}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${getEffortBadge(
                        act.effort
                      )}`}
                    >
                      Effort: {act.effort}
                    </span>
                  </div>

                  <h3
                    className={`text-base font-bold ${
                      isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'
                    }`}
                  >
                    {act.title}
                  </h3>
                </div>

                {/* Status Segmented Control (Linear style) */}
                <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl shrink-0 self-start lg:self-center border border-slate-200">
                  {[
                    { label: 'Not Started', value: 'Not Started' },
                    { label: 'In Progress', value: 'In Progress' },
                    { label: 'Completed', value: 'Completed' },
                  ].map((st) => {
                    const isCurrent = act.status === st.value;
                    let activeStyle = 'bg-white text-slate-900 shadow-2xs font-bold';
                    if (isCurrent && st.value === 'Completed') {
                      activeStyle = 'bg-teal-600 text-white shadow-xs font-bold';
                    } else if (isCurrent && st.value === 'In Progress') {
                      activeStyle = 'bg-slate-900 text-white shadow-xs font-bold';
                    }

                    return (
                      <button
                        key={st.value}
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleStatusChange(act, st.value)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isCurrent
                            ? activeStyle
                            : 'text-slate-600 hover:text-slate-900'
                        } ${isUpdating ? 'opacity-50 cursor-wait' : ''}`}
                      >
                        {st.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Rationale & Checklist */}
              <div className="space-y-3 bg-slate-50/70 rounded-xl p-4 border border-slate-200/60">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Grassroots Operational Rationale:
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    {act.rationale}
                  </p>
                </div>

                {/* Concrete Action Checklist */}
                {act.concreteSteps && act.concreteSteps.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Execution Steps:
                    </span>
                    <ul className="space-y-1.5">
                      {act.concreteSteps.map((step, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Free Tools Recommendations */}
                {act.recommendedFreeTools && act.recommendedFreeTools.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/60">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      100% Free Programs:
                    </span>
                    {act.recommendedFreeTools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Internal Staff Notes Expander */}
              <div className="pt-0.5">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedActionId(isExpanded ? null : act.actionId)
                  }
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <span>{isExpanded ? 'Hide Staff Implementation Notes' : 'Add / View Staff Notes'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {isExpanded && (
                  <div className="mt-3 space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <label className="block text-xs font-bold text-slate-700">
                      Internal Field Notes & Delegation
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Assigned to Ramesh; Google for Nonprofits token verification submitted."
                      value={notesState[act.actionId] ?? act.notes ?? ''}
                      onChange={(e) =>
                        setNotesState({
                          ...notesState,
                          [act.actionId]: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-white"
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleSaveNotes(act)}
                        disabled={isUpdating}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors"
                      >
                        <Save className="w-3 h-3" />
                        <span>Save Note</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Action Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">
                Add Custom Priority Milestone
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCustomAction} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Milestone Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Conduct WhatsApp document scanning workshop for 6 animators"
                  value={newActionTitle}
                  onChange={(e) => setNewActionTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Operational Rationale <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Why is this critical for your team right now?"
                  value={newActionRationale}
                  onChange={(e) => setNewActionRationale(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Estimated Effort</label>
                <select
                  value={newActionEffort}
                  onChange={(e) => setNewActionEffort(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                >
                  <option value="Low (1-3 days)">Low (1-3 days)</option>
                  <option value="Medium (1-2 weeks)">Medium (1-2 weeks)</option>
                  <option value="High (1 month+)">High (1 month+)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAddingAction}
                  className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs"
                >
                  {isAddingAction ? 'Saving...' : 'Add Milestone'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h4 className="text-xs font-bold text-slate-900">
            Transformation in Progress
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Export this action roadmap to review during weekly field coordinator syncs.
          </p>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>New Assessment</span>
        </button>
      </div>
    </div>
  );
}
