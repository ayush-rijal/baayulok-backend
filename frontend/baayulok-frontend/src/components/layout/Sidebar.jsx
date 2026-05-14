import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { to: '/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/patients', icon: '🏥', label: 'Patients' },
  { to: '/profile', icon: '👤', label: 'Profile' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <nav
      style={{
        width: '220px',
        background: '#1A1917',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '24px 20px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <h1 style={{ fontSize: '22px', fontWeight: 400, color: '#fff', fontFamily: 'Georgia, serif' }}>
          BaayuLok
        </h1>
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '2px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          Medical Case Manager
        </p>
      </div>

      {/* Nav links */}
      <div style={{ flex: 1, padding: '16px 0' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 20px',
              fontSize: '13.5px',
              color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
              background: isActive ? 'rgba(29,158,117,0.2)' : 'transparent',
              borderLeft: isActive ? '2px solid #1D9E75' : '2px solid transparent',
              textDecoration: 'none',
              transition: 'all 0.15s',
            })}
          >
            <span style={{ fontSize: '15px' }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '16px 20px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.35)',
        }}
      >
        <div style={{ marginBottom: '6px' }}>{user?.email}</div>
        <button
          onClick={logout}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '11px',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          Sign out →
        </button>
      </div>
    </nav>
  );
}