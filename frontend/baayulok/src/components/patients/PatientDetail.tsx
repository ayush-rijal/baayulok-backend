import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import Button from '../ui/Button';
import { formatMoney, critColor } from '../../styles/utils';
import type { Patient } from '../../types';

function DetailItem({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div>
      <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '4px' }}>{label}</label>
      <span style={{ fontSize: '14px' }}>{value ?? '—'}</span>
    </div>
  );
}

export default function PatientDetail({ patient }: { patient: Patient }) {
  const navigate = useNavigate();
  const p = patient;
  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
        <StatusBadge status={p.status} />
        {p.isEmergency && <span style={{ background: '#FCEBEB', color: '#E24B4A', fontSize: '11px', fontWeight: 600, padding: '3px 9px', borderRadius: '99px' }}>🚨 Emergency</span>}
        {p.bipannaVerified && <span style={{ background: '#E1F5EE', color: '#0F6E56', fontSize: '11px', fontWeight: 600, padding: '3px 9px', borderRadius: '99px' }}>✓ Bipanna Verified</span>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        <DetailItem label="Age" value={`${p.age} years`} />
        <DetailItem label="Gender" value={p.gender} />
        <DetailItem label="District" value={p.district} />
        <DetailItem label="Disease" value={p.disease} />
        <DetailItem label="Cost total" value={formatMoney(p.costTotal)} />
        <DetailItem label="Cost raised" value={formatMoney(p.costRaised)} />
        <div>
          <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>Criticality score</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '120px', height: '8px', borderRadius: '99px', background: '#E2DDD6', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${p.criticalityScore || 0}%`, background: critColor(p.criticalityScore || 0), borderRadius: '99px' }} />
            </div>
            <span style={{ fontSize: '14px', fontWeight: 500 }}>{p.criticalityScore}/100</span>
          </div>
        </div>
      </div>
      {p.medicalSummary && (
        <div style={{ marginTop: '12px' }}>
          <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>Medical summary</label>
          <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: '#1A1917' }}>{p.medicalSummary}</p>
        </div>
      )}
      <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #E2DDD6' }}>
        <Button onClick={() => navigate(`/patients/${p.id}/edit`)}>Edit patient</Button>
      </div>
    </div>
  );
}