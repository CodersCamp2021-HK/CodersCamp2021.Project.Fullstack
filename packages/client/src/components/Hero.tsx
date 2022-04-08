import ArrowDownward from '@mui/icons-material/ArrowDownward';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';

import hero from '../assets/hero.png';

const Hero = () => (
  <Box
    sx={{
      height: 'calc(100vh - 6rem)',
      mt: '6rem',
      background: `linear-gradient(118.2deg, rgba(27, 94, 32, 0.5) 38.72%, rgba(0, 0, 0, 0.12) 88.45%), url(${hero}) center center / cover`,
    }}
  >
    <Stack sx={{ p: 8, height: 1, maxWidth: '92rem', mx: 'auto' }} justifyContent='flex-end' spacing={4}>
      <Typography color='secondary' variant='h5'>
        Nie musisz dalej szukać
      </Typography>
      <Typography color='white' sx={{ typography: { sm: 'h2', xl: 'h1' }, maxWidth: '46rem' }}>
        Wybieraj dania z najlepszych restauracji
      </Typography>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Button variant='contained' color='secondary' sx={{ borderRadius: '2rem' }}>
          Złóż zamówienie
        </Button>
        <IconButton color='secondary' size='small'>
          <ArrowDownward fontSize='large' />
        </IconButton>
      </Stack>
    </Stack>
  </Box>
);

export { Hero };
