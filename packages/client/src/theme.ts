import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1b5e20',
    },
    secondary: {
      main: '#cddc39',
    },
    background: {
      default: '#F4F3DD',
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
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#1B5E2014',
        },
      },
    },
  },
});

export { theme };
