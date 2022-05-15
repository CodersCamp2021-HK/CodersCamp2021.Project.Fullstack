import { Stack } from '@mui/material';

import { OrderStepper } from '../../components';
import { OrderPayment } from '../../components/OrderPayment';

const ShoppingCartPayment = () => {
  return (
    <Stack px={6} py={10} gap={10}>
      <OrderStepper activeStepIndex={2} />
      <OrderPayment />
    </Stack>
  );
};

export { ShoppingCartPayment };
