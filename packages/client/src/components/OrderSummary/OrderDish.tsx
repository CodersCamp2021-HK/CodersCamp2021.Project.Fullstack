import Add from '@mui/icons-material/Add';
import Create from '@mui/icons-material/Create';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Remove from '@mui/icons-material/Remove';
import { Box, Chip, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';

import defaultPhoto from '../../assets/placeholder.png';
import { SubOrderDish } from '../../contexts';

const NUMBER_TYPOGRAPHY = {
  variant: 'h5',
  sx: {
    typography: { xs: 'h6', xl: 'h5' },
    fontWeight: { xs: '500', xl: 'bold' },
  },
} as const;

interface OrderDishProps {
  orderDish: SubOrderDish;
}

const OrderDish = ({ orderDish }: OrderDishProps) => {
  const { dish, excludedIngredients = [], count = 1 } = orderDish;
  return (
    <TableRow sx={{ height: '1px' }}>
      <TableCell sx={{ py: 5 }}>
        <Box sx={{ width: '11rem', height: '11rem', borderRadius: 4, overflow: 'hidden', mx: 'auto' }}>
          <img
            style={{ objectFit: 'cover', objectPosition: 'center', width: '100%' }}
            alt={dish.name}
            src={dish.photo ? dish.photo : defaultPhoto}
            height='100%'
          />
        </Box>
      </TableCell>
      <TableCell sx={{ height: '100%', py: 5 }}>
        <Stack alignItems='start'>
          <Typography variant='h5' fontWeight='bold' pt={2} mb='auto'>
            {dish.name}
          </Typography>
          <Typography variant='h6' pb={2}>
            {dish.portionWeight} g
          </Typography>
          <Typography variant='body2' pb={1}>
            Wartość na porcję
          </Typography>
          <Chip
            label={`KCAL: ${dish.calories.perPortion}, T: ${dish.fats.perPortion}, B: ${dish.proteins.perPortion}, W: ${dish.carbohydrates.perPortion}`}
          />
        </Stack>
      </TableCell>
      <TableCell>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {excludedIngredients?.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </TableCell>
      <TableCell align='center'>
        <Typography {...NUMBER_TYPOGRAPHY}>{(dish.price / 100).toFixed(2)} zł</Typography>
      </TableCell>
      <TableCell align='center'>
        <Stack direction='row' justifyContent='center' alignItems='center'>
          <IconButton>
            <Remove />
          </IconButton>
          <Typography {...NUMBER_TYPOGRAPHY} px={1}>
            {count}
          </Typography>
          <IconButton>
            <Add />
          </IconButton>
        </Stack>
      </TableCell>
      <TableCell align='center'>
        <Typography {...NUMBER_TYPOGRAPHY} color='secondary.dark'>
          {((dish.price * count) / 100).toFixed(2)} zł
        </Typography>
      </TableCell>
      <TableCell>
        <Stack alignItems='center'>
          <IconButton>
            <DeleteOutline />
          </IconButton>
          <IconButton>
            <Create />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export { OrderDish };
