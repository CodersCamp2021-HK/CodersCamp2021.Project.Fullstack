import { AuthApi, Role } from '@fullstack/sdk';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { apiConfiguration } from '../config';

const AuthContext = createContext({
  userRole: null as Role | null,
  setUserRole: (() => {}) as (role: Role | null) => void,
  isLoggedIn: false,
  api: new AuthApi(apiConfiguration),
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<Role | null>(null);
  const value = useMemo(
    () => ({ userRole, setUserRole, isLoggedIn: userRole !== null, api: new AuthApi(apiConfiguration) }),
    [userRole, setUserRole],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
