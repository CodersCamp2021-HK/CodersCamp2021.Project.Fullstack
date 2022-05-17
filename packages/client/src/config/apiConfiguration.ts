import { Configuration } from '@fullstack/sdk';

const PROD_API_BASE_PATH = 'https://coderscamp2021-hk-fullstack.herokuapp.com';
const DEV_API_BASE_PATH = 'http://localhost:4000';

const mode = `import.meta.env.MODE` as string;
const isProduction = mode === `"production"`;

const apiConfiguration = new Configuration({
  basePath: isProduction ? PROD_API_BASE_PATH : DEV_API_BASE_PATH,
  credentials: 'include',
});

export { apiConfiguration };
