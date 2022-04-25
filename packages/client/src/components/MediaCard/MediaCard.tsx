import { DishDto } from '@fullstack/sdk';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';

import cardImg from '../../assets/placeholder.png';
import { DishPopup } from '../DishPopup/DishPopup';

type CardProps = {
  dish: Omit<DishDto, 'id'>;
};

const MediaCard = ({ dish }: CardProps) => {
  const { name, description, photo, fats, proteins, carbohydrates, calories, price } = dish;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card sx={{ maxWidth: 340 }}>
      <CardMedia component='img' height='320' image={photo || cardImg} alt='name' />
      <DishPopup open={open} onClose={handleClose} dish={dish} />
      <CardContent>
        <Typography
          gutterBottom
          variant='overline'
          sx={{
            backgroundColor: 'primary.background',
            padding: '0.5rem 0.7rem',
            borderRadius: '50px',
          }}
        >
          Tłuszcze: {fats.perPortion}, Białka: {proteins.perPortion}, Węglowodany: {carbohydrates.perPortion}
        </Typography>
        <Typography pt={1} gutterBottom variant='h5'>
          {name}
          <Typography color='text.secondary' component='span' variant='subtitle1' pl={1}>
            ({calories.perPortion} kcal)
          </Typography>
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginTop: '1rem' }}>
          <Typography mr={1} variant='h5' color='primary.main'>
            {(price / 100).toFixed(2)} zł
          </Typography>
          <Button color='secondary' variant='contained' size='large' startIcon={<AddIcon />} onClick={handleOpen}>
            Dodaj do koszyka
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export { MediaCard };
