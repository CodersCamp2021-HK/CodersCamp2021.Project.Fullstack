import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { range } from 'lodash';

import { useShoppingCart } from '../../contexts';

const availableDates = range(3, 10).map((offset) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return {
    date,
    label: `${date.toLocaleDateString('pl-PL')} (${date.toLocaleString('pl-PL', { weekday: 'long' })})`,
  };
});

const DatePicker = () => {
  const { selectedDate, setSelectedDate } = useShoppingCart();

  return (
    <Box bgcolor='background.default' borderRadius='10px' p={2} mb={4}>
      <FormControl fullWidth>
        <InputLabel>Wybierz dzień</InputLabel>
        <Select
          value={selectedDate?.toJSON() ?? ''}
          label='Wybierz dzień'
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        >
          {availableDates.map((elem) => (
            <MenuItem key={elem.date.toJSON()} value={elem.date.toJSON()}>
              {elem.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export { DatePicker };
