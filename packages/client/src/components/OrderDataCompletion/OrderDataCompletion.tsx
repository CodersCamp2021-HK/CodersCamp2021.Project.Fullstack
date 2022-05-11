// eslint-disable-next-line import/no-extraneous-dependencies
import { EMAIL as EMAIL_CONST, PHONE_NUMBER as PHONE_NUMBER_CONST } from '@fullstack/server/src/auth/shared/Constants';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { routes } from '../../config';

const OrderDataCompletion = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [surnameErrorMessage, setSurnameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');

  const validateForm = () => {
    if (name === '') {
      setNameError(true);
      setNameErrorMessage('Wpisz poprawne imię.');
    }
    if (surname === '') {
      setSurnameError(true);
      setSurnameErrorMessage('Wpisz poprawne nazwisko.');
    }
    if (!email.match(EMAIL_CONST.REGEX)) {
      setEmailError(true);
      setEmailErrorMessage('Wpisz poprawny adres email.');
    }
    if (!phoneNumber.match(PHONE_NUMBER_CONST.REGEX)) {
      setPhoneNumberError(true);
      setPhoneNumberErrorMessage('Wpisz poprawny numer telefonu.');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNameError(false);
    setSurnameError(false);
    setEmailError(false);
    setPhoneNumberError(false);

    validateForm();
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete='off'>
      <Container fixed>
        <Box sx={{ bgcolor: '#FAFAFA' }}>
          <Grid item container spacing={5}>
            <Grid item xs={6} xl={6}>
              <Box marginLeft={5}>
                <Typography variant='h5' color='primary.main' marginBottom={3}>
                  Godzina dostawy
                </Typography>
                <FormControl sx={{ width: '60%' }}>
                  <InputLabel id='demo-simple-select-label'>Godzina dostawy</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    label='hours'
                    size='small'
                    value=''
                  >
                    <MenuItem value={1}>4:00 - 6:00</MenuItem>
                    <MenuItem value={2}>6:00 - 8:00</MenuItem>
                    <MenuItem value={3}>8:00 - 10:00</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6} xl={6}>
              <Box>
                <Typography variant='h5' color='primary.main' marginBottom={3}>
                  Adres dostawy
                </Typography>
                <FormControl>
                  <RadioGroup aria-labelledby='demo-radio-buttons-group-label' name='radio-buttons-group'>
                    <FormControlLabel value='1' control={<Radio />} label='Mickiewicza 20A /1, 00-000 Warszawa' />
                    <FormControlLabel value='2' control={<Radio />} label='Mickiewicza 20A /1, 00-000 Warszawa' />
                    <FormControlLabel value='3' control={<Radio />} label='Mickiewicza 20A /1, 00-000 Warszawa' />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6} xl={6}>
              <Box marginLeft={5}>
                <Typography variant='h5' color='primary.main' marginBottom={3}>
                  Informacje podstawowe
                </Typography>
                <TextField
                  sx={{ pr: 0.5, mb: 1 }}
                  id='name'
                  size='small'
                  label='Imię'
                  required
                  error={nameError}
                  helperText={nameError === false ? '' : nameErrorMessage}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  sx={{ pr: 0.5, mb: 1 }}
                  id='surname'
                  size='small'
                  label='Nazwisko'
                  required
                  error={surnameError}
                  helperText={surnameError === false ? '' : surnameErrorMessage}
                  onChange={(e) => setSurname(e.target.value)}
                />
                <TextField
                  sx={{ pr: 0.5, mb: 0.5 }}
                  id='email'
                  size='small'
                  label='Adres email'
                  required
                  error={emailError}
                  helperText={emailError === false ? '' : emailErrorMessage}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  sx={{ pr: 0.5, mb: 0.5 }}
                  id='phone-number'
                  size='small'
                  label='Numer telefonu'
                  required
                  error={phoneNumberError}
                  helperText={phoneNumberError === false ? '' : phoneNumberErrorMessage}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={6} xl={6}>
              <Box>
                <TextField required sx={{ width: '90%', pr: 0.5, mb: 1 }} size='small' id='street' label='Ulica' />
                <TextField
                  required
                  sx={{ width: '30%', pr: 0.5, mb: 1 }}
                  size='small'
                  id='street-number'
                  label='Numer domu'
                />
                <TextField
                  sx={{ width: '30%', pr: 0.5, mb: 1 }}
                  size='small'
                  id='apartment-number'
                  label='Numer mieszkania'
                />
                <TextField sx={{ width: '30%', pr: 0.5, mb: 1 }} size='small' id='floor' label='Piętro' />
                <TextField
                  required
                  sx={{ width: '30%', pr: 0.5, mb: 1 }}
                  size='small'
                  id='post-code'
                  label='Kod pocztowy'
                />
                <TextField required sx={{ width: '60%', pr: 0.5, mb: 1 }} size='small' id='city' label='Miasto' />
              </Box>
            </Grid>
            <Grid container justifyContent='center' alignItems='center'>
              <Button type='submit' variant='contained' color='secondary' sx={{ m: 10, width: '20%' }}>
                PRZEJDŹ DO PŁATNOŚCI
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </form>
  );
};

export { OrderDataCompletion };
