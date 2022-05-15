import { Stack} from '@mui/material';

import { OrderPayment } from '../../components/OrderPayment';
import { routes } from '../../config';
import { OrderStepper } from '../../components'

const ShoppingCartPayment = () => {
  return (
    <Stack px={6} py={10} gap={10}>
      <OrderStepper activeStepIndex={2}/>
      <OrderPayment />
    </Stack>
  );
};

export { ShoppingCartPayment };
