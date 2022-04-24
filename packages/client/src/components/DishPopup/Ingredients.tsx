import { DishDto } from '@fullstack/sdk/src';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import * as React from 'react';

type IngredientsProps = {
  ingredients: Omit<DishDto, 'id'>;
};
const Ingredients = ({ ingredients }: IngredientsProps) => {
  const [state, setState] = React.useState([Boolean]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
      <Typography variant='h6'>Składniki</Typography>
      <Box sx={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>
        <FormControl sx={{ mr: 5 }} component='fieldset' variant='standard'>
          {(ingredients.ingredients ?? []).length > 0 ? (
            <FormGroup>
              {ingredients.ingredients?.map((tag) =>
                tag.canBeExcluded ? (
                  <FormControlLabel
                    control={<Checkbox checked={tag.canBeExcluded} onChange={handleChange} name={tag.name} />}
                    label={tag.name}
                    key={tag.name}
                  />
                ) : (
                  <FormControlLabel
                    control={<Checkbox checked={tag.canBeExcluded} onChange={handleChange} name={tag.name} />}
                    label={tag.name}
                    key={tag.name}
                    disabled
                    checked
                  />
                ),
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
