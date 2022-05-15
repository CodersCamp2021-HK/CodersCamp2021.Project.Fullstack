import { Box, Step, StepButton, StepLabel, Stepper } from '@mui/material';

import { routes } from '../../config';

const STEPS = ['Podsumowanie', 'Uzupełnij dane', 'Zapłać i zamów'] as const;

const OrderStepper = ({ activeStepIndex }: { activeStepIndex: number }) => {
  const generateLabels = (label: string) => {
    if (label === STEPS[0]) {
      return <StepButton href={routes.shoppingCart}>{label}</StepButton>;
    }
    if (label === STEPS[1]) {
      return <StepButton href={routes.shoppingCartData}>{label}</StepButton>;
    }
    return <StepLabel>{label}</StepLabel>;
  };
  return (
    <Box minWidth='70vw' marginX='auto'>
      <Stepper alternativeLabel activeStep={activeStepIndex}>
        {STEPS.map((label) => {
          return <Step key={label}>{generateLabels(label)}</Step>;
        })}
      </Stepper>
    </Box>
  );
};
export { OrderStepper };
