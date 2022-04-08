import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasketOutlined';
import { AppBar, Box, Button, Fab, Link, Toolbar, useTheme } from '@mui/material';

import logo from '../assets/logo.svg';

const PAGES = ['O nas', 'Kontakt', 'Dostawa'] as const;

const AppNavBar = () => {
  const theme = useTheme();

  return (
    <AppBar sx={{ background: '#1B5E2014' }} position='fixed'>
      <Toolbar sx={{ width: 'min(100%, 92rem)', mx: 'auto' }}>
        {/* TODO: Change this when router is ready */}
        <Link href='/'>
          <img src={logo} alt='JeszCoChcesz' style={{ display: 'block', height: '6rem', paddingBlock: '1rem' }} />
        </Link>
        <Box sx={{ flexGrow: 1, ml: 8 }}>
          {PAGES.map((page) => (
            <Button key={page} sx={{ color: theme.palette.secondary.contrastText, px: 2 }}>
              {page}
            </Button>
          ))}
        </Box>
        <Box>
          <Button sx={{ color: theme.palette.primary.main, px: 2 }}>Logowanie</Button>
          <Button sx={{ color: theme.palette.secondary.dark, px: 2 }}>Rejestracja</Button>
          <Fab color='secondary' sx={{ boxShadow: 0, ml: 2 }}>
            <ShoppingBasketIcon color='primary' />
          </Fab>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export { AppNavBar };
