import { Box, Stack, Step, StepButton, StepLabel, Stepper } from '@mui/material';

import { OrderPayment } from '../../components/OrderPayment';
import { routes } from '../../config';

const STEPS = ['Podsumowanie', 'Uzupełnij dane', 'Zapłać i zamów'] as const;

const generateLabels = (label: string) => {
  if (label === STEPS[0]) {
    return <StepButton href={routes.shoppingCart}>{label}</StepButton>;
  }
  if (label === STEPS[1]) {
    return <StepButton href={routes.shoppingCartData}>{label}</StepButton>;
  }
  return <StepLabel>{label}</StepLabel>;
};
const ShoppingCartPayment = () => {
  return (
    <Stack px={6} py={10} gap={10}>
      <Box minWidth='70vw' marginX='auto'>
        <Stepper alternativeLabel activeStep={2}>
          {STEPS.map((label) => {
            return <Step key={label}>{generateLabels(label)}</Step>;
          })}
        </Stepper>
      </Box>
      <OrderPayment />
    </Stack>
  );
};

export { ShoppingCartPayment };
