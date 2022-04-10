import { Box, Button, Link, Typography } from '@mui/material';

import pizza from '../assets/pizza.png';

const RegisterForm = () => (
  <Box
    sx={{ background: '#eee', height: '80vh', width: '70vw', borderRadius: '30px', display: 'flex' }}
    className='Register'
  >
    <Box sx={{ width: '50%', height: '100%' }}>
      <img
        style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '30px 0 0 30px' }}
        src={pizza}
        alt='Pizza'
      />
    </Box>
    <Box sx={{ width: '50%', height: '100%' }}>
      <Typography color='#111' variant='h2'>
        Stwórz konto
      </Typography>
      <Button variant='contained' color='primary' sx={{ borderRadius: '2rem' }}>
        Zarejestruj się
      </Button>
      <Box sx={{ display: 'flex' }}>
        <Typography sx={{ marginRight: '10px' }} color='#111' variant='body1'>
          Masz już konto?
        </Typography>
        <Link href='#'>Zaloguj się</Link>
      </Box>
    </Box>
  </Box>
);

export { RegisterForm };
