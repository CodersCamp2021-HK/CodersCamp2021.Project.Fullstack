import { styled, Table, TableBody, TableCell, TableRow } from '@mui/material';

import { SubOrder, SubOrderDish } from '../../contexts';
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

const orderDishKey = (orderDish: SubOrderDish) =>
  `${orderDish.dish.id}:${JSON.stringify(orderDish.excludedIngredients ?? [])}"`;

interface OrderDayProps {
  suborder: SubOrder;
}

const OrderDay = ({ suborder }: OrderDayProps) => {
  return (
    <OrderDayTable>
      <OrderDateHeader date={suborder.deliveryDate} />
      <TableBody>
        <OrderColumnNames />
        {suborder.dishes.map((orderDish) => (
          <OrderDish key={orderDishKey(orderDish)} orderDish={orderDish} date={suborder.deliveryDate} />
        ))}
      </TableBody>
      <OrderDayFooter dishes={suborder.dishes} />
    </OrderDayTable>
  );
};

export { OrderDay };
