import { Box, Stack, Step, StepButton, StepLabel, Stepper } from '@mui/material';

import { OrderDataCompletion } from '../../components/OrderDataCompletion';
import { routes } from '../../config';
import { OrderStepper } from '../../components';

const ShoppingCartData = () => {
  return (
    <Stack px={6} py={10} gap={10}>
    <OrderStepper activeStepIndex={1}/>
      <OrderDataCompletion />
    </Stack>
  );
};

export { ShoppingCartData };
