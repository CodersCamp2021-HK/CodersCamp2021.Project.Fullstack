import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import _ from 'lodash';

interface CountSelectProps {
  count: number;
  setCount: (newNumber: number) => void;
}

const CountSelect = ({ count, setCount }: CountSelectProps) => {
  return (
    <Box sx={{ pb: 5, pt: 2 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Liczba dań</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={count}
          label='mealCount'
          onChange={(e) => setCount(e.target.value as number)}
        >
          {_.range(1, 10).map((n) => (
            <MenuItem key={n} value={n}>
              {n}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export { CountSelect };
