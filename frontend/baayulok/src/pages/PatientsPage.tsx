// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { usePatients } from '../hooks/usePatients';
// import PatientTable from '../components/patients/PatientTable';
// import Button from '../components/ui/Button';
// import Alert from '../components/ui/Alert';
// import { ALL_STATUSES } from '../styles/utils';

// export default function PatientsPage() {
//   const { patients, loading, error, fetchAll, updateStatus } = usePatients();
//   const navigate = useNavigate();
//   const [search, setSearch]           = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');
//   const [statusError, setStatusError]   = useState<string | null>(null);

//   useEffect(() => { fetchAll(); }, []);

//   const filtered = patients.filter((p) => {
//     const matchStatus = statusFilter === 'All' || p.status === statusFilter;
//     const q = search.toLowerCase();
//     const matchSearch = !q
//       || p.name?.toLowerCase().includes(q)
//       || p.disease?.toLowerCase().includes(q);
//     return matchStatus && matchSearch;
//   });

//   async function handleStatusChange(id: string, status: string) {
//     setStatusError(null);
//     try {
//       await updateStatus(id, status);
//     } catch (err: any) {
//       setStatusError(err.message);
//     }
//   }

//   return (
//     <div style={{ maxWidth: '1200px' }}>

//       {/* Header */}
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
//         <div>
//           <h1 style={{ fontSize: '26px', fontWeight: 400, fontFamily: 'Georgia, serif', color: '#1A1917' }}>Patients</h1>
//           <p style={{ fontSize: '13.5px', color: '#6B6860', marginTop: '3px' }}>
//             {filtered.length} case{filtered.length !== 1 ? 's' : ''} found
//           </p>
//         </div>
//         <Button onClick={() => navigate('/patients/new')}>+ New patient</Button>
//       </div>

//       <Alert type="error" message={error ?? statusError} />

//       {/* Search & filter */}
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
//         <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
//           <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#9B978F' }}>🔍</span>
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search by name or disease…"
//             style={{ width: '100%', padding: '9px 12px 9px 32px', border: '1px solid #E2DDD6', borderRadius: '6px', background: '#FFFFFF', fontSize: '13.5px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
//           />
//         </div>

//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
//           {(['All', ...ALL_STATUSES] as string[]).map((s) => (
//             <button
//               key={s}
//               onClick={() => setStatusFilter(s)}
//               style={{
//                 padding: '5px 13px', borderRadius: '99px', fontSize: '12px', fontWeight: 500,
//                 cursor: 'pointer', border: '1px solid', fontFamily: 'inherit', transition: 'all 0.15s',
//                 background:  statusFilter === s ? '#E1F5EE' : '#FFFFFF',
//                 borderColor: statusFilter === s ? '#1D9E75' : '#E2DDD6',
//                 color:       statusFilter === s ? '#0F6E56' : '#6B6860',
//               }}
//             >{s}</button>
//           ))}
//         </div>
//       </div>

//       {/* Table */}
//       <div style={{ background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: '10px', overflow: 'hidden' }}>
//         <PatientTable patients={filtered} loading={loading} onStatusChange={handleStatusChange} />
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '../hooks/usePatients';
import PatientTable from '../components/patients/PatientTable';
import PatientDetailModal from '../components/patients/PatientDetailModal';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import { ALL_STATUSES } from '../styles/utils';

export default function PatientsPage() {
  const { patients, loading, error, fetchAll, updateStatus } = usePatients();
  const navigate = useNavigate();
  const [search, setSearch]             = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [statusError, setStatusError]   = useState<string | null>(null);
  const [selectedId, setSelectedId]     = useState<string | null>(null);

  useEffect(() => { fetchAll(); }, []);

  const filtered = patients.filter((p) => {
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch = !q
      || p.name?.toLowerCase().includes(q)
      || p.disease?.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  async function handleStatusChange(id: string, status: string) {
    setStatusError(null);
    try {
      await updateStatus(id, status);
    } catch (err: any) {
      setStatusError(err.message);
    }
  }

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
          <h1 style={{ fontSize: '26px', fontWeight: 400, fontFamily: 'Georgia, serif', color: '#1A1917' }}>Patients</h1>
          <p style={{ fontSize: '13.5px', color: '#6B6860', marginTop: '3px' }}>
            {filtered.length} case{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <Button onClick={() => navigate('/patients/new')}>+ New patient</Button>
      </div>

      <Alert type="error" message={error ?? statusError} />

      {/* Search & filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#9B978F' }}>🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or disease…"
            style={{ width: '100%', padding: '9px 12px 9px 32px', border: '1px solid #E2DDD6', borderRadius: '6px', background: '#FFFFFF', fontSize: '13.5px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
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

      {/* Table */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: '10px', overflow: 'hidden' }}>
        <PatientTable
          patients={filtered}
          loading={loading}
          onStatusChange={handleStatusChange}
          onViewDetail={(id) => setSelectedId(id)}
        />
      </div>
    </div>
  );
}