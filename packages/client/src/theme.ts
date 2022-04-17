import { LinkProps } from '@mui/material';

import { LinkBehavior } from './linkBehavior';

type PaletteMode = 'light' | 'dark';

const themeColors = {
  primary: {
    main: '#1b5e20',
  },
  secondary: {
    main: '#cddc39',
  },
};
const defaultTheme = {
  palette: {
    mode: 'light' as PaletteMode,
    ...themeColors,
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
          backgroundColor: '#1B5E2014',
        },
      },
    },
  },
};

const darkTheme = {
  palette: {
    mode: 'dark' as PaletteMode,
    ...themeColors,
  },
};

export { darkTheme, defaultTheme };
