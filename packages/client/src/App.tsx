import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppNavBar } from './components';
import { routes } from './config';
import { ShoppingCartProvider, ThemeContextProvider } from './contexts';
import { Home, Main, RegisterAndLogin, ShoppingCart, ShoppingCartData, UnderConstruction } from './pages';

const App = () => {
  return (
    <ShoppingCartProvider>
      <ThemeContextProvider>
        <CssBaseline />
        <BrowserRouter>
          <AppNavBar />
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.main} element={<Main />} />
            <Route path={routes.shoppingCart} element={<ShoppingCart />} />
            <Route path={routes.shoppingCartData} element={<ShoppingCartData />} />
            <Route path={routes.userLogin} element={<RegisterAndLogin formType='UserLogin' />} />
            <Route path={routes.partnerLogin} element={<RegisterAndLogin formType='PartnerLogin' />} />
            <Route path={routes.userRegister} element={<RegisterAndLogin formType='UserRegister' />} />
            <Route path={routes.partnerRegister} element={<RegisterAndLogin formType='PartnerRegister' />} />
            <Route path='*' element={<UnderConstruction />} />
          </Routes>
        </BrowserRouter>
      </ThemeContextProvider>
    </ShoppingCartProvider>
  );
};

export { App };
