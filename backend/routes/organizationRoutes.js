const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Organization = require('../models/Organization');

// Fallback in-memory store if DB is offline
const memoryOrgs = [];

// Helper to check DB readiness
const isDbConnected = () => mongoose.connection.readyState === 1;

// @route   POST /api/organizations
// @desc    Create or update an organization profile
router.post('/', async (req, res) => {
  try {
    const {
      name,
      size,
      focusArea,
      location,
      techSupport,
      leadContact,
      yearFounded,
      annualBudgetRange,
      notes,
      _id,
    } = req.body;

    if (!name || !size || !focusArea || !techSupport) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, size, focusArea, techSupport.',
      });
    }

    if (isDbConnected()) {
      let org;
      if (_id) {
        org = await Organization.findByIdAndUpdate(
          _id,
          {
            name,
            size,
            focusArea,
            location,
            techSupport,
            leadContact,
            yearFounded,
            annualBudgetRange,
            notes,
          },
          { new: true, runValidators: true }
        );
      } else {
        org = await Organization.create({
          name,
          size,
          focusArea,
          location,
          techSupport,
          leadContact,
          yearFounded,
          annualBudgetRange,
          notes,
        });
      }
      return res.status(201).json({
        success: true,
        data: org,
        source: 'mongodb',
      });
    } else {
      // Memory fallback
      const newOrg = {
        _id: _id || 'org_' + Date.now(),
        name,
        size,
        focusArea,
        location: location || { setting: 'Rural' },
        techSupport,
        leadContact: leadContact || {},
        yearFounded: yearFounded || 2020,
        annualBudgetRange: annualBudgetRange || 'Under $10k (Micro)',
        notes: notes || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const existingIndex = memoryOrgs.findIndex((o) => o._id === newOrg._id);
      if (existingIndex >= 0) {
        memoryOrgs[existingIndex] = { ...memoryOrgs[existingIndex], ...newOrg };
      } else {
        memoryOrgs.unshift(newOrg);
      }

      return res.status(201).json({
        success: true,
        data: newOrg,
        source: 'memory_fallback',
      });
    }
  } catch (error) {
    console.error('Error saving organization:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save organization profile',
      error: error.message,
    });
  }
});

// @route   GET /api/organizations
// @desc    Get all organizations
router.get('/', async (req, res) => {
  try {
    if (isDbConnected()) {
      const orgs = await Organization.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: orgs.length, data: orgs, source: 'mongodb' });
    } else {
      return res.json({
        success: true,
        count: memoryOrgs.length,
        data: memoryOrgs,
        source: 'memory_fallback',
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/organizations/:id
// @desc    Get single organization by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected() && mongoose.isValidObjectId(id)) {
      const org = await Organization.findById(id);
      if (!org) {
        return res.status(404).json({ success: false, message: 'Organization not found' });
      }
      return res.json({ success: true, data: org, source: 'mongodb' });
    } else {
      const org = memoryOrgs.find((o) => o._id === id);
      if (!org) {
        return res.status(404).json({ success: false, message: 'Organization not found' });
      }
      return res.json({ success: true, data: org, source: 'memory_fallback' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

