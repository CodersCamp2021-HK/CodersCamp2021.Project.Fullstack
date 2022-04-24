import { Grid, Stack } from '@mui/material';

import { SubOrder, useShoppingCart } from '../../context';
import { OrderDay } from './OrderDay';
import { OrderPriceDisplay } from './OrderPriceDisplay';
import { sumDishProperty } from './shared';

interface OrderDaysDisplayProps {
  cart: SubOrder[];
}

const OrderDaysDisplay = ({ cart }: OrderDaysDisplayProps) => (
  <Stack spacing={9}>
    {cart.map((suborder) => (
      <OrderDay key={suborder.deliveryDate.toISOString()} suborder={suborder} />
    ))}
  </Stack>
);

const allDishes = (cart: SubOrder[]) => cart.flatMap((suborder) => suborder.dishes);

interface OrderSummaryProps {
  nextStep: () => void;
}

const OrderSummary = ({ nextStep }: OrderSummaryProps) => {
  const { cart } = useShoppingCart();

  const price = sumDishProperty(allDishes(cart), 'price');

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} xl={9}>
        <OrderDaysDisplay cart={cart} />
      </Grid>
      <Grid item xs={12} xl={3} order={{ xs: -1, xl: 1 }}>
        <OrderPriceDisplay price={price} nextStep={nextStep} />
      </Grid>
    </Grid>
  );
};

export { OrderSummary };
