const mongoose = require('mongoose');

const ActionItemSchema = new mongoose.Schema({
  actionId: { type: String, required: true },
  title: { type: String, required: true },
  domain: {
    type: String,
    enum: ['dataStorage', 'communication', 'teamSkills', 'operations'],
    default: 'dataStorage',
  },
  priority: {
    type: String,
    enum: ['Immediate (Priority 1)', 'High (Priority 2)', 'Medium (Priority 3)', 'Strategic (Priority 4)'],
    default: 'High (Priority 2)',
  },
  effort: {
    type: String,
    enum: ['Low (1-3 days)', 'Medium (1-2 weeks)', 'High (1 month+)'],
    default: 'Low (1-3 days)',
  },
  impact: {
    type: String,
    enum: ['Quick Win', 'High Impact', 'Foundational Transform'],
    default: 'Quick Win',
  },
  rationale: { type: String, required: true },
  concreteSteps: [{ type: String }],
  recommendedFreeTools: [{ type: String }], // e.g., 'Google Workspace for Nonprofits', 'KoboToolbox', 'Slack Free'
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started',
  },
  notes: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now },
});

const RoadmapSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    assessment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assessment',
      required: true,
    },
    actions: [ActionItemSchema],
    progressPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completedActionsCount: {
      type: Number,
      default: 0,
    },
    totalActionsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Method to calculate progress
RoadmapSchema.methods.calculateProgress = function () {
  if (!this.actions || this.actions.length === 0) {
    this.progressPercentage = 0;
    this.completedActionsCount = 0;
    this.totalActionsCount = 0;
    return;
  }
  this.totalActionsCount = this.actions.length;
  this.completedActionsCount = this.actions.filter(
    (a) => a.status === 'Completed'
  ).length;
  const inProgressCount = this.actions.filter(
    (a) => a.status === 'In Progress'
  ).length;

  // Completed counts for 100%, In Progress counts for 50%
  const weighted = (this.completedActionsCount * 1.0 + inProgressCount * 0.5) / this.totalActionsCount;
  this.progressPercentage = Math.round(weighted * 100);
};

module.exports = mongoose.model('Roadmap', RoadmapSchema);

