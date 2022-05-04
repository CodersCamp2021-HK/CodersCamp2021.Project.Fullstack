import { DishTagsEnum, MealTypeEnum } from '@fullstack/sdk';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, Stack } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import _ from 'lodash';
import { ChangeEvent, useEffect, useState } from 'react';

import { useFiltersContext } from '../../contexts/FiltersContext';

type CheckboxProps = {
  listLabel: string;
  filtersName: string;
  filters: Record<string, string>;
  selectedCheckboxes: { name: string | null; value: string | null }[];
};

type CheckboxInputProps = {
  value: string;
  filters: Record<string, string>;
  filtersName: string;
  selectedCheckboxes: { name: string | null; value: string | null }[];
};

type SelectProps = {
  label: string;
  selectObj: Record<string, string>;
};

const BasicSelect = ({ label, selectObj }: SelectProps) => {
  const [sort, setSort] = useState('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSort(event.target?.value);
  };

  return (
    <FormControl variant='standard' sx={{ minWidth: 120, mb: 2 }}>
      <InputLabel id='simple-select-label'>{label}</InputLabel>
      <Select labelId='simple-select-label' id='simple-select' value={sort} label={label} onChange={handleChange}>
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

const CheckboxInput = ({ value, filters, filtersName, selectedCheckboxes }: CheckboxInputProps) => {
  const [checked, setChecked] = useState(false);
  function handleChecked() {
    setChecked(!checked);
  }

  useEffect(() => {
    if (selectedCheckboxes?.length === 0) {
      setChecked(false);
    }
  }, [selectedCheckboxes]);

  return (
    <FormControlLabel
      label={filters[value]}
      control={<Checkbox onChange={() => handleChecked()} checked={checked} name={filtersName} value={value} />}
    />
  );
};

const CheckboxList = ({ listLabel, filters, filtersName, selectedCheckboxes }: CheckboxProps) => {
  return (
    <Box>
      <FormControl margin='normal' component='fieldset' variant='standard'>
        <FormLabel component='legend'>{listLabel}</FormLabel>
        <FormGroup>
          {Object.keys(filters).map((key: string) => {
            return (
              <CheckboxInput
                selectedCheckboxes={selectedCheckboxes}
                key={key}
                value={key}
                filters={filters}
                filtersName={filtersName}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

const Filters = () => {
  const [checked, setChecked] = useState<{ name: string | null; value: string | null }[]>([]);
  const { addFilters } = useFiltersContext();

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    let updatedList = [...checked];

    if (e.target?.getAttribute('type') === 'checkbox') {
      if (e.target?.checked) {
        updatedList = [...checked, { name: e.target.getAttribute('name'), value: e.target?.value }];
      } else {
        updatedList = updatedList.filter(
          (item) => !_.isEqual(item, { name: e.target?.getAttribute('name'), value: e.target?.value }),
        );
      }
    }
    setChecked(updatedList);
  };

  const clearCheckboxes = () => {
    setChecked([]);
  };

  useEffect(() => {
    addFilters(checked);
  }, [checked, addFilters]);

  return (
    <>
      <Stack onClick={(e) => handleChecked(e)} spacing={2}>
        <CheckboxList
          selectedCheckboxes={checked}
          filtersName='mealType'
          listLabel='Rodzaj dania'
          filters={MealTypeEnum}
        />
        <CheckboxList selectedCheckboxes={checked} filtersName='tags' listLabel='Tagi' filters={DishTagsEnum} />
      </Stack>
      <Box>
        <Button
          onClick={() => clearCheckboxes()}
          fullWidth={false}
          variant='contained'
          size='small'
          startIcon={<ClearIcon />}
        >
          wyczyść
        </Button>
      </Box>
    </>
  );
};

export { BasicSelect, Filters };
