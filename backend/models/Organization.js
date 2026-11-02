const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Organization name is required'],
      trim: true,
    },
    size: {
      type: String,
      required: [true, 'Team size is required'],
      enum: ['1-5', '6-15', '16-50', '50+'],
      default: '1-5',
    },
    focusArea: {
      type: String,
      required: [true, 'Primary focus area is required'],
      enum: [
        'Education & Literacy',
        'Healthcare & Nutrition',
        'Livelihoods & Skilling',
        'Women Empowerment & Rights',
        'Environment & Climate Action',
        'Child Welfare & Protection',
        'Disability & Social Inclusion',
        'Rural Development',
        'Other Grassroots Causes'
      ],
      default: 'Education & Literacy',
    },
    location: {
      state: { type: String, default: '' },
      district: { type: String, default: '' },
      setting: {
        type: String,
        enum: ['Rural', 'Semi-Urban', 'Urban', 'Remote / Tribal'],
        default: 'Rural',
      },
    },
    techSupport: {
      type: String,
      required: [true, 'Tech support level is required'],
      enum: [
        'None / Self-taught staff',
        'Occasional Volunteer',
        'Dedicated Part-Time Tech Staff',
        'External Agency or Partner',
      ],
      default: 'None / Self-taught staff',
    },
    leadContact: {
      name: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      designation: { type: String, default: '' }
    },
    yearFounded: {
      type: Number,
      default: 2020,
    },
    annualBudgetRange: {
      type: String,
      enum: ['Under $10k (Micro)', '$10k - $50k (Small)', '$50k - $200k (Medium)', 'Over $200k (Growing)'],
      default: 'Under $10k (Micro)'
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Organization', OrganizationSchema);

