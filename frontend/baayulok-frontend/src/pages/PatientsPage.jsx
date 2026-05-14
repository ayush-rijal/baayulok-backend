import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '../hooks/usePatients';
import PatientTable from '../components/patients/PatientTable';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import { ALL_STATUSES } from '../styles/utils';

export default function PatientsPage() {
  const { patients, loading, error, fetchAll, updateStatus } = usePatients();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [statusError, setStatusError] = useState(null);

  useEffect(() => { fetchAll(); }, []);

  const filtered = patients.filter((p) => {
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || p.name?.toLowerCase().includes(q) || p.disease?.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  async function handleStatusChange(id, status) {
    setStatusError(null);
    try {
      await updateStatus(id, status);
    } catch (err) {
      setStatusError(err.message);
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 400, fontFamily: 'Georgia, serif' }}>Patients</h1>
          <p style={{ fontSize: '13.5px', color: '#6B6860', marginTop: '3px' }}>
            {filtered.length} case{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <Button onClick={() => navigate('/patients/new')}>+ New patient</Button>
      </div>

      <Alert type="error" message={error || statusError} />

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6B6860', fontSize: '15px' }}>🔍</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or disease…"
          style={{ width: '100%', padding: '10px 12px 10px 36px', border: '1px solid #E2DDD6', borderRadius: '6px', background: '#FFFFFF', fontSize: '14px', outline: 'none' }}
        />
      </div>

      {/* Status chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
        {['All', ...ALL_STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            style={{
              padding: '4px 12px',
              borderRadius: '99px',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              border: '1px solid',
              transition: 'all 0.15s',
              background: statusFilter === s ? '#E1F5EE' : '#FFFFFF',
              borderColor: statusFilter === s ? '#1D9E75' : '#E2DDD6',
              color: statusFilter === s ? '#0F6E56' : '#6B6860',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: '10px', overflow: 'hidden' }}>
        <PatientTable patients={filtered} loading={loading} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
}