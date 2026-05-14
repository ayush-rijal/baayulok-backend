import { useNavigate } from 'react-router-dom';

const fmtNPR = (n) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n ?? 0);

function critColor(score) {
  if (score >= 85) return '#E24B4A';
  if (score >= 70) return '#EF9F27';
  return '#1D9E75';
}

export function PatientCard({ patient, onContribute }) {
  const navigate = useNavigate();

  const raised    = patient.costRaised ?? 0;
  const pct       = patient.costTotal > 0 ? Math.min(100, Math.round((raised / patient.costTotal) * 100)) : 0;
  const remaining = Math.max(0, patient.costTotal - raised);
  const isFunded  = patient.status === 'Funded';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
        border: '1px solid #E2DDD6',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.07)';
      }}
    >
      {/* ── Header ── */}
      <div style={{ padding: '16px 16px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '10px' }}>
          <div style={{ minWidth: 0 }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {patient.name}
            </h3>
            <p style={{ marginTop: '2px', fontSize: '13px', color: '#6B6860' }}>
              {patient.age} yrs · {patient.gender}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
            {patient.isEmergency && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#FCEBEB', color: '#E24B4A', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '99px' }}>
                ⚠ Emergency
              </span>
            )}
            {patient.bipannaVerified && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#E1F5EE', color: '#0F6E56', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '99px' }}>
                ✓ Verified
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '12.5px', color: '#6B6860' }}>
          <span>🩺 {patient.departmentName ?? '—'}</span>
          <span>📍 {patient.district}</span>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ flex: 1, padding: '0 16px 12px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* Diagnosis */}
        <div style={{ background: '#F5F3EE', borderRadius: '8px', padding: '10px 12px' }}>
          <p style={{ fontSize: '10.5px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#6B6860' }}>
            Diagnosis
          </p>
          <p style={{ marginTop: '4px', fontSize: '13px', fontWeight: 500 }}>{patient.disease}</p>
          {patient.medicalSummary && (
            <p style={{ marginTop: '4px', fontSize: '11.5px', color: '#6B6860', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {patient.medicalSummary}
            </p>
          )}
        </div>

        {/* Funding progress */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', fontSize: '13px' }}>
            <span style={{ fontWeight: 600 }}>NPR {fmtNPR(raised)}</span>
            <span style={{ color: '#6B6860' }}>of {fmtNPR(patient.costTotal)}</span>
          </div>
          <div style={{ height: '7px', background: '#E2DDD6', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: '#1D9E75', borderRadius: '99px', transition: 'width 0.4s ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#6B6860' }}>
            <span style={{ fontWeight: 600, color: '#1D9E75' }}>{pct}% funded</span>
            <span>NPR {fmtNPR(remaining)} to go</span>
          </div>
        </div>

        {/* Criticality */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #E2DDD6', borderRadius: '6px', padding: '7px 12px', fontSize: '12px' }}>
          <span style={{ color: '#6B6860' }}>Criticality</span>
          <span style={{ fontWeight: 700, color: critColor(patient.criticalityScore) }}>
            {patient.criticalityScore}/100
          </span>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ display: 'flex', gap: '8px', padding: '0 16px 16px' }}>
        <button
          disabled={isFunded}
          onClick={() => !isFunded && onContribute && onContribute(patient)}
          style={{
            flex: 1,
            padding: '9px',
            borderRadius: '7px',
            border: 'none',
            background: isFunded ? '#E2DDD6' : '#1D9E75',
            color: isFunded ? '#6B6860' : '#FFFFFF',
            fontSize: '13.5px',
            fontWeight: 600,
            cursor: isFunded ? 'not-allowed' : 'pointer',
            transition: 'background 0.15s',
          }}
        >
          {isFunded ? 'Fully Funded' : 'Contribute'}
        </button>

        <button
          onClick={() => navigate(`/patients/${patient.id}`)}
          style={{
            padding: '9px 16px',
            borderRadius: '7px',
            border: '1px solid #E2DDD6',
            background: '#FFFFFF',
            fontSize: '13.5px',
            fontWeight: 500,
            cursor: 'pointer',
            color: '#1A1917',
            transition: 'background 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#F5F3EE')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#FFFFFF')}
        >
          Details
        </button>
      </div>
    </div>
  );
}