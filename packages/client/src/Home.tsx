import { AppBar, MenuItem, Toolbar, Typography, useTheme } from '@mui/material';

const pages = ['O nas', 'Kontakt', 'Dostawa'];

const Home = () => {
  const theme = useTheme();

  return (
    <AppBar style={{ minHeight: '6rem', background: '#1B5E2014', color: theme.palette.secondary.contrastText }}>
      <Toolbar style={{ minHeight: '6rem' }}>
        <Typography variant='h6' component='h1' sx={{ mr: 2 }}>
          JeszCoChcesz
        </Typography>

        {pages.map((page) => (
          <MenuItem key={page}>
            <Typography variant='subtitle2' textAlign='center' textTransform='uppercase'>
              {page}
            </Typography>
          </MenuItem>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export { Home };
