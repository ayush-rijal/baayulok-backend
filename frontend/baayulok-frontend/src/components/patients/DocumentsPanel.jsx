import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import Alert from '../ui/Alert';
import Spinner from '../ui/Spinner';

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

const labelStyle = {
  display: 'block',
  fontSize: '12.5px',
  fontWeight: 500,
  color: '#6B6860',
  marginBottom: '6px',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};

const DOC_TYPES = ['MedicalReport', 'Prescription', 'LabResult', 'IDProof', 'BipannaCard', 'Other'];

export default function DocumentsPanel({ patientId, fetchDocuments, addDocument }) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ type: '', fileUrl: '', originalFileName: '' });

  async function load() {
    setLoading(true);
    const data = await fetchDocuments(patientId);
    setDocs(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, [patientId]);

  function set(key) {
    return (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!form.type) return setError('Document type is required.');
    if (!form.fileUrl.trim()) return setError('File URL is required.');
    if (!form.originalFileName.trim()) return setError('File name is required.');
    setSubmitting(true);
    try {
      await addDocument(patientId, form);
      setSuccess('Document added successfully.');
      setForm({ type: '', fileUrl: '', originalFileName: '' });
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 600 }}>Documents</h3>
        <Button size="sm" onClick={() => { setShowForm(!showForm); setError(null); setSuccess(null); }}>
          {showForm ? 'Cancel' : '+ Add document'}
        </Button>
      </div>

      <Alert type="error" message={error} />
      <Alert type="success" message={success} />

      {/* Upload form */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: '#F5F3EE', borderRadius: '8px', padding: '16px', marginBottom: '16px', border: '1px solid #E2DDD6' }}>
          <div style={{ marginBottom: '12px' }}>
            <label style={labelStyle}>Document type *</label>
            <select style={inputStyle} value={form.type} onChange={set('type')}>
              <option value="">Select type…</option>
              {DOC_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={labelStyle}>File URL *</label>
            <input style={inputStyle} value={form.fileUrl} onChange={set('fileUrl')} placeholder="https://storage.example.com/file.pdf" />
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}>Original file name *</label>
            <input style={inputStyle} value={form.originalFileName} onChange={set('originalFileName')} placeholder="medical-report.pdf" />
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Uploading…' : 'Save document'}
          </Button>
        </form>
      )}

      {/* Documents list */}
      {loading && <Spinner text="Loading documents…" />}

      {!loading && docs.length === 0 && (
        <div style={{ textAlign: 'center', padding: '32px 20px', color: '#6B6860', fontSize: '13.5px' }}>
          📄 No documents attached yet.
        </div>
      )}

      {!loading && docs.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {docs.map((doc) => (
            <div
              key={doc.id}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: '8px' }}
            >
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 500 }}>{doc.originalFileName}</div>
                <div style={{ fontSize: '11.5px', color: '#6B6860', marginTop: '2px' }}>
                  <span style={{ background: '#E6F1FB', color: '#185FA5', padding: '1px 7px', borderRadius: '99px', fontSize: '11px', fontWeight: 600 }}>
                    {doc.type}
                  </span>
                  {doc.createdAt && (
                    <span style={{ marginLeft: '8px' }}>
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <a
                href={doc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '12.5px', color: '#1D9E75', fontWeight: 500, textDecoration: 'none' }}
              >
                View ↗
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}