import { Box, Button, Link, TextField, Typography, useTheme } from '@mui/material';

const PartnerRegisterForm = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '45rem',
        height: '56.625rem',
        margin: '1rem',
        background: '#fff',
        boxShadow: '20',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{ marginBottom: '5rem', textAlign: 'center' }}
          color={theme.palette.secondary.contrastText}
          variant='h2'
        >
          Dołącz do naszych partnerów
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
          <TextField sx={{ marginBottom: '2rem' }} variant='outlined' label='Email' />
          <TextField sx={{ marginBottom: '2rem' }} variant='outlined' label='NIP' />
          <TextField sx={{ marginBottom: '2rem' }} variant='outlined' type='password' label='Hasło' />
          <TextField sx={{ marginBottom: '2rem' }} variant='outlined' type='password' label='Powtórz hasło' />
        </Box>
        <Button variant='contained' size='large' color='primary' sx={{ borderRadius: '2rem' }}>
          Zarejestruj się
        </Button>
        <Box sx={{ marginTop: '7rem', display: 'flex' }}>
          <Typography color={theme.palette.secondary.contrastText} variant='body1'>
            Jesteś już w naszym programie?
            <Link sx={{ marginLeft: '10px' }} href='/'>
              Zaloguj się
            </Link>
            .
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export { PartnerRegisterForm };
