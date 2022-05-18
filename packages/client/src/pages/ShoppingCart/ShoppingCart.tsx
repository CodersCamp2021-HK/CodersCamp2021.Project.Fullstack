import { Box, Stack } from '@mui/material';

import { OrderStepper, OrderSummary } from '../../components';

const ShoppingCart = () => {
  return (
    <Stack px={6} py={10} gap={10}>
      <Box minWidth='70vw' marginX='auto'>
        <OrderStepper activeStepIndex={0} />
      </Box>
      <OrderSummary />
    </Stack>
  );
};

export { ShoppingCart };
