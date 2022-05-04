// eslint-disable-next-line import/no-extraneous-dependencies
import { EMAIL as EMAIL_CONST } from '@fullstack/server/src/auth/shared/Constants';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setRememberMe] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    if (!email.match(EMAIL_CONST.REGEX)) {
      setEmailError(true);
      setEmailErrorMessage('Wpisz poprawny adres email');
    }
    if (password === '') {
      setPasswordError(true);
      setPasswordErrorMessage('Wpisz hasło.');
    }
  };

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '70%' }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete='off'
    >
      <div>
        <TextField
          sx={{ marginBottom: '2rem' }}
          variant='outlined'
          fullWidth
          label='Email'
          required
          error={emailError}
          helperText={emailError === false ? '' : emailErrorMessage}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ marginBottom: '2rem' }}
          variant='outlined'
          fullWidth
          type='password'
          label='Hasło'
          required
          error={passwordError}
          helperText={passwordError === false ? '' : passwordErrorMessage}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControlLabel
          sx={{ marginBottom: '2rem' }}
          control={<Checkbox />}
          label='Zapamiętaj mnie'
          onChange={(e) => setRememberMe((e.target as HTMLInputElement).checked)}
        />
      </div>
      <Button type='submit' variant='contained' size='large' color='primary' sx={{ borderRadius: '2rem' }}>
        Zaloguj się
      </Button>
    </form>
  );
};

export { LoginForm };
