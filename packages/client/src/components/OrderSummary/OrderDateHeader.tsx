import Create from '@mui/icons-material/Create';
import { IconButton, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { capitalize } from 'lodash';

interface OrderDateHeaderProps {
  date: Date;
}

const OrderDateHeader = ({ date }: OrderDateHeaderProps) => {
  const weekday = capitalize(date.toLocaleString('pl-PL', { weekday: 'long' }));
  const dateTitle = date.toLocaleDateString('pl-PL');

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
          <IconButton>
            <Create sx={{ color: 'common.white' }} />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export { OrderDateHeader };
