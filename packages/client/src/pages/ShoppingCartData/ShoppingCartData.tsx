import { Box, Stack, Step, StepButton, StepLabel, Stepper } from '@mui/material';

import { OrderDataCompletion } from '../../components/OrderDataCompletion';
import { routes } from '../../config';

const STEPS = ['Podsumowanie', 'Uzupełnij dane', 'Zapłać i zamów'] as const;

const ShoppingCartData = () => {
  return (
    <Stack px={6} py={10} gap={10}>
      <Box minWidth='70vw' marginX='auto'>
        <Stepper alternativeLabel activeStep={1}>
          {STEPS.map((label) => {
            return (
              <Step key={label}>
                {label === 'Podsumowanie' ? (
                  <StepButton href={routes.shoppingCart}>{label}</StepButton>
                ) : (
                  <StepLabel>{label}</StepLabel>
                )}
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
