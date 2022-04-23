import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import * as React from 'react';

const Ingredients = () => {
  const [state, setState] = React.useState({
    ingredient1: false,
    ingredient2: false,
    ingredient3: false,
    ingredient4: false,
    ingredient5: false,
    ingredient6: false,
    ingredient7: false,
    ingredient8: false,
    ingredient9: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const {
    ingredient1,
    ingredient2,
    ingredient3,
    ingredient4,
    ingredient5,
    ingredient6,
    ingredient7,
    ingredient8,
    ingredient9,
  } = state;

  return (
    <>
      <Typography variant='h6'>Składniki</Typography>
      <Box sx={{ display: 'flex' }}>
        <FormControl sx={{ mr: 5 }} component='fieldset' variant='standard'>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={ingredient1} onChange={handleChange} name='ingredient1' />}
              label='Składnik'
            />
            <FormControlLabel
              control={<Checkbox checked={ingredient2} onChange={handleChange} name='ingredient2' />}
              label='Składnik'
            />
            <FormControlLabel
              control={<Checkbox checked={ingredient3} onChange={handleChange} name='ingredient3' />}
              label='Składnik'
            />
            <FormControlLabel
              control={<Checkbox checked={ingredient4} onChange={handleChange} name='ingredient4' />}
              label='Składnik'
            />
          </FormGroup>
        </FormControl>
        <FormControl sx={{ mr: 5 }} component='fieldset' variant='standard'>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={ingredient5} onChange={handleChange} name='ingredient5' />}
              label='Składnik'
            />
            <FormControlLabel
              control={<Checkbox checked={ingredient6} onChange={handleChange} name='ingredient6' />}
              label='Składnik'
            />
            <FormControlLabel
              control={<Checkbox checked={ingredient7} onChange={handleChange} name='ingredient7' />}
              label='Składnik'
            />
            <FormControlLabel
              control={<Checkbox checked={ingredient8} onChange={handleChange} name='ingredient8' />}
              label='Składnik'
            />
          </FormGroup>
        </FormControl>
        <FormControl component='fieldset' variant='standard'>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={ingredient9} onChange={handleChange} name='ingredient9' />}
              label='Składnik'
            />
          </FormGroup>
        </FormControl>
      </Box>
    </>
  );
};

export { Ingredients };
