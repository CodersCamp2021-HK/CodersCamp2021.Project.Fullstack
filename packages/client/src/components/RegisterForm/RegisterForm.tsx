import { Box, Button, TextField } from '@mui/material';

import { routes } from '../../config/routes';

type RegisterFormProps = {
  userRole: 'User' | 'Partner';
};

const RegisterForm = ({ userRole }: RegisterFormProps) => (
  <>
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
      <TextField sx={{ marginBottom: '2rem' }} variant='outlined' label='Email' />
      {userRole === 'Partner' && <TextField sx={{ marginBottom: '2rem' }} variant='outlined' label='NIP' />}
      <TextField sx={{ marginBottom: '2rem' }} variant='outlined' type='password' label='Hasło' />
      <TextField sx={{ marginBottom: '5rem' }} variant='outlined' type='password' label='Powtórz hasło' />
    </Box>
    <Button variant='contained' size='large' color='primary' sx={{ borderRadius: '2rem' }} href={routes.main}>
      Zarejestruj się
    </Button>
  </>
);

export { RegisterForm };
