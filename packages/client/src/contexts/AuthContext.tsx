import { AuthApi, Role } from '@fullstack/sdk';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { apiConfiguration } from '../config';

const api = new AuthApi(apiConfiguration);

const AuthContext = createContext({
  userRole: null as Role | null,
  setUserRole: (() => {}) as (role: Role | null) => void,
  isLoggedIn: false,
  api,
});

const localStorageRole = () => {
  switch (window.localStorage.getItem('userRole')) {
    case 'User':
      return Role.User;
    case 'Partner':
      return Role.Partner;
    default:
      return null;
  }
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<Role | null>(localStorageRole);
  const value = useMemo(() => ({ userRole, setUserRole, isLoggedIn: userRole !== null, api }), [userRole]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
