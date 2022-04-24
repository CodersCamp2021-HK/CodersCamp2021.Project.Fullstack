import { Box, Button, Typography } from '@mui/material';
import { SetStateAction } from 'react';

import cardImg from '../../assets/placeholder.png';
import { routes } from '../../config/routes';
import { DatePicker } from './DatePicker';
import { SuborderSummary } from './SuborderSummary';

// @TODO: useShoppingCart();
const date = new Date();
const day1 = new Date(date);
day1.setDate(date.getDate() + 3);
const day2 = new Date(date);
day2.setDate(date.getDate() + 4);

const cart = [
  {
    deliveryDate: day1,
    dishes: [
      {
        dish: {
          name: 'Bowl japoński',
          photo: cardImg,
          price: 32,
          calories: { perPortion: 150, per100g: 0 },
          fats: { perPortion: 250, per100g: 0 },
          proteins: { perPortion: 20, per100g: 0 },
          carbohydrates: { perPortion: 20, per100g: 0 },
        },
        excludedIngredients: ['Sezam', 'Ser'],
      },
      {
        dish: {
          name: 'Spaghetti',
          photo: cardImg,
          price: 32,
          calories: { perPortion: 550, per100g: 0 },
          fats: { perPortion: 250, per100g: 0 },
          proteins: { perPortion: 20, per100g: 0 },
          carbohydrates: { perPortion: 20, per100g: 0 },
        },
        excludedIngredients: ['Sezam', 'Ser'],
      },
    ],
  },
  {
    deliveryDate: day2,
    dishes: [
      {
        dish: {
          name: 'Pizza hawajska',
          photo: cardImg,
          price: 32,
          calories: { perPortion: 550, per100g: 0 },
          fats: { perPortion: 250, per100g: 0 },
          proteins: { perPortion: 20, per100g: 0 },
          carbohydrates: { perPortion: 20, per100g: 0 },
        },
        excludedIngredients: ['Sezam', 'Ser'],
      },
      {
        dish: {
          name: 'Bowl japoński',
          photo: cardImg,
          price: 32,
          calories: { perPortion: 550, per100g: 0 },
          fats: { perPortion: 250, per100g: 0 },
          proteins: { perPortion: 20, per100g: 0 },
          carbohydrates: { perPortion: 20, per100g: 0 },
        },
      },
      {
        dish: {
          name: 'Zupa pomidorowa',
          photo: cardImg,
          price: 32,
          calories: { perPortion: 550, per100g: 0 },
          fats: { perPortion: 250, per100g: 0 },
          proteins: { perPortion: 20, per100g: 0 },
          carbohydrates: { perPortion: 20, per100g: 0 },
        },
      },
    ],
  },
];

interface CartSummaryProps {
  day: string;
  onDayChange: (e: SetStateAction<string>) => void;
}

const CartSummary = ({ day, onDayChange }: CartSummaryProps) => {
  const selectedDayOrder = cart.find((subOrder) => subOrder.deliveryDate.toLocaleDateString('pl-PL') === day)?.dishes;

  return (
    <Box
      bgcolor='primary.dark'
      color='common.white'
      minWidth='26rem'
      width='26rem'
      borderRadius='10px'
      mt={6}
      p={4}
      pb={6}
    >
      <DatePicker day={day} onDayChange={onDayChange} />
      {selectedDayOrder ? (
        <SuborderSummary suborderDishes={selectedDayOrder} />
      ) : (
        <Typography textAlign='center' pt={2} pb={4}>
          Twoje zamówienie na ten dzień jest puste!
        </Typography>
      )}
      <Box textAlign='center'>
        <Button href={routes.shoppingCart} color='secondary' variant='contained' size='large'>
          Przejdź do zamówienia
        </Button>
      </Box>
    </Box>
  );
};

export { CartSummary };
