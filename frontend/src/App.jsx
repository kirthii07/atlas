import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingHero from './components/LandingHero';
import NGOProfileForm from './components/NGOProfileForm';
import GuidedAssessment from './components/GuidedAssessment';
import ResultsScoringScreen from './components/ResultsScoringScreen';
import ActionRoadmapTracker from './components/ActionRoadmapTracker';
import Footer from './components/Footer';
import {
  fetchHealth,
  fetchQuestions,
  saveOrganization,
  submitAssessment,
} from './api';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [orgProfile, setOrgProfile] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Initial load: assessment questions & optional health check
  useEffect(() => {
    async function init() {
      try {
        await fetchHealth();
      } catch (e) {
        // quiet fallback
      }

      try {
        const qRes = await fetchQuestions();
        if (qRes.success && qRes.data) {
          setQuestions(qRes.data);
        }
      } catch (e) {
        console.warn('Failed to load questions:', e);
      }
    }
    init();
  }, []);

  // Step 1: Start from Hero
  const handleStart = () => {
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 1 Demo Shortcut: Preloads sample NGO, runs sample assessment, and lands directly on Results/Roadmap
  const handleLoadDemo = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const demoOrg = {
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
      };

      const orgRes = await saveOrganization(demoOrg);
      const savedOrg = orgRes.data;
      setOrgProfile(savedOrg);

      let qList = questions;
      if (!qList || qList.length === 0) {
        const qRes = await fetchQuestions();
        qList = qRes.data;
        setQuestions(qList);
      }

      const demoAnswers = qList.map((q, idx) => ({
        questionId: q.id,
        domain: q.domain,
        questionText: q.title,
        selectedOptionText: q.options[idx % 2 === 0 ? 0 : 1].text,
        scoreValue: q.options[idx % 2 === 0 ? 0 : 1].score,
      }));

      const assessRes = await submitAssessment({
        organizationId: savedOrg._id,
        answers: demoAnswers,
      });

      if (assessRes.success && assessRes.data) {
        setAssessment(assessRes.data.assessment);
        setRoadmap(assessRes.data.roadmap);
        setCurrentStep(4);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Demo loading failed:', err);
      setErrorMsg('Failed to run demo assessment. Please check backend connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Handle NGO Profile Submission
  const handleOrgSubmit = async (formData) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await saveOrganization(formData);
      if (res.success && res.data) {
        setOrgProfile(res.data);
        setCurrentStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Failed to save NGO profile:', err);
      setErrorMsg(err.message || 'Error saving organization profile.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Handle Assessment Submission
  const handleAssessmentSubmit = async (answersArray) => {
    if (!orgProfile?._id) {
      setErrorMsg('Please complete your organization profile first.');
      setCurrentStep(2);
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await submitAssessment({
        organizationId: orgProfile._id,
        answers: answersArray,
      });

      if (res.success && res.data) {
        setAssessment(res.data.assessment);
        setRoadmap(res.data.roadmap);
        setCurrentStep(4);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Failed to submit assessment:', err);
      setErrorMsg(err.message || 'Error computing assessment results.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 4: Proceed to Roadmap
  const handleProceedToRoadmap = () => {
    setCurrentStep(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset entire flow
  const handleReset = () => {
    if (window.confirm('Reset assessment and start fresh?')) {
      setCurrentStep(1);
      setOrgProfile(null);
      setAssessment(null);
      setRoadmap(null);
      setErrorMsg('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 font-sans text-slate-900 antialiased selection:bg-teal-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentStep={currentStep}
        setStep={setCurrentStep}
        onReset={handleReset}
        hasStarted={currentStep > 1}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Error Notification */}
        {errorMsg && (
          <div className="my-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center justify-between">
            <span>{errorMsg}</span>
            <button
              onClick={() => setErrorMsg('')}
              className="text-red-600 hover:text-red-900 ml-4 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Global Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex flex-col items-center justify-center text-white space-y-3">
            <div className="w-9 h-9 border-3 border-teal-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-bold tracking-wide text-slate-100">
              Analyzing Operational Maturity...
            </p>
          </div>
        )}

        {/* Dynamic Step View */}
        <div className="fade-in">
          {currentStep === 1 && (
            <LandingHero
              onStart={handleStart}
              onLoadDemo={handleLoadDemo}
            />
          )}

          {currentStep === 2 && (
            <NGOProfileForm
              initialData={orgProfile}
              onSubmit={handleOrgSubmit}
              isSubmitting={isLoading}
            />
          )}

          {currentStep === 3 && (
            <GuidedAssessment
              questions={questions}
              orgProfile={orgProfile}
              onSubmit={handleAssessmentSubmit}
              isSubmitting={isLoading}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && assessment && (
            <ResultsScoringScreen
              assessment={assessment}
              orgProfile={orgProfile}
              onProceedToRoadmap={handleProceedToRoadmap}
            />
          )}

          {currentStep === 5 && roadmap && (
            <ActionRoadmapTracker
              roadmap={roadmap}
              orgProfile={orgProfile}
              onRoadmapUpdate={(updatedRoadmap) => setRoadmap(updatedRoadmap)}
              onReset={handleReset}
            />
          )}
        </div>
      </main>

      {/* Clean Enterprise Footer */}
      <Footer />
    </div>
  );
}
