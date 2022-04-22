import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ShoppingCartProvider } from './context';
import { Home, Summary } from './pages';
import { routes } from './routes';

const App = () => {
  return (
    <>
      <CssBaseline />
      <ShoppingCartProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.summary} element={<Summary />} />
          </Routes>
        </BrowserRouter>
      </ShoppingCartProvider>
    </>
  );
};

export { App };
