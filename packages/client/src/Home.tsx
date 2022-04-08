import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasketOutlined';
import { AppBar, Box, Button, Fab, IconButton, Link, Stack, Toolbar, Typography, useTheme } from '@mui/material';

import hero from './hero.png';
import logo from './logo.svg';

const pages = ['O nas', 'Kontakt', 'Dostawa'];

const Home = () => {
  const theme = useTheme();

  return (
    <>
      <AppBar sx={{ background: '#1B5E2014' }} position='fixed'>
        <Toolbar sx={{ width: 'min(100%, 92rem)', mx: 'auto' }}>
          {/* TODO: Change this when router is ready */}
          <Link href='/'>
            <img src={logo} alt='JeszCoChcesz' style={{ display: 'block', height: '6rem', paddingBlock: '1rem' }} />
          </Link>
          <Box sx={{ flexGrow: 1, ml: 8 }}>
            {pages.map((page) => (
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
      <Box
        sx={{
          height: 'calc(100vh - 6rem)',
          mt: '6rem',
          background: `linear-gradient(118.2deg, rgba(27, 94, 32, 0.5) 38.72%, rgba(0, 0, 0, 0.12) 88.45%), url(${hero}) center center / cover`,
        }}
      >
        <Stack sx={{ p: 8, height: 1, maxWidth: '92rem', mx: 'auto' }} justifyContent='flex-end' spacing={4}>
          <Typography color='secondary' variant='h5'>
            Nie musisz dalej szukać
          </Typography>
          <Typography color='white' sx={{ typography: { sm: 'h2', xl: 'h1' }, maxWidth: 0.5 }}>
            Wybieraj dania z najlepszych restauracji
          </Typography>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Button variant='contained' color='secondary' sx={{ borderRadius: '2rem' }}>
              Złóż zamówienie
            </Button>
            <IconButton color='secondary' size='small'>
              <ArrowDownward fontSize='large' />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export { Home };
