import React, { createContext, useContext, useEffect, useState } from 'react';

const AUTH_USER_KEY = 'nexora-auth-user';
const REGISTERED_USERS_KEY = 'nexora-registered-users';

const readStorage = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
};

const userIdFor = (email, mobile) =>
  `${email.trim().toLowerCase()}-${mobile.replace(/\D/g, '')}`;

const referralCodeFor = (email, mobile) =>
  `NEX-${email.replace(/[^a-z0-9]/gi, '').slice(0, 4).toUpperCase()}-${mobile.replace(/\D/g, '').slice(-4)}`;

const withReferralData = (account) => ({
  ...account,
  referralCode: account.referralCode || referralCodeFor(account.email, account.mobile),
  referralEarnings: account.referralEarnings || 0,
  referralCount: account.referralCount || 0,
});

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = readStorage(AUTH_USER_KEY, null);
    return storedUser ? withReferralData(storedUser) : null;
  });

  useEffect(() => {
    if (!user) return;
    const users = readStorage(REGISTERED_USERS_KEY, []);
    const normalizedUsers = users.map((item) => item.id === user.id ? withReferralData(user) : withReferralData(item));
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(normalizedUsers));
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(withReferralData(user)));
  }, [user]);

  const register = ({ mobile, email, password }) => {
    const users = readStorage(REGISTERED_USERS_KEY, []);
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedMobile = mobile.trim();
    const existingUser = users.find(
      (item) => item.email === normalizedEmail || item.mobile === normalizedMobile
    );

    if (existingUser) {
      throw new Error('An account with this email or mobile number already exists.');
    }

    const newUser = {
      id: userIdFor(normalizedEmail, normalizedMobile),
      mobile: normalizedMobile,
      email: normalizedEmail,
      password,
      referralCode: referralCodeFor(normalizedEmail, normalizedMobile),
      referralEarnings: 0,
      referralCount: 0,
    };
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify([...users, newUser]));
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = ({ identifier, password }) => {
    const normalizedIdentifier = identifier.trim().toLowerCase();
    const users = readStorage(REGISTERED_USERS_KEY, []);
    const foundUser = users.find(
      (item) =>
        (item.email === normalizedIdentifier || item.mobile === identifier.trim()) &&
        item.password === password
    );

    if (!foundUser) {
      throw new Error('Incorrect email/mobile number or password.');
    }

    const normalizedUser = withReferralData(foundUser);
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users.map((item) => item.id === normalizedUser.id ? normalizedUser : item)));
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(normalizedUser));
    setUser(normalizedUser);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_USER_KEY);
    setUser(null);
  };

  const awardReferralCommission = (referralCode, referredUserId) => {
    if (!referralCode || !referredUserId) return false;
    const users = readStorage(REGISTERED_USERS_KEY, []);
    const referrerIndex = users.findIndex(
      (item) => item.referralCode?.toUpperCase() === referralCode.trim().toUpperCase()
    );
    if (referrerIndex < 0 || users[referrerIndex].id === referredUserId) return false;

    const referrer = users[referrerIndex];
    const referredUserIds = referrer.referredUserIds || [];
    if (referredUserIds.includes(referredUserId)) return false;

    const updatedReferrer = {
      ...referrer,
      referralEarnings: (referrer.referralEarnings || 0) + 50,
      referralCount: (referrer.referralCount || 0) + 1,
      referredUserIds: [...referredUserIds, referredUserId],
    };
    const updatedUsers = users.map((item, index) => (index === referrerIndex ? updatedReferrer : item));
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(updatedUsers));
    if (user?.id === updatedReferrer.id) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updatedReferrer));
      setUser(updatedReferrer);
    }
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, awardReferralCommission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
