import { Box, Typography, useTheme } from '@mui/material';

import restaurant from '../../assets/restaurant.jpg';

const RegistrationSuccess = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 6rem)',
        backgroundImage: `url(${restaurant})`,
        backgroundSize: `cover`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '45rem',
          margin: '1rem',
          padding: '6rem 2rem',
          background: theme.palette.background.default,
          boxShadow: '20',
        }}
      >
        <Typography sx={{ marginBottom: '5rem', textAlign: 'center' }} variant='h2'>
          Dziękujemy za rejestrację!
        </Typography>
        <Typography sx={{ textAlign: 'center' }} variant='h4'>
          Na podany adres email wysłaliśmy link aktywacyjny.
        </Typography>
      </Box>
    </Box>
  );
};

export { RegistrationSuccess };
