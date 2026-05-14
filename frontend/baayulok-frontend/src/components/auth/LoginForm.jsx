import { useState } from 'react';
import Alert from '../ui/Alert';
import Button from '../ui/Button';

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #E2DDD6',
  borderRadius: '6px',
  background: '#F5F3EE',
  fontSize: '14px',
  color: '#1A1917',
  outline: 'none',
};

export default function LoginForm({ onSubmit, error, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ email, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Alert type="error" message={error} />

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 500, color: '#6B6860', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Email
        </label>
        <input
          style={inputStyle}
          type="email"
          placeholder="you@hospital.np"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 500, color: '#6B6860', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Password
        </label>
        <input
          style={inputStyle}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" full disabled={loading}>
        {loading ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  );
}