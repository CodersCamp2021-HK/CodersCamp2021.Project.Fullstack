import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasketOutlined';
import {
  AppBar,
  Box,
  Button,
  Fab,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Palette,
  Theme,
  Toolbar,
  useTheme,
} from '@mui/material';
import { useState } from 'react';

import logo from '../assets/logo.svg';

const PAGES = [
  {
    name: 'O nas',
    href: 'about',
    pos: 'left',
  },
  {
    name: 'Kontakt',
    href: 'contact',
    pos: 'left',
  },
  {
    name: 'Dostawa',
    href: 'delivery',
    pos: 'left',
  },
  {
    name: 'Logowanie',
    href: 'login',
    pos: 'right',
    color: (palette: Palette) => palette.primary.main,
  },
  {
    name: 'Rejestracja',
    href: 'register',
    pos: 'right',
    color: (palette: Palette) => palette.secondary.dark,
  },
] as const;

const pageToButton = (page: typeof PAGES[number], theme: Theme) => (
  <Button
    key={page.href}
    href={page.href}
    sx={{ color: 'color' in page ? page.color(theme.palette) : theme.palette.secondary.contrastText, px: 2 }}
  >
    {page.name}
  </Button>
);

const AppNavBar = () => {
  const theme = useTheme();

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
        <Box sx={{ flexGrow: 1, ml: 8, display: { xs: 'none', md: 'block' } }}>
          {PAGES.filter((page) => page.pos === 'left').map((page) => pageToButton(page, theme))}
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          {PAGES.filter((page) => page.pos === 'right').map((page) => pageToButton(page, theme))}
        </Box>
        <Fab href='/shoppingcart' color='secondary' sx={{ boxShadow: 0, ml: 2 }}>
          <ShoppingBasketIcon color='primary' />
        </Fab>
      </Toolbar>
    </AppBar>
  );
};

export { AppNavBar };
