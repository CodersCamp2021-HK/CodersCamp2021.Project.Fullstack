import { styled, Table, TableBody, TableCell, TableRow } from '@mui/material';

import { themeForegroundColor } from '../../config';
import { orderDishKey, SubOrder } from '../../contexts';
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
      color: themeForegroundColor,
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
