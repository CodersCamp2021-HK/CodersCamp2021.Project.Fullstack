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
  filters: ObjType;
};

type ObjType = {
  [key: string]: string;
};

type SelectProps = {
  label: string;
  selectObj: ObjType;
};

const CheckboxList = ({ listLabel, filters }: FiltersProps) => (
  <FormControl margin='normal' component='fieldset' variant='standard'>
    <FormLabel component='legend'>{listLabel}</FormLabel>
    <FormGroup>
      {Object.keys(filters).map((key: string) => {
        return <FormControlLabel key={key} control={<Checkbox value={key} />} label={filters[key]} />;
      })}
    </FormGroup>
  </FormControl>
);

const BasicSelect = ({ label, selectObj }: SelectProps) => {
  const [sort, setSort] = useState('');

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <FormControl variant='standard' sx={{ minWidth: 120, mb: 2 }}>
      <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={sort}
        label={label}
        onChange={handleChange}
      >
        {Object.keys(selectObj).map((key) => {
          return (
            <MenuItem key={key} value={selectObj[key]}>
              {selectObj[key]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export { BasicSelect, CheckboxList };
