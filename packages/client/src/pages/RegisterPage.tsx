import { Box, useTheme } from '@mui/material';

import dish from '../assets/dish.jpg';
import restaurant from '../assets/restaurant.jpg';
import { AppNavBar, RegisterForm } from '../components';

interface RegisterProps {
  userRole: 'Partner' | 'User';
}

const RegisterPage = ({ userRole }: RegisterProps) => {
  const theme = useTheme();

  return (
    <>
      <AppNavBar />
      <Box
        sx={{
          height: 'calc(100vh - 6rem)',
          backgroundColor: theme.palette.background.default,
          backgroundImage: userRole === 'Partner' ? `url(${restaurant})` : `url(${dish})`,
          backgroundSize: `cover`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <RegisterForm userRole={userRole} />
      </Box>
    </>
  );
};

export { RegisterPage };
export type { RegisterProps };
