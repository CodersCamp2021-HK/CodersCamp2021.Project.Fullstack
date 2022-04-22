import { Create } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import { capitalize } from 'lodash';

interface OrderDateHeaderProps {
  date: Date;
}

const OrderDateHeader = ({ date }: OrderDateHeaderProps) => {
  const weekday = capitalize(date.toLocaleString('pl-PL', { weekday: 'long' }));
  const dateTitle = date.toLocaleDateString('pl-PL');

  return (
    <Stack direction='row' alignItems='center' p={4} color='common.white' bgcolor='primary.dark'>
      <Typography variant='h6' minWidth='11rem'>
        {weekday}
      </Typography>
      <Typography variant='h6' color='secondary.main'>
        {dateTitle}
      </Typography>
      <IconButton sx={{ ml: 'auto' }}>
        <Create sx={{ color: 'common.white' }} />
      </IconButton>
    </Stack>
  );
};

export { OrderDateHeader };
