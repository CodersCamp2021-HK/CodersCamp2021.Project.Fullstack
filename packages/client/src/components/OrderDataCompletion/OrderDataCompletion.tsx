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
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiConfiguration, routes } from '../../config';
import { useShoppingCart } from '../../contexts';

const addressToString = (address: AddressDto) => {
  return `${address.street} ${address.streetNumber}${address.apartmentNumber ? `/${address.apartmentNumber}` : ''}${
    address.floor ? `, p. ${address.floor}` : ''
  }, ${address.postcode} ${address.city}`;
};

const OrderDataCompletion = () => {
  const { setAddressId, setDeliveryHourStart, setUserData, setAddress, deliveryHourStart } = useShoppingCart();
  const [name, setName] = useState('');
  const nameErrorMessage = name.match(/^[A-ZĄĆĘŁŃÓŚŹŻ]{3,35}$/i) ? '' : 'Wpisz poprawne imię.';

  const [surname, setSurname] = useState('');
  const surnameErrorMessage = surname.match(/^[A-ZĄĆĘŁŃÓŚŹŻ-]{3,35}$/i) ? '' : 'Wpisz poprawne nazwisko.';

  const [email, setEmail] = useState('');
  const emailErrorMessage = email.match(EMAIL_CONST.REGEX) ? '' : 'Wpisz poprawny adres email.';

  const [phoneNumber, setPhoneNumber] = useState('');
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

  const [stateChangedUser, setStateChangedUser] = useState(() => false);
  const [stateChangedAddress, setStateChangedAddress] = useState(() => false);
  const [oldState, setOldState] = useState<string[]>([]);
  const [oldStateAddress, setOldStateAddress] = useState<string[]>([]);

  const [address, setAddressTable] = useState<AddressDto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const getUserData = await new UserssProfileApi(apiConfiguration).findById();
      setName(getUserData.name || '');
      setSurname(getUserData.surname || '');
      setPhoneNumber(getUserData.phoneNumber || '');
      setEmail(getUserData.email || '');
      setOldState([getUserData.name || '', getUserData.surname || '', getUserData.phoneNumber || '']);
      const getUserAddress = await new UsersAddressesApi(apiConfiguration).list();
      setAddressTable(
        getUserAddress.data.map((e) => ({
          id: e.id,
          street: e.street,
          streetNumber: e.streetNumber,
          apartmentNumber: e.apartmentNumber,
          postcode: e.postcode,
          city: e.city,
        })),
      );
    })();
  }, []);

  useEffect(() => {
    setUserData({ name, surname, phoneNumber, email });
  }, [name, surname, phoneNumber, email, setUserData]);
  const fillAddressForm = (e: string) => {
    const addressObject: AddressDto = JSON.parse(e);

    setClearAddressRadioButton(false);

    setStreet(addressObject.street);
    setStreetNumber(addressObject.streetNumber);
    setApartmentNumber(addressObject.apartmentNumber || '');
    setFloor(addressObject.floor || '');
    setPostcode(addressObject.postcode);
    setCity(addressObject.city);
    setOldStateAddress([
      addressObject.street,
      addressObject.streetNumber,
      addressObject.apartmentNumber || '',
      addressObject.floor || '',
      addressObject.postcode,
      addressObject.city,
    ]);
  };

  const handleSelectDeliveryHours = (e: SelectChangeEvent<string>) => {
    e.preventDefault();
    setDeliveryHours(e.target.value);
    setDeliveryHourStart(e.target.value);
  };

  const updateUserProfile = async (updateData: UpdateUserDto) => {
    try {
      await new UserssProfileApi(apiConfiguration).update({ updateUserDto: updateData });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const createUserAddress = async (updateData: CreateAddressDto) => {
    try {
      const getAddressApi = await new UsersAddressesApi(apiConfiguration).create({ createAddressDto: updateData });
      setAddressId(getAddressApi.id);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  // check if user put new address
  useEffect(() => {
    const newAddressTable = [street, streetNumber, apartmentNumber, floor, postcode, city];
    setAddress({ street, postcode, streetNumber, apartmentNumber, city });
    if (JSON.stringify(oldStateAddress) === JSON.stringify(newAddressTable)) setStateChangedAddress(false);
    else setStateChangedAddress(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [street, postcode, streetNumber, floor, apartmentNumber, city, oldStateAddress, stateChangedAddress]);

  // check if user put new profile data
  useEffect(() => {
    const newDataTable = [name, surname, phoneNumber, email];
    if (JSON.stringify(oldState) === JSON.stringify(newDataTable)) setStateChangedUser(false);
    else setStateChangedUser(true);
  }, [name, surname, phoneNumber, email, oldState]);

  const fieldsToCheck = [
    nameErrorMessage,
    surnameErrorMessage,
    emailErrorMessage,
    phoneNumberErrorMessage,
    streetErrorMessage,
    streetNumberErrorMessage,
    apartmentNumberErrorMessage,
    floorErrorMessage,
    cityErrorMessage,
    deliveryHoursErrorMessage,
  ];
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (fieldsToCheck.every((field) => field === '')) {
      if (stateChangedUser) updateUserProfile({ name, surname, phoneNumber, email });
      if (stateChangedAddress) createUserAddress({ street, streetNumber, apartmentNumber, floor, postcode, city });

      navigate(routes.shoppingCartPayment);
    } else setDidSubmit(true);
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
                    value={deliveryHours}
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
                    onChange={(e) => {
                      fillAddressForm(e.target.value);
                      setAddressId(JSON.parse(e.target.value).id);
                    }}
                  >
                    {address.map((e: AddressDto) => (
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
                  value={email}
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
