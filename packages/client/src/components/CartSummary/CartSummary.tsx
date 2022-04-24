import { Box, Button, Typography } from '@mui/material';

import cardImg from '../../assets/default.png';
import { routes } from '../../routes';
import { DatePicker } from './DatePicker';
import { SideCartItem } from './SideCartItem';

const DATA = [
  {
    name: 'Bowl japoński',
    photo: cardImg,
    price: 32,
    calories: { perPortion: 550, per100g: 0 },
    fats: { perPortion: 250, per100g: 0 },
    proteins: { perPortion: 20, per100g: 0 },
    carbohydrates: { perPortion: 20, per100g: 0 },
  },
  {
    name: 'Bowl chiński',
    photo: cardImg,
    price: 32,
    calories: { perPortion: 550, per100g: 0 },
    fats: { perPortion: 250, per100g: 0 },
    proteins: { perPortion: 20, per100g: 0 },
    carbohydrates: { perPortion: 20, per100g: 0 },
  },
];

const CartSummary = () => {
  const sumDishNutritionValues = (dishes, value) => {
    let sum = 0;
    dishes.forEach((dish) => {
      sum += dish[value].perPortion;
    });
    return sum;
  };

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
      <DatePicker />
      {DATA.map((dish) => {
        return <SideCartItem key='' dish={dish} />;
      })}
      <Box
        borderTop='solid 1px'
        borderBottom='solid 1px'
        borderColor='secondary.main'
        textAlign='center'
        pt={1}
        pb={1}
        mt={4}
        mb={1}
      >
        PODSUMOWANIE:
      </Box>
      <Box display='flex' justifyContent='space-between' mb={4}>
        <Box mr={1}>
          <Box display='flex'>
            <Typography mr={1}>Kalorie:</Typography>
            <Typography color='secondary.main'>{sumDishNutritionValues(DATA, 'calories')} kcal</Typography>
          </Box>
          <Box display='flex'>
            <Typography mr={1}>Tłuszcze:</Typography>
            <Typography color='secondary.main'>{sumDishNutritionValues(DATA, 'fats')} g</Typography>
          </Box>
        </Box>
        <Box>
          <Box display='flex'>
            <Typography mr={1}>Węglowodany:</Typography>
            <Typography color='secondary.main'>{sumDishNutritionValues(DATA, 'carbohydrates')} g</Typography>
          </Box>
          <Box display='flex'>
            <Typography mr={1}>Białka:</Typography>
            <Typography color='secondary.main'>{sumDishNutritionValues(DATA, 'proteins')} g</Typography>
          </Box>
        </Box>
      </Box>
      <Box textAlign='center'>
        <Button href={routes.shoppingCart} color='secondary' variant='contained' size='large'>
          Przejdź do zamówienia
        </Button>
      </Box>
    </Box>
  );
};

export { CartSummary };
