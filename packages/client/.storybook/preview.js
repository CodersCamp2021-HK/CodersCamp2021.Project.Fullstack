import '../src/index.css'

import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { theme } from '../src/theme'
import { MemoryRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

// https://mui.com/material-ui/guides/migration-v4/#storybook-emotion-with-v5
const withThemeProvider = (Story, context) => {
  return (
    <MemoryRouter>
      <EmotionThemeProvider theme={theme}>
        <MUIThemeProvider theme={theme}>
          <CssBaseline />
          <Story {...context} />
        </MUIThemeProvider>
      </EmotionThemeProvider>
    </MemoryRouter>
  );
};

export const decorators = [withThemeProvider];
