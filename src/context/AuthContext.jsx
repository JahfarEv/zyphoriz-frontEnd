import React, { createContext, useEffect, useState, useContext } from 'react';
import { api, authToken } from '../lib/api';

const referralCodeFor = (email, mobile) =>
  `NEX-${email.replace(/[^a-z0-9]/gi, '').slice(0, 4).toUpperCase()}-${mobile.replace(/\D/g, '').slice(-4)}`;

const withReferralData = (account) => account && ({
  ...account,
  referralCode: account.referralCode || referralCodeFor(account.email, account.mobile),
  referralEarnings: account.referralEarnings || 0,
  referralCount: account.referralCount || 0,
});

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.auth.me()
      .then(({ user: currentUser }) => setUser(withReferralData(currentUser)))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const register = async (details) => {
    const data = await api.auth.register(details);
    authToken.set(data.token);
    const newUser = withReferralData(data.user);
    setUser(newUser);
  };

  const login = async (details) => {
    const data = await api.auth.login(details);
    authToken.set(data.token);
    const normalizedUser = withReferralData(data.user);
    setUser(normalizedUser);
  };

  const logout = async () => {
    await api.auth.logout().catch(() => {});
    authToken.clear();
    setUser(null);
  };

  const awardReferralCommission = () => false;

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, awardReferralCommission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
