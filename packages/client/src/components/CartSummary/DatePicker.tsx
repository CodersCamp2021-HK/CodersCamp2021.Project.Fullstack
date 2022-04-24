import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

const DatePicker = () => {
  const date = new Date();
  const availableDates = [];

  for (let i = 3; i < 10; i++) {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + i);
    availableDates.push({
      date: nextDay.toLocaleDateString('pl-PL'),
      weekday: nextDay.toLocaleString('pl-PL', { weekday: 'long' }),
    });
  }

  const [day, setDay] = useState(`${availableDates[0].date}`);

  const handleChange = (event: SelectChangeEvent) => {
    setDay(event.target.value as string);
  };

  return (
    <Box bgcolor='background.default' borderRadius='10px' p={2} mb={2}>
      <FormControl fullWidth>
        <InputLabel>Wybierz dzień</InputLabel>
        <Select value={day} label='Wybierz dzień' onChange={handleChange}>
          {availableDates.map((elem) => {
            return (
              <MenuItem key='' value={elem.date}>
                {elem.date} ({elem.weekday})
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export { DatePicker };
