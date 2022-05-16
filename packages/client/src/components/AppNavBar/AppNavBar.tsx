import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasketOutlined';
import {
  AppBar,
  Badge,
  Box,
  Button,
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
import { routes } from '../../config';
import { ThemeContext, useShoppingCart } from '../../contexts';

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
    color: (theme: Theme) => theme.palette.primary.main,
  },
  {
    name: 'Rejestracja',
    pathname: routes.userRegister,
    color: (theme: Theme) => theme.palette.secondary.dark,
  },
] as const;

const PAGES = [...LEFT_PAGES, ...RIGHT_PAGES] as const;

const pageToButton = (page: typeof PAGES[number]) => (
  <Button
    key={page.pathname}
    href={page.pathname}
    sx={{ color: 'color' in page ? page.color : (theme: Theme) => theme.palette.text.primary, px: 2 }}
  >
    {page.name}
  </Button>
);
const AppNavBar = () => {
  const colorMode = useContext(ThemeContext);
  const theme = useTheme();
  const { cart } = useShoppingCart();

  const [menuAnchorElem, setMenuAnchorElem] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorElem(event.currentTarget);
  };

  const handleMenuClosed = () => {
    setMenuAnchorElem(null);
  };

  console.log(cart.length);
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
              <MenuItem key={page.pathname} component={Link} href={page.pathname}>
                {page.name}
              </MenuItem>
            ))}
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
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>{RIGHT_PAGES.map(pageToButton)}</Box>
        <Tooltip title={`tryb ${theme.palette.mode === 'dark' ? 'jasny' : 'ciemny'}`} placement='top'>
          <IconButton
            sx={{ ml: 1, color: theme.palette.primary.main }}
            onClick={colorMode.toggleColorMode}
            color='inherit'
          >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
        <Tooltip
          title={cart.length === 0 ? <Typography fontSize='1.5rem'>Twój koszyk jest pusty</Typography> : ''}
          placement='bottom-end'
        >
          <Button variant='contained' color='secondary' sx={{ borderRadius: '50%', ml: 2, p: 2 }}>
            <Badge badgeContent={cart.length} color='primary' variant='dot' invisible={cart.length === 0}>
              <IconButton color='primary' disabled={cart.length === 0} href={routes.shoppingCart} title='Koszyk'>
                <ShoppingBasketIcon />
              </IconButton>
            </Badge>
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export { AppNavBar };
