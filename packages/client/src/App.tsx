import './App.css';

import { Configuration, RestaurantDto, RestaurantsApi } from '@fullstack/sdk';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import logo from './logo.svg';

const theme = createTheme({
  palette: {
    primary: {
      main: '#cddc39',
    },
    secondary: {
      main: '#1b5e20',
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
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <ul>
            {data.map((restaurant) => (
              <li key={restaurant.id}>{JSON.stringify(restaurant)}</li>
            ))}
          </ul>
          <p>Hello Vite + React!</p>
          <p>
            <Button variant='contained' onClick={() => setCount((x) => x + 1)}>
              count is: {count}
            </Button>
          </p>
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
