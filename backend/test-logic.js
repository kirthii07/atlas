const {
  ASSESSMENT_QUESTIONS,
  calculateAssessmentResults,
  generateRoadmapActions,
} = require('./utils/assessmentData');

console.log('--- Testing Assessment Engine & Scoring Logic ---');

// 1. Verify Questions
console.log(`Total Assessment Questions: ${ASSESSMENT_QUESTIONS.length}`);
if (ASSESSMENT_QUESTIONS.length !== 8) throw new Error('Expected 8 questions');

// 2. Test Scoring with Basic Grassroots Answers
const basicAnswers = ASSESSMENT_QUESTIONS.map((q) => ({
  questionId: q.id,
  domain: q.domain,
  questionText: q.title,
  selectedOptionText: q.options[0].text,
  scoreValue: 1, // All option 1 -> lowest score
}));

const basicResults = calculateAssessmentResults(basicAnswers, {
  name: 'Seva Sankalp Trust',
  focusArea: 'Education & Literacy',
  location: { setting: 'Rural' },
});

console.log(`\nBasic Profile Overall Score: ${basicResults.overallScore}/100`);
console.log(`Basic Maturity Tier: ${basicResults.maturityTier}`);
if (basicResults.maturityTier !== 'Basic') throw new Error('Expected Basic tier');

const basicActions = generateRoadmapActions(basicResults.domainScores, {
  name: 'Seva Sankalp Trust',
});
console.log(`Generated Actions for Basic Tier: ${basicActions.length} actions`);
basicActions.forEach((a, i) => {
  console.log(`  ${i + 1}. [${a.priority}] ${a.title} (Effort: ${a.effort})`);
});

// 3. Test Scoring with Advanced Established Answers
const advancedAnswers = ASSESSMENT_QUESTIONS.map((q) => ({
  questionId: q.id,
  domain: q.domain,
  questionText: q.title,
  selectedOptionText: q.options[3].text,
  scoreValue: 4, // All option 4 -> highest score
}));

const advResults = calculateAssessmentResults(advancedAnswers, {
  name: 'Catalyst Global Action',
  focusArea: 'Healthcare & Nutrition',
  location: { setting: 'Urban' },
});

console.log(`\nAdvanced Profile Overall Score: ${advResults.overallScore}/100`);
console.log(`Advanced Maturity Tier: ${advResults.maturityTier}`);
if (advResults.maturityTier !== 'Established') throw new Error('Expected Established tier');

const advActions = generateRoadmapActions(advResults.domainScores, {
  name: 'Catalyst Global Action',
});
console.log(`Generated Actions for Established Tier: ${advActions.length} actions`);
advActions.forEach((a, i) => {
  console.log(`  ${i + 1}. [${a.priority}] ${a.title} (Effort: ${a.effort})`);
});

console.log('\n=========================================');
console.log(' ASSESSMENT ENGINE VERIFIED SUCCESSFULLY! ');
console.log('=========================================\n');

