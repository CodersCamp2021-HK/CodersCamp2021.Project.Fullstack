import { Box, Button, Checkbox, FormControlLabel, Link, TextField, Typography, useTheme } from '@mui/material';

import { routes } from '../../config/routes';

const UserLoginForm = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '45rem',
        height: '46.625rem',
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
          Witamy ponownie!
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
          <TextField sx={{ marginBottom: '2rem' }} variant='outlined' label='Email' />
          <TextField sx={{ marginBottom: '2rem' }} variant='outlined' type='password' label='Hasło' />
          <FormControlLabel sx={{ marginBottom: '2rem' }} control={<Checkbox />} label='Zapamiętaj mnie' />
        </Box>
        <Button variant='contained' size='large' color='primary' sx={{ borderRadius: '2rem' }} href={routes.main}>
          Zaloguj się
        </Button>
        <Box sx={{ marginTop: '7rem', display: 'flex' }}>
          <Typography color={theme.palette.secondary.contrastText} variant='body1'>
            Nie masz konta?
            <Link sx={{ marginLeft: '10px' }} href={routes.userRegister}>
              Zarejestruj się
            </Link>
            .
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export { UserLoginForm };
