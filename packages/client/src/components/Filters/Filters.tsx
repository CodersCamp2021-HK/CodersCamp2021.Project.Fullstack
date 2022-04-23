import { CuisineTypeEnum, DishTagsEnum, MealTypeEnum } from '@fullstack/sdk';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';

type FiltersProps = {
  listLabel: string;
  filters: DishTagsEnum | CuisineTypeEnum | MealTypeEnum;
};

const CheckboxList = ({ listLabel, filters }: FiltersProps) => (
  <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
    <FormLabel component='legend'>{listLabel}</FormLabel>
    <FormGroup>
      {Object.keys(filters).map((key: string) => {
        return <FormControlLabel key={key} control={<Checkbox />} label={filters[key]} />;
      })}
    </FormGroup>
  </FormControl>
);

const BasicSelect = () => {
  const [sort, setSort] = useState('');

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
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
  );
};

export { BasicSelect, CheckboxList };
