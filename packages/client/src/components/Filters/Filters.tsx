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
import { useEffect, useState } from 'react';

import { SingleFilterType, useFiltersContext } from '../../contexts/FiltersContext';

type CheckboxProps = {
  listLabel: string;
  filtersName: string;
  filters: Record<string, string>;
  selectedCheckboxes: SingleFilterType[];
};

type CheckboxInputProps = {
  value: string;
  filters: Record<string, string>;
  filtersName: string;
  selectedCheckboxes: SingleFilterType[];
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

function isInputCheckbox(value: any): value is HTMLInputElement {
  return value?.type === 'checkbox';
}

const Filters = () => {
  const [checked, setChecked] = useState<SingleFilterType[]>([]);
  const { overrideFilters } = useFiltersContext();

  const handleChecked: React.FormEventHandler<HTMLDivElement> = ({ target }) => {
    if (isInputCheckbox(target)) {
      const targetEntry = { name: target.getAttribute('name'), value: target.value };
      setChecked((prev) => {
        if (target.checked) {
          return [...prev, targetEntry];
        }
        return prev.filter((item) => !_.isEqual(item, targetEntry));
      });
    }
  };

  const clearCheckboxes = () => {
    setChecked([]);
  };

  useEffect(() => overrideFilters(checked), [checked, overrideFilters]);

  return (
    <>
      <Stack onChange={(e) => handleChecked(e)} spacing={2}>
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
