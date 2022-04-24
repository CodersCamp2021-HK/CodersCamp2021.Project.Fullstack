import { Button, Stack, Typography } from '@mui/material';

import underConstructionImg from '../../assets/under-construction.svg';
import { routes } from '../../config';

const UnderConstruction = () => (
  <Stack alignItems='center' justifyContent='space-evenly' minHeight='calc(100vh - 6rem)'>
    <Typography variant='h4'>Strona w budowie</Typography>
    <img src={underConstructionImg} alt='Budowa' style={{ maxHeight: '40vh', maxWidth: '75vw' }} />
    <Button href={routes.home} size='small' variant='contained' color='secondary'>
      Wróć na stronę główną
    </Button>
  </Stack>
);

export { UnderConstruction };
