import { OperationalCityEnum } from '@fullstack/sdk';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import hero from '../../assets/hero.jpg';
import { routes } from '../../config/routes';

const HERO_BACKGROUND = `linear-gradient(118.2deg, rgba(27, 94, 32, 0.5) 38.72%, rgba(0, 0, 0, 0.12) 88.45%), url(${hero}) center center / cover`;

const SearchField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
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

const Hero = () => {
  const [searchValue, setSearchValue] = useState('');
  console.log(Object.values(OperationalCityEnum).find((val) => val === searchValue) !== undefined);
  return (
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
          <Autocomplete
            freeSolo
            disablePortal
            disableClearable
            id='combo-box-demo'
            options={Object.values(OperationalCityEnum)}
            sx={{ width: 360 }}
            value={searchValue}
            onChange={(event, newValue) => {
              setSearchValue(newValue);
            }}
            renderInput={(params) => (
              <SearchField
                {...params}
                placeholder='Wpisz miasto'
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Button
                        href={
                          Object.values(OperationalCityEnum).find((val) => val === searchValue) !== undefined
                            ? `${routes.main}?city=${encodeURIComponent(String(searchValue))}`
                            : ''
                        }
                        sx={{ height: 'auto' }}
                        variant='contained'
                        color='secondary'
                        disableElevation
                      >
                        Wyszukaj
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Stack>
        <Stack alignItems='center' sx={{ position: 'absolute', right: 0, bottom: 0, p: { xs: 4, sm: 8 } }}>
          <Typography color='secondary' textAlign='center'>
            Zobacz jak <br />
            złożyć zamówienie
          </Typography>
          <IconButton title='Zobacz więcej' href='#steps' LinkComponent='a' color='secondary' size='small'>
            <ArrowDownward fontSize='large' />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export { Hero };
