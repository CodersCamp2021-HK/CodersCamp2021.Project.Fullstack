import { Box, Stack, Step, StepLabel, Stepper } from '@mui/material';
import { useState } from 'react';

import { AppNavBar, OrderSummary } from '../../components';

const STEPS = [
  { label: 'Podsumowanie', element: OrderSummary },
  { label: 'Uzupełnij dane', element: 'div' },
  { label: 'Zapłać i zamów', element: 'div' },
];

const ShoppingCart = () => {
  const [activeStep] = useState(0);

  // TODO: Implement navigation to next step
  const nextStep = () => {};

  const StepElement = STEPS[activeStep].element;

  return (
    <>
      <AppNavBar />
      <Stack px={6} py={10} gap={10}>
        <Box minWidth='70vw' marginX='auto'>
          <Stepper alternativeLabel activeStep={activeStep}>
            {STEPS.map(({ label }) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
        <StepElement nextStep={nextStep} />
      </Stack>
    </>
  );
};

export { ShoppingCart };
