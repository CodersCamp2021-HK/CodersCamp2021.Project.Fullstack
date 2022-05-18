import Create from '@mui/icons-material/Create';
import { IconButton, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { capitalize } from 'lodash';
import { useNavigate } from 'react-router-dom';

import { routes } from '../../config';
import { useShoppingCart } from '../../contexts';

interface OrderDateHeaderProps {
  date: Date;
}

const OrderDateHeader = ({ date }: OrderDateHeaderProps) => {
  const weekday = capitalize(date.toLocaleString('pl-PL', { weekday: 'long' }));
  const dateTitle = date.toLocaleDateString('pl-PL');
  const navigate = useNavigate();
  const { setSelectedDate } = useShoppingCart();

  const editDay = () => {
    setSelectedDate(date);
    navigate(routes.main);
  };

  return (
    <TableHead sx={({ palette }) => ({ color: palette.common.white, background: palette.primary.dark })}>
      <TableRow>
        <TableCell>
          <Typography variant='h6' pl={1}>
            {weekday}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant='h6' color='secondary.main'>
            {dateTitle}
          </Typography>
        </TableCell>
        <TableCell colSpan={4} />
        <TableCell align='center'>
          <IconButton onClick={editDay}>
            <Create sx={{ color: 'common.white' }} />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export { OrderDateHeader };
