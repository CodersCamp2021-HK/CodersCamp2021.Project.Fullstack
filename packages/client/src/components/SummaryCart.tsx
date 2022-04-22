import { Box, Button, Grid, Stack, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import _ from 'lodash';
import React from 'react';

import { SubOrder, useShoppingCart } from '../context';

interface CartPriceDisplayProps {
  nextStep: () => void;
}

const CartPriceDisplay = ({ nextStep }: CartPriceDisplayProps) => (
  <Stack p={4} bgcolor='common.white' gap={4}>
    <Stack direction='row' justifyContent='space-between' alignItems='center'>
      <Typography variant='h4'>Do zapłaty</Typography>
      <Typography variant='h5' fontWeight='bold'>
        800 zł
      </Typography>
    </Stack>
    <Button
      variant='contained'
      color='secondary'
      size='large'
      disableElevation
      sx={{ borderRadius: 8, px: 8, alignSelf: 'flex-end' }}
      onClick={nextStep}
    >
      Dalej
    </Button>
  </Stack>
);

interface CartDaysDisplayProps {
  cart: SubOrder[];
}

const CartDaysDisplay = ({ cart }: CartDaysDisplayProps) => (
  <>
    {cart.map((suborder) => {
      const weekday = _.capitalize(suborder.deliveryDate.toLocaleString('pl-PL', { weekday: 'long' }));

      return (
        <React.Fragment key={weekday}>
          <Box>{weekday}</Box>
          <Table>
            <TableBody>
              {suborder.dishes.map((dish) => (
                <TableRow key={dish.dishId}>
                  <TableCell>{dish.dishId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      );
    })}
  </>
);

interface SummaryCartProps {
  nextStep: () => void;
}

const SummaryCart = ({ nextStep }: SummaryCartProps) => {
  const { cart } = useShoppingCart();

  // const [dishMap, setDishMap] = useState({});

  // useEffect(() => {
  //   cart.forEach((suborder) => {
  //     suborder.dishes.forEach((dish) => {});
  //   });
  // }, [cart]);

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <CartDaysDisplay cart={cart} />
      </Grid>
      <Grid item xs={12} md={4}>
        <CartPriceDisplay nextStep={nextStep} />
      </Grid>
    </Grid>
  );
};

export { SummaryCart };
