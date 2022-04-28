import { Box, Button, Typography } from '@mui/material';
import { SetStateAction } from 'react';

import { routes } from '../../config/routes';
import { useShoppingCart } from '../../contexts';
import { DatePicker } from './DatePicker';
import { SuborderSummary } from './SuborderSummary';

interface CartSummaryProps {
  day: Date | null;
  onDayChange: (e: SetStateAction<Date | null>) => void;
}

const CartSummary = ({ day, onDayChange }: CartSummaryProps) => {
  const { cart } = useShoppingCart();
  const selectedDayOrder = cart.find(({ deliveryDate }) => deliveryDate === day)?.dishes;

  return (
    <Box
      bgcolor='primary.dark'
      color='common.white'
      minWidth='26rem'
      width='26rem'
      borderRadius='25px'
      mt={6}
      p={4}
      pb={6}
    >
      <DatePicker day={day} onDayChange={onDayChange} />
      {selectedDayOrder ? (
        <SuborderSummary suborderDishes={selectedDayOrder} />
      ) : (
        <Typography textAlign='center' pt={2} pb={4}>
          Twoje zamówienie na ten dzień jest puste!
        </Typography>
      )}
      <Box textAlign='center'>
        <Button href={routes.shoppingCart} color='secondary' variant='contained' size='large'>
          Przejdź do zamówienia
        </Button>
      </Box>
    </Box>
  );
};

export { CartSummary };
