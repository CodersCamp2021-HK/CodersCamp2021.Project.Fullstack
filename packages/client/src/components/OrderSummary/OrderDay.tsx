import { DishDto } from '@fullstack/sdk';
import { styled, Table, TableBody, TableCell, TableRow } from '@mui/material';

import { SubOrder } from '../../context';
import { OrderDateHeader } from './OrderDateHeader';
import { OrderDayFooter } from './OrderDayFooter';
import { OrderDish } from './OrderDish';

const OrderDayTable = styled(Table)(({ theme }) => ({
  background: theme.palette.background.paper,
  '& .MuiTableCell-root': {
    color: 'inherit',
  },
}));

const OrderColumnNames = () => (
  <TableRow
    sx={{
      color: ({ palette }) => (palette.mode === 'light' ? palette.primary.main : palette.secondary.main),
      textTransform: 'uppercase',
    }}
  >
    <TableCell />
    <TableCell>Danie</TableCell>
    <TableCell>
      Wykluczone
      <br />
      składniki
    </TableCell>
    <TableCell align='center'>Cena</TableCell>
    <TableCell align='center'>Ilość</TableCell>
    <TableCell align='center'>Razem</TableCell>
    <TableCell />
  </TableRow>
);

interface OrderDayProps {
  suborder: SubOrder;
  dishMap: Record<string, DishDto>;
}

const OrderDay = ({ suborder, dishMap }: OrderDayProps) => {
  return (
    <OrderDayTable>
      <OrderDateHeader date={suborder.deliveryDate} />
      <TableBody>
        <OrderColumnNames />
        {suborder.dishes
          .filter((orderDish) => dishMap[orderDish.dishId])
          .map((orderDish) => (
            <OrderDish
              key={orderDish.dishId}
              dish={dishMap[orderDish.dishId]}
              count={orderDish.count ?? 1}
              excludedIngredients={orderDish.excludedIngredients ?? []}
            />
          ))}
      </TableBody>
      <OrderDayFooter dishes={suborder.dishes} dishMap={dishMap} />
    </OrderDayTable>
  );
};

export { OrderDay };
