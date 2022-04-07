import './App.css';

import { Configuration } from '@fullstack/sdk';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Home } from './Home';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1b5e20',
    },
    secondary: {
      main: '#cddc39',
    },
    background: {
      default: '#F4F3DD',
    },
  },
  typography: {
    fontFamily: 'Noto Sans',
    fontSize: 14,
  },
});

const PROD_API_BASE_PATH = 'https://coderscamp2021-hk-fullstack.herokuapp.com';
const DEV_API_BASE_PATH = 'http://localhost:4000';

const mode = `import.meta.env.MODE` as string;
const isProduction = mode === `"production"`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const configuration = new Configuration({
  basePath: isProduction ? PROD_API_BASE_PATH : DEV_API_BASE_PATH,
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Home />
  </ThemeProvider>
);

export { App };
