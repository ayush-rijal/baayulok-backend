// import { Link } from 'react-router-dom';
// import { ArrowRight, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';

// const trustItems = [
//   { icon: ShieldCheck,    label: 'Bipanna Verified',   desc: 'Identity & need certified' },
//   { icon: HeartHandshake, label: 'Direct to Hospital', desc: 'Funds paid to providers'   },
//   { icon: Sparkles,       label: 'Transparent',        desc: 'Every transaction tracked' },
// ];

// const howItWorks = [
//   {
//     step: '01',
//     title: 'Browse cases',
//     desc: 'View verified patients who need urgent financial support for treatment.',
//   },
//   {
//     step: '02',
//     title: 'Choose to help',
//     desc: 'Select a patient and contribute any amount via Esewa, Khalti, or bank transfer.',
//   },
//   {
//     step: '03',
//     title: 'Track impact',
//     desc: "Follow the patient's progress and see how your contribution is used.",
//   },
// ];

// const btnBase = {
//   display: 'inline-flex', alignItems: 'center', gap: '8px',
//   padding: '12px 24px', borderRadius: '8px', fontSize: '15px',
//   fontWeight: 600, cursor: 'pointer', textDecoration: 'none',
//   fontFamily: 'inherit', transition: 'all 0.15s', border: 'none',
// };

// export default function IndexPage() {
//   return (
//     <div style={{ minHeight: '100vh', background: '#F5F3EE', display: 'flex', flexDirection: 'column' }}>

//       {/* ── Navbar ── */}
//       <header style={{ borderBottom: '1px solid #E2DDD6', background: '#FFFFFF' }}>
//         <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <span style={{ width: '32px', height: '32px', background: '#1D9E75', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
//                 <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//               </svg>
//             </span>
//             <span style={{ fontSize: '17px', fontWeight: 700, color: '#1A1917' }}>
//               Bayu<span style={{ color: '#1D9E75' }}>Lok</span>
//             </span>
//           </Link>

//           <div style={{ display: 'flex', gap: '10px' }}>
//             <Link to="/login" style={{ ...btnBase, background: '#FFFFFF', color: '#1A1917', border: '1px solid #E2DDD6', padding: '9px 20px', fontSize: '13.5px' }}>
//               Login
//             </Link>
//             <Link to="/register" style={{ ...btnBase, background: '#1D9E75', color: '#FFFFFF', padding: '9px 20px', fontSize: '13.5px' }}>
//               Register
//             </Link>
//           </div>
//         </div>
//       </header>

//       <main style={{ flex: 1 }}>

//         {/* ── Hero ── */}
//         <section style={{ position: 'relative', overflow: 'hidden' }}>
//           <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(135deg, #1D9E75 0%, #0F6E56 100%)', opacity: 0.06 }} />

//           <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', padding: '80px 24px 96px', textAlign: 'center' }}>
//             {/* Badge */}
//             <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', border: '1px solid #E2DDD6', background: '#FFFFFF', borderRadius: '99px', padding: '5px 14px', fontSize: '12.5px', fontWeight: 500, color: '#6B6860', marginBottom: '24px' }}>
//               <Sparkles size={13} style={{ color: '#1D9E75' }} />
//               Verified by partner hospitals
//             </span>

//             <h1 style={{ fontSize: 'clamp(32px, 6vw, 58px)', fontWeight: 700, lineHeight: 1.15, color: '#1A1917', marginBottom: '20px' }}>
//               Hope, funded by{' '}
//               <span style={{ background: 'linear-gradient(135deg, #1D9E75 0%, #0F6E56 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//                 community.
//               </span>
//             </h1>

//             <p style={{ fontSize: '17px', color: '#6B6860', maxWidth: '600px', margin: '0 auto 36px', lineHeight: 1.65 }}>
//               BayuLok connects critically ill patients across Nepal with donors who care.
//               Every case is verified, every rupee tracked.
//             </p>

//             {/* CTA buttons */}
//             <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
//               <Link to="/register" style={{ ...btnBase, background: '#1D9E75', color: '#FFFFFF' }}>
//                 Join as a donor <ArrowRight size={16} />
//               </Link>
//               <Link to="/login" style={{ ...btnBase, background: '#FFFFFF', color: '#1A1917', border: '1px solid #E2DDD6' }}>
//                 View patient cases
//               </Link>
//             </div>

//             {/* Trust strip */}
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', maxWidth: '800px', margin: '64px auto 0' }}>
//               {trustItems.map(({ icon: Icon, label, desc }) => (
//                 <div key={label} style={{ background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: '12px', padding: '20px', textAlign: 'left', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
//                   <Icon size={20} style={{ color: '#1D9E75' }} />
//                   <p style={{ marginTop: '12px', fontSize: '13.5px', fontWeight: 600 }}>{label}</p>
//                   <p style={{ fontSize: '12px', color: '#6B6860', marginTop: '3px' }}>{desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── How it works ── */}
//         <section style={{ background: '#FFFFFF', borderTop: '1px solid #E2DDD6', borderBottom: '1px solid #E2DDD6' }}>
//           <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 24px', textAlign: 'center' }}>
//             <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '8px' }}>How it works</h2>
//             <p style={{ color: '#6B6860', fontSize: '14px', marginBottom: '44px' }}>Three simple steps to make a difference</p>

//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
//               {howItWorks.map(({ step, title, desc }) => (
//                 <div key={step} style={{ padding: '24px', background: '#F5F3EE', borderRadius: '12px', textAlign: 'left' }}>
//                   <div style={{ fontSize: '11px', fontWeight: 700, color: '#1D9E75', letterSpacing: '0.08em', marginBottom: '10px' }}>{step}</div>
//                   <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>{title}</h3>
//                   <p style={{ fontSize: '13px', color: '#6B6860', lineHeight: 1.6 }}>{desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── Bottom CTA ── */}
//         <section style={{ background: '#1A1917' }}>
//           <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px', textAlign: 'center' }}>
//             <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '12px' }}>
//               Ready to make a difference?
//             </h2>
//             <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14.5px', marginBottom: '32px' }}>
//               Create a free account and start contributing today.
//             </p>
//             <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
//               <Link to="/register" style={{ ...btnBase, background: '#1D9E75', color: '#FFFFFF' }}>
//                 Create account <ArrowRight size={16} />
//               </Link>
//               <Link to="/login" style={{ ...btnBase, background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.15)' }}>
//                 Sign in
//               </Link>
//             </div>
//           </div>
//         </section>

//       </main>

//       {/* ── Footer ── */}
//       <footer style={{ borderTop: '1px solid #E2DDD6', background: '#FFFFFF', padding: '24px' }}>
//         <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', fontSize: '13px', color: '#6B6860' }}>
//           © {new Date().getFullYear()} BayuLok. Built with care for Nepal.
//         </div>
//       </footer>

//     </div>
//   );
// }

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Alert from '../components/ui/Alert';
import Button from '../components/ui/Button';

// ─── Shared styles ────────────────────────────────────────────────
const inputStyle = {
  width: '100%', padding: '10px 12px', border: '1px solid #E2DDD6',
  borderRadius: '6px', background: '#F5F3EE', fontSize: '14px',
  color: '#1A1917', outline: 'none', boxSizing: 'border-box',
  fontFamily: 'inherit',
};

const labelStyle = {
  display: 'block', fontSize: '12.5px', fontWeight: 500, color: '#6B6860',
  marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em',
};

const btnBase = {
  display: 'inline-flex', alignItems: 'center', gap: '8px',
  padding: '12px 24px', borderRadius: '8px', fontSize: '15px',
  fontWeight: 600, cursor: 'pointer', textDecoration: 'none',
  fontFamily: 'inherit', transition: 'all 0.15s', border: 'none',
};

const trustItems = [
  { icon: '🛡️', label: 'Bipanna Verified',   desc: 'Identity & need certified' },
  { icon: '🤝', label: 'Direct to Hospital', desc: 'Funds paid to providers'   },
  { icon: '✨', label: 'Transparent',        desc: 'Every transaction tracked' },
];

const howItWorks = [
  { step: '01', title: 'Browse cases',   desc: 'View verified patients who need urgent financial support for treatment.' },
  { step: '02', title: 'Choose to help', desc: 'Select a patient and contribute any amount via Esewa, Khalti, or bank transfer.' },
  { step: '03', title: 'Track impact',   desc: "Follow the patient's progress and see how your contribution is used." },
];

// ─── Modal shell ──────────────────────────────────────────────────
function Modal({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(26,25,23,0.55)',
        backdropFilter: 'blur(3px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.18s ease',
      }}
    >
      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF', borderRadius: '12px',
          border: '1px solid #E2DDD6', padding: '40px',
          width: '100%', maxWidth: '420px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
          position: 'relative',
          animation: 'slideUp 0.2s ease',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '18px', color: '#6B6860', lineHeight: 1,
            padding: '4px 8px', borderRadius: '4px', fontFamily: 'inherit',
          }}
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}

// ─── Login modal content ──────────────────────────────────────────
function LoginModal({ onClose, onSwitchToRegister }) {
  const { login }  = useAuth();
  const navigate   = useNavigate();
  const [form, setForm]       = useState({ email: '', password: '' });
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);

  function set(key) {
    return (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(form.email, form.password);
      onClose();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2 style={{ fontSize: '26px', fontWeight: 400, marginBottom: '6px', fontFamily: 'Georgia, serif' }}>
        Welcome back
      </h2>
      <p style={{ fontSize: '13.5px', color: '#6B6860', marginBottom: '28px' }}>
        Sign in to your BayuLok account.
      </p>

      <form onSubmit={handleSubmit}>
        <Alert type="error" message={error} />
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Email</label>
          <input style={inputStyle} type="email" value={form.email} onChange={set('email')} placeholder="you@hospital.np" required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Password</label>
          <input style={inputStyle} type="password" value={form.password} onChange={set('password')} placeholder="••••••••" required />
        </div>
        <Button type="submit" full disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '18px', fontSize: '13px', color: '#6B6860' }}>
        New here?{' '}
        <button
          onClick={onSwitchToRegister}
          style={{ background: 'none', border: 'none', padding: 0, color: '#1D9E75', fontWeight: 500, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Create account
        </button>
      </p>
    </>
  );
}

// ─── Register modal content ───────────────────────────────────────
function RegisterModal({ onClose, onSwitchToLogin }) {
  const { register } = useAuth();
  const navigate     = useNavigate();
  const [form, setForm]       = useState({ email: '', password: '', fullName: '', phone: '' });
  const [error, setError]     = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function set(key) {
    return (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(form.email, form.password, form.fullName, form.phone);
      setSuccess(true);
      setTimeout(() => { onClose(); navigate('/login'); }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2 style={{ fontSize: '26px', fontWeight: 400, marginBottom: '6px', fontFamily: 'Georgia, serif' }}>
        Create account
      </h2>
      <p style={{ fontSize: '13.5px', color: '#6B6860', marginBottom: '28px' }}>
        Register to access the BayuLok dashboard.
      </p>

      {success ? (
        <Alert type="success" message="Account created! Redirecting to login…" />
      ) : (
        <form onSubmit={handleSubmit}>
          <Alert type="error" message={error} />
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Full name</label>
            <input style={inputStyle} value={form.fullName} onChange={set('fullName')} placeholder="Dr. Ram Shrestha" required />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Phone</label>
            <input style={inputStyle} value={form.phone} onChange={set('phone')} placeholder="+977 98..." />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Email</label>
            <input style={inputStyle} type="email" value={form.email} onChange={set('email')} placeholder="you@hospital.np" required />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Password</label>
            <input style={inputStyle} type="password" value={form.password} onChange={set('password')} placeholder="••••••••" required />
          </div>
          <Button type="submit" full disabled={loading}>
            {loading ? 'Creating…' : 'Create account'}
          </Button>
        </form>
      )}

      {!success && (
        <p style={{ textAlign: 'center', marginTop: '18px', fontSize: '13px', color: '#6B6860' }}>
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            style={{ background: 'none', border: 'none', padding: 0, color: '#1D9E75', fontWeight: 500, fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Sign in
          </button>
        </p>
      )}
    </>
  );
}

// ─── Index page ───────────────────────────────────────────────────
export default function IndexPage() {
  const [modal, setModal] = useState(null); // 'login' | 'register' | null

  const openLogin    = useCallback(() => setModal('login'),    []);
  const openRegister = useCallback(() => setModal('register'), []);
  const closeModal   = useCallback(() => setModal(null),       []);

  return (
    <div style={{ minHeight: '100vh', background: '#F5F3EE', display: 'flex', flexDirection: 'column' }}>

      {/* ── Modals ── */}
      <Modal open={modal === 'login'} onClose={closeModal}>
        <LoginModal onClose={closeModal} onSwitchToRegister={() => setModal('register')} />
      </Modal>
      <Modal open={modal === 'register'} onClose={closeModal}>
        <RegisterModal onClose={closeModal} onSwitchToLogin={() => setModal('login')} />
      </Modal>

      {/* ── Navbar ── */}
      <header style={{ borderBottom: '1px solid #E2DDD6', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '32px', height: '32px', background: '#1D9E75', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </span>
            <span style={{ fontSize: '17px', fontWeight: 700, color: '#1A1917' }}>
              Bayu<span style={{ color: '#1D9E75' }}>Lok</span>
            </span>
          </Link>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={openLogin} style={{ ...btnBase, background: '#FFFFFF', color: '#1A1917', border: '1px solid #E2DDD6', padding: '9px 20px', fontSize: '13.5px' }}>
              Login
            </button>
            <button onClick={openRegister} style={{ ...btnBase, background: '#1D9E75', color: '#FFFFFF', padding: '9px 20px', fontSize: '13.5px' }}>
              Register
            </button>
          </div>
        </div>
      </header>

      <main style={{ flex: 1 }}>

        {/* ── Hero ── */}
        <section style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(135deg, #1D9E75 0%, #0F6E56 100%)', opacity: 0.06 }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', padding: '80px 24px 96px', textAlign: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', border: '1px solid #E2DDD6', background: '#FFFFFF', borderRadius: '99px', padding: '5px 14px', fontSize: '12.5px', fontWeight: 500, color: '#6B6860', marginBottom: '24px' }}>
              ✨ Verified by partner hospitals
            </span>

            <h1 style={{ fontSize: 'clamp(32px, 6vw, 58px)', fontWeight: 700, lineHeight: 1.15, color: '#1A1917', marginBottom: '20px' }}>
              Hope, funded by{' '}
              <span style={{ background: 'linear-gradient(135deg, #1D9E75 0%, #0F6E56 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                community.
              </span>
            </h1>

            <p style={{ fontSize: '17px', color: '#6B6860', maxWidth: '600px', margin: '0 auto 36px', lineHeight: 1.65 }}>
              BayuLok connects critically ill patients across Nepal with donors who care.
              Every case is verified, every rupee tracked.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
              <button onClick={openRegister} style={{ ...btnBase, background: '#1D9E75', color: '#FFFFFF' }}>
                Join as a donor →
              </button>
              <button onClick={openLogin} style={{ ...btnBase, background: '#FFFFFF', color: '#1A1917', border: '1px solid #E2DDD6' }}>
                View patient cases
              </button>
            </div>

            {/* Trust strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', maxWidth: '800px', margin: '64px auto 0' }}>
              {trustItems.map(({ icon, label, desc }) => (
                <div key={label} style={{ background: '#FFFFFF', border: '1px solid #E2DDD6', borderRadius: '12px', padding: '20px', textAlign: 'left', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <span style={{ fontSize: '20px' }}>{icon}</span>
                  <p style={{ marginTop: '12px', fontSize: '13.5px', fontWeight: 600 }}>{label}</p>
                  <p style={{ fontSize: '12px', color: '#6B6860', marginTop: '3px' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section style={{ background: '#FFFFFF', borderTop: '1px solid #E2DDD6', borderBottom: '1px solid #E2DDD6' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 24px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '8px' }}>How it works</h2>
            <p style={{ color: '#6B6860', fontSize: '14px', marginBottom: '44px' }}>Three simple steps to make a difference</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              {howItWorks.map(({ step, title, desc }) => (
                <div key={step} style={{ padding: '24px', background: '#F5F3EE', borderRadius: '12px', textAlign: 'left' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#1D9E75', letterSpacing: '0.08em', marginBottom: '10px' }}>{step}</div>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>{title}</h3>
                  <p style={{ fontSize: '13px', color: '#6B6860', lineHeight: 1.6 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section style={{ background: '#1A1917' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '12px' }}>
              Ready to make a difference?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14.5px', marginBottom: '32px' }}>
              Create a free account and start contributing today.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={openRegister} style={{ ...btnBase, background: '#1D9E75', color: '#FFFFFF' }}>
                Create account →
              </button>
              <button onClick={openLogin} style={{ ...btnBase, background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.15)' }}>
                Sign in
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid #E2DDD6', background: '#FFFFFF', padding: '24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', fontSize: '13px', color: '#6B6860' }}>
          © {new Date().getFullYear()} BayuLok. Built with care for Nepal.
        </div>
      </footer>

    </div>
  );
}