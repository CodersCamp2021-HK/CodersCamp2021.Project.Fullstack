import { createContext, useMemo, useState } from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  const [auth, setAuth] = useState({});
  const value = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
