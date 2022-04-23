import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppNavBar } from './components';
import { routes } from './config';
import { ThemeContextProvider } from './contexts';
import { Home, Main } from './pages';

const App = () => {
  return (
    <ThemeContextProvider>
      <CssBaseline />
      <BrowserRouter>
        <AppNavBar />
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.main} element={<Main />} />
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  );
};

export { App };
