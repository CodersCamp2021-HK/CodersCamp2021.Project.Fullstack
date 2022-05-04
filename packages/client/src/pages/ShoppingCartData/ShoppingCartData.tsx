import { Box, Stack, Step, StepLabel, Stepper } from '@mui/material';

import { OrderSummary } from '../../components';
import { OrderDataCompletion } from '../../components/OrderDataCompletion';

const STEPS = ['Podsumowanie', 'Uzupełnij dane', 'Zapłać i zamów'] as const;

const ShoppingCartData = () => {
  return (
    <Stack px={6} py={10} gap={10}>
      <Box minWidth='70vw' marginX='auto'>
        <Stepper alternativeLabel activeStep={1}>
          {STEPS.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <OrderDataCompletion />
    </Stack>
  );
};

export { ShoppingCartData };
