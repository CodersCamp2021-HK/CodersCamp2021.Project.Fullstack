import { Box, Button, Link, TextField, Typography, useTheme } from '@mui/material';

import { RegisterProps } from '../pages';

const RegisterForm = ({ userRole }: RegisterProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '45rem',
        height: '46.625rem',
        background: '#fff',
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
          sx={{ marginBottom: userRole === 'Partner' ? '2rem' : '5rem', textAlign: 'center' }}
          color={theme.palette.secondary.contrastText}
          variant='h2'
        >
          {userRole === 'Partner' ? 'Dołącz do naszych partnerów' : 'Stwórz konto'}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
          <TextField sx={{ marginBottom: '2rem' }} variant='outlined' label='Email' />
          {userRole === 'Partner' && <TextField sx={{ marginBottom: '2rem' }} variant='outlined' label='NIP' />}
          <TextField sx={{ marginBottom: '2rem' }} variant='outlined' type='password' label='Hasło' />
          <TextField
            sx={{ marginBottom: userRole === 'Partner' ? '3rem' : '4rem' }}
            variant='outlined'
            type='password'
            label='Powtórz hasło'
          />
        </Box>
        <Button variant='contained' size='large' color='primary' sx={{ borderRadius: '2rem' }}>
          Zarejestruj się
        </Button>
        <Box sx={{ marginTop: userRole === 'Partner' ? '2rem' : '7rem', display: 'flex' }}>
          <Typography sx={{ marginRight: '10px' }} color={theme.palette.secondary.contrastText} variant='body1'>
            {userRole === 'Partner' ? 'Jesteś w naszym programie?' : 'Masz już konto?'}
          </Typography>
          <Link href='/'>Zaloguj się</Link>
        </Box>
      </Box>
    </Box>
  );
};

export { RegisterForm };
