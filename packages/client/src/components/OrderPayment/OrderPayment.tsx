import { UserDto, UserssProfileApi } from '@fullstack/sdk';
import { Box, Button, Container, Divider, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { apiConfiguration } from '../../config';

const CARD_REGEX =
  /^(?:4[0-9]{12}(?:[0-9]{3})?)|(?:3[47][0-9]{13})|(?:5[1-5][0-9]{14})|(?:6(?:011|5[0-9][0-9])[0-9]{12})|(?:(?:2131|1800|35\d{3})\d{11})|(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/;
const DATE_REGEX = /([0-9]{4})-(?:[0-9]{2})-([0-9]{2})/;
const CODE_REGEX = /^\d{3,4}$/;
const CHARACTER_LIMIT = 300;

const userApi = new UserssProfileApi(apiConfiguration);

const OrderPayment = () => {
  const [comment, setComment] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const cardNumberErrorMessage = cardNumber.match(CARD_REGEX) ? '' : 'Wpisz poprawny numer karty.';

  const [expirationDate, setExpirationDate] = useState('');
  const expirationDateErrorMessage = expirationDate.match(DATE_REGEX)
    ? ''
    : 'Wpisz poprawną datę ważności karty. Data powinna być w formacie RRRR-MM-DD';

  const [securityCode, setSecurityCode] = useState('');
  const securityCodeErrorMessage = securityCode?.match(CODE_REGEX) ? '' : 'Wpisz poprawny kod.';

  const [didSubmit, setDidSubmit] = useState(false);
  const [userData, setUserData] = useState<UserDto | undefined>();
  const [cardDataEdited, setCardDataEdited] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await userApi.findById();
      if (response) setUserData(response);
      if (response.card) {
        setCardNumber(response.card.number);
        setExpirationDate(response.card.expirationDate);
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
      userData.card = { number: cardNumber, expirationDate, securityCode };
      editCardData(userData);
    }
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
                <Typography variant='body1'>Jan Kowalski</Typography>
                <Typography variant='body1'>Warszawska 15/5</Typography>
                <Typography variant='body1'>01-100 Wrocław</Typography>
                <Typography variant='h6' color='primary.main' sx={{ mt: 3, mb: 2 }}>
                  Dane kontaktowe
                </Typography>
                <Typography variant='body1'>jankowalski@gmail.com</Typography>
                <Typography variant='body1'>600 700 800</Typography>
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
                    <TextField
                      required
                      sx={{ width: '90%', pr: 0.5, mb: 1 }}
                      size='small'
                      id='card-number'
                      label='Numer karty'
                      value={cardNumber}
                      error={didSubmit && cardNumberErrorMessage !== ''}
                      helperText={didSubmit && cardNumberErrorMessage}
                      onChange={(e) => {
                        setCardNumber(e.target.value);
                        setCardDataEdited(true);
                      }}
                    />
                    <TextField
                      required
                      sx={{ width: '45%', pr: 0.5, mb: 1 }}
                      size='small'
                      id='expiration-date'
                      label='Data ważności'
                      value={expirationDate}
                      error={didSubmit && expirationDateErrorMessage !== ''}
                      helperText={didSubmit && expirationDateErrorMessage}
                      onChange={(e) => {
                        setExpirationDate(e.target.value);
                        setCardDataEdited(true);
                      }}
                    />
                    <TextField
                      required
                      sx={{ width: '45%', pr: 0.5, mb: 1 }}
                      size='small'
                      id='security-code'
                      label='Kod'
                      value={securityCode}
                      error={didSubmit && securityCodeErrorMessage !== ''}
                      helperText={didSubmit && securityCodeErrorMessage}
                      onChange={(e) => {
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
