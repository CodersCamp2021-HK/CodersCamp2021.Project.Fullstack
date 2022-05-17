import { Stack } from '@mui/material';

import { OrderStepper } from '../../components';
import { OrderDataCompletion } from '../../components/OrderDataCompletion';

const ShoppingCartData = () => {
  return (
    <Stack px={6} py={10} gap={10}>
      <OrderStepper activeStepIndex={1} />
      <OrderDataCompletion />
    </Stack>
  );
};

export { ShoppingCartData };
