import './App.css';

import { Configuration } from '@fullstack/sdk';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Home } from './pages';

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
    h1: {
      fontWeight: 400,
    },
    h2: {
      fontWeight: 400,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#1B5E2014',
        },
      },
    },
  },
});

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
      <Home />
    </ThemeProvider>
  </>
);

export { App };
