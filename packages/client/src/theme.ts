import { LinkProps } from '@mui/material';
import { green, lime } from '@mui/material/colors';

import { LinkBehavior } from './linkBehavior';

type PaletteMode = 'light' | 'dark';

const themeColors = {
  primary: {
    main: green[900],
    background: 'rgba(27,94,32,8%)',
  },
  secondary: {
    main: lime[500],
  },
};
const commonComponents = {
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
        boxShadow: 'none',
        borderRadius: 50,
        '&:hover': {
          boxShadow: 'none',
        },
      },
      sizeLarge: {
        height: '48px',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        marginBottom: '1rem',
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
    ...commonComponents,
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#EDF3EE',
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
    ...commonComponents,
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
