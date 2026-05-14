import { useState } from 'react';
import Alert from '../ui/Alert';
import Button from '../ui/Button';

const field = (label, children, required = false) => (
  <div style={{ marginBottom: '16px' }}>
    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 500, color: '#6B6860', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
      {label}{required && ' *'}
    </label>
    {children}
  </div>
);

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #E2DDD6',
  borderRadius: '6px',
  background: '#F5F3EE',
  fontSize: '14px',
  color: '#1A1917',
  outline: 'none',
};

export default function PatientForm({ initial = {}, onSubmit, onCancel, isEdit = false }) {
  const [form, setForm] = useState({
    name: initial.name || '',
    age: initial.age || '',
    gender: initial.gender || '',
    district: initial.district || '',
    disease: initial.disease || '',
    departmentId: initial.departmentId || '',
    createdByOfficerId: initial.createdByOfficerId || '',
    criticalityScore: initial.criticalityScore ?? '',
    costTotal: initial.costTotal || '',
    photoUrl: initial.photoUrl || '',
    medicalSummary: initial.medicalSummary || '',
    bipannaVerified: initial.bipannaVerified || false,
    isEmergency: initial.isEmergency || false,
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function set(key) {
    return (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  }

  function setCheck(key) {
    return (e) => setForm((prev) => ({ ...prev, [key]: e.target.checked }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (!form.name.trim()) return setError('Patient name is required.');
    if (!form.age || Number(form.age) <= 0) return setError('Age must be greater than 0.');
    if (!['Male', 'Female', 'Other'].includes(form.gender)) return setError('Gender must be Male, Female, or Other.');
    if (!form.district.trim()) return setError('District is required.');
    if (!form.disease.trim()) return setError('Disease is required.');
    if (!form.departmentId.trim()) return setError('Department ID is required.');
    const cs = Number(form.criticalityScore);
    if (cs < 0 || cs > 100) return setError('Criticality score must be 0–100.');
    if (!form.costTotal || Number(form.costTotal) <= 0) return setError('Cost total must be greater than 0.');
    if (!isEdit && !form.createdByOfficerId.trim()) return setError('Officer ID is required.');

    setSubmitting(true);
    try {
      const payload = {
        name: form.name,
        age: parseInt(form.age),
        gender: form.gender,
        district: form.district,
        disease: form.disease,
        departmentId: form.departmentId,
        criticalityScore: parseInt(form.criticalityScore),
        costTotal: parseFloat(form.costTotal),
        photoUrl: form.photoUrl || null,
        medicalSummary: form.medicalSummary || null,
        bipannaVerified: form.bipannaVerified,
        isEmergency: form.isEmergency,
        ...(!isEdit && { createdByOfficerId: form.createdByOfficerId }),
      };
      await onSubmit(payload);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Alert type="error" message={error} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        {field('Full name', <input style={inputStyle} value={form.name} onChange={set('name')} placeholder="Patient full name" />, true)}
        {field('Age', <input style={inputStyle} type="number" value={form.age} onChange={set('age')} placeholder="e.g. 35" />, true)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        {field('Gender',
          <select style={inputStyle} value={form.gender} onChange={set('gender')}>
            <option value="">Select…</option>
            {['Male', 'Female', 'Other'].map((g) => <option key={g}>{g}</option>)}
          </select>, true
        )}
        {field('District', <input style={inputStyle} value={form.district} onChange={set('district')} placeholder="e.g. Kathmandu" />, true)}
      </div>

      {field('Disease', <input style={inputStyle} value={form.disease} onChange={set('disease')} placeholder="e.g. Acute lymphoblastic leukemia" />, true)}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        {field('Department ID', <input style={inputStyle} value={form.departmentId} onChange={set('departmentId')} placeholder="UUID" />, true)}
        {!isEdit && field('Officer ID', <input style={inputStyle} value={form.createdByOfficerId} onChange={set('createdByOfficerId')} placeholder="Your officer UUID" />, true)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        {field('Criticality score (0–100)', <input style={inputStyle} type="number" min={0} max={100} value={form.criticalityScore} onChange={set('criticalityScore')} placeholder="e.g. 75" />, true)}
        {field('Total cost (Rs.)', <input style={inputStyle} type="number" min={0.01} step={0.01} value={form.costTotal} onChange={set('costTotal')} placeholder="e.g. 500000" />, true)}
      </div>

      {field('Photo URL', <input style={inputStyle} type="url" value={form.photoUrl} onChange={set('photoUrl')} placeholder="https://…" />)}

      {field('Medical summary',
        <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={form.medicalSummary} onChange={set('medicalSummary')} />
      )}

      <div style={{ display: 'flex', gap: '20px', marginBottom: '8px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', cursor: 'pointer' }}>
          <input type="checkbox" checked={form.bipannaVerified} onChange={setCheck('bipannaVerified')} style={{ accentColor: '#1D9E75' }} />
          Bipanna verified
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', cursor: 'pointer' }}>
          <input type="checkbox" checked={form.isEmergency} onChange={setCheck('isEmergency')} style={{ accentColor: '#E24B4A' }} />
          Emergency case
        </label>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #E2DDD6' }}>
        <Button variant="secondary" onClick={onCancel} type="button">Cancel</Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Saving…' : isEdit ? 'Save changes' : 'Create patient'}
        </Button>
      </div>
    </form>
  );
}