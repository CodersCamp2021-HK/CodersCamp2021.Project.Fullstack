import { Typography } from '@mui/material';

type WelcomeMessageProps = {
  message: string;
};

const WelcomeMessage = ({ message }: WelcomeMessageProps) => (
  <Typography sx={{ marginBottom: '5rem', textAlign: 'center' }} variant='h2'>
    {message}
  </Typography>
);

export { WelcomeMessage };
