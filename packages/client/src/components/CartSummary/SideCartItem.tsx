import Create from '@mui/icons-material/Create';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { Box, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

import placeholderPhoto from '../../assets/placeholder.png';
import { SubOrderDish, useShoppingCart } from '../../contexts';
import { DishPopup } from '../DishPopup';

interface DishProps {
  suborderDish: SubOrderDish;
}

const SideCartItem = ({ suborderDish }: DishProps) => {
  const { name, photo, fats, proteins, carbohydrates, calories, price } = suborderDish.dish;
  const { removeFromCart, selectedDate } = useShoppingCart();

  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const currentState = {
    date: selectedDate as Date,
    suborderDish,
  };

  return (
    <>
      <DishPopup
        key={JSON.stringify(currentState)}
        previousState={currentState}
        open={editPopupOpen}
        onClose={() => setEditPopupOpen(false)}
        dish={suborderDish.dish}
      />
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
            {name} ({suborderDish.count} szt.)
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
            {((price / 100) * suborderDish.count).toFixed(2)}
          </Typography>
          <Box color='#fff' display='flex' flexDirection='column'>
            <IconButton onClick={() => removeFromCart(suborderDish, selectedDate as Date)}>
              <DeleteOutline color='secondary' />
            </IconButton>
            <IconButton onClick={() => setEditPopupOpen(true)}>
              <Create color='secondary' />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export { SideCartItem };
