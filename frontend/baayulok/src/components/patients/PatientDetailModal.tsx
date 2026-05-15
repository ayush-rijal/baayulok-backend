import { useEffect, useState } from 'react';
import { usePatients } from '../../hooks/usePatients';
import Modal from '../ui/Modal';
import PatientDetail from './PatientDetail';
import DocumentsPanel from './DocumentsPanel';
import DonationsPanel from './DonationsPanel';
import Spinner from '../ui/Spinner';
import Alert from '../ui/Alert';
import type { Patient } from '../../types';

// ─── Types ────────────────────────────────────────────────────────
type Tab = 'overview' | 'documents' | 'donations';

const TABS: { key: Tab; label: string }[] = [
  { key: 'overview',  label: 'Overview'  },
  { key: 'documents', label: 'Documents' },
  { key: 'donations', label: 'Donations' },
];

interface PatientDetailModalProps {
  patientId: string;
  onClose: () => void;
}

// ─── Component ────────────────────────────────────────────────────
export default function PatientDetailModal({ patientId, onClose }: PatientDetailModalProps) {
  const { fetchOne, fetchDocuments, addDocument, fetchDonations, addDonation } = usePatients();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [tab, setTab]         = useState<Tab>('overview');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchOne(patientId);
        if (!data) throw new Error('Patient not found.');
        setPatient(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [patientId]);

  return (
    <Modal title={patient?.name ?? 'Patient detail'} onClose={onClose}>


      {loading && <Spinner />}
      <Alert type="error" message={error} />

      {!loading && patient && (
        // This wrapper fills the scrollable area given by Modal and keeps
        // tabs sticky at the top while the panel content scrolls beneath.
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>

          {/* Sticky tab bar — sticks to top of the Modal's scroll container */}
          <div
            style={{
              position: 'sticky',
              top: '-24px',      /* counteracts the 24px padding of Modal's body */
              zIndex: 1,
              background: '#FFFFFF',
              display: 'flex',
              borderBottom: '1px solid #E2DDD6',
              marginBottom: '24px',
              marginLeft: '-24px',
              marginRight: '-24px',
              paddingLeft: '24px',
              paddingTop: '4px',
            }}
          >
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{
                  padding: '8px 18px',
                  fontSize: '13.5px',
                  fontWeight: tab === key ? 600 : 400,
                  cursor: 'pointer',
                  border: 'none',
                  borderBottom: tab === key ? '2px solid #1D9E75' : '2px solid transparent',
                  background: 'transparent',
                  color: tab === key ? '#1D9E75' : '#6B6860',
                  fontFamily: 'inherit',
                  transition: 'color 0.15s',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Panel — content scrolls inside Modal's scrollable body */}
          {tab === 'overview' && <PatientDetail patient={patient} />}

          {tab === 'documents' && (
            <DocumentsPanel
              patientId={patientId}
              fetchDocuments={fetchDocuments}
              addDocument={addDocument}
            />
          )}

          {tab === 'donations' && (
            <DonationsPanel
              patientId={patientId}
              fetchDonations={fetchDonations}
              addDonation={addDonation}
            />
          )}
        </div>
      )}
    </Modal>
  );
}