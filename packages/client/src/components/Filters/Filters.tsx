import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';

interface FilterGroupProps {
  name: string;
  inputGroup: string[];
}

const Filters = ({ name, inputGroup }: FilterGroupProps) => {
  return (
    <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
      <FormLabel component='legend'>{name}</FormLabel>
      <FormGroup>
        {inputGroup.map((type) => {
          return <FormControlLabel key={`${name}-${type}`} control={<Checkbox />} label={type} />;
        })}
      </FormGroup>
    </FormControl>
  );
};
const BasicSelect = () => {
  const [sort, setSort] = useState('');

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Box>
      <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id='demo-simple-select-label'>Sortuj</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={sort}
          label='Sortuj'
          onChange={handleChange}
        >
          <MenuItem value={0}>wg. ceny rosnąco</MenuItem>
          <MenuItem value={1}>wg. kaloryczności rosnąco</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export { BasicSelect, Filters };
