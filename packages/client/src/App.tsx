import './App.css';

import { Configuration } from '@fullstack/sdk';
import { CssBaseline } from '@mui/material';

import { Home } from './pages';

const PROD_API_BASE_PATH = 'https://coderscamp2021-hk-fullstack.herokuapp.com';
const DEV_API_BASE_PATH = 'http://localhost:4000';

const mode = `import.meta.env.MODE` as string;
const isProduction = mode === `"production"`;

// TODO: Use the API
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const configuration = new Configuration({
  basePath: isProduction ? PROD_API_BASE_PATH : DEV_API_BASE_PATH,
});

// const api = new RestaurantsApi(
//   new Configuration({
//     basePath: isProduction ? PROD_API_BASE_PATH : DEV_API_BASE_PATH,
//   }),
// );

const App = () => {
  return (
    <>
      <CssBaseline />
      <Home />
    </>
  );
};

export { App };
