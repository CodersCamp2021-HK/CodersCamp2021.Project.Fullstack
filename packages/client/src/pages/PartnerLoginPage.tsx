import { Box, useTheme } from '@mui/material';

import restaurant from '../assets/restaurant.jpg';
import { AppNavBar, PartnerLoginForm } from '../components';

const PartnerLoginPage = () => {
  const theme = useTheme();

  return (
    <>
      <AppNavBar />
      <Box
        sx={{
          minHeight: 'calc(100vh - 6rem)',
          backgroundColor: theme.palette.background.default,
          backgroundImage: `url(${restaurant})`,
          backgroundSize: `cover`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PartnerLoginForm />
      </Box>
    </>
  );
};

export { PartnerLoginPage };
