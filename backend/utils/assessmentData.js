// Assessment Questions tailored specifically for Grassroots Non-Profits (NGOs)
// Uses simple, non-intimidating everyday language (avoiding tech jargon)

const ASSESSMENT_QUESTIONS = [
  // --- Domain 1: Data Storage & Beneficiary Records ---
  {
    id: 'data_1',
    domain: 'dataStorage',
    domainLabel: 'Data & Beneficiary Records',
    title: 'How does your team currently record and keep track of community members, beneficiaries, or program participants?',
    options: [
      {
        text: 'Mainly on paper notebooks, physical registers, or printed forms kept in office folders.',
        score: 1,
        insight: 'High risk of physical loss, difficult to search, and labor-intensive to aggregate for reports.'
      },
      {
        text: 'Individual Excel or Word files saved on different staff laptops or USB thumb drives.',
        score: 2,
        insight: 'Prone to version confusion, overwritten files, and laptop failure data loss.'
      },
      {
        text: 'Shared cloud spreadsheets (like Google Sheets or OneDrive) accessible by the team.',
        score: 3,
        insight: 'Good collaborative baseline with version history and multi-user access.'
      },
      {
        text: 'A structured database or dedicated beneficiary management tool (like KoboToolbox, Airtable, or a CRM).',
        score: 4,
        insight: 'Mature, reliable data architecture with validation rules and instant analytics.'
      }
    ]
  },
  {
    id: 'data_2',
    domain: 'dataStorage',
    domainLabel: 'Data & Beneficiary Records',
    title: 'When field workers collect survey responses or attendance in remote villages / field sites, how does that data reach the office?',
    options: [
      {
        text: 'Field staff bring back paper sheets or verbal notes days/weeks later for manual re-typing.',
        score: 1,
        insight: 'Substantial lag time, frequent transcription errors, and lost questionnaires.'
      },
      {
        text: 'Field staff take photos of registers or type numbers into informal WhatsApp messages.',
        score: 2,
        insight: 'Fast communication but disorganized; requires tedious copy-pasting into spreadsheets.'
      },
      {
        text: 'Field staff use free digital mobile forms (Google Forms / KoboToolbox / SurveyCTO) on smartphones.',
        score: 3,
        insight: 'Clean, immediate digital collection with location/photo capture capabilities.'
      },
      {
        text: 'Offline-first mobile applications with automatic background syncing when internet reconnects.',
        score: 4,
        insight: 'Resilient and highly suited for grassroots areas with intermittent network coverage.'
      }
    ]
  },

  // --- Domain 2: Internal & External Communication ---
  {
    id: 'comm_1',
    domain: 'communication',
    domainLabel: 'Team & Stakeholder Communication',
    title: 'How does your core team coordinate daily tasks, announcements, and urgent program updates?',
    options: [
      {
        text: 'In-person morning catchups and sporadic individual phone calls without central logs.',
        score: 1,
        insight: 'Easy to forget action items; high dependency on individual memory.'
      },
      {
        text: 'Informal personal WhatsApp / Telegram chats where work messages mix with personal media.',
        score: 2,
        insight: 'Accessible to all, but important files get buried quickly and team members get ping fatigue.'
      },
      {
        text: 'Organized WhatsApp Communities or Telegram channels separated by project and topic.',
        score: 3,
        insight: 'More structured while remaining on familiar mobile apps that require zero training.'
      },
      {
        text: 'A dedicated team workspace (Slack / Microsoft Teams / Google Chat) with task channels.',
        score: 4,
        insight: 'Clear work-life separation, searchable archive, and integrated file storage.'
      }
    ]
  },
  {
    id: 'comm_2',
    domain: 'communication',
    domainLabel: 'Team & Stakeholder Communication',
    title: 'How do you share photos, field stories, and updates with donors, board members, and public supporters?',
    options: [
      {
        text: 'We only send ad-hoc email attachments or printed reports when donors specifically ask.',
        score: 1,
        insight: 'Limits donor retention and makes emergency fundraising difficult.'
      },
      {
        text: 'We post occasionally on Facebook/Instagram directly from staff personal phones.',
        score: 2,
        insight: 'Provides public visibility, but lacks consistency and centralized brand asset storage.'
      },
      {
        text: 'We maintain a shared Google Drive photo folder and a regular email newsletter / PDF bulletin.',
        score: 3,
        insight: 'Consistent donor stewardship with organized visual evidence.'
      },
      {
        text: 'Multi-channel digital presence with scheduled social media, segmented donor email lists, and a live website.',
        score: 4,
        insight: 'Professional outreach driving continuous credibility and fundraising opportunities.'
      }
    ]
  },

  // --- Domain 3: Team Digital Literacy & Skills ---
  {
    id: 'skills_1',
    domain: 'teamSkills',
    domainLabel: 'Team Digital Skills & Culture',
    title: 'What is the general comfort level of your frontline and administrative staff with digital tools?',
    options: [
      {
        text: 'Only 1 or 2 specific people know how to use computers; the rest rely on paper and voice calls.',
        score: 1,
        insight: 'Creates severe bottlenecks around "the tech person" and vulnerability if they leave.'
      },
      {
        text: 'Staff are confident on smartphones for social apps, but hesitant with computers, spreadsheets, or online forms.',
        score: 2,
        insight: 'Huge opportunity: mobile-first tools can bridge this gap without needing laptop literacy.'
      },
      {
        text: 'Most team members comfortably use cloud email, spreadsheets, and video meetings (Zoom/Meet).',
        score: 3,
        insight: 'Solid digital fluency capable of adopting modern low-code NGO tools.'
      },
      {
        text: 'Team proactively tests new digital shortcuts, uses AI helpers (ChatGPT/Gemini for drafting), and mentors peers.',
        score: 4,
        insight: 'Self-sustaining digital champions culture driving operational efficiency.'
      }
    ]
  },
  {
    id: 'skills_2',
    domain: 'teamSkills',
    domainLabel: 'Team Digital Skills & Culture',
    title: 'Does your organization have a simple written guideline for data safety, passwords, and beneficiary privacy?',
    options: [
      {
        text: 'No formal guidelines; passwords are often shared on sticky notes or WhatsApp messages.',
        score: 1,
        insight: 'Critical vulnerability: accounts can easily be compromised or beneficiary identities leaked.'
      },
      {
        text: 'Informal verbal understanding (e.g., "don\'t share the main email password outside the team").',
        score: 2,
        insight: 'Good intent, but lacks standard protocols when volunteers or staff depart.'
      },
      {
        text: 'Basic written checklist covering password changes, device lock codes, and obtaining consent for photos.',
        score: 3,
        insight: 'Responsible standard protecting vulnerable populations and organizational credibility.'
      },
      {
        text: 'Standard Operating Procedures with role-based folder permissions, 2-Factor Authentication, and regular cleanups.',
        score: 4,
        insight: 'Institutional-grade security posture satisfying international grant compliance.'
      }
    ]
  },

  // --- Domain 4: Operational Bottlenecks & Donor Reporting ---
  {
    id: 'ops_1',
    domain: 'operations',
    domainLabel: 'Operations & Donor Reporting',
    title: 'When preparing a quarterly donor report or grant utilization certificate, how long does it take to compile numbers?',
    options: [
      {
        text: 'More than a week of frantic manual digging through paper files, receipts, and asking staff for recollections.',
        score: 1,
        insight: 'High staff burnout, delayed submissions, and risk of donor audit flags.'
      },
      {
        text: '3 to 5 days consolidating different spreadsheets emailed back and forth by team members.',
        score: 2,
        insight: 'Workable but drains substantial leadership hours every grant cycle.'
      },
      {
        text: '1 to 2 days because numbers are tracked weekly in a central cloud sheet or template.',
        score: 3,
        insight: 'Predictable reporting rhythm freeing leadership time for program impact.'
      },
      {
        text: 'A few hours or near real-time using live dashboards or pre-configured reporting templates.',
        score: 4,
        insight: 'Instant donor transparency that wins multi-year foundation grants.'
      }
    ]
  },
  {
    id: 'ops_2',
    domain: 'operations',
    domainLabel: 'Operations & Donor Reporting',
    title: 'How does your organization track expense bills, receipts, and field advances?',
    options: [
      {
        text: 'Paper receipts stuffed in physical envelopes, totaled at the end of the month in an offline cashbook.',
        score: 1,
        insight: 'Faded thermal receipts and lost bills create tax and compliance headaches.'
      },
      {
        text: 'Staff photograph receipts and WhatsApp them to the accountant/director.',
        score: 2,
        insight: 'Good safeguard against lost physical paper, but difficult to reconcile systematically.'
      },
      {
        text: 'Digital expense logs on Google Sheets with scanned receipts attached to Drive folders.',
        score: 3,
        insight: 'Clean audit trail suitable for standard statutory audits and donor inspections.'
      },
      {
        text: 'Dedicated accounting software (Tally Prime / Zoho Books / QuickBooks) with digital voucher approvals.',
        score: 4,
        insight: 'Professional financial governance ready for rapid organizational scaling.'
      }
    ]
  }
];

// Helper to calculate score and maturity tier
function calculateAssessmentResults(answers, orgProfile) {
  const domainTotals = {
    dataStorage: { score: 0, maxScore: 0, count: 0 },
    communication: { score: 0, maxScore: 0, count: 0 },
    teamSkills: { score: 0, maxScore: 0, count: 0 },
    operations: { score: 0, maxScore: 0, count: 0 },
  };

  answers.forEach((ans) => {
    if (domainTotals[ans.domain]) {
      domainTotals[ans.domain].score += ans.scoreValue;
      domainTotals[ans.domain].maxScore += 4;
      domainTotals[ans.domain].count += 1;
    }
  });

  const domainScores = {};
  let totalAchieved = 0;
  let totalPossible = 0;

  for (const [key, val] of Object.entries(domainTotals)) {
    const percentage = val.maxScore > 0 ? Math.round((val.score / val.maxScore) * 100) : 0;
    totalAchieved += val.score;
    totalPossible += val.maxScore;

    let level = 'Basic';
    if (percentage > 70) level = 'Established';
    else if (percentage > 40) level = 'Emerging';

    domainScores[key] = {
      score: val.score,
      maxScore: val.maxScore,
      percentage,
      level,
    };
  }

  // Calculate 0-100 overall score
  const overallScore = totalPossible > 0 ? Math.round((totalAchieved / totalPossible) * 100) : 0;

  // Determine Maturity Tier
  let maturityTier = 'Basic';
  if (overallScore >= 75) {
    maturityTier = 'Established';
  } else if (overallScore >= 45) {
    maturityTier = 'Emerging';
  }

  // Generate AI Summary and Key Takeaways
  const aiSummary = generateAiSummary(overallScore, maturityTier, domainScores, orgProfile);

  return {
    overallScore,
    maturityTier,
    domainScores,
    aiSummary,
  };
}

function generateAiSummary(overallScore, maturityTier, domainScores, orgProfile) {
  const orgName = orgProfile?.name || 'Your Grassroots Organization';
  const focus = orgProfile?.focusArea || 'community service';
  const setting = orgProfile?.location?.setting || 'grassroots';

  let headline = '';
  let narrative = '';
  let quickWinsTip = '';
  const keyStrengths = [];
  const criticalBottlenecks = [];

  // Identify lowest and highest domains
  const sortedDomains = Object.entries(domainScores).sort((a, b) => b[1].percentage - a[1].percentage);
  const strongest = sortedDomains[0];
  const weakest = sortedDomains[sortedDomains.length - 1];

  const domainFriendlyNames = {
    dataStorage: 'Beneficiary & Program Data',
    communication: 'Team & Stakeholder Communication',
    teamSkills: 'Digital Skills & Security Culture',
    operations: 'Financial Operations & Donor Reporting'
  };

  if (maturityTier === 'Basic') {
    headline = `${orgName} is at the Foundational stage—poised for high-leverage quick wins!`;
    narrative = `Operating in ${setting.toLowerCase()} contexts within ${focus}, your team demonstrates tremendous on-the-ground commitment. However, relying predominantly on paper and scattered personal messaging drains valuable hours every week. Shifting to free, mobile-friendly cloud tools will dramatically protect your field data, streamline donor reporting, and give your frontline workers peace of mind without requiring expensive IT hardware.`;
    quickWinsTip = `Start with a 100% free Google Workspace for Nonprofits grant to get official custom emails, 30GB cloud storage per worker, and collaborative spreadsheets.`;
  } else if (maturityTier === 'Emerging') {
    headline = `${orgName} is in the Emerging stage with solid digital momentum!`;
    narrative = `Your team has successfully moved past paper dependencies and is actively leveraging digital channels for ${focus}. The next frontier is eliminating scattered data silos, standardizing field-to-office workflows, and building repeatable reporting templates so your leadership spends less time compiling numbers and more time expanding community impact.`;
    quickWinsTip = `Adopt KoboToolbox or standardized Google Form templates for field teams to eradicate manual data re-entry and unlock live donor impact dashboards.`;
  } else {
    headline = `${orgName} demonstrates an Established digital maturity profile!`;
    narrative = `With an impressive score of ${overallScore}/100, your organization has built a disciplined, collaborative digital culture. You are in an ideal position to pilot advanced automation, train neighboring partner NGOs, and leverage data visualization to attract multi-year institutional grantmakers.`;
    quickWinsTip = `Implement automated donor stewardship workflows and privacy-compliant data governance SOPs to position for large international CSR and foundation grants.`;
  }

  // Populate strengths and bottlenecks
  keyStrengths.push(`Strongest performance in ${domainFriendlyNames[strongest[0]]} (${strongest[1].percentage}% readiness).`);
  if (strongest[1].percentage >= 60) {
    keyStrengths.push('Team displays healthy receptiveness to digital coordination.');
  } else {
    keyStrengths.push('High dedication with substantial headroom for quick digital leaps.');
  }

  criticalBottlenecks.push(`Urgent focus needed in ${domainFriendlyNames[weakest[0]]} (${weakest[1].percentage}% readiness).`);
  if (domainScores.dataStorage.percentage < 50) {
    criticalBottlenecks.push('Beneficiary records are vulnerable to accidental loss or file fragmentation.');
  }
  if (domainScores.operations.percentage < 50) {
    criticalBottlenecks.push('Quarterly donor reports and expense tracking take disproportionate manual effort.');
  }
  if (domainScores.teamSkills.percentage < 50) {
    criticalBottlenecks.push('Digital knowledge is concentrated in too few individuals, creating single points of failure.');
  }

  return {
    headline,
    narrative,
    keyStrengths,
    criticalBottlenecks,
    quickWinsTip
  };
}

// Generate Tailored 3-4 Action Roadmap Items based on domain needs
function generateRoadmapActions(domainScores, orgProfile) {
  const actions = [];
  const orgName = orgProfile?.name || 'NGO';

  // Action 1: Address Data Storage
  if (domainScores.dataStorage.percentage < 65) {
    actions.push({
      actionId: 'action_data_centralize',
      title: 'Centralize Beneficiary & Program Records in Cloud Storage',
      domain: 'dataStorage',
      priority: 'Immediate (Priority 1)',
      effort: 'Low (1-3 days)',
      impact: 'Quick Win',
      rationale: `Currently, records are vulnerable to physical loss or scattered across personal phones. Centralizing them protects ${orgName}'s institutional memory and enables instant report generation.`,
      concreteSteps: [
        'Apply for Google Workspace for Nonprofits (100% free with unlimited custom emails & shared Drive).',
        'Create a standardized master folder structure: 01_Beneficiary_Data, 02_Donor_Reports, 03_Photos_Stories.',
        'Migrate paper rosters or fragmented Excel sheets into a protected Google Sheet with restricted edit permissions.'
      ],
      recommendedFreeTools: ['Google Workspace for Nonprofits', 'Google Drive Shared Folders', 'KoboToolbox (Free NGO Tier)'],
      status: 'Not Started',
      notes: ''
    });
  } else {
    actions.push({
      actionId: 'action_data_advanced',
      title: 'Implement Structured Mobile Field Data Collection',
      domain: 'dataStorage',
      priority: 'High (Priority 2)',
      effort: 'Medium (1-2 weeks)',
      impact: 'High Impact',
      rationale: 'Replace manual paper-to-spreadsheet transcription with GPS and photo-tagged mobile forms that field staff can submit offline.',
      concreteSteps: [
        'Set up a free KoboToolbox or ODK account tailored for humanitarian field surveys.',
        'Convert paper survey questionnaires into clean mobile forms with skip logic and date validation.',
        'Run a 1-day field trial with 2 staff members in community clusters.'
      ],
      recommendedFreeTools: ['KoboToolbox', 'ODK Collect', 'Airtable Non-Profit'],
      status: 'Not Started',
      notes: ''
    });
  }

  // Action 2: Address Operations & Donor Reporting
  if (domainScores.operations.percentage < 65) {
    actions.push({
      actionId: 'action_ops_report',
      title: 'Establish a 1-Click Monthly Donor & Financial Tracker',
      domain: 'operations',
      priority: 'Immediate (Priority 1)',
      effort: 'Low (1-3 days)',
      impact: 'Quick Win',
      rationale: 'Preparing grant reports currently consumes days of stressful manual calculation. A pre-linked tracker reduces reporting time to under 2 hours.',
      concreteSteps: [
        'Deploy the People4Good standard NGO Monthly Indicator Sheet template.',
        'Train field coordinators to enter participant counts every Friday instead of end-of-quarter rush.',
        'Set up a photo submission album per grant so impact stories and high-res photos are always audit-ready.'
      ],
      recommendedFreeTools: ['Google Sheets Grant Tracker Template', 'WhatsApp Business Document Receipts', 'Canva for Nonprofits (Free Pro Account)'],
      status: 'Not Started',
      notes: ''
    });
  } else {
    actions.push({
      actionId: 'action_ops_automation',
      title: 'Automate Quarterly Donor Impact Briefings',
      domain: 'operations',
      priority: 'Medium (Priority 3)',
      effort: 'Medium (1-2 weeks)',
      impact: 'Foundational Transform',
      rationale: 'Transform raw data tables into visually stunning 2-page donor impact bulletins that retain existing donors and win renewal grants.',
      concreteSteps: [
        'Register for Canva for Nonprofits (100% free premium design suite for registered NGOs).',
        'Create a branded 2-page impact report template featuring community beneficiary quotes and infographics.',
        'Automate email distribution to your board and funding partners using Mailchimp free non-profit tier.'
      ],
      recommendedFreeTools: ['Canva for Nonprofits', 'Mailchimp Free NGO', 'Looker Studio (Free Data Dashboards)'],
      status: 'Not Started',
      notes: ''
    });
  }

  // Action 3: Team Communication & File Safety
  if (domainScores.communication.percentage < 65 || domainScores.teamSkills.percentage < 60) {
    actions.push({
      actionId: 'action_team_safety',
      title: 'Standardize Team Communication Channels & Data Privacy Protocol',
      domain: 'communication',
      priority: 'High (Priority 2)',
      effort: 'Low (1-3 days)',
      impact: 'Quick Win',
      rationale: 'Mixing official beneficiary records and child photos in unstructured personal chats exposes your organization to severe reputational and privacy risks.',
      concreteSteps: [
        'Create an official WhatsApp Community with distinct announcement channels and project groups.',
        'Draft a 1-page "Golden Rules for Field Privacy": obtain verbal/written consent for photos and never post child identity numbers.',
        'Enable 2-Step Verification on all organizational email and social media accounts.'
      ],
      recommendedFreeTools: ['WhatsApp Communities', 'Bitwarden Free Password Manager', 'Google 2-Step Verification'],
      status: 'Not Started',
      notes: ''
    });
  } else {
    actions.push({
      actionId: 'action_team_skilling',
      title: 'Designate Digital Champions & Run Weekly 15-Minute Peer Upskilling',
      domain: 'teamSkills',
      priority: 'Medium (Priority 3)',
      effort: 'Low (1-3 days)',
      impact: 'High Impact',
      rationale: 'Avoid the bottleneck of a single "tech person" by cross-training field coordinators on AI drafting, phone scanning, and spreadsheet filters.',
      concreteSteps: [
        'Appoint 2 digitally confident field coordinators as "Digital Champions".',
        'Hold weekly 15-minute "Coffee & Tech" tips (e.g. how to scan multi-page receipts with Google Drive camera, or draft donor letters with Gemini/ChatGPT).',
        'Celebrate staff who transition from physical paper to digital logs with small community badges.'
      ],
      recommendedFreeTools: ['Gemini / ChatGPT (AI drafting for grants)', 'Google Drive Scan App', 'YouTube Tech4NGOs Playlists'],
      status: 'Not Started',
      notes: ''
    });
  }

  // Action 4: Long-term Scalability
  actions.push({
    actionId: 'action_digital_growth',
    title: 'Unlock $10,000/Month in Free Non-Profit Technology Grants',
    domain: 'teamSkills',
    priority: 'Strategic (Priority 4)',
    effort: 'Medium (1-2 weeks)',
    impact: 'Foundational Transform',
    rationale: 'Grassroots NGOs frequently pay or struggle without tools, unaware that TechSoup, Google, and Canva provide tens of thousands of dollars in free verified non-profit software.',
    concreteSteps: [
      'Register your NGO on TechSoup (or local partner e.g. BigTech in India) using your 80G/12A/501(c)(3) certificate.',
      'Claim the Google for Nonprofits grant, Google Ad Grants ($10k/month search credits), and Canva Pro licenses.',
      'Schedule quarterly reviews to assess tool adoption and digital readiness score gains.'
    ],
    recommendedFreeTools: ['TechSoup Global Network', 'Google Ad Grants', 'Microsoft for Nonprofits'],
    status: 'Not Started',
    notes: ''
  });

  return actions;
}

module.exports = {
  ASSESSMENT_QUESTIONS,
  calculateAssessmentResults,
  generateRoadmapActions,
};

