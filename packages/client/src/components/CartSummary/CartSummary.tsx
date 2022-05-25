import { Box, Button, Typography } from '@mui/material';

import { routes } from '../../config/routes';
import { useShoppingCart } from '../../contexts';
import { DatePicker } from './DatePicker';
import { SuborderSummary } from './SuborderSummary';

const CartSummary = () => {
  const { cart, selectedDate } = useShoppingCart();
  const selectedDayOrder = cart.find(({ deliveryDate }) => deliveryDate.getTime() === selectedDate?.getTime())?.dishes;

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
      <DatePicker />
      {selectedDayOrder ? (
        <SuborderSummary suborderDishes={selectedDayOrder} />
      ) : (
        <Typography textAlign='center' pt={2} pb={4}>
          Twoje zamówienie na ten dzień jest puste!
        </Typography>
      )}
      <Box textAlign='center'>
        <Button
          href={cart.length !== 0 ? routes.shoppingCart : ''}
          color='secondary'
          variant='contained'
          size='large'
          disabled={cart.length === 0}
        >
          Przejdź do zamówienia
        </Button>
      </Box>
    </Box>
  );
};

export { CartSummary };
