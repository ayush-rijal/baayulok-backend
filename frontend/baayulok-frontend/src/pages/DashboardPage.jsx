// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { usePatients } from '../hooks/usePatients';
// import StatCard from '../components/dashboard/StatCard';
// import StatusBadge from '../components/patients/StatusBadge';
// import { PatientCard } from '../components/patients/PatientCard';
// import { AddPatientDialog } from '../components/patients/AddPatientDialog';
// import Spinner from '../components/ui/Spinner';
// import Alert from '../components/ui/Alert';
// import Button from '../components/ui/Button';
// import { formatMoney, critColor, ALL_STATUSES } from '../styles/utils';

// export default function DashboardPage() {
//   const { patients, loading, error, fetchAll } = usePatients();
//   const navigate = useNavigate();
//   const [search, setSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');

//   useEffect(() => { fetchAll(); }, []);

//   // Stats
//   const total     = patients.length;
//   const active    = patients.filter((p) => p.status === 'Active').length;
//   const emergency = patients.filter((p) => p.isEmergency).length;
//   const funded    = patients.filter((p) => p.status === 'Funded').length;

//   // Recent 5 for the summary table
//   const recent = [...patients]
//     .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
//     .slice(0, 5);

//   // Filtered cards
//   const filtered = patients.filter((p) => {
//     const matchStatus = statusFilter === 'All' || p.status === statusFilter;
//     const q = search.toLowerCase();
//     const matchSearch =
//       !q ||
//       p.name?.toLowerCase().includes(q) ||
//       p.disease?.toLowerCase().includes(q) ||
//       p.district?.toLowerCase().includes(q);
//     return matchStatus && matchSearch;
//   });

//   function handlePatientCreated() {
//     fetchAll();
//   }

//   return (
//     <div>
//       {/* ── Page header ── */}
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
//         <div>
//           <h1 style={{ fontSize: '28px', fontWeight: 400, fontFamily: 'Georgia, serif' }}>Dashboard</h1>
//           <p style={{ fontSize: '13.5px', color: '#6B6860', marginTop: '3px' }}>
//             Manage and track patient fundraising cases
//           </p>
//         </div>
//         <AddPatientDialog onCreated={handlePatientCreated} />
//       </div>

//       <Alert type="error" message={error} />

//       {/* ── Stats ── */}
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '28px' }}>
//         <StatCard label="Total cases" value={total}     tagLabel="All time"   tagColor="teal" />
//         <StatCard label="Active"      value={active}    tagLabel="Live cases"  tagColor="teal" />
//         <StatCard label="Emergency"   value={emergency} tagLabel="Urgent"      tagColor="red"  />
//         <StatCard label="Funded"      value={funded}    tagLabel="Completed"   tagColor="blue" />
//       </div>

//       {/* ── Recent cases table ── */}
//       <div style={{ background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: '10px', overflow: 'hidden', marginBottom: '36px' }}>
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #E2DDD6' }}>
//           <span style={{ fontSize: '14.5px', fontWeight: 600 }}>Recent cases</span>
//           <Button variant="secondary" size="sm" onClick={() => navigate('/patients')}>
//             View all →
//           </Button>
//         </div>

//         {loading && <Spinner />}

//         {!loading && recent.length === 0 && (
//           <div style={{ textAlign: 'center', padding: '60px 20px' }}>
//             <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏥</div>
//             <h3 style={{ fontSize: '16px', fontWeight: 500, marginBottom: '6px' }}>No patients yet</h3>
//             <p style={{ fontSize: '13.5px', color: '#6B6860' }}>Add the first patient case to get started.</p>
//           </div>
//         )}

//         {!loading && recent.length > 0 && (
//           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//             <thead>
//               <tr>
//                 {['Name', 'Disease', 'Status', 'Criticality', 'Cost total'].map((h) => (
//                   <th key={h} style={{ fontSize: '11.5px', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.04em', padding: '10px 16px', textAlign: 'left', borderBottom: '1px solid #E2DDD6', background: '#F5F3EE' }}>
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {recent.map((p) => (
//                 <tr
//                   key={p.id}
//                   onClick={() => navigate(`/patients/${p.id}`)}
//                   style={{ borderBottom: '1px solid #E2DDD6', cursor: 'pointer' }}
//                 >
//                   <td style={{ padding: '12px 16px' }}>
//                     <strong style={{ fontSize: '13.5px' }}>{p.name}</strong>
//                     <div style={{ fontSize: '12px', color: '#6B6860', marginTop: '2px' }}>
//                       {p.district} · {p.age}y {p.gender}
//                     </div>
//                   </td>
//                   <td style={{ padding: '12px 16px', fontSize: '13.5px' }}>{p.disease}</td>
//                   <td style={{ padding: '12px 16px' }}>
//                     <StatusBadge status={p.status} />
//                     {p.isEmergency && (
//                       <span style={{ fontSize: '11px', color: '#E24B4A', marginLeft: '6px' }}>🚨</span>
//                     )}
//                   </td>
//                   <td style={{ padding: '12px 16px' }}>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                       <div style={{ width: '80px', height: '6px', borderRadius: '99px', background: '#E2DDD6', overflow: 'hidden' }}>
//                         <div style={{ height: '100%', width: `${p.criticalityScore || 0}%`, background: critColor(p.criticalityScore || 0), borderRadius: '99px' }} />
//                       </div>
//                       <span style={{ fontSize: '12px' }}>{p.criticalityScore}</span>
//                     </div>
//                   </td>
//                   <td style={{ padding: '12px 16px', fontSize: '13.5px' }}>{formatMoney(p.costTotal)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* ── All patient cases ── */}
//       <div>
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
//           <div>
//             <h2 style={{ fontSize: '18px', fontWeight: 600 }}>All patient cases</h2>
//             <p style={{ fontSize: '12.5px', color: '#6B6860', marginTop: '2px' }}>
//               {filtered.length} case{filtered.length !== 1 ? 's' : ''} found
//             </p>
//           </div>

//           {/* Search + filter chips inline */}
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
//             <div style={{ position: 'relative', minWidth: '240px' }}>
//               <span style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: '#6B6860', fontSize: '14px' }}>🔍</span>
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search name, disease, district…"
//                 style={{ width: '100%', padding: '8px 12px 8px 34px', border: '1px solid #E2DDD6', borderRadius: '6px', background: '#FFFFFF', fontSize: '13.5px', outline: 'none', fontFamily: 'inherit' }}
//               />
//             </div>

//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
//               {['All', ...ALL_STATUSES].map((s) => (
//                 <button
//                   key={s}
//                   onClick={() => setStatusFilter(s)}
//                   style={{
//                     padding: '5px 13px', borderRadius: '99px', fontSize: '12px',
//                     fontWeight: 500, cursor: 'pointer', border: '1px solid',
//                     transition: 'all 0.15s', fontFamily: 'inherit',
//                     background:  statusFilter === s ? '#E1F5EE' : '#FFFFFF',
//                     borderColor: statusFilter === s ? '#1D9E75' : '#E2DDD6',
//                     color:       statusFilter === s ? '#0F6E56' : '#6B6860',
//                   }}
//                 >
//                   {s}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {loading && <Spinner />}

//         {!loading && filtered.length === 0 && (
//           <div style={{ textAlign: 'center', padding: '80px 20px' }}>
//             <div style={{ fontSize: '44px', marginBottom: '14px' }}>🏥</div>
//             <h3 style={{ fontSize: '17px', fontWeight: 500, marginBottom: '6px' }}>No cases found</h3>
//             <p style={{ fontSize: '13.5px', color: '#6B6860' }}>
//               {search || statusFilter !== 'All'
//                 ? 'Try a different search or filter.'
//                 : 'Add the first patient case to get started.'}
//             </p>
//           </div>
//         )}

//         {!loading && filtered.length > 0 && (
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '18px' }}>
//             {filtered.map((p) => (
//               <PatientCard
//                 key={p.id}
//                 patient={p}
//                 onContribute={(patient) => navigate(`/patients/${patient.id}`)}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '../hooks/usePatients';
import StatCard from '../components/dashboard/StatCard';
import { PatientCard } from '../components/patients/PatientCard';
import { AddPatientDialog } from '../components/patients/AddPatientDialog';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';
import { ALL_STATUSES } from '../styles/utils';

export default function DashboardPage() {
  const { patients, loading, error, fetchAll } = usePatients();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => { fetchAll(); }, []);

  // Stats
  const total     = patients.length;
  const active    = patients.filter((p) => p.status === 'Active').length;
  const emergency = patients.filter((p) => p.isEmergency).length;
  const funded    = patients.filter((p) => p.status === 'Funded').length;

  // Filtered cards
  const filtered = patients.filter((p) => {
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.name?.toLowerCase().includes(q) ||
      p.disease?.toLowerCase().includes(q) ||
      p.district?.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  function handlePatientCreated() {
    fetchAll();
  }

  return (
    <div>
      {/* ── Page header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 400, fontFamily: 'Georgia, serif' }}>Dashboard</h1>
          <p style={{ fontSize: '13.5px', color: '#6B6860', marginTop: '3px' }}>
            Manage and track patient fundraising cases
          </p>
        </div>
        <AddPatientDialog onCreated={handlePatientCreated} />
      </div>

      <Alert type="error" message={error} />

      {/* ── Stats ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '28px' }}>
        <StatCard label="Total cases" value={total}     tagLabel="All time"   tagColor="teal" />
        <StatCard label="Active"      value={active}    tagLabel="Live cases"  tagColor="teal" />
        <StatCard label="Emergency"   value={emergency} tagLabel="Urgent"      tagColor="red"  />
        <StatCard label="Funded"      value={funded}    tagLabel="Completed"   tagColor="blue" />
      </div>

      {/* ── All patient cases ── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 600 }}>All patient cases</h2>
            <p style={{ fontSize: '12.5px', color: '#6B6860', marginTop: '2px' }}>
              {filtered.length} case{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Search + filter chips inline */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            <div style={{ position: 'relative', minWidth: '240px' }}>
              <span style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: '#6B6860', fontSize: '14px' }}>🔍</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, disease, district…"
                style={{ width: '100%', padding: '8px 12px 8px 34px', border: '1px solid #E2DDD6', borderRadius: '6px', background: '#FFFFFF', fontSize: '13.5px', outline: 'none', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['All', ...ALL_STATUSES].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  style={{
                    padding: '5px 13px', borderRadius: '99px', fontSize: '12px',
                    fontWeight: 500, cursor: 'pointer', border: '1px solid',
                    transition: 'all 0.15s', fontFamily: 'inherit',
                    background:  statusFilter === s ? '#E1F5EE' : '#FFFFFF',
                    borderColor: statusFilter === s ? '#1D9E75' : '#E2DDD6',
                    color:       statusFilter === s ? '#0F6E56' : '#6B6860',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading && <Spinner />}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '44px', marginBottom: '14px' }}>🏥</div>
            <h3 style={{ fontSize: '17px', fontWeight: 500, marginBottom: '6px' }}>No cases found</h3>
            <p style={{ fontSize: '13.5px', color: '#6B6860' }}>
              {search || statusFilter !== 'All'
                ? 'Try a different search or filter.'
                : 'Add the first patient case to get started.'}
            </p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '18px' }}>
            {filtered.map((p) => (
              <PatientCard
                key={p.id}
                patient={p}
                onContribute={(patient) => navigate(`/patients/${patient.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}