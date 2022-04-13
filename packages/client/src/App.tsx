import './App.css';

import { Configuration, RestaurantDto, RestaurantsApi } from '@fullstack/sdk';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import _ from 'lodash';
import { useEffect, useState } from 'react';

import logo from './assets/logo.svg';
import { Home } from './pages';
import { darkTheme, defaultTheme } from './theme';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1b5e20',
//     },
//     secondary: {
//       main: '#cddc39',
//     },
//     background: {
//       default: '#F4F3DD',
//     },
//   },
//   typography: {
//     fontFamily: 'Noto Sans',
//     fontSize: 14,
//   },
// });

const PROD_API_BASE_PATH = 'https://coderscamp2021-hk-fullstack.herokuapp.com';
const DEV_API_BASE_PATH = 'http://localhost:4000';

const mode = `import.meta.env.MODE` as string;
const isProduction = mode === `"production"`;

// TODO: Use the API
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const configuration = new Configuration({
//   basePath: isProduction ? PROD_API_BASE_PATH : DEV_API_BASE_PATH,
// });

const api = new RestaurantsApi(
  new Configuration({
    basePath: isProduction ? PROD_API_BASE_PATH : DEV_API_BASE_PATH,
  }),
);

const App = () => {
  const [themeMode, setThemeMode] = useState(false);

  const theme = createTheme(themeMode ? { ...defaultTheme, ...darkTheme } : defaultTheme);

  const toggleDarkMode = () => setThemeMode(!themeMode);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Home />
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
            borderRadius: 1,
            p: 3,
          }}
        >
          {theme.palette.mode} mode
          <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color='inherit'>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </ThemeProvider>
    </>
  );
};

export { App };
