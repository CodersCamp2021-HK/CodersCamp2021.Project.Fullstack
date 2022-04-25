import { Box, useTheme } from '@mui/material';

import dish from '../../assets/dish.jpg';
import { UserRegisterForm } from '../../components';

const UserRegister = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 6rem)',
        backgroundColor: theme.palette.background.default,
        backgroundImage: `url(${dish})`,
        backgroundSize: `cover`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <UserRegisterForm />
    </Box>
  );
};

export { UserRegister };
