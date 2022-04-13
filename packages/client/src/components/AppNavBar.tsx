import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasketOutlined';
import { AppBar, Box, Button, Fab, IconButton, Link, Menu, MenuItem, Theme, Toolbar } from '@mui/material';
import { useState } from 'react';

import logo from '../assets/logo.svg';

const LEFT_PAGES = [
  {
    name: 'O nas',
    href: 'about',
  },
  {
    name: 'Kontakt',
    href: 'contact',
  },
  {
    name: 'Dostawa',
    href: 'delivery',
  },
] as const;

const RIGHT_PAGES = [
  {
    name: 'Logowanie',
    href: 'login',
    color: (theme: Theme) => theme.palette.primary.main,
  },
  {
    name: 'Rejestracja',
    href: 'register',
    color: (theme: Theme) => theme.palette.secondary.dark,
  },
] as const;

const PAGES = [...LEFT_PAGES, ...RIGHT_PAGES] as const;

const pageToButton = (page: typeof PAGES[number]) => (
  <Button
    key={page.href}
    href={page.href}
    sx={{ color: 'color' in page ? page.color : (theme) => theme.palette.secondary.contrastText, px: 2 }}
  >
    {page.name}
  </Button>
);

const AppNavBar = () => {
  const [menuAnchorElem, setMenuAnchorElem] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorElem(event.currentTarget);
  };

  const handleMenuClosed = () => {
    setMenuAnchorElem(null);
  };

  return (
    <AppBar position='static'>
      <Toolbar sx={{ width: 'min(100%, 92rem)', mx: 'auto' }}>
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton size='large' onClick={handleMenuOpen} sx={{ p: 0 }}>
            <MenuIcon color='primary' fontSize='large' />
          </IconButton>
          <Menu
            anchorEl={menuAnchorElem}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={Boolean(menuAnchorElem)}
            onClose={handleMenuClosed}
          >
            {PAGES.map((page) => (
              <MenuItem key={page.href} component={Link} href={page.href}>
                {page.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Link href='/' sx={{ mx: 'auto' }}>
          <img src={logo} alt='JeszCoChcesz' style={{ display: 'block', height: '6rem', paddingBlock: '1rem' }} />
        </Link>
        <Box sx={{ flexGrow: 1, ml: 8, display: { xs: 'none', md: 'block' } }}>{LEFT_PAGES.map(pageToButton)}</Box>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>{RIGHT_PAGES.map(pageToButton)}</Box>
        <Fab href='/shoppingcart' color='secondary' sx={{ boxShadow: 0, ml: 2 }}>
          <ShoppingBasketIcon color='primary' />
        </Fab>
      </Toolbar>
    </AppBar>
  );
};

export { AppNavBar };
