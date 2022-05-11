import Create from '@mui/icons-material/Create';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { Box, IconButton, Typography } from '@mui/material';

import placeholderPhoto from '../../assets/placeholder.png';
import { SubOrderDish, useShoppingCart } from '../../contexts';

interface DishProps {
  suborderDish: SubOrderDish;
}

const SideCartItem = ({ suborderDish }: DishProps) => {
  const { name, photo, fats, proteins, carbohydrates, calories, price } = suborderDish.dish;

  const { removeDish, selectedDate } = useShoppingCart();

  return (
    <Box mb={2} display='flex' alignItems='center'>
      <Box
        component='img'
        mr={1}
        sx={{ width: '5.3125rem', height: '5.3125rem', borderRadius: '50%', objectFit: 'cover' }}
        src={photo ?? placeholderPhoto}
        alt={name}
      />
      <Box>
        <Typography variant='body2'>
          {name} ({suborderDish.count || 1} szt.)
        </Typography>
        <Typography variant='body2' color='secondary.main'>
          Kalorie: {calories.perPortion}
        </Typography>
        <Typography variant='body2' color='secondary.main'>
          Tłuszcze: {fats.perPortion}
        </Typography>
        <Typography variant='body2' color='secondary.main'>
          Białka: {proteins.perPortion}
        </Typography>
        <Typography variant='body2' color='secondary.main'>
          Węglowodany: {carbohydrates.perPortion}
        </Typography>
      </Box>
      <Box color='#fff' display='flex' justifyContent='center' alignItems='center' marginLeft='auto'>
        <Typography variant='body2' mr={1}>
          {((price / 100) * (suborderDish.count || 1)).toFixed(2)}
        </Typography>
        <Box color='#fff' display='flex' flexDirection='column'>
          <IconButton onClick={() => removeDish(selectedDate as Date, suborderDish)}>
            <DeleteOutline color='secondary' />
          </IconButton>
          <IconButton>
            <Create color='secondary' />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export { SideCartItem };
