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

// Fallback questions to prevent initial render blocking while live backend wakes up
const FALLBACK_QUESTIONS = [
  {
    id: 'data_1',
    domain: 'dataStorage',
    title: 'How does your team currently record and keep track of community members, beneficiaries, or program participants?',
    options: [
      { text: 'Mainly on paper notebooks, physical registers, or printed forms kept in office folders.', score: 1, insight: 'High risk of physical loss and difficult to search.' },
      { text: 'Individual Excel or Word files saved on different staff laptops or USB thumb drives.', score: 2, insight: 'Prone to version confusion and laptop failure data loss.' },
      { text: 'Shared cloud spreadsheets (like Google Sheets or OneDrive) accessible by the team.', score: 3, insight: 'Good collaborative baseline with multi-user access.' },
      { text: 'A structured database or dedicated beneficiary management tool (like KoboToolbox, Airtable, or CRM).', score: 4, insight: 'Mature, reliable data architecture with instant analytics.' }
    ]
  },
  {
    id: 'data_2',
    domain: 'dataStorage',
    title: 'When field workers collect survey responses or attendance in remote villages / field sites, how does that data reach the office?',
    options: [
      { text: 'Field staff bring back paper sheets or verbal notes days/weeks later for manual re-typing.', score: 1, insight: 'Substantial lag time and frequent transcription errors.' },
      { text: 'Field staff take photos of registers or type numbers into informal WhatsApp messages.', score: 2, insight: 'Fast but requires tedious manual copy-pasting.' },
      { text: 'Field staff use free digital mobile forms (Google Forms / KoboToolbox) on smartphones.', score: 3, insight: 'Clean digital collection with photo/location capture.' },
      { text: 'Offline-first mobile applications with automatic background syncing when internet reconnects.', score: 4, insight: 'Resilient and highly suited for areas with intermittent network.' }
    ]
  },
  {
    id: 'comm_1',
    domain: 'communication',
    title: 'How does your core team coordinate daily tasks, announcements, and urgent program updates?',
    options: [
      { text: 'In-person morning catchups and sporadic individual phone calls without central logs.', score: 1, insight: 'High dependency on individual memory.' },
      { text: 'Informal personal WhatsApp / Telegram chats where work messages mix with personal media.', score: 2, insight: 'Accessible to all, but important files get buried quickly.' },
      { text: 'Organized WhatsApp Communities or Telegram channels separated by project and topic.', score: 3, insight: 'More structured while remaining on familiar mobile apps.' },
      { text: 'A dedicated team workspace (Slack / Microsoft Teams / Google Chat) with task channels.', score: 4, insight: 'Clear work-life separation and searchable archive.' }
    ]
  },
  {
    id: 'comm_2',
    domain: 'communication',
    title: 'How do you share photos, field stories, and updates with donors, board members, and public supporters?',
    options: [
      { text: 'We only send ad-hoc email attachments or printed reports when donors specifically ask.', score: 1, insight: 'Limits donor retention and fundraising.' },
      { text: 'We post occasionally on Facebook/Instagram directly from staff personal phones.', score: 2, insight: 'Provides visibility, but lacks centralized brand storage.' },
      { text: 'We maintain a shared Google Drive photo folder and a regular email newsletter / PDF bulletin.', score: 3, insight: 'Consistent donor stewardship with organized visual evidence.' },
      { text: 'Multi-channel digital presence with scheduled social media and segmented donor lists.', score: 4, insight: 'Professional outreach driving continuous credibility.' }
    ]
  },
  {
    id: 'skills_1',
    domain: 'teamSkills',
    title: 'What is the general comfort level of your frontline and administrative staff with digital tools?',
    options: [
      { text: 'Only 1 or 2 specific people know how to use computers; the rest rely on paper and voice calls.', score: 1, insight: 'Creates severe bottlenecks around "the tech person".' },
      { text: 'Staff are confident on smartphones for social apps, but hesitant with computers or online forms.', score: 2, insight: 'Mobile-first tools can bridge this gap.' },
      { text: 'Most team members comfortably use cloud email, spreadsheets, and video meetings (Zoom/Meet).', score: 3, insight: 'Solid digital fluency capable of adopting modern low-code tools.' },
      { text: 'Team proactively tests new digital shortcuts, uses AI helpers, and mentors peers.', score: 4, insight: 'Self-sustaining digital champions culture.' }
    ]
  },
  {
    id: 'skills_2',
    domain: 'teamSkills',
    title: 'Does your organization have a simple written guideline for data safety, passwords, and beneficiary privacy?',
    options: [
      { text: 'No formal guidelines; passwords are often shared on sticky notes or WhatsApp messages.', score: 1, insight: 'Critical vulnerability for account security and privacy.' },
      { text: 'Informal verbal understanding (e.g. "don\'t share the main email password outside").', score: 2, insight: 'Good intent, but lacks standard protocols.' },
      { text: 'Basic written checklist covering password changes, device lock codes, and photo consent.', score: 3, insight: 'Responsible standard protecting vulnerable populations.' },
      { text: 'Standard Operating Procedures with role-based permissions, 2FA, and regular cleanups.', score: 4, insight: 'Institutional-grade security posture satisfying major donors.' }
    ]
  },
  {
    id: 'ops_1',
    domain: 'operations',
    title: 'When preparing a quarterly donor report or grant utilization certificate, how long does it take to compile numbers?',
    options: [
      { text: 'More than a week of frantic manual digging through paper files and asking staff for recollections.', score: 1, insight: 'High staff burnout and delayed submissions.' },
      { text: '3 to 5 days consolidating different spreadsheets emailed back and forth.', score: 2, insight: 'Workable but drains substantial leadership hours.' },
      { text: '1 to 2 days because numbers are tracked weekly in a central cloud sheet or template.', score: 3, insight: 'Predictable reporting rhythm freeing leadership time.' },
      { text: 'A few hours or near real-time using live dashboards or pre-configured templates.', score: 4, insight: 'Instant donor transparency that wins multi-year foundation grants.' }
    ]
  },
  {
    id: 'ops_2',
    domain: 'operations',
    title: 'How does your organization track expense bills, receipts, and field advances?',
    options: [
      { text: 'Paper receipts stuffed in physical envelopes, totaled at the end of the month in an offline cashbook.', score: 1, insight: 'Faded thermal receipts and lost bills create compliance issues.' },
      { text: 'Staff photograph receipts and WhatsApp them to the accountant/director.', score: 2, insight: 'Safeguards against lost paper, but difficult to reconcile.' },
      { text: 'Digital expense logs on Google Sheets with scanned receipts attached to Drive folders.', score: 3, insight: 'Clean audit trail suitable for standard statutory audits.' },
      { text: 'Dedicated accounting software (Tally Prime / Zoho Books / QuickBooks) with digital vouchers.', score: 4, insight: 'Professional financial governance ready for scaling.' }
    ]
  }
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [questions, setQuestions] = useState(FALLBACK_QUESTIONS);
  const [orgProfile, setOrgProfile] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('Processing...');
  const [loadingSlow, setLoadingSlow] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Initial load: fetch live questions from Render backend
  useEffect(() => {
    async function init() {
      try {
        fetchHealth().catch(() => {});
        const qRes = await fetchQuestions();
        if (qRes && qRes.data && Array.isArray(qRes.data) && qRes.data.length > 0) {
          setQuestions(qRes.data);
        }
      } catch (e) {
        console.warn('Backend waking up; using calibrated fallback questions:', e);
      }
    }
    init();
  }, []);

  // Timer to display a reassuring notice if live Render backend takes a moment on cold start
  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setTimeout(() => {
        setLoadingSlow(true);
      }, 3500);
    } else {
      setLoadingSlow(false);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  // Step 1: Start from Hero
  const handleStart = () => {
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 1 Demo Shortcut: Preloads sample NGO, runs assessment, and lands directly on Results/Roadmap
  const handleLoadDemo = async () => {
    setIsLoading(true);
    setLoadingMsg('Connecting to ATLAS Live Backend & Preparing Demo...');
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

      let qList = questions && questions.length > 0 ? questions : FALLBACK_QUESTIONS;

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

      if (assessRes && assessRes.data) {
        setAssessment(assessRes.data.assessment);
        setRoadmap(assessRes.data.roadmap);
        setCurrentStep(4);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Demo loading failed:', err);
      setErrorMsg(err.message || 'Unable to connect to live backend. Please retry in a moment.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Handle NGO Profile Submission
  const handleOrgSubmit = async (formData) => {
    setIsLoading(true);
    setLoadingMsg('Saving Organization Profile to Live Backend...');
    setErrorMsg('');
    try {
      const res = await saveOrganization(formData);
      if (res && res.data) {
        setOrgProfile(res.data);
        setCurrentStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Failed to save NGO profile:', err);
      setErrorMsg(err.message || 'Failed to save organization profile. Please try again.');
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
    setLoadingMsg('Calculating Maturity Score & Generating Roadmap...');
    setErrorMsg('');
    try {
      const res = await submitAssessment({
        organizationId: orgProfile._id,
        answers: answersArray,
      });

      if (res && res.data) {
        setAssessment(res.data.assessment);
        setRoadmap(res.data.roadmap);
        setCurrentStep(4);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Failed to submit assessment:', err);
      setErrorMsg(err.message || 'Error processing assessment. Please verify connection and retry.');
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
    if (window.confirm('Start a new assessment? This will clear current progress.')) {
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
      {/* Clean Top Navigation */}
      <Navbar
        currentStep={currentStep}
        setStep={setCurrentStep}
        onReset={handleReset}
        hasStarted={currentStep > 1}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Error Notification Banner */}
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

        {/* Global Loading Overlay with Reassuring Status */}
        {isLoading && (
          <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 flex flex-col items-center max-w-xs text-center space-y-3">
              <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-900">{loadingMsg}</p>
                {loadingSlow && (
                  <p className="text-[11px] text-slate-500 animate-pulse">
                    Connecting to live cloud service. Free server tier may take a few seconds to respond...
                  </p>
                )}
              </div>
            </div>
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
