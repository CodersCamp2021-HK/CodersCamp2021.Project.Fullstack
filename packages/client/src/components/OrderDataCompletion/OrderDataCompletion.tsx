import { AddressDto, CreateAddressDto, UpdateUserDto, UsersAddressesApi, UserssProfileApi } from '@fullstack/sdk/src';
// eslint-disable-next-line import/no-extraneous-dependencies
import { EMAIL as EMAIL_CONST, PHONE_NUMBER as PHONE_NUMBER_CONST } from '@fullstack/server/src/auth/shared/Constants';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { apiConfiguration, routes } from '../../config';
import { useShoppingCart } from '../../contexts';

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
  return `${address.street} ${address.streetNumber}${address.apartmentNumber ? `/${address.apartmentNumber}` : ''}${
    address.floor ? `, p. ${address.floor}` : ''
  }, ${address.postcode} ${address.city}`;
};

const OrderDataCompletion = () => {
  const [name, setName] = useState(userPersonalInfo.name || '');
  const nameErrorMessage = name.match(/^[A-ZĄĆĘŁŃÓŚŹŻ]{3,35}$/i) ? '' : 'Wpisz poprawne imię.';

  const [surname, setSurname] = useState(userPersonalInfo.surname || '');
  const surnameErrorMessage = surname.match(/^[A-ZĄĆĘŁŃÓŚŹŻ-]{3,35}$/i) ? '' : 'Wpisz poprawne nazwisko.';

  const [email, setEmail] = useState('');
  const emailErrorMessage = email.match(EMAIL_CONST.REGEX) ? '' : 'Wpisz poprawny adres email.';

  const [phoneNumber, setPhoneNumber] = useState(userPersonalInfo.phoneNumber || '');
  const phoneNumberErrorMessage = phoneNumber.match(PHONE_NUMBER_CONST.REGEX) ? '' : 'Wpisz poprawny numer telefonu.';

  const [street, setStreet] = useState('');
  const streetErrorMessage = street.match(/^[A-ZĄĆĘŁŃÓŚŹŻ0-9.,\- ]{3,35}$/i) ? '' : 'Wpisz poprawną nazwę ulicy.';

  const [streetNumber, setStreetNumber] = useState('');
  const streetNumberErrorMessage = streetNumber.match(/^\d{1,3}[A-ZĄĆĘŁŃÓŚŹŻ]?$/i) ? '' : 'Wpisz poprawny numer ulicy.';

  const [apartmentNumber, setApartmentNumber] = useState('');
  const apartmentNumberErrorMessage = apartmentNumber.match(/^\d{0,3}$/) ? '' : 'Wpisz poprawny numer mieszkania.';

  const [floor, setFloor] = useState('');
  const floorErrorMessage = floor.match(/^\d{0,2}$/) ? '' : 'Wpisz poprawne piętro.';

  const [postcode, setPostcode] = useState('');
  const postcodeErrorMessage = postcode.match(/^\d{2}-\d{3}$/) ? '' : 'Wpisz poprawny kod pocztowy.';

  const [city, setCity] = useState('');
  const cityErrorMessage = city.match(/^[A-ZĄĆĘŁŃÓŚŹŻ]{2,35}$/i) ? '' : 'Wpisz poprawne miasto.';

  const [deliveryHours, setDeliveryHours] = useState('');
  const deliveryHoursErrorMessage = deliveryHours !== '' ? '' : 'Wybierz godzinę dostawy';

  const [clearAddressRadioButton, setClearAddressRadioButton] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const fillAddressForm = (e: string) => {
    const addressObject: AddressDto = JSON.parse(e);

    setClearAddressRadioButton(false);

    setStreet(addressObject.street);
    setStreetNumber(addressObject.streetNumber);
    setApartmentNumber(addressObject.apartmentNumber || '');
    setFloor(addressObject.floor || '');
    setPostcode(addressObject.postcode);
    setCity(addressObject.city);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDidSubmit(true);
  };

  const handleSelectDeliveryHours = (e) => {
    e.preventDefault();
    setDeliveryHours(e.target.value);
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
                    error={didSubmit && deliveryHoursErrorMessage !== ''}
                    onChange={handleSelectDeliveryHours}
                  >
                    <MenuItem value={4}>4:00 - 6:00</MenuItem>
                    <MenuItem value={6}>6:00 - 8:00</MenuItem>
                    <MenuItem value={8}>8:00 - 10:00</MenuItem>
                  </Select>
                  {didSubmit && <FormHelperText error>{deliveryHoursErrorMessage}</FormHelperText>}
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
                    onChange={(e) => fillAddressForm(e.target.value)}
                  >
                    {addresses.map((e) => (
                      <FormControlLabel
                        key={e.id}
                        value={JSON.stringify(e)}
                        control={<Radio />}
                        label={addressToString(e)}
                        checked={clearAddressRadioButton ? false : undefined}
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
                  error={didSubmit && nameErrorMessage !== ''}
                  helperText={nameErrorMessage}
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
                  error={didSubmit && surnameErrorMessage !== ''}
                  helperText={surnameErrorMessage}
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
                  error={didSubmit && emailErrorMessage !== ''}
                  helperText={emailErrorMessage}
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
                  error={didSubmit && phoneNumberErrorMessage !== ''}
                  helperText={phoneNumberErrorMessage}
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
                  error={didSubmit && streetErrorMessage !== ''}
                  helperText={streetErrorMessage}
                  onChange={(e) => {
                    setStreet(e.target.value);
                    setClearAddressRadioButton(true);
                  }}
                />
                <TextField
                  required
                  sx={{ width: '30%', pr: 0.5, mb: 1 }}
                  size='small'
                  id='street-number'
                  label='Numer domu'
                  value={streetNumber}
                  error={didSubmit && streetNumberErrorMessage !== ''}
                  helperText={streetNumberErrorMessage}
                  onChange={(e) => {
                    setStreetNumber(e.target.value);
                    setClearAddressRadioButton(true);
                  }}
                />
                <TextField
                  sx={{ width: '30%', pr: 0.5, mb: 1 }}
                  size='small'
                  id='apartment-number'
                  label='Numer mieszkania'
                  value={apartmentNumber}
                  error={didSubmit && apartmentNumberErrorMessage !== ''}
                  helperText={apartmentNumberErrorMessage}
                  onChange={(e) => {
                    setApartmentNumber(e.target.value);
                    setClearAddressRadioButton(true);
                  }}
                />
                <TextField
                  sx={{ width: '30%', pr: 0.5, mb: 1 }}
                  size='small'
                  id='floor'
                  label='Piętro'
                  value={floor}
                  error={didSubmit && floorErrorMessage !== ''}
                  helperText={floorErrorMessage}
                  onChange={(e) => {
                    setFloor(e.target.value);
                    setClearAddressRadioButton(true);
                  }}
                />
                <TextField
                  required
                  sx={{ width: '30%', pr: 0.5, mb: 1 }}
                  size='small'
                  id='post-code'
                  label='Kod pocztowy'
                  value={postcode}
                  error={didSubmit && postcodeErrorMessage !== ''}
                  helperText={postcodeErrorMessage}
                  onChange={(e) => {
                    setPostcode(e.target.value);
                    setClearAddressRadioButton(true);
                  }}
                />
                <TextField
                  required
                  sx={{ width: '60%', pr: 0.5, mb: 1 }}
                  size='small'
                  id='city'
                  label='Miasto'
                  value={city}
                  error={didSubmit && cityErrorMessage !== ''}
                  helperText={cityErrorMessage}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setClearAddressRadioButton(true);
                  }}
                />
              </Box>
            </Grid>
            <Grid container justifyContent='center' alignItems='center'>
              <Button
                type='submit'
                variant='contained'
                color='secondary'
                sx={{ m: 10, width: '20%' }}
                onClick={(e) => {
                  console.log(deliveryHours);
                }}
              >
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
