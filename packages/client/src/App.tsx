import './App.css';

import { Configuration } from '@fullstack/sdk';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from './pages';
import { routes } from './routes';
import { theme } from './theme';

const PROD_API_BASE_PATH = 'https://coderscamp2021-hk-fullstack.herokuapp.com';
const DEV_API_BASE_PATH = 'http://localhost:4000';

const mode = `import.meta.env.MODE` as string;
const isProduction = mode === `"production"`;

// TODO: Use the API
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const configuration = new Configuration({
  basePath: isProduction ? PROD_API_BASE_PATH : DEV_API_BASE_PATH,
});

const App = () => (
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </>
);

export { App };
