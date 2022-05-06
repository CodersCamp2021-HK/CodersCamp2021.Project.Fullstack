import { IngredientDto } from '@fullstack/sdk/src';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

type IngredientsProps = {
  ingredients: { ingredient: IngredientDto; isIncluded: boolean }[];
  onIngredientToggle: (idx: number) => void;
};

const Ingredients = ({ ingredients, onIngredientToggle }: IngredientsProps) => {
  return (
    <>
      <Typography variant='h6'>Składniki</Typography>
      <Box>
        {ingredients.length > 0 ? (
          <Box
            sx={{
              flexDirection: 'column',
              display: 'flex',
              flexFlow: 'column-wrap',
              flexWrap: 'wrap',
              height: '15rem',
            }}
          >
            {ingredients.map(({ ingredient, isIncluded }, idx) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isIncluded}
                    onChange={() => onIngredientToggle(idx)}
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
