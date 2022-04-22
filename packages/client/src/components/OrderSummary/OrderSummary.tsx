import { DishDto, DishesApi } from '@fullstack/sdk/src';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import { apiConfiguration } from '../../config';
import { SubOrder, useShoppingCart } from '../../context';
import { OrderDay } from './OrderDay';
import { OrderPriceDisplay } from './OrderPriceDisplay';

const dishesApi = new DishesApi(apiConfiguration);

interface OrderDaysDisplayProps {
  cart: SubOrder[];
  dishMap: Record<string, DishDto>;
}

const OrderDaysDisplay = ({ cart, dishMap }: OrderDaysDisplayProps) => (
  <>
    {cart.map((suborder) => (
      <OrderDay key={suborder.deliveryDate.toISOString()} suborder={suborder} dishMap={dishMap} />
    ))}
  </>
);

interface OrderSummaryProps {
  nextStep: () => void;
}

const OrderSummary = ({ nextStep }: OrderSummaryProps) => {
  const { cart } = useShoppingCart();

  const [dishMap, setDishMap] = useState<Record<string, DishDto>>({});

  useEffect(() => {
    new Set(cart.flatMap((suborder) => suborder.dishes)).forEach(async ({ dishId }) => {
      const dish = await dishesApi.findDishById({ id: dishId });
      setDishMap((oldMap) => ({ ...oldMap, [dishId]: dish }));
    });
  }, [cart]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <OrderDaysDisplay cart={cart} dishMap={dishMap} />
      </Grid>
      <Grid item xs={12} md={4}>
        <OrderPriceDisplay nextStep={nextStep} />
      </Grid>
    </Grid>
  );
};

export { OrderSummary };
