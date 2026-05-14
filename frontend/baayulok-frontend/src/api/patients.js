import client from './client';

/** GET /api/patients */
export async function getAllPatients() {
  const res = await client.get('/api/Patients');
  return res.data;
}

/** GET /api/patients/:id */
export async function getPatientById(id) {
  const res = await client.get(`/api/patients/${id}`);
  return res.data;
}

/** POST /api/patients */
export async function createPatient(data) {
  const res = await client.post('/api/patients', data);
  return res.data;
}

/**
 * PUT /api/patients/:id
 * Full update — all fields required
 */
export async function updatePatient(id, data) {
  const res = await client.put(`/api/patients/${id}`, data);
  return res.data;
}

/**
 * PATCH /api/patients/:id/status
 * Partial update — only status field
 */
export async function updatePatientStatus(id, status) {
  const res = await client.patch(`/api/patients/${id}/status`, { status });
  return res.data;
}

// ─── Documents ────────────────────────────────────────────────

/** GET /api/patients/:patientId/documents */
export async function getPatientDocuments(patientId) {
  const res = await client.get(`/api/patients/${patientId}/documents`);
  return res.data;
}

/**
 * POST /api/patients/:patientId/documents
 * Body: { type, fileUrl, originalFileName }
 */
export async function createPatientDocument(patientId, data) {
  const res = await client.post(`/api/patients/${patientId}/documents`, data);
  return res.data; // { documentId }
}

// ─── Donations ────────────────────────────────────────────────

/** GET /api/patients/:patientId/donations */
export async function getPatientDonations(patientId) {
  const res = await client.get(`/api/patients/${patientId}/donations`);
  return res.data;
}

/**
 * POST /api/patients/:patientId/donations
 * Body: { donorUserId, amount, paymentMethod, gatewayReference, message }
 */
export async function createDonation(patientId, data) {
  const res = await client.post(`/api/patients/${patientId}/donations`, data);
  return res.data; // { donationId }
}