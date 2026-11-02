const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Roadmap = require('../models/Roadmap');
const { memoryRoadmaps } = require('./assessmentRoutes');

const isDbConnected = () => mongoose.connection.readyState === 1;

// Helper to compute progress for in-memory roadmaps
function computeMemoryProgress(roadmap) {
  if (!roadmap.actions || roadmap.actions.length === 0) {
    roadmap.progressPercentage = 0;
    roadmap.completedActionsCount = 0;
    roadmap.totalActionsCount = 0;
    return;
  }
  roadmap.totalActionsCount = roadmap.actions.length;
  roadmap.completedActionsCount = roadmap.actions.filter((a) => a.status === 'Completed').length;
  const inProgressCount = roadmap.actions.filter((a) => a.status === 'In Progress').length;
  const weighted = (roadmap.completedActionsCount * 1.0 + inProgressCount * 0.5) / roadmap.totalActionsCount;
  roadmap.progressPercentage = Math.round(weighted * 100);
  roadmap.updatedAt = new Date().toISOString();
}

// @route   GET /api/roadmaps/:id
// @desc    Get roadmap by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected() && mongoose.isValidObjectId(id)) {
      const roadmap = await Roadmap.findById(id)
        .populate('organization')
        .populate('assessment');
      if (!roadmap) {
        return res.status(404).json({ success: false, message: 'Roadmap not found' });
      }
      return res.json({ success: true, data: roadmap, source: 'mongodb' });
    } else {
      const roadmap = memoryRoadmaps.find((r) => r._id === id);
      if (!roadmap) {
        return res.status(404).json({ success: false, message: 'Roadmap not found' });
      }
      return res.json({ success: true, data: roadmap, source: 'memory_fallback' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/roadmaps/organization/:orgId
// @desc    Get roadmap for an organization
router.get('/organization/:orgId', async (req, res) => {
  try {
    const { orgId } = req.params;

    if (isDbConnected() && mongoose.isValidObjectId(orgId)) {
      const roadmap = await Roadmap.findOne({ organization: orgId })
        .populate('organization')
        .populate('assessment');
      if (!roadmap) {
        return res.status(404).json({ success: false, message: 'No roadmap found for this organization' });
      }
      return res.json({ success: true, data: roadmap, source: 'mongodb' });
    } else {
      const roadmap = memoryRoadmaps.find((r) => r.organization === orgId);
      if (!roadmap) {
        return res.status(404).json({ success: false, message: 'No roadmap found for this organization' });
      }
      return res.json({ success: true, data: roadmap, source: 'memory_fallback' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PATCH /api/roadmaps/:id/actions/:actionId
// @desc    Toggle action status ('Not Started', 'In Progress', 'Completed') and sync with MongoDB
router.patch('/:id/actions/:actionId', async (req, res) => {
  try {
    const { id, actionId } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ['Not Started', 'In Progress', 'Completed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    if (isDbConnected() && mongoose.isValidObjectId(id)) {
      const roadmap = await Roadmap.findById(id);
      if (!roadmap) {
        return res.status(404).json({ success: false, message: 'Roadmap not found' });
      }

      const action = roadmap.actions.find(
        (a) => a.actionId === actionId || a._id.toString() === actionId
      );
      if (!action) {
        return res.status(404).json({ success: false, message: 'Action not found in roadmap' });
      }

      if (status) action.status = status;
      if (notes !== undefined) action.notes = notes;
      action.updatedAt = new Date();

      roadmap.calculateProgress();
      await roadmap.save();

      return res.json({
        success: true,
        message: `Action updated to "${action.status}"`,
        data: roadmap,
        source: 'mongodb',
      });
    } else {
      // Memory fallback
      const roadmap = memoryRoadmaps.find((r) => r._id === id);
      if (!roadmap) {
        return res.status(404).json({ success: false, message: 'Roadmap not found' });
      }

      const action = roadmap.actions.find(
        (a) => a.actionId === actionId || a._id === actionId
      );
      if (!action) {
        return res.status(404).json({ success: false, message: 'Action not found in roadmap' });
      }

      if (status) action.status = status;
      if (notes !== undefined) action.notes = notes;
      action.updatedAt = new Date().toISOString();

      computeMemoryProgress(roadmap);

      return res.json({
        success: true,
        message: `Action updated to "${action.status}"`,
        data: roadmap,
        source: 'memory_fallback',
      });
    }
  } catch (error) {
    console.error('Error updating roadmap action:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update roadmap action',
      error: error.message,
    });
  }
});

// @route   POST /api/roadmaps/:id/actions
// @desc    Add a custom action item to roadmap
router.post('/:id/actions', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, domain, priority, effort, impact, rationale, concreteSteps, recommendedFreeTools } = req.body;

    if (!title || !rationale) {
      return res.status(400).json({ success: false, message: 'Title and rationale are required' });
    }

    const newAction = {
      actionId: 'custom_' + Date.now(),
      title,
      domain: domain || 'dataStorage',
      priority: priority || 'High (Priority 2)',
      effort: effort || 'Low (1-3 days)',
      impact: impact || 'Quick Win',
      rationale,
      concreteSteps: concreteSteps || [],
      recommendedFreeTools: recommendedFreeTools || [],
      status: 'Not Started',
      notes: '',
      updatedAt: new Date(),
    };

    if (isDbConnected() && mongoose.isValidObjectId(id)) {
      const roadmap = await Roadmap.findById(id);
      if (!roadmap) return res.status(404).json({ success: false, message: 'Roadmap not found' });

      roadmap.actions.push(newAction);
      roadmap.calculateProgress();
      await roadmap.save();

      return res.status(201).json({ success: true, data: roadmap, source: 'mongodb' });
    } else {
      const roadmap = memoryRoadmaps.find((r) => r._id === id);
      if (!roadmap) return res.status(404).json({ success: false, message: 'Roadmap not found' });

      roadmap.actions.push(newAction);
      computeMemoryProgress(roadmap);
      return res.status(201).json({ success: true, data: roadmap, source: 'memory_fallback' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

