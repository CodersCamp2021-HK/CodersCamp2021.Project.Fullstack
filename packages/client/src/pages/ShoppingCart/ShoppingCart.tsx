import { Box, Stack, Step, StepLabel, Stepper } from '@mui/material';

import { AppNavBar, OrderSummary } from '../../components';

const STEPS = ['Podsumowanie', 'Uzupełnij dane', 'Zapłać i zamów'] as const;

const ShoppingCart = () => {
  return (
    <>
      <AppNavBar />
      <Stack px={6} py={10} gap={10}>
        <Box minWidth='70vw' marginX='auto'>
          <Stepper alternativeLabel activeStep={0}>
            {STEPS.map((label) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
        {/* TODO: Navigation to next step */}
        <OrderSummary nextStep={() => {}} />
      </Stack>
    </>
  );
};

export { ShoppingCart };
