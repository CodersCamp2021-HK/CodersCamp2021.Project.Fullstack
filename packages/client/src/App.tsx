import './App.css';

import { Configuration, RestaurantDto, RestaurantsApi } from '@fullstack/sdk';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import logo from './logo.svg';

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

const api = new RestaurantsApi(
  new Configuration({
    basePath: isProduction ? PROD_API_BASE_PATH : DEV_API_BASE_PATH,
  }),
);

const App = () => {
  const [themeMode, setThemeMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: themeMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => setThemeMode(!themeMode);
  // const [count, setCount] = useState(0);

  const [data, setData] = useState<RestaurantDto[]>([]);

  useEffect(() => {
    api.list().then((restaurants) => {
      setData(restaurants.data);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className='App' styles={ backgroundColor: 'background.default'}>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <ul>
            {data.map((restaurant) => (
              <li key={restaurant.id}>{JSON.stringify(restaurant)}</li>
            ))}
          </ul>
          <p>Hello Vite + React!</p>
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
          <p>
            Edit <code>App.tsx</code> and save to test HMR updates.
          </p>
          <p>
            <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
              Learn React
            </a>
            {' | '}
            <a
              className='App-link'
              href='https://vitejs.dev/guide/features.html'
              target='_blank'
              rel='noopener noreferrer'
            >
              Vite Docs
            </a>
          </p>
        </header>
      </div>
    </ThemeProvider>
  );
};

export { App };
