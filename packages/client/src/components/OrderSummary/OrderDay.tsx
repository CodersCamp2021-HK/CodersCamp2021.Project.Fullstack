import { DishDto } from '@fullstack/sdk/src';
import { styled, Table, TableBody, TableCell, TableRow } from '@mui/material';

import { SubOrder } from '../../context';
import { OrderDateHeader } from './OrderDateHeader';
import { OrderDayFooter } from './OrderDayFooter';
import { OrderDish } from './OrderDish';

const OrderDayTable = styled(Table)(({ theme }) => ({
  background: theme.palette.common.white,
  color: theme.palette.secondary.contrastText,
  '& .MuiTableCell-root': {
    color: 'inherit',
  },
}));

const OrderColumnNames = () => (
  <TableRow sx={{ color: ({ palette }) => palette.primary.main, textTransform: 'uppercase' }}>
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
        {suborder.dishes.map((orderDish) => (
          <OrderDish key={orderDish.dishId} orderDish={orderDish} dishMap={dishMap} />
        ))}
      </TableBody>
      <OrderDayFooter />
    </OrderDayTable>
  );
};

export { OrderDay };
