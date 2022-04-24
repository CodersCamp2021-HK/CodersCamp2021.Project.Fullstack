import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import _ from 'lodash';
import * as React from 'react';

const DaysList = () => {
  const [mealCount, setMealCount] = React.useState(1);

  const handleChange = (event: SelectChangeEvent) => {
    setMealCount(parseInt(event.target.value, 10));
  };

  return (
    <Box sx={{ pb: 5 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Liczba dań</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={mealCount.toString()}
          label='mealCount'
          onChange={handleChange}
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

export { DaysList };
