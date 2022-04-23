import { DishDto, OrderDishDto } from '@fullstack/sdk';
import Add from '@mui/icons-material/Add';
import Create from '@mui/icons-material/Create';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Remove from '@mui/icons-material/Remove';
import { Box, Chip, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';

import defaultPhoto from '../../assets/default.png';

interface OrderDishProps {
  dishMap: Record<string, DishDto>;
  orderDish: OrderDishDto;
}

const OrderDish = ({ dishMap, orderDish }: OrderDishProps) => {
  const { dishId, excludedIngredients, count = 1 } = orderDish;
  const dish = dishMap[dishId];

  if (!dish) return null;

  return (
    <TableRow sx={{ height: '1px' }}>
      <TableCell sx={{ py: 5 }}>
        <Box sx={{ width: '11rem', height: '11rem', borderRadius: 4, overflow: 'hidden', mx: 'auto' }}>
          <img alt={dish.name} src={dish.photo ? dish.photo : defaultPhoto} height='100%' />
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
        <Typography variant='h5' fontWeight='bold'>
          {dish.price} zł
        </Typography>
      </TableCell>
      <TableCell align='center'>
        <Stack direction='row' justifyContent='center' alignItems='center'>
          <IconButton>
            <Remove />
          </IconButton>
          <Typography variant='h5' fontWeight='bold' px={1}>
            {count}
          </Typography>
          <IconButton>
            <Add />
          </IconButton>
        </Stack>
      </TableCell>
      <TableCell align='center'>
        <Typography variant='h5' fontWeight='bold' color='secondary.dark'>
          {dish.price * count} zł
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
