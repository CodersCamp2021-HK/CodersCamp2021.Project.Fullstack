import { CssBaseline } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { AppNavBar } from './components';
import { routes } from './config';
import { AuthProvider, ShoppingCartProvider, ThemeContextProvider, useAuth } from './contexts';
import {
  Home,
  Main,
  RegisterAndLogin,
  RegistrationSuccess,
  ShoppingCart,
  ShoppingCartData,
  ShoppingCartPayment,
  UnderConstruction,
} from './pages';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isLoggedIn) {
    return <Navigate to='/user/login' state={{ from: location }} replace />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <ShoppingCartProvider>
        <ThemeContextProvider>
          <CssBaseline />
          <BrowserRouter>
            <AppNavBar />
            <Routes>
              <Route path={routes.home} element={<Home />} />
              <Route path={routes.main} element={<Main />} />
              <Route path={routes.shoppingCart} element={<ShoppingCart />} />
              <Route
                path={routes.shoppingCartData}
                element={
                  <RequireAuth>
                    <ShoppingCartData />
                  </RequireAuth>
                }
              />
              <Route
                path={routes.shoppingCartPayment}
                element={
                  <RequireAuth>
                    <ShoppingCartPayment />
                  </RequireAuth>
                }
              />
              <Route path={routes.userLogin} element={<RegisterAndLogin formType='UserLogin' />} />
              <Route path={routes.partnerLogin} element={<RegisterAndLogin formType='PartnerLogin' />} />
              <Route path={routes.userRegister} element={<RegisterAndLogin formType='UserRegister' />} />
              <Route path={routes.partnerRegister} element={<RegisterAndLogin formType='PartnerRegister' />} />
              <Route path={routes.registrationSuccess} element={<RegistrationSuccess />} />
              <Route path='*' element={<UnderConstruction />} />
            </Routes>
          </BrowserRouter>
        </ThemeContextProvider>
      </ShoppingCartProvider>
    </AuthProvider>
  );
};

export { App };
