import './config/index.css';

import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from './config';
import { ThemeContextProvider } from './contexts';
import { Home, Main } from './pages';

const App = () => {
  return (
    <ThemeContextProvider>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.main} element={<Main />} />
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

export { App };
