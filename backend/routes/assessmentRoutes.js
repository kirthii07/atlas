const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Assessment = require('../models/Assessment');
const Organization = require('../models/Organization');
const Roadmap = require('../models/Roadmap');
const {
  ASSESSMENT_QUESTIONS,
  calculateAssessmentResults,
  generateRoadmapActions,
} = require('../utils/assessmentData');

const isDbConnected = () => mongoose.connection.readyState === 1;

// In-memory fallback caches
const memoryAssessments = [];
const memoryRoadmaps = [];

// @route   GET /api/assessments/questions
// @desc    Get all guided assessment questions
router.get('/questions', (req, res) => {
  return res.json({
    success: true,
    total: ASSESSMENT_QUESTIONS.length,
    domains: [
      { key: 'dataStorage', label: 'Data & Beneficiary Records' },
      { key: 'communication', label: 'Team & Stakeholder Communication' },
      { key: 'teamSkills', label: 'Team Digital Skills & Culture' },
      { key: 'operations', label: 'Operations & Donor Reporting' },
    ],
    data: ASSESSMENT_QUESTIONS,
  });
});

// @route   POST /api/assessments
// @desc    Submit guided assessment, compute readiness score & generate action roadmap
router.post('/', async (req, res) => {
  try {
    const { organizationId, answers } = req.body;

    if (!organizationId || !answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'organizationId and a non-empty answers array are required',
      });
    }

    let orgProfile = null;
    if (isDbConnected() && mongoose.isValidObjectId(organizationId)) {
      orgProfile = await Organization.findById(organizationId);
    }

    // Compute dynamic scores & maturity tier
    const results = calculateAssessmentResults(answers, orgProfile);

    let savedAssessment;
    let savedRoadmap;

    if (isDbConnected()) {
      // Save Assessment to MongoDB
      savedAssessment = await Assessment.create({
        organization: organizationId,
        overallScore: results.overallScore,
        maturityTier: results.maturityTier,
        domainScores: results.domainScores,
        answers: answers.map((a) => ({
          questionId: a.questionId,
          domain: a.domain,
          questionText: a.questionText || '',
          selectedOptionText: a.selectedOptionText || '',
          scoreValue: a.scoreValue || 1,
        })),
        aiSummary: results.aiSummary,
      });

      // Generate prioritized roadmap actions
      const actions = generateRoadmapActions(results.domainScores, orgProfile);

      // Check if a roadmap already exists for this org, update or create new
      savedRoadmap = await Roadmap.findOneAndUpdate(
        { organization: organizationId },
        {
          organization: organizationId,
          assessment: savedAssessment._id,
          actions: actions,
          progressPercentage: 0,
          completedActionsCount: 0,
          totalActionsCount: actions.length,
        },
        { new: true, upsert: true }
      );

      return res.status(201).json({
        success: true,
        data: {
          assessment: savedAssessment,
          roadmap: savedRoadmap,
        },
        source: 'mongodb',
      });
    } else {
      // In-memory fallback
      const assessId = 'assess_' + Date.now();
      const roadmapId = 'roadmap_' + Date.now();

      savedAssessment = {
        _id: assessId,
        organization: organizationId,
        overallScore: results.overallScore,
        maturityTier: results.maturityTier,
        domainScores: results.domainScores,
        answers,
        aiSummary: results.aiSummary,
        createdAt: new Date().toISOString(),
      };
      memoryAssessments.unshift(savedAssessment);

      const actions = generateRoadmapActions(results.domainScores, orgProfile);
      savedRoadmap = {
        _id: roadmapId,
        organization: organizationId,
        assessment: assessId,
        actions: actions,
        progressPercentage: 0,
        completedActionsCount: 0,
        totalActionsCount: actions.length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const existingRoadmapIdx = memoryRoadmaps.findIndex(
        (r) => r.organization === organizationId
      );
      if (existingRoadmapIdx >= 0) {
        memoryRoadmaps[existingRoadmapIdx] = savedRoadmap;
      } else {
        memoryRoadmaps.unshift(savedRoadmap);
      }

      return res.status(201).json({
        success: true,
        data: {
          assessment: savedAssessment,
          roadmap: savedRoadmap,
        },
        source: 'memory_fallback',
      });
    }
  } catch (error) {
    console.error('Error submitting assessment:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process assessment',
      error: error.message,
    });
  }
});

// @route   GET /api/assessments/:id
// @desc    Get assessment by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected() && mongoose.isValidObjectId(id)) {
      const assessment = await Assessment.findById(id).populate('organization');
      if (!assessment) {
        return res.status(404).json({ success: false, message: 'Assessment not found' });
      }
      return res.json({ success: true, data: assessment, source: 'mongodb' });
    } else {
      const assessment = memoryAssessments.find((a) => a._id === id);
      if (!assessment) {
        return res.status(404).json({ success: false, message: 'Assessment not found' });
      }
      return res.json({ success: true, data: assessment, source: 'memory_fallback' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/assessments/organization/:orgId
// @desc    Get latest assessment for organization
router.get('/organization/:orgId', async (req, res) => {
  try {
    const { orgId } = req.params;

    if (isDbConnected() && mongoose.isValidObjectId(orgId)) {
      const assessment = await Assessment.findOne({ organization: orgId })
        .sort({ createdAt: -1 })
        .populate('organization');
      if (!assessment) {
        return res.status(404).json({ success: false, message: 'No assessment found for this organization' });
      }
      return res.json({ success: true, data: assessment, source: 'mongodb' });
    } else {
      const assessment = memoryAssessments.find((a) => a.organization === orgId);
      if (!assessment) {
        return res.status(404).json({ success: false, message: 'No assessment found for this organization' });
      }
      return res.json({ success: true, data: assessment, source: 'memory_fallback' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = { router, memoryRoadmaps };

