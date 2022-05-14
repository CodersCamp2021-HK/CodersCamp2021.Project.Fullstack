import { AddressDto } from '@fullstack/sdk';
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

const userPersonalInfo = {
  id: '1',
  name: 'Jan',
  surname: 'Kowalski',
  phoneNumber: '800500300',
};

const addresses = [
  {
    id: '1',
    street: 'Słowackiego',
    streetNumber: '15',
    apartmentNumber: '1',
    floor: '1',
    city: 'Wrocław',
    postcode: '00-000',
  },

  {
    id: '2',
    street: 'Sienkiewicza',
    streetNumber: '5',
    city: 'Wrocław',
    postcode: '00-000',
  },

  {
    id: '3',
    street: 'Sienkiewicza',
    streetNumber: '5',
    city: 'Wrocław',
    postcode: '00-000',
  },
];

const addressToString = (address: AddressDto) => {
  return `${address.street} ${address.streetNumber} ${address.apartmentNumber ? `/${address.apartmentNumber},` : ','} ${
    address.floor ? `p. ${address.floor},` : ''
  } ${address.postcode} ${address.city}`;
};

const OrderDataCompletion = () => {
  const [name, setName] = useState(userPersonalInfo.name || '');
  const [surname, setSurname] = useState(userPersonalInfo.surname || '');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(userPersonalInfo.phoneNumber || '');
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [floor, setFloor] = useState('');
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState('');

  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [surnameErrorMessage, setSurnameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');

  const getAddress = (e: string) => {
    const addressObject: AddressDto = JSON.parse(e);
    setStreet(addressObject.street);
    setStreetNumber(addressObject.streetNumber);
    setApartmentNumber(addressObject.apartmentNumber || '');
    setFloor(addressObject.floor || '');
    setPostcode(addressObject.postcode);
    setCity(addressObject.city);
  };

  const validateForm = () => {
    if (!name.match(/^[A-Za-z]{3,35}+$/)) {
      setNameError(true);
      setNameErrorMessage('Wpisz poprawne imię.');
    }
    if (!surname.match(/^[A-Za-z]{3,35}+$/)) {
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
                  <RadioGroup
                    aria-labelledby='demo-radio-buttons-group-label'
                    name='radio-buttons-group'
                    onChange={(e) => getAddress(e.target.value)}
                  >
                    {addresses.map((e) => (
                      <FormControlLabel
                        key={e.id}
                        value={JSON.stringify(e)}
                        control={<Radio />}
                        label={addressToString(e)}
                      />
                    ))}
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
                  value={name}
                  error={nameError}
                  helperText={nameError === false ? '' : nameErrorMessage}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <TextField
                  sx={{ pr: 0.5, mb: 1 }}
                  id='surname'
                  size='small'
                  label='Nazwisko'
                  required
                  value={surname}
                  error={surnameError}
                  helperText={surnameError === false ? '' : surnameErrorMessage}
                  onChange={(e) => {
                    setSurname(e.target.value);
                  }}
                />
                <TextField
                  sx={{ pr: 0.5, mb: 0.5 }}
                  id='email'
                  size='small'
                  label='Adres email'
                  required
                  error={emailError}
                  helperText={emailError === false ? '' : emailErrorMessage}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <TextField
                  sx={{ pr: 0.5, mb: 0.5 }}
                  id='phone-number'
                  size='small'
                  label='Numer telefonu'
                  required
                  value={phoneNumber}
                  error={phoneNumberError}
                  helperText={phoneNumberError === false ? '' : phoneNumberErrorMessage}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={6} xl={6}>
              <Box>
                <TextField
                  required
                  sx={{ width: '90%', pr: 0.5, mb: 1 }}
                  size='small'
                  id='street'
                  label='Ulica'
                  value={street}
                  onChange={(e) => {
                    setStreet(e.target.value);
                  }}
                />
                <TextField
                  required
                  sx={{ width: '30%', pr: 0.5, mb: 1 }}
                  size='small'
                  id='street-number'
                  label='Numer domu'
                  value={streetNumber}
                  onChange={(e) => {
                    setStreetNumber(e.target.value);
                  }}
                />
                <TextField
                  sx={{ width: '30%', pr: 0.5, mb: 1 }}
                  size='small'
                  id='apartment-number'
                  label='Numer mieszkania'
                  value={apartmentNumber}
                  onChange={(e) => {
                    setApartmentNumber(e.target.value);
                  }}
                />
                <TextField
                  sx={{ width: '30%', pr: 0.5, mb: 1 }}
                  size='small'
                  id='floor'
                  label='Piętro'
                  value={floor}
                  onChange={(e) => {
                    setFloor(e.target.value);
                  }}
                />
                <TextField
                  required
                  sx={{ width: '30%', pr: 0.5, mb: 1 }}
                  size='small'
                  id='post-code'
                  label='Kod pocztowy'
                  value={postcode}
                  onChange={(e) => {
                    setPostcode(e.target.value);
                  }}
                />
                <TextField
                  required
                  sx={{ width: '60%', pr: 0.5, mb: 1 }}
                  size='small'
                  id='city'
                  label='Miasto'
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
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
