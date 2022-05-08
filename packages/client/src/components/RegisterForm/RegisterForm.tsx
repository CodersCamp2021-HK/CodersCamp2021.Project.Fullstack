import { AuthApi, RegisterAsPartnerDto, RegisterAsUserDto, Role } from '@fullstack/sdk';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  EMAIL as EMAIL_CONST,
  NIP as NIP_CONST,
  PASSWORD as PASSWORD_CONST,
  PHONE_NUMBER as PHONE_NUMBER_CONST,
} from '@fullstack/server/src/auth/shared/Constants';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

import { apiConfiguration } from '../../config';

interface Error {
  status: number;
}

const RegisterForm = ({ userRole }: { userRole: Role }) => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [NIP, setNIP] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [NIPError, setNIPError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);

  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');
  const [NIPErrorMessage, setNIPErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [repeatPasswordErrorMessage, setRepeatPasswordErrorMessage] = useState('');

  const validateForm = (status: number) => {
    if (!email.match(EMAIL_CONST.REGEX)) {
      setEmailError(true);
      setEmailErrorMessage('Wpisz poprawny adres email.');
    }
    if (!phoneNumber.match(PHONE_NUMBER_CONST.REGEX)) {
      setPhoneNumberError(true);
      setPhoneNumberErrorMessage('Wpisz poprawny numer telefonu.');
    }
    if (!NIP.match(NIP_CONST.REGEX)) {
      setNIPError(true);
      setNIPErrorMessage('Wpisz poprawny NIP.');
    }
    if (!password.match(PASSWORD_CONST.REGEX)) {
      setPasswordError(true);
      setPasswordErrorMessage(
        'Wpisz poprawne hasło. Hasło musi zawierać minimum osiem znaków, w tym minimum jedną literę i jedną cyfrę.',
      );
    }
    if (repeatPassword === '' || repeatPassword !== password) {
      setRepeatPasswordError(true);
      setRepeatPasswordErrorMessage('Podane hasła nie pasują do siebie.');
    }
    if (status === 409) {
      setEmailError(true);
      setEmailErrorMessage('Użytkownik o podanym adresie istnieje.');
    }
  };

  const registerUser = async (registerData: RegisterAsUserDto) => {
    try {
      await new AuthApi(apiConfiguration).registerAsUser({ registerAsUserDto: registerData });
    } catch (e) {
      const error = e as Error;
      validateForm(error.status);
    }
  };

  const registerPartner = async (registerData: RegisterAsPartnerDto) => {
    try {
      await new AuthApi(apiConfiguration).registerAsPartner({ registerAsPartnerDto: registerData });
    } catch (e) {
      const error = e as Error;
      validateForm(error.status);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError(false);
    setPhoneNumberError(false);
    setNIPError(false);
    setPasswordError(false);
    setRepeatPasswordError(false);

    if (userRole === Role.User) registerUser({ email, password });
    if (userRole === Role.Partner) registerPartner({ email, phoneNumber, nip: NIP, password });
  };

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '70%' }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete='off'
    >
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
      {userRole === Role.Partner && (
        <TextField
          sx={{ marginBottom: '2rem' }}
          variant='outlined'
          fullWidth
          label='Numer telefonu'
          required
          error={phoneNumberError}
          helperText={phoneNumberError === false ? '' : phoneNumberErrorMessage}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      )}
      {userRole === Role.Partner && (
        <TextField
          sx={{ marginBottom: '2rem' }}
          variant='outlined'
          fullWidth
          label='NIP'
          required
          error={NIPError}
          helperText={NIPError === false ? '' : NIPErrorMessage}
          onChange={(e) => setNIP(e.target.value)}
        />
      )}
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
      <TextField
        sx={{ marginBottom: '5rem' }}
        variant='outlined'
        fullWidth
        type='password'
        label='Powtórz hasło'
        required
        error={repeatPasswordError}
        helperText={repeatPasswordError === false ? '' : repeatPasswordErrorMessage}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      <Button type='submit' variant='contained' size='large' color='primary' sx={{ borderRadius: '2rem' }}>
        Zarejestruj się
      </Button>
    </form>
  );
};
export { RegisterForm };
