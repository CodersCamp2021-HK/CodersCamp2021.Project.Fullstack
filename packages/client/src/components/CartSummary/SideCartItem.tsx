import { DishDto } from '@fullstack/sdk/src';
import Create from '@mui/icons-material/Create';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { Box, IconButton, Typography } from '@mui/material';

type Props = {
  dish: Omit<DishDto, 'id' | 'restaurant' | 'description' | 'portionWeight'>;
};

const SideCartItem = ({ dish }: Props) => {
  const { name, photo, fats, proteins, carbohydrates, calories } = dish;
  return (
    <Box mb={2} display='flex' alignItems='center'>
      <Box component='img' mr={1} width='5.3125rem' height='5.3125rem' borderRadius='50%' src={photo} alt={name} />
      <Box>
        <Typography variant='body2'>{name}</Typography>
        <Typography variant='body2' color='secondary.main'>
          Kalorie: {calories.perPortion}
        </Typography>
        <Typography variant='body2' color='secondary.main'>
          Tłuszcze: {fats.perPortion}
        </Typography>
        <Typography variant='body2' color='secondary.main'>
          Białka: {proteins.perPortion}
        </Typography>
        <Typography variant='body2' color='secondary.main'>
          Węglowodany: {carbohydrates.perPortion}
        </Typography>
      </Box>
      <Box
        color='#fff'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        marginLeft='auto'
      >
        <IconButton>
          <DeleteOutline color='secondary' />
        </IconButton>
        <IconButton>
          <Create color='secondary' />
        </IconButton>
      </Box>
    </Box>
  );
};

export { SideCartItem };
