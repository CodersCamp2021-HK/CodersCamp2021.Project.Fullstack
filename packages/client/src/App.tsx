import './App.css';

import { Configuration, RestaurantDto, RestaurantsApi } from '@fullstack/sdk';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import logo from './logo.svg';
import { RegisterPage } from './pages';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1b5e20',
    },
    secondary: {
      main: '#cddc39',
    },
  },
});

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
  const [count, setCount] = useState(0);

  const [data, setData] = useState<RestaurantDto[]>([]);

  useEffect(() => {
    api.list().then((restaurants) => {
      setData(restaurants.data);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <RegisterPage />
    </ThemeProvider>
  );
};

export { App };
