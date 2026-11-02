const mongoose = require('mongoose');

const AssessmentAnswerSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  domain: {
    type: String,
    enum: ['dataStorage', 'communication', 'teamSkills', 'operations'],
    required: true,
  },
  questionText: { type: String, required: true },
  selectedOptionText: { type: String, required: true },
  scoreValue: { type: Number, required: true, min: 1, max: 4 }, // 1 = Basic, 2 = Developing, 3 = Proficient, 4 = Advanced
});

const AssessmentSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    maturityTier: {
      type: String,
      required: true,
      enum: ['Basic', 'Emerging', 'Established'],
    },
    domainScores: {
      dataStorage: {
        score: { type: Number, default: 0 },
        maxScore: { type: Number, default: 12 },
        percentage: { type: Number, default: 0 },
        level: { type: String, default: 'Basic' },
      },
      communication: {
        score: { type: Number, default: 0 },
        maxScore: { type: Number, default: 12 },
        percentage: { type: Number, default: 0 },
        level: { type: String, default: 'Basic' },
      },
      teamSkills: {
        score: { type: Number, default: 0 },
        maxScore: { type: Number, default: 12 },
        percentage: { type: Number, default: 0 },
        level: { type: String, default: 'Basic' },
      },
      operations: {
        score: { type: Number, default: 0 },
        maxScore: { type: Number, default: 12 },
        percentage: { type: Number, default: 0 },
        level: { type: String, default: 'Basic' },
      },
    },
    answers: [AssessmentAnswerSchema],
    aiSummary: {
      headline: { type: String, default: '' },
      narrative: { type: String, default: '' },
      keyStrengths: [{ type: String }],
      criticalBottlenecks: [{ type: String }],
      quickWinsTip: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Assessment', AssessmentSchema);

