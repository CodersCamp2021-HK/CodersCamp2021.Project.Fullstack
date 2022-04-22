import { Button, Stack, Typography } from '@mui/material';

interface OrderPriceDisplayProps {
  price: number;
  nextStep: () => void;
}

const OrderPriceDisplay = ({ price, nextStep }: OrderPriceDisplayProps) => (
  <Stack p={4} bgcolor='common.white' gap={4}>
    <Stack direction='row' justifyContent='space-between' alignItems='center'>
      <Typography variant='h4'>Do zapłaty</Typography>
      <Typography variant='h5' fontWeight='bold'>
        {price} zł
      </Typography>
    </Stack>
    <Button
      variant='contained'
      color='secondary'
      size='large'
      disableElevation
      sx={{ borderRadius: 8, px: 8, alignSelf: 'flex-end' }}
      onClick={nextStep}
    >
      Dalej
    </Button>
  </Stack>
);

export { OrderPriceDisplay };
