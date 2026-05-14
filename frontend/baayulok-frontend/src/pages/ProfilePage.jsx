import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';

export default function ProfilePage() {
  const { user, token, logout } = useAuth();

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 400, fontFamily: 'Georgia, serif' }}>Profile</h1>
        <p style={{ fontSize: '13.5px', color: '#6B6860', marginTop: '3px' }}>Your account details</p>
      </div>

      <div style={{ background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: '10px', padding: '28px', maxWidth: '480px' }}>
        {/* User info */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '11.5px', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
            Full name
          </div>
          <div style={{ fontSize: '15px', fontWeight: 500 }}>{user?.fullName || '—'}</div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '11.5px', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
            Email
          </div>
          <div style={{ fontSize: '15px' }}>{user?.email || '—'}</div>
        </div>

        {/* Token preview */}
        {token && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '11.5px', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
              Access token (JWT)
            </div>
            <div style={{ background: '#E6F1FB', border: '1px solid #B5D4F4', borderRadius: '6px', padding: '10px 14px', fontSize: '12px', color: '#185FA5', wordBreak: 'break-all' }}>
              {token.slice(0, 80)}…
            </div>
          </div>
        )}

        <div style={{ paddingTop: '16px', borderTop: '1px solid #E2DDD6' }}>
          <Button variant="danger" onClick={logout}>Sign out</Button>
        </div>
      </div>
    </div>
  );
}