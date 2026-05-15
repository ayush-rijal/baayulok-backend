import { useEffect, useState } from 'react';
import { usePatients } from '../hooks/usePatients';
import StatCard from '../components/dashboard/StatCard';
import { PatientCard } from '../components/patients/PatientCard';
import { AddPatientDialog } from '../components/patients/AddPatientDialog';
import PatientDetailModal from '../components/patients/PatientDetailModal';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';
import { ALL_STATUSES } from '../styles/utils';

export default function DashboardPage() {
  const { patients, loading, error, fetchAll } = usePatients();
  const [search, setSearch]             = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedId, setSelectedId]     = useState<string | null>(null);

  useEffect(() => { fetchAll(); }, []);

  const total     = patients.length;
  const active    = patients.filter((p) => p.status === 'Active').length;
  const emergency = patients.filter((p) => p.isEmergency).length;
  const funded    = patients.filter((p) => p.status === 'Funded').length;

  const filtered = patients.filter((p) => {
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch = !q
      || p.name?.toLowerCase().includes(q)
      || p.disease?.toLowerCase().includes(q)
      || p.district?.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <div style={{ maxWidth: '1200px' }}>

      {/* Detail modal */}
      {selectedId && (
        <PatientDetailModal
          patientId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 400, fontFamily: 'Georgia, serif', color: '#1A1917' }}>Dashboard</h1>
          <p style={{ fontSize: '13.5px', color: '#6B6860', marginTop: '3px' }}>Manage and track patient fundraising cases</p>
        </div>
        <AddPatientDialog onCreated={() => fetchAll()} />
      </div>

      <Alert type="error" message={error} />

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '36px' }}>
        <StatCard label="Total cases" value={total}     tagLabel="All time"   tagColor="teal" />
        <StatCard label="Active"      value={active}    tagLabel="Live cases"  tagColor="teal" />
        <StatCard label="Emergency"   value={emergency} tagLabel="Urgent"      tagColor="red"  />
        <StatCard label="Funded"      value={funded}    tagLabel="Completed"   tagColor="blue" />
      </div>

      {/* Search & filter */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#1A1917' }}>All patient cases</h2>
          <p style={{ fontSize: '12.5px', color: '#6B6860', marginTop: '2px' }}>
            {filtered.length} case{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#9B978F' }}>🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, disease, district…"
              style={{ padding: '8px 12px 8px 32px', border: '1px solid #E2DDD6', borderRadius: '6px', background: '#FFFFFF', fontSize: '13.5px', outline: 'none', fontFamily: 'inherit', minWidth: '220px' }}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {(['All', ...ALL_STATUSES] as string[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                style={{
                  padding: '5px 13px', borderRadius: '99px', fontSize: '12px', fontWeight: 500,
                  cursor: 'pointer', border: '1px solid', fontFamily: 'inherit', transition: 'all 0.15s',
                  background:  statusFilter === s ? '#E1F5EE' : '#FFFFFF',
                  borderColor: statusFilter === s ? '#1D9E75' : '#E2DDD6',
                  color:       statusFilter === s ? '#0F6E56' : '#6B6860',
                }}
              >{s}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      {loading && <Spinner />}

      {!loading && filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ fontSize: '40px', marginBottom: '14px' }}>🏥</div>
          <h3 style={{ fontSize: '16px', fontWeight: 500, marginBottom: '6px', color: '#1A1917' }}>No cases found</h3>
          <p style={{ fontSize: '13.5px', color: '#6B6860' }}>
            {search || statusFilter !== 'All' ? 'Try a different search or filter.' : 'Add the first patient case to get started.'}
          </p>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {filtered.map((p) => (
            <PatientCard
              key={p.id}
              patient={p}
              onContribute={(patient) => setSelectedId(patient.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}