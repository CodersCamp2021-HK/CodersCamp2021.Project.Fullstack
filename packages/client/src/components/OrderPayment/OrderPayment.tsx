import { CreateOrderDto, OrdersApi } from '@fullstack/sdk/src';
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
import { useState } from 'react';

import { apiConfiguration } from '../../config';
import { SubOrder, useOrderDataContext, useShoppingCart } from '../../contexts';

const OrderPayment = () => {
  const { cart } = useShoppingCart();
  const { addressId, deliveryHourStart, userData, address } = useOrderDataContext();
  const [comment, setComment] = useState('');

  const userOrder = async (updateData: CreateOrderDto) => {
    try {
      await new OrdersApi(apiConfiguration).create({ createOrderDto: updateData });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const transform = (subOrder: SubOrder[]) =>
    subOrder.map((element) => ({
      ...element,
      dishes: element.dishes.map((dishEntry) => ({ ...dishEntry, dishId: dishEntry.dish.id })),
    }));

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
              <Typography variant='body1'>{`${userData?.name} ${userData?.surname}`}</Typography>
              <Typography variant='body1'>{`${address?.street} ${address?.streetNumber} /${address?.apartmentNumber}`}</Typography>
              <Typography variant='body1'>{`${address?.postcode} ${address?.city}`}</Typography>
              <Typography variant='h6' color='primary.main' sx={{ mt: 3, mb: 2 }}>
                Dane kontakowe
              </Typography>
              <Typography variant='body1'>{userData?.email}</Typography>
              <Typography variant='body1'>{userData?.phoneNumber}</Typography>
            </Box>
          </Grid>
          <Divider orientation='vertical' flexItem sx={{ borderRightWidth: 4, mt: 4 }} variant='fullWidth' />
          <Grid item xs={5} xl={5}>
            <Box sx={{ ml: 4 }}>
              <Typography variant='h5' color='primary.main' sx={{ my: 4 }}>
                Uwagi do zamówienia
              </Typography>
              <TextField
                id='outlined-multiline-static'
                multiline
                rows={4}
                sx={{ mb: 4, width: '80%' }}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />

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
            <Button
              variant='contained'
              color='secondary'
              sx={{ m: 8, width: '20%' }}
              onClick={() => {
                const deliveryHourEnd = parseInt(deliveryHourStart, 10) + 2;
                userOrder({
                  addressId,
                  hourStart: parseInt(deliveryHourStart, 10),
                  hourEnd: deliveryHourEnd,
                  subOrders: transform(cart),
                  comment,
                });
              }}
            >
              ZAPŁAĆ I ZAMÓW
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export { OrderPayment };
