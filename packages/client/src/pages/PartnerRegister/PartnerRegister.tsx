import { Box, useTheme } from '@mui/material';

import restaurant from '../../assets/restaurant.jpg';
import { PartnerRegisterForm } from '../../components';

const PartnerRegister = () => {
  const theme = useTheme();

  return (
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
      <PartnerRegisterForm />
    </Box>
  );
};

export { PartnerRegister };