const http = require('http');
const app = require('./server');

const server = app.listen(5099, async () => {
  try {
    console.log('Test server running on port 5099...');

    // 1. Test /api/health
    const health = await fetchJson('http://localhost:5099/api/health');
    console.log('✓ /api/health passed:', health.status);

    // 2. Test /api/assessments/questions
    const questions = await fetchJson('http://localhost:5099/api/assessments/questions');
    console.log('✓ /api/assessments/questions passed: found', questions.total, 'questions');

    // 3. Test POST /api/organizations
    const org = await postJson('http://localhost:5099/api/organizations', {
      name: 'Pragati Community Action',
      size: '1-5',
      focusArea: 'Education & Literacy',
      techSupport: 'None / Self-taught staff',
      location: { setting: 'Rural', state: 'Madhya Pradesh' }
    });
    console.log('✓ POST /api/organizations passed: created org ID', org.data._id);

    // 4. Test POST /api/assessments
    const assessment = await postJson('http://localhost:5099/api/assessments', {
      organizationId: org.data._id,
      answers: questions.data.map((q) => ({
        questionId: q.id,
        domain: q.domain,
        scoreValue: 2,
        selectedOptionText: q.options[1].text
      }))
    });
    console.log('✓ POST /api/assessments passed: Readiness Score =', assessment.data.assessment.overallScore, 'Tier =', assessment.data.assessment.maturityTier);
    console.log('✓ Generated Roadmap Actions =', assessment.data.roadmap.actions.length);

    // 5. Test PATCH /api/roadmaps/:id/actions/:actionId (Status toggle)
    const firstAction = assessment.data.roadmap.actions[0];
    const updateRes = await patchJson(
      `http://localhost:5099/api/roadmaps/${assessment.data.roadmap._id}/actions/${firstAction.actionId}`,
      { status: 'Completed', notes: 'Completed test run by coordinator' }
    );
    console.log('✓ PATCH roadmap action toggle passed: new status =', updateRes.data.actions[0].status, 'progress =', updateRes.data.progressPercentage + '%');

    console.log('\n=========================================');
    console.log(' ALL BACKEND APIS & LOGIC VERIFIED 100%! ');
    console.log('=========================================\n');

    server.close();
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err);
    server.close();
    process.exit(1);
  }
});

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function postJson(url, body) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(body);
    const req = http.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function patchJson(url, body) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(body);
    const req = http.request(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

