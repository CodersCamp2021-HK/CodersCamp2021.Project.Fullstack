import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from './config';
import { Home, Main } from './pages';

const App = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.main} element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export { App };
