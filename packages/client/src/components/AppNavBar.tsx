import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasketOutlined';
import { AppBar, Box, Button, Fab, IconButton, Link, Menu, MenuItem, Toolbar, Tooltip, useTheme } from '@mui/material';
import { useContext, useState } from 'react';

import logo from '../assets/logo.svg';
import { ThemeContext } from '../context';

const PAGES = ['O nas', 'Kontakt', 'Dostawa'] as const;

const AppNavBar = () => {
  const colorMode = useContext(ThemeContext);
  const theme = useTheme();

  const [menuAnchorElem, setMenuAnchorElem] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorElem(event.currentTarget);
  };

  const handleMenuClosed = () => {
    setMenuAnchorElem(null);
  };

  return (
    <AppBar position='static' sx={{ bgcolor: 'primary.background' }}>
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
            {[...PAGES, 'Logowanie', 'Rejestracja'].map((page) => (
              <MenuItem sx={{ color: theme.palette.secondary.contrastText }} key={page} onClick={handleMenuClosed}>
                {page}
              </MenuItem>
            ))}
          </Menu>
        </Box>
        {/* TODO: Change this when router is ready */}
        <Link href='/' sx={{ mx: 'auto' }}>
          <img src={logo} alt='JeszCoChcesz' style={{ display: 'block', height: '6rem', paddingBlock: '1rem' }} />
        </Link>
        <Box sx={{ flexGrow: 1, ml: 8, display: { xs: 'none', md: 'block' } }}>
          {PAGES.map((page) => (
            <Button key={page} sx={{ color: theme.palette.text.primary, px: 2 }}>
              {page}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Button sx={{ color: theme.palette.primary.main, px: 2 }}>Logowanie</Button>
          <Button sx={{ color: theme.palette.secondary.dark, px: 2 }}>Rejestracja</Button>
          <Tooltip title={`tryb ${theme.palette.mode === 'dark' ? 'jasny' : 'ciemny'}`} placement='top'>
            <IconButton
              sx={{ ml: 1, color: theme.palette.primary.main }}
              onClick={colorMode.toggleColorMode}
              color='inherit'
            >
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
        </Box>
        <Fab color='secondary' sx={{ boxShadow: 0, ml: 2 }}>
          <ShoppingBasketIcon color='primary' />
        </Fab>
      </Toolbar>
    </AppBar>
  );
};

export { AppNavBar };
