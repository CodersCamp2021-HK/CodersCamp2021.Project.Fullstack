import { AuthApi, LoginDto, Role } from '@fullstack/sdk';
// eslint-disable-next-line import/no-extraneous-dependencies
import { EMAIL as EMAIL_CONST } from '@fullstack/server/src/auth/shared/Constants';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useContext, useState } from 'react';

import { apiConfiguration } from '../../config';
import { AuthContext } from '../../contexts';

interface Error {
  status: number;
}

const LoginForm = ({ userRole }: { userRole: Role }) => {
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const validateForm = (status: number) => {
    if (!email.match(EMAIL_CONST.REGEX)) {
      setEmailError(true);
      setEmailErrorMessage('Wpisz poprawny adres email');
    }
    if (password === '') {
      setPasswordError(true);
      setPasswordErrorMessage('Wpisz hasło.');
    }
    if (status === 401) {
      setEmailError(true);
      setPasswordError(true);
      setEmailErrorMessage('');
      setPasswordErrorMessage('Błędne dane logowania.');
    }
  };

  const loginUser = async (loginData: LoginDto) => {
    try {
      await new AuthApi(apiConfiguration).login({ loginDto: loginData });
      setAuth({ isLoggedIn: true, userRole });
    } catch (e) {
      const error = e as Error;
      validateForm(error.status);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    loginUser({ email, role: userRole, password, rememberMe });
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
