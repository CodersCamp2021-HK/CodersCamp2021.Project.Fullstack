import { CuisineTypeEnum, DishTagsEnum, MealTypeEnum } from '@fullstack/sdk';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button } from '@mui/material';
import { useRef, useState } from 'react';

import { CheckboxList } from '../Filter';

const Filters = () => {
  const filtersList = useRef(null);
  const [checked, setChecked] = useState([]);

  const handleChecked = (e) => {
    let updatedList = [...checked];

    if (e.target.checked) {
      updatedList = [...checked, e.target.value];
    } else {
      updatedList = updatedList.filter((item) => item !== e.target.value);
    }
    setChecked(updatedList);
  };

  const clearCheckboxes = (e) => {
    checked.map((item) => {
      filtersList.current.querySelector(`[value=${item}]`).checked = false;
    });
  };

  return (
    <Box>
      <Box onClick={handleChecked} ref={filtersList}>
        <CheckboxList listLabel='Tagi' filters={DishTagsEnum} />
        <CheckboxList listLabel='Rodzaj kuchni' filters={CuisineTypeEnum} />
        <CheckboxList listLabel='Rodzaj kuchni' filters={MealTypeEnum} />
      </Box>
      <Box>
        <Button onClick={clearCheckboxes} fullWidth={false} variant='contained' size='small' startIcon={<ClearIcon />}>
          wyczyść
        </Button>
      </Box>
    </Box>
  );
};

export { Filters };
