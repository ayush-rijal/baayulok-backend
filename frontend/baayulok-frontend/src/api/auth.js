import client from './client';

/**
 * POST /api/auth/login
 * Returns { accessToken, ... }
 */
export async function loginUser({ email, password }) {
  const res = await client.post('/api/Auth/login', { email, password });
  return res.data;
}

/**
 * POST /api/auth/register
 * Returns { userId }
 */
export async function registerUser({ email, password, fullName, phone }) {
  const res = await client.post('/api/Auth/register', {
    email,
    password,
    fullName,
    phone,
  });
  return res.data;
}