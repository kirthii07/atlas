const RAW_URL = import.meta.env.VITE_API_BASE_URL || 'https://atlas-4by0.onrender.com';
const CLEAN_URL = RAW_URL.replace(/\/+$/, '');
export const API_BASE = CLEAN_URL.endsWith('/api') ? CLEAN_URL : `${CLEAN_URL}/api`;

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (err) {
    console.warn('API health check error:', err);
    return { status: 'offline', database: { connected: false, mode: 'Offline' } };
  }
}

export async function fetchQuestions() {
  const res = await fetch(`${API_BASE}/assessments/questions`);
  if (!res.ok) throw new Error('Failed to fetch questions');
  return await res.json();
}

export async function saveOrganization(orgData) {
  const res = await fetch(`${API_BASE}/organizations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orgData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to save organization profile');
  }
  return await res.json();
}

export async function submitAssessment(payload) {
  const res = await fetch(`${API_BASE}/assessments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to submit assessment');
  }
  return await res.json();
}

export async function fetchRoadmap(id) {
  const res = await fetch(`${API_BASE}/roadmaps/${id}`);
  if (!res.ok) throw new Error('Failed to fetch roadmap');
  return await res.json();
}

export async function fetchRoadmapByOrg(orgId) {
  const res = await fetch(`${API_BASE}/roadmaps/organization/${orgId}`);
  if (!res.ok) throw new Error('Failed to fetch roadmap');
  return await res.json();
}

export async function updateActionStatus(roadmapId, actionId, status, notes) {
  const res = await fetch(`${API_BASE}/roadmaps/${roadmapId}/actions/${actionId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, notes }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to update action status');
  }
  return await res.json();
}

export async function addCustomAction(roadmapId, actionData) {
  const res = await fetch(`${API_BASE}/roadmaps/${roadmapId}/actions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(actionData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to add action');
  }
  return await res.json();
}
