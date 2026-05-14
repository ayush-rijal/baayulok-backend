import { createContext, useContext, useState, useCallback } from 'react';
import { loginUser, registerUser } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('bl_token'));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bl_user'));
    } catch {
      return null;
    }
  });

  const login = useCallback(async (email, password) => {
    const data = await loginUser({ email, password });
    const accessToken = data.accessToken || data.token || data.Token;
    const userData = { email, fullName: data.fullName || email };
    localStorage.setItem('bl_token', accessToken);
    localStorage.setItem('bl_user', JSON.stringify(userData));
    setToken(accessToken);
    setUser(userData);
  }, []);

  const register = useCallback(async (email, password, fullName, phone) => {
    return registerUser({ email, password, fullName, phone });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('bl_token');
    localStorage.removeItem('bl_user');
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}