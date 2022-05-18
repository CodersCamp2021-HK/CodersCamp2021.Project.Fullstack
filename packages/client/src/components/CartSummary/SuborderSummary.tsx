import { Box, Typography } from '@mui/material';
import _ from 'lodash';

import { orderDishKey, SubOrderDish } from '../../contexts';
import { SideCartItem } from './SideCartItem';

interface SuborderSummaryProps {
  suborderDishes: SubOrderDish[];
}

const calculatePrice = (suborderDishes: SubOrderDish[]) =>
  _.sum(suborderDishes.map((obj) => obj.dish.price * obj.count));

const sumDishNutritionValues = (
  suborderDishes: SubOrderDish[],
  value: 'calories' | 'proteins' | 'fats' | 'carbohydrates',
) => _.sum(suborderDishes.map((obj) => obj.dish[value].perPortion));

const SuborderSummary = ({ suborderDishes }: SuborderSummaryProps) => {
  return (
    <>
      {suborderDishes.map((elem: SubOrderDish) => (
        <SideCartItem key={orderDishKey(elem)} suborderDish={elem} />
      ))}
      <Box
        borderTop='solid 1px'
        borderBottom='solid 1px'
        borderColor='secondary.main'
        textAlign='center'
        py={1}
        mt={4}
        mb={1}
      >
        PODSUMOWANIE DNIA
      </Box>
      <Box display='flex' justifyContent='space-between' mb={2}>
        <Box mr={1}>
          <Box display='flex' mt={1} mb={1}>
            <Typography mr={1}>Kalorie:</Typography>
            <Typography color='secondary.main'>{sumDishNutritionValues(suborderDishes, 'calories')} kcal</Typography>
          </Box>
          <Box display='flex' mt={1} mb={1}>
            <Typography mr={1}>Tłuszcze:</Typography>
            <Typography color='secondary.main'>{sumDishNutritionValues(suborderDishes, 'fats')} g</Typography>
          </Box>
        </Box>
        <Box>
          <Box display='flex' mt={1} mb={1}>
            <Typography mr={1}>Węglowodany:</Typography>
            <Typography color='secondary.main'>{sumDishNutritionValues(suborderDishes, 'carbohydrates')} g</Typography>
          </Box>
          <Box display='flex' mt={1} mb={1}>
            <Typography mr={1}>Białka:</Typography>
            <Typography color='secondary.main'>{sumDishNutritionValues(suborderDishes, 'proteins')} g</Typography>
          </Box>
        </Box>
      </Box>
      <Box display='flex' justifyContent='space-between' alignItems='end' my={4}>
        <Typography>Razem</Typography>
        <Typography variant='h5'>{(calculatePrice(suborderDishes) / 100).toFixed(2)} zł</Typography>
      </Box>
    </>
  );
};

export { SuborderSummary };
