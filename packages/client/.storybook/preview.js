import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../src/theme';

const themeProvider = (Story) => (
  <ThemeProvider theme={ theme }><Story /></ThemeProvider>
);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [themeProvider];
