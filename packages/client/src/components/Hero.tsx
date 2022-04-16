import ArrowDownward from '@mui/icons-material/ArrowDownward';
import { Box, Button, IconButton, InputAdornment, Stack, styled, TextField, Typography } from '@mui/material';

import hero from '../assets/hero.jpg';

const HERO_BACKGROUND = `linear-gradient(118.2deg, rgba(27, 94, 32, 0.5) 38.72%, rgba(0, 0, 0, 0.12) 88.45%), url(${hero}) center center / cover`;

const SearchField = styled(
  TextField,
  {},
)(({ theme }) => ({
  background: theme.palette.common.white,
  '& .MuiInputBase-root': {
    paddingRight: 0,
  },
  '& .MuiButton-root': {
    paddingInline: 32,
    paddingBlock: 16,
  },
  '& fieldset': {
    margin: -1,
  },
  '&, & fieldset, & .MuiButton-root': {
    borderRadius: 32,
  },
}));

const Hero = () => (
  <Box
    sx={{
      height: 'calc(100vh - 6rem)',
      background: HERO_BACKGROUND,
    }}
  >
    <Stack sx={{ p: 8, height: 1, maxWidth: '92rem', mx: 'auto' }} justifyContent='flex-end' spacing={4}>
      <Typography color='secondary' variant='h5'>
        Nie musisz dalej szukać
      </Typography>
      <Typography color='white' sx={{ typography: { sm: 'h2', xl: 'h1' }, maxWidth: '46rem' }}>
        Wybieraj dania z&nbsp;najlepszych restauracji
      </Typography>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <SearchField
          placeholder='Wpisz miasto'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Button variant='contained' color='secondary' disableElevation>
                  Wyszukaj
                </Button>
              </InputAdornment>
            ),
          }}
        />
        <IconButton color='secondary' size='small'>
          <ArrowDownward fontSize='large' />
        </IconButton>
      </Stack>
    </Stack>
  </Box>
);

export { Hero };
