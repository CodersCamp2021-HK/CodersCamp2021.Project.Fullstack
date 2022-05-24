import { Role } from '@fullstack/sdk';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasketOutlined';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useContext, useState } from 'react';

import logo from '../../assets/logo.svg';
import logoDark from '../../assets/logo_dark.svg';
import { routes, themeForegroundColor } from '../../config';
import { ThemeContext, useAuth, useShoppingCart } from '../../contexts';

const LEFT_PAGES = [
  {
    name: 'O nas',
    pathname: routes.about,
  },
  {
    name: 'Kontakt',
    pathname: routes.contact,
  },
  {
    name: 'Dostawa',
    pathname: routes.delivery,
  },
] as const;

const RIGHT_PAGES = [
  {
    name: 'Logowanie',
    pathname: routes.userLogin,
    color: themeForegroundColor,
  },
  {
    name: 'Rejestracja',
    pathname: routes.userRegister,
    color: (theme: Theme) => theme.palette.secondary.dark,
  },
] as const;

const USER_PAGES = [
  {
    name: 'Mój profil',
    pathname: '/profile',
  },
  {
    name: 'Moje zamówienia',
    pathname: '/orders',
  },
] as const;

const PARTNER_PAGES = [
  {
    name: 'Mój profil',
    pathname: '/profile',
  },
  {
    name: 'Moje produkty',
    pathname: '/products',
  },
] as const;

const PAGES = [...LEFT_PAGES, ...RIGHT_PAGES];

const pageToButton = (page: typeof PAGES[number]) => (
  <Button
    key={page.pathname}
    href={page.pathname}
    sx={{ color: 'color' in page ? page.color : (theme: Theme) => theme.palette.text.primary, px: 2 }}
  >
    {page.name}
  </Button>
);

const menuItems = (pages: readonly { name: string; pathname: string }[]) => {
  return pages.map((page) => (
    <MenuItem key={page.pathname} component={Link} href={page.pathname}>
      {page.name}
    </MenuItem>
  ));
};

const AppNavBar = () => {
  const auth = useAuth();
  const colorMode = useContext(ThemeContext);
  const theme = useTheme();
  const { cart, dishesSum } = useShoppingCart();
  const [menuAnchorElem, setMenuAnchorElem] = useState<null | HTMLElement>(null);
  const [profileMenuAnchorElem, setProfileMenuAnchorElem] = useState<null | HTMLElement>(null);

  const handleLogout = async () => {
    try {
      await auth.api.logout();
      auth.setUserRole(null);
      setProfileMenuAnchorElem(null);
      window.localStorage.removeItem('userRole');
      // eslint-disable-next-line no-empty
    } catch {}
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorElem(event.currentTarget);
  };

  const handleMenuClosed = () => {
    setMenuAnchorElem(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchorElem(event.currentTarget);
  };

  const handleProfileMenuClosed = () => {
    setProfileMenuAnchorElem(null);
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
            {menuItems(auth.isLoggedIn ? LEFT_PAGES : PAGES)}
          </Menu>
        </Box>
        <Link href={routes.home} sx={{ mx: 'auto' }}>
          <img
            src={theme.palette.mode === 'dark' ? logoDark : logo}
            alt='JeszCoChcesz'
            style={{ display: 'block', height: '6rem', paddingBlock: '1rem' }}
          />
        </Link>
        <Box sx={{ flexGrow: 1, ml: 8, display: { xs: 'none', md: 'block' } }}>{LEFT_PAGES.map(pageToButton)}</Box>
        {!auth.isLoggedIn && <Box sx={{ display: { xs: 'none', md: 'block' } }}>{RIGHT_PAGES.map(pageToButton)}</Box>}
        <Tooltip title={`tryb ${theme.palette.mode === 'dark' ? 'jasny' : 'ciemny'}`} placement='top'>
          <IconButton sx={{ ml: 1, color: themeForegroundColor }} onClick={colorMode.toggleColorMode} color='inherit'>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
        {auth.isLoggedIn && (
          <Box sx={{ display: 'block' }}>
            <IconButton onClick={handleProfileMenuOpen} sx={{ p: 2 }} title='Profil'>
              <PersonIcon sx={{ fontSize: '3.5rem' }} color='secondary' />
            </IconButton>
            <Menu
              anchorEl={profileMenuAnchorElem}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={Boolean(profileMenuAnchorElem)}
              onClose={handleProfileMenuClosed}
            >
              {[
                auth.userRole === Role.User ? menuItems(USER_PAGES) : menuItems(PARTNER_PAGES),
                <Divider key='divider' />,
                <MenuItem key='logout' onClick={handleLogout}>
                  Wyloguj się
                </MenuItem>,
              ]}
            </Menu>
          </Box>
        )}

        <Tooltip
          title={cart.length === 0 ? <Typography fontSize='1.5rem'>Twój koszyk jest pusty</Typography> : ''}
          placement='bottom-end'
        >
          <Box sx={{ borderRadius: '50%', ml: 2, p: 2, backgroundColor: 'secondary.main' }}>
            <Badge badgeContent={dishesSum} color='primary' invisible={cart.length === 0}>
              <IconButton color='primary' disabled={cart.length === 0} href={routes.shoppingCart} title='Koszyk'>
                <ShoppingBasketIcon />
              </IconButton>
            </Badge>
          </Box>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export { AppNavBar };
