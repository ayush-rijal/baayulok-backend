import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePatients } from '../hooks/usePatients';
import PatientDetail from '../components/patients/PatientDetail';
import DocumentsPanel from '../components/patients/DocumentsPanel';
import DonationsPanel from '../components/patients/DonationsPanel';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';
import Button from '../components/ui/Button';

const TAB_STYLES = (active) => ({
  padding: '8px 18px',
  fontSize: '13.5px',
  fontWeight: 500,
  cursor: 'pointer',
  border: 'none',
  borderBottom: active ? '2px solid #1D9E75' : '2px solid transparent',
  background: 'transparent',
  color: active ? '#1D9E75' : '#6B6860',
  transition: 'all 0.15s',
});

export default function PatientDetailPage() {
  const { id } = useParams();
  const { fetchOne, fetchDocuments, addDocument, fetchDonations, addDonation } = usePatients();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState('overview'); // 'overview' | 'documents' | 'donations'

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchOne(id);
        if (!data) throw new Error('Patient not found.');
        setPatient(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  return (
    <div>
      {/* Back + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
        <Button variant="secondary" size="sm" onClick={() => navigate('/patients')}>
          ← Back
        </Button>
        <h1 style={{ fontSize: '26px', fontWeight: 400, fontFamily: 'Georgia, serif' }}>
          {patient?.name || 'Patient detail'}
        </h1>
      </div>

      {loading && <Spinner />}
      <Alert type="error" message={error} />

      {!loading && patient && (
        <div style={{ maxWidth: '760px' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #E2DDD6', marginBottom: '24px' }}>
            {[
              { key: 'overview',  label: '📋 Overview' },
              { key: 'documents', label: '📄 Documents' },
              { key: 'donations', label: '💰 Donations' },
            ].map((t) => (
              <button key={t.key} style={TAB_STYLES(tab === t.key)} onClick={() => setTab(t.key)}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab panels */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: '10px', padding: '28px' }}>
            {tab === 'overview' && <PatientDetail patient={patient} />}

            {tab === 'documents' && (
              <DocumentsPanel
                patientId={id}
                fetchDocuments={fetchDocuments}
                addDocument={addDocument}
              />
            )}

            {tab === 'donations' && (
              <DonationsPanel
                patientId={id}
                fetchDonations={fetchDonations}
                addDonation={addDonation}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}