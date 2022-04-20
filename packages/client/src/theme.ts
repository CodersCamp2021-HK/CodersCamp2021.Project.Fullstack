import { createTheme, LinkProps } from '@mui/material';

import { LinkBehavior } from './linkBehavior';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1b5e20',
    },
    secondary: {
      main: '#cddc39',
    },
    background: {
      default: '#D5DBD6',
    },
    common: {
      white: '#FFFFFF',
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
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#EDF3EE',
        },
      },
    },
  },
});

export { theme };
