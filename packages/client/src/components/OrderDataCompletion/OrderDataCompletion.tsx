import { AddressDto, CreateAddressDto, UpdateUserDto, UsersAddressesApi, UserssProfileApi } from '@fullstack/sdk/src';
import { StarHalfSharp } from '@mui/icons-material';
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
import { each } from 'immer/dist/internal';
import { useEffect, useState } from 'react';

import { apiConfiguration, routes } from '../../config';

const OrderDataCompletion = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [floor, setFloor] = useState('');
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState('');
  const [hourStart, setHourStart] = useState('');
  const [hourEnd, setHourEnd] = useState('');
  const [addresssTable, setAddressTable] = useState([]);
  const [testTable, setTestTa] = useState([]);

  const addressToString = (address: AddressDto) => {
    return `${address.street} ${address.streetNumber} ${
      address.apartmentNumber ? `/${address.apartmentNumber},` : ','
    } ${address.floor ? `p. ${address.floor},` : ''} ${address.postcode} ${address.city}`;
  };

  const userProfile = async (updateData: UpdateUserDto) => {
    try {
      const sth1 = await new UserssProfileApi(apiConfiguration).update({ updateUserDto: updateData });
      console.log(sth1);
    } catch (e) {
      alert('error');
    }
  };

  const userAddress = async (updateData: CreateAddressDto) => {
    try {
      const sth = await new UsersAddressesApi(apiConfiguration).create({ createAddressDto: updateData });
      console.log(sth);
    } catch (e) {
      alert('error');
    }
  };

  const userGetAddress = async () => {
    try {
      const sth = await new UsersAddressesApi(apiConfiguration).list();
      return sth;
    } catch (e) {
      alert('error');
      return 1;
    }
  };

  useEffect(() => {
    (async () => {
      const getUserAddress = await new UsersAddressesApi(apiConfiguration).list();
      setAddressTable(
        getUserAddress.data.map((e) => ({
          street: e.street,
          streetNumber: e.streetNumber,
          apartmentNumber: e.apartmentNumber,
          postcode: e.postcode,
          city: e.city,
        })),
      );
    })();
  }, []);

  return (
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
                  value={hourStart}
                  onChange={(e) => setHourStart(e.target.value)}
                >
                  <MenuItem value={4}>4:00 - 6:00</MenuItem>
                  <MenuItem value={6}>6:00 - 8:00</MenuItem>
                  <MenuItem value={8}>8:00 - 10:00</MenuItem>
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
                  {addresssTable.map((e) => (
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
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

              <TextField
                sx={{ pr: 0.5, mb: 1 }}
                id='surname'
                size='small'
                label='Nazwisko'
                value={surname}
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                sx={{ pr: 0.5, mb: 0.5 }}
                id='phone-number'
                size='small'
                label='Numer telefonu'
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={6} xl={6}>
            <Box>
              <TextField
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
            <Button
              variant='contained'
              color='secondary'
              sx={{ m: 10, width: '20%' }}
              href={routes.shoppingCartPayment}
              // onClick={() => {
              //   userProfile({ name, surname, phoneNumber });
              //   userAddress({ street, streetNumber, apartmentNumber, floor, city, postcode });
              // }}
            >
              PRZEJDŹ DO PŁATNOŚCI
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export { OrderDataCompletion };
