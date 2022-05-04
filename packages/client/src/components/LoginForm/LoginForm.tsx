import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';

import { routes } from '../../config/routes';

const LoginForm = () => (
  <>
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
      <TextField sx={{ marginBottom: '2rem' }} variant='outlined' label='Email' />
      <TextField sx={{ marginBottom: '2rem' }} variant='outlined' type='password' label='Hasło' />
      <FormControlLabel sx={{ marginBottom: '2rem' }} control={<Checkbox />} label='Zapamiętaj mnie' />
    </Box>
    <Button variant='contained' size='large' color='primary' sx={{ borderRadius: '2rem' }} href={routes.main}>
      Zaloguj się
    </Button>
  </>
);

export { LoginForm };
