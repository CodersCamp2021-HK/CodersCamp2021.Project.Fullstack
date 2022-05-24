import { CreateOrderDto, OrdersApi, UserDto, UserssProfileApi } from '@fullstack/sdk';
import { Box, Button, Container, Divider, Grid, TextField, Typography } from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';

import { apiConfiguration } from '../../config';
import { SubOrder, useOrderDataContext, useShoppingCart } from '../../contexts';

const CARD_REGEX =
  /^(?:4[0-9]{12}(?:[0-9]{3})?)|(?:3[47][0-9]{13})|(?:5[1-5][0-9]{14})|(?:6(?:011|5[0-9][0-9])[0-9]{12})|(?:(?:2131|1800|35\d{3})\d{11})|(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/;
const DATE_REGEX = /^(0?[1-9]|1[012])\/(?:[0-9]{2})$/;
const CODE_REGEX = /^\d{3,4}$/;
const CHARACTER_LIMIT = 300;

const shortToLongDate = (date: string) => {
  const [month, year] = date.split('/');
  const monthLength = new Date(parseInt(year, 10) + 2000, parseInt(month, 10), 0).getDate();
  return `20${year}-${month}-${monthLength}`;
};

const longToShortDate = (date: string) => {
  const [year, month] = date.split('-');
  return `${month}/${year.slice(-2)}`;
};

const userApi = new UserssProfileApi(apiConfiguration);
const OrderPayment = () => {
  const { cart } = useShoppingCart();
  const { addressId, deliveryHourStart, userDataContext, address } = useOrderDataContext();
  const [comment, setComment] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const cardNumberErrorMessage = cardNumber.match(CARD_REGEX) ? '' : 'Wpisz poprawny numer karty.';

  const [expirationDate, setExpirationDate] = useState('');
  const expirationDateErrorMessage = expirationDate.match(DATE_REGEX) ? '' : 'Wpisz poprawną datę ważności karty.';

  const [securityCode, setSecurityCode] = useState('');
  const securityCodeErrorMessage = securityCode?.match(CODE_REGEX) ? '' : 'Wpisz poprawny kod.';

  const [didSubmit, setDidSubmit] = useState(false);
  const [userData, setUserData] = useState<UserDto | undefined>();

  const [cardDataEdited, setCardDataEdited] = useState(false);
  const ordersApi = new OrdersApi(apiConfiguration);
  const userOrder = async (updateData: CreateOrderDto) => {
    try {
      await ordersApi.create({ createOrderDto: updateData });
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await userApi.findById();
      if (response) setUserData(response);
      if (response.card) {
        setCardNumber(response.card.number);
        setExpirationDate(longToShortDate(response.card.expirationDate));
        setSecurityCode(response.card.securityCode);
      }
    };
    fetchData();
  }, []);

  const editCardData = async (user: UserDto) => {
    await userApi.update({ updateUserDto: user });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDidSubmit(true);
    if (userData && cardDataEdited) {
      userData.card = { number: cardNumber, expirationDate: shortToLongDate(expirationDate), securityCode };
      editCardData(userData);
    }
    const deliveryHourEnd = parseInt(deliveryHourStart, 10) + 2;
    userOrder({
      addressId,
      hourStart: parseInt(deliveryHourStart, 10),
      hourEnd: deliveryHourEnd,
      subOrders: transform(cart),
      comment,
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete='off'>
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
                <Typography variant='body1'>{`${userDataContext?.name} ${userDataContext?.surname}`}</Typography>
                <Typography variant='body1'>{`${address?.street} ${address?.streetNumber} /${address?.apartmentNumber}`}</Typography>
                <Typography variant='body1'>{`${address?.postcode} ${address?.city}`}</Typography>
                <Typography variant='h6' color='primary.main' sx={{ mt: 3, mb: 2 }}>
                  Dane kontakowe
                </Typography>
                <Typography variant='body1'>{userDataContext?.email}</Typography>
                <Typography variant='body1'>{userDataContext?.phoneNumber}</Typography>
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
                  inputProps={{ maxLength: CHARACTER_LIMIT }}
                  value={comment}
                  helperText={`${comment.length}/${CHARACTER_LIMIT}`}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <Grid container direction='row' alignItems='center'>
                  <Typography variant='h5' color='primary.main' sx={{ mb: 3 }}>
                    Metoda płatności
                  </Typography>
                </Grid>
                <Grid item xs={11} xl={11}>
                  <Box>
                    <NumberFormat
                      customInput={TextField}
                      format='#### #### #### ####'
                      mask='_'
                      required
                      sx={{ width: '90%', pr: 0.5, mb: 1 }}
                      size='small'
                      id='card-number'
                      label='Numer karty'
                      value={cardNumber}
                      error={didSubmit && cardNumberErrorMessage !== ''}
                      helperText={didSubmit && cardNumberErrorMessage}
                      onChange={(e: { target: { value: string } }) => {
                        setCardNumber(e.target.value.replace(/\s+/g, ''));
                        setCardDataEdited(true);
                      }}
                    />
                    <NumberFormat
                      customInput={TextField}
                      format='##/##'
                      placeholder='MM/YY'
                      mask={['M', 'M', 'Y', 'Y']}
                      required
                      sx={{ width: '45%', pr: 0.5, mb: 1 }}
                      size='small'
                      id='expiration-date'
                      label='Data ważności'
                      value={expirationDate}
                      error={didSubmit && expirationDateErrorMessage !== ''}
                      helperText={didSubmit && expirationDateErrorMessage}
                      onChange={(e: { target: { value: SetStateAction<string> } }) => {
                        setExpirationDate(e.target.value);
                        setCardDataEdited(true);
                      }}
                    />
                    <NumberFormat
                      customInput={TextField}
                      format='###'
                      mask='_'
                      required
                      sx={{ width: '45%', pr: 0.5, mb: 1 }}
                      size='small'
                      id='security-code'
                      label='Kod'
                      value={securityCode}
                      error={didSubmit && securityCodeErrorMessage !== ''}
                      helperText={didSubmit && securityCodeErrorMessage}
                      onChange={(e: { target: { value: SetStateAction<string> } }) => {
                        setSecurityCode(e.target.value);
                        setCardDataEdited(true);
                      }}
                    />
                  </Box>
                </Grid>
              </Box>
            </Grid>
            <Grid container justifyContent='center' alignItems='center'>
              <Button type='submit' variant='contained' color='secondary' sx={{ m: 8, width: '20%' }}>
                ZAPŁAĆ I ZAMÓW
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </form>
  );
};

export { OrderPayment };
