import ArrowDownward from '@mui/icons-material/ArrowDownward';
import { Box, Button, IconButton, InputAdornment, Stack, styled, TextField, Typography } from '@mui/material';

import hero from '../assets/hero.jpg';

const HERO_BACKGROUND = `linear-gradient(118.2deg, rgba(27, 94, 32, 0.5) 38.72%, rgba(0, 0, 0, 0.12) 88.45%), url(${hero}) center center / cover`;

const SearchField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
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
      minHeight: 'calc(100vh - 6rem)',
      background: HERO_BACKGROUND,
    }}
  >
    <Stack
      sx={{ p: { xs: 4, sm: 8 }, minHeight: 'inherit', maxWidth: '90rem', mx: 'auto' }}
      justifyContent='center'
      spacing={4}
    >
      <Typography variant='h5' color='secondary'>
        Nie musisz dalej szukać
      </Typography>
      <Typography
        variant='h2'
        color='common.white'
        sx={{ typography: { xs: 'h4', sm: 'h2', xl: 'h1' }, maxWidth: '45rem' }}
      >
        Wybieraj dania z&nbsp;najlepszych restauracji
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} justifyContent='space-between' alignItems='flex-start'>
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
        <IconButton title='Zobacz więcej' href='#steps' LinkComponent='a' color='secondary' size='small'>
          <ArrowDownward fontSize='large' />
        </IconButton>
      </Stack>
    </Stack>
  </Box>
);

export { Hero };
