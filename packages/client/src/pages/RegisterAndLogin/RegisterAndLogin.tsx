import { Box, useTheme } from '@mui/material';

import dish from '../../assets/dish.jpg';
import restaurant from '../../assets/restaurant.jpg';
import { LoginForm, Question, RegisterForm, WelcomeMessage } from '../../components';
import { routes } from '../../config';

const userLogin = () => (
  <>
    <WelcomeMessage message='Witamy ponownie!' />
    <LoginForm />
    <Question question='Nie masz konta?' link={routes.userRegister} linkText='Zarejestruj się' />
  </>
);

const partnerLogin = () => (
  <>
    <WelcomeMessage message='Witamy ponownie!' />
    <LoginForm />
    <Question question='Chcesz do nas dołączyć?' link={routes.partnerRegister} linkText='Zarejestruj się' />
  </>
);

const userRegister = () => (
  <>
    <WelcomeMessage message='Stwórz konto' />
    <RegisterForm userRole='User' />
    <Question question='Masz już konto?' link={routes.userLogin} linkText='Zaloguj się' />
  </>
);

const partnerRegister = () => (
  <>
    <WelcomeMessage message='Dołącz do naszych partnerów' />
    <RegisterForm userRole='Partner' />
    <Question question='Jesteś już w naszym programie?' link={routes.partnerLogin} linkText='Zaloguj się' />
  </>
);

type RegisterAndLoginParams = {
  formType: 'UserLogin' | 'UserRegister' | 'PartnerLogin' | 'PartnerRegister';
};

const RegisterAndLogin = ({ formType }: RegisterAndLoginParams) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 6rem)',
        backgroundImage:
          formType === 'UserLogin' || formType === 'UserRegister' ? `url(${dish})` : `url(${restaurant})`,
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
          background: theme.palette.background.default,
          boxShadow: '20',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '80%',
            padding: '4rem 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {(() => {
            switch (formType) {
              case 'UserLogin':
                return userLogin();
              case 'UserRegister':
                return userRegister();
              case 'PartnerLogin':
                return partnerLogin();
              case 'PartnerRegister':
                return partnerRegister();
              default:
                return null;
            }
          })()}
        </Box>
      </Box>
    </Box>
  );
};

export { RegisterAndLogin };
