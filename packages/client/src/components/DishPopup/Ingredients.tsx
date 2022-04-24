import { DishDto } from '@fullstack/sdk/src';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import _ from 'lodash';
import * as React from 'react';

type IngredientsProps = {
  ingredients: Omit<DishDto, 'id'>;
};
const Ingredients = ({ ingredients }: IngredientsProps) => {
  const [isIncluded, setIsIncluded] = React.useState(_.fill(Array(ingredients.ingredients?.length), true));

  const handleToggle = (idx: number) => {
    setIsIncluded((prev) => prev.map((elem, i) => (i === idx ? !elem : elem)));
  };

  return (
    <>
      <Typography variant='h6'>Składniki</Typography>
      <Box>
        {(ingredients.ingredients ?? []).length > 0 ? (
          <Box
            sx={{
              flexDirection: 'column',
              display: 'flex',
              flexFlow: 'column-wrap',
              flexWrap: 'wrap',
              height: '15rem',
            }}
          >
            {ingredients.ingredients?.map((ingredient, idx) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isIncluded[idx]}
                    onChange={() => handleToggle(idx)}
                    name={ingredient.name}
                    disabled={!ingredient.canBeExcluded}
                  />
                }
                label={ingredient.name}
                key={ingredient.name}
              />
            ))}
          </Box>
        ) : (
          <Typography variant='h6' sx={{ pl: 1, pr: 1 }}>
            Brak
          </Typography>
        )}
      </Box>
    </>
  );
};

export { Ingredients };
