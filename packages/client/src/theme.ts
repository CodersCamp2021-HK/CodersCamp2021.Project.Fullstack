import { createTheme } from '@mui/material';

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
    mode: 'light',
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
    mode: 'dark',
    ...themeColors,
  },
};

export { darkTheme, defaultTheme };
