import React, { useState } from 'react';
import {
  Building2,
  Users,
  Target,
  MapPin,
  Laptop,
  ArrowRight,
  Sparkles,
  Info,
} from 'lucide-react';

export default function NGOProfileForm({ initialData, onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    size: initialData?.size || '1-5',
    focusArea: initialData?.focusArea || 'Education & Literacy',
    location: {
      setting: initialData?.location?.setting || 'Rural',
      state: initialData?.location?.state || '',
      district: initialData?.location?.district || '',
    },
    techSupport: initialData?.techSupport || 'None / Self-taught staff',
    leadContact: {
      name: initialData?.leadContact?.name || '',
      email: initialData?.leadContact?.email || '',
      phone: initialData?.leadContact?.phone || '',
      designation: initialData?.leadContact?.designation || '',
    },
    yearFounded: initialData?.yearFounded || 2021,
    annualBudgetRange: initialData?.annualBudgetRange || 'Under $10k (Micro)',
    notes: initialData?.notes || '',
  });

  const [errors, setErrors] = useState({});

  const handlePreloadDemo = () => {
    setFormData({
      name: 'Gram Vikas Seva Trust',
      size: '6-15',
      focusArea: 'Rural Development',
      location: {
        setting: 'Rural',
        state: 'Odisha',
        district: 'Kalahandi',
      },
      techSupport: 'None / Self-taught staff',
      leadContact: {
        name: 'Sunita Majhi',
        email: 'sunita@gramvikas.org.in',
        phone: '+91 98765 43210',
        designation: 'Project Director',
      },
      yearFounded: 2018,
      annualBudgetRange: '$10k - $50k (Small)',
      notes: 'Frontline field staff conducting maternal health and education camps in 12 tribal villages.',
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Organization name is required';
    if (!formData.size) newErrors.size = 'Team size is required';
    if (!formData.focusArea) newErrors.focusArea = 'Primary focus area is required';
    if (!formData.techSupport) newErrors.techSupport = 'Tech support status is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setErrors({});
    onSubmit(formData);
  };

  const techSupportOptions = [
    {
      id: 'None / Self-taught staff',
      title: 'None / Self-taught staff',
      desc: 'Team learns tools informally via peer trial or online tutorials.',
    },
    {
      id: 'Occasional Volunteer',
      title: 'Occasional Volunteer',
      desc: 'A volunteer or board member helps when available.',
    },
    {
      id: 'Dedicated Part-Time Tech Staff',
      title: 'Dedicated Part-Time Staff',
      desc: 'One designated staff member handles IT and spreadsheets.',
    },
    {
      id: 'External Agency or Partner',
      title: 'External Partner / Agency',
      desc: 'An external vendor manages website or accounting software.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            Step 1 of 3: Organization Context
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-1">
            Organization Profile
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Calibrates recommendations to your operational scale and team capacity.
          </p>
        </div>

        <button
          type="button"
          onClick={handlePreloadDemo}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Autofill Sample NGO</span>
        </button>
      </div>

      {/* Main SaaS Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-8">
        {/* Core Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            <Building2 className="w-4 h-4 text-teal-600" />
            <span>General Information</span>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Organization Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Gram Vikas Seva Trust"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all ${
                errors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-slate-50/30'
              }`}
            />
            {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>Active Team Size <span className="text-red-500">*</span></span>
              </label>
              <select
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
              >
                <option value="1-5">1 – 5 staff (Grassroots / Founder-led)</option>
                <option value="6-15">6 – 15 staff (Community Team)</option>
                <option value="16-50">16 – 50 staff (Regional Organization)</option>
                <option value="50+">50+ staff (Multi-location Network)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-slate-400" />
                <span>Primary Focus Area <span className="text-red-500">*</span></span>
              </label>
              <select
                value={formData.focusArea}
                onChange={(e) => setFormData({ ...formData, focusArea: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
              >
                <option value="Education & Literacy">Education & Literacy</option>
                <option value="Healthcare & Nutrition">Healthcare & Nutrition</option>
                <option value="Livelihoods & Skilling">Livelihoods & Skilling</option>
                <option value="Women Empowerment & Rights">Women Empowerment & Rights</option>
                <option value="Environment & Climate Action">Environment & Climate Action</option>
                <option value="Child Welfare & Protection">Child Welfare & Protection</option>
                <option value="Disability & Social Inclusion">Disability & Social Inclusion</option>
                <option value="Rural Development">Rural Development</option>
                <option value="Other Grassroots Causes">Other Grassroots Causes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Operational Environment & Location */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            <MapPin className="w-4 h-4 text-teal-600" />
            <span>Field Environment & Location</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Operating Setting</label>
              <select
                value={formData.location.setting}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, setting: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
              >
                <option value="Rural">Rural Villages</option>
                <option value="Semi-Urban">Semi-Urban / Small Town</option>
                <option value="Urban">Urban Communities / Slums</option>
                <option value="Remote / Tribal">Remote / Tribal Terrain</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">State / Province</label>
              <input
                type="text"
                placeholder="e.g. Odisha"
                value={formData.location.state}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, state: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">District / City</label>
              <input
                type="text"
                placeholder="e.g. Kalahandi"
                value={formData.location.district}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, district: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
              />
            </div>
          </div>
        </div>

        {/* Current Tech Support Level */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <Laptop className="w-4 h-4 text-teal-600" />
              <span>Current Technology Support</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Select closest match</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {techSupportOptions.map((opt) => {
              const isSelected = formData.techSupport === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setFormData({ ...formData, techSupport: opt.id })}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{opt.title}</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-teal-600 bg-teal-600' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    {opt.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Person Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            <Info className="w-4 h-4 text-teal-600" />
            <span>Lead Contact (Optional for Report Dispatch)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Contact Person</label>
              <input
                type="text"
                placeholder="e.g. Sunita Majhi"
                value={formData.leadContact.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    leadContact: { ...formData.leadContact, name: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Email</label>
              <input
                type="email"
                placeholder="sunita@example.org"
                value={formData.leadContact.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    leadContact: { ...formData.leadContact, email: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Role / Designation</label>
              <input
                type="text"
                placeholder="e.g. Project Director"
                value={formData.leadContact.designation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    leadContact: { ...formData.leadContact, designation: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/30 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
              />
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs hover:shadow-sm transition-all disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Saving Profile...' : 'Proceed to Guided Assessment'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
