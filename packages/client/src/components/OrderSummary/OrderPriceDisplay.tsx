import { Button, Stack, Typography } from '@mui/material';

import { routes } from '../../config';

interface OrderPriceDisplayProps {
  price: number;
}

const OrderPriceDisplay = ({ price }: OrderPriceDisplayProps) => (
  <Stack p={4} bgcolor='background.paper' gap={4}>
    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='space-between' alignItems='center'>
      <Typography variant='h4' sx={{ typography: { xs: 'h5', xl: 'h4' } }}>
        Do zapłaty
      </Typography>
      <Typography variant='h5' sx={{ typography: { xs: 'h6', xl: 'h5' } }}>
        <strong>{(price / 100).toFixed(2)} zł</strong>
      </Typography>
    </Stack>
    <Button
      variant='contained'
      color='secondary'
      size='large'
      disableElevation
      sx={{ borderRadius: 8, px: 8, alignSelf: 'flex-end' }}
      href={routes.shoppingCartData}
    >
      Dalej
    </Button>
  </Stack>
);

export { OrderPriceDisplay };
