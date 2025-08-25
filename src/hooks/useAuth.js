import { useState, useEffect } from 'react';
import { checkAuth, login as authLogin, logout as authLogout } from '../auth/config';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = checkAuth();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const result = authLogin(email, password);
    if (result) {
      setUser(result);
      return true;
    }
    return false;
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout
  };
};