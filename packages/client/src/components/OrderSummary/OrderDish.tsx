import { DishDto, OrderDishDto } from '@fullstack/sdk/src';
import Create from '@mui/icons-material/Create';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { IconButton, Stack, TableCell, TableRow } from '@mui/material';

interface OrderDishProps {
  dishMap: Record<string, DishDto>;
  orderDish: OrderDishDto;
}

const OrderDish = ({ dishMap, orderDish }: OrderDishProps) => {
  const { dishId, excludedIngredients, count = 1 } = orderDish;
  const dish = dishMap[dishId];

  if (!dish) return null;

  return (
    <TableRow>
      <TableCell>{dish.photo && <img alt={dish.name} src={dish.photo} />}</TableCell>
      <TableCell>{dish.name}</TableCell>
      <TableCell>
        <ul>
          {excludedIngredients?.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </TableCell>
      <TableCell>{dish.price} zł</TableCell>
      <TableCell>{count}</TableCell>
      <TableCell>{dish.price * count} zł</TableCell>
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
