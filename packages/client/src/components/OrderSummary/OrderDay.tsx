import { DishDto } from '@fullstack/sdk/src';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import { SubOrder } from '../../context';
import { OrderDateHeader } from './OrderDateHeader';
import { OrderDish } from './OrderDish';

const OrderColumnNames = () => (
  <TableRow>
    <TableCell />
    <TableCell>Danie</TableCell>
    <TableCell>Wykluczone składniki</TableCell>
    <TableCell>Cena</TableCell>
    <TableCell>Ilość</TableCell>
    <TableCell>Razem</TableCell>
    <TableCell />
  </TableRow>
);

interface OrderDayProps {
  suborder: SubOrder;
  dishMap: Record<string, DishDto>;
}

const OrderDay = ({ suborder, dishMap }: OrderDayProps) => {
  return (
    <Box bgcolor='common.white'>
      <OrderDateHeader date={suborder.deliveryDate} />
      <Table>
        <TableHead>
          <OrderColumnNames />
        </TableHead>
        <TableBody>
          {suborder.dishes.map((orderDish) => (
            <OrderDish key={orderDish.dishId} orderDish={orderDish} dishMap={dishMap} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export { OrderDay };
