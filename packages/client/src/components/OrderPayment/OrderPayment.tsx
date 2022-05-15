import { UsersAddressesApi, UserssProfileApi } from '@fullstack/sdk/src';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { apiConfiguration } from '../../config';
import { SubOrderDish } from '../../contexts';

interface OrderDishProps {
  orderDish: SubOrderDish;
}
const OrderPayment = ({ orderDish }: OrderDishProps) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    (async () => {
      const getUser = await new UserssProfileApi(apiConfiguration).findById();
      const getUserAddress = await new UsersAddressesApi(apiConfiguration).findById({
        id: '626699462261bca70cfeeae3',
      });
      console.log(orderDish);
      setName(getUser.name);
      setSurname(getUser.surname);
      setPhoneNumber(getUser.phoneNumber);
      setEmail(getUser.email);
      setCity(getUserAddress.city);
      setStreet(getUserAddress.street);
      setStreetNumber(getUserAddress.streetNumber);
      setApartmentNumber(getUserAddress.apartmentNumber);
      setPostcode(getUserAddress.postcode);
    })();
  }, []);

  return (
    <Container fixed>
      <Box sx={{ bgcolor: '#FAFAFA' }}>
        <Grid item container spacing={5}>
          <Grid item xs={6} xl={6}>
            <Box justifyContent='center' textAlign='center' justifySelf='center' alignSelf='center'>
              <Typography variant='h5' color='primary.main' sx={{ my: 4 }}>
                Podsumowanie
              </Typography>
              <Typography variant='h6' color='primary.main' sx={{ mb: 2 }}>
                Dane do wysyłki
              </Typography>
              <Typography variant='body1'>{`${name} ${surname}`}</Typography>
              <Typography variant='body1'>{`${street} ${streetNumber} /${apartmentNumber}`}</Typography>
              <Typography variant='body1'>{`${postcode} ${city}`}</Typography>
              <Typography variant='h6' color='primary.main' sx={{ mt: 3, mb: 2 }}>
                Dane kontakowe
              </Typography>
              <Typography variant='body1'>{email}</Typography>
              <Typography variant='body1'>{phoneNumber}</Typography>
            </Box>
          </Grid>
          <Divider orientation='vertical' flexItem sx={{ borderRightWidth: 4, mt: 4 }} variant='fullWidth' />
          <Grid item xs={5} xl={5}>
            <Box sx={{ ml: 4 }}>
              <Typography variant='h5' color='primary.main' sx={{ my: 4 }}>
                Uwagi do zamówienia
              </Typography>
              <TextField id='outlined-multiline-static' multiline rows={4} sx={{ mb: 4, width: '80%' }} />

              <Grid container direction='row' alignItems='center'>
                <Typography variant='h5' color='primary.main' sx={{ mr: 1 }}>
                  Metoda płatności
                </Typography>
                <AddCircleIcon color='primary' />
              </Grid>
              <FormControl>
                <RadioGroup aria-labelledby='demo-radio-buttons-group-label' name='radio-buttons-group'>
                  <FormControlLabel value='1' control={<Radio />} label='Zapłać kartą (***030)' />
                  <FormControlLabel value='2' control={<Radio />} label='Zapłać kartą (***123)' />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>

          <Grid container justifyContent='center' alignItems='center'>
            <Button variant='contained' color='secondary' sx={{ m: 8, width: '20%' }}>
              ZAPŁAĆ I ZAMÓW
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export { OrderPayment };
