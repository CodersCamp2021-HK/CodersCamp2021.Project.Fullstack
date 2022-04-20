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
    h5: {
      fontWeight: 600,
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
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#EDF3EE',
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderRadius: 50,
        },
      },
    },
  },
};

const darkTheme = {
  palette: {
    mode: 'dark' as PaletteMode,
    ...themeColors,
    background: {
      default: '#303030',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#303030',
        },
      },
    },
  },
};

export { darkTheme, defaultTheme };
