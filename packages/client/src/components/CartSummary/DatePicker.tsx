import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SetStateAction } from 'react';

const date = new Date();
const availableDates: { date: string; weekday: string }[] = [];

for (let i = 3; i < 10; i++) {
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + i);
  availableDates.push({
    date: nextDay.toLocaleDateString('pl-PL'),
    weekday: nextDay.toLocaleString('pl-PL', { weekday: 'long' }),
  });
}
interface DatePickerProps {
  day: string;
  onDayChange: (e: SetStateAction<string>) => void;
}

const DatePicker = ({ day, onDayChange }: DatePickerProps) => {
  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    onDayChange(e.target.value);
  };

  return (
    <Box bgcolor='background.default' borderRadius='10px' p={2} mb={2}>
      <FormControl fullWidth>
        <InputLabel>Wybierz dzień</InputLabel>
        <Select value={day} label='Wybierz dzień' onChange={handleChange}>
          {availableDates.map((elem) => {
            return (
              <MenuItem key={elem.date} value={elem.date}>
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
