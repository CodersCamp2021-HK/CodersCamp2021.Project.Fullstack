import { Box, Step, StepButton, StepLabel, Stepper } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { routes } from '../../config';
import { useShoppingCart } from '../../contexts';

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

const OrderStepper = ({ activeStepIndex }: { activeStepIndex: number }) => {
  const { cart } = useShoppingCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      navigate(routes.home, { replace: true });
    }
  }, [cart, navigate]);

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
