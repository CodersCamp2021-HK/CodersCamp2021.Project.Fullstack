import { DishDto, DishesApi } from '@fullstack/sdk';
import { Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { apiConfiguration } from '../../config';
import { SubOrder, useShoppingCart } from '../../context';
import { OrderDay } from './OrderDay';
import { OrderPriceDisplay } from './OrderPriceDisplay';
import { sumDishProperty } from './shared';

const dishesApi = new DishesApi(apiConfiguration);

interface OrderDaysDisplayProps {
  cart: SubOrder[];
  dishMap: Record<string, DishDto>;
}

const OrderDaysDisplay = ({ cart, dishMap }: OrderDaysDisplayProps) => (
  <Stack spacing={9}>
    {cart.map((suborder) => (
      <OrderDay key={suborder.deliveryDate.toISOString()} suborder={suborder} dishMap={dishMap} />
    ))}
  </Stack>
);

const allDishes = (cart: SubOrder[]) => cart.flatMap((suborder) => suborder.dishes);

interface OrderSummaryProps {
  nextStep: () => void;
}

const OrderSummary = ({ nextStep }: OrderSummaryProps) => {
  const { cart } = useShoppingCart();

  const [dishMap, setDishMap] = useState<Record<string, DishDto>>({});

  useEffect(() => {
    new Set(allDishes(cart)).forEach(async ({ dishId }) => {
      const dish = await dishesApi.findDishById({ id: dishId });
      setDishMap((oldMap) => ({ ...oldMap, [dishId]: dish }));
    });
  }, [cart]);

  const price = sumDishProperty(allDishes(cart), dishMap, 'price');

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={9}>
        <OrderDaysDisplay cart={cart} dishMap={dishMap} />
      </Grid>
      <Grid item xs={12} md={3}>
        <OrderPriceDisplay price={price} nextStep={nextStep} />
      </Grid>
    </Grid>
  );
};

export { OrderSummary };
