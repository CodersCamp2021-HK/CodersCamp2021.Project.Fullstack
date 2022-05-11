import { Role } from '@fullstack/sdk';
import { createContext, useMemo, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContext = createContext<{ auth: { isLoggedIn?: boolean; userRole?: Role }; setAuth: any }>({
  auth: {},
  setAuth: null,
});

const AuthProvider = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  const [auth, setAuth] = useState({});
  const value = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
