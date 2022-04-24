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
      <Box sx={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>
        <FormControl sx={{ mr: 5 }} component='fieldset' variant='standard'>
          {(ingredients.ingredients ?? []).length > 0 ? (
            <FormGroup>
              {ingredients.ingredients?.map(
                (tag, idx) => (
                  // tag.canBeExcluded ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isIncluded[idx]}
                        onChange={() => handleToggle(idx)}
                        name={tag.name}
                        disabled={!tag.canBeExcluded}
                      />
                    }
                    label={tag.name}
                    key={tag.name}
                  />
                ),
                // ) : (
                //   <FormControlLabel
                //     control={<Checkbox name={tag.name} />}
                //     label={tag.name}
                //     key={tag.name}
                //     disabled
                //     checked
                //   />
                // ),
              )}
            </FormGroup>
          ) : (
            <Typography variant='h6' sx={{ pl: 1, pr: 1 }}>
              Brak
            </Typography>
          )}
        </FormControl>
      </Box>
    </>
  );
};

export { Ingredients };
