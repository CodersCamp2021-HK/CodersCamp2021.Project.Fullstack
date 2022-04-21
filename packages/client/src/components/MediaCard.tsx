import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

type CardProps = {
  name: string;
  content: string;
  img: {
    url: string;
    alt: string;
  };
  price: number;
  calories: {
    perPortion: number;
  };
  fats: {
    perPortion: number;
  };
  proteins: {
    perPortion: number;
  };
  carbohydrates: {
    perPortion: number;
  };
};

const MediaCard = ({ name, content, img, price, calories, fats, proteins, carbohydrates }: CardProps) => {
  return (
    <Card sx={{ maxWidth: 340 }}>
      <CardMedia component='img' height='320' image={img.url} alt={img.alt} />
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
        <Typography sx={{ paddingTop: '0.5rem' }} gutterBottom variant='h5'>
          {name}
          <Typography
            color='text.secondary'
            component='span'
            variant='subtitle1'
            sx={{ display: 'inline', paddingLeft: '0.5rem' }}
          >
            ({calories.perPortion} kcal)
          </Typography>
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {content}
        </Typography>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginTop: '1rem' }}>
          <Typography sx={{ marginRight: '1rem' }} variant='h5' color='primary.main'>
            {price} zł
          </Typography>
          <Button color='secondary' variant='contained' size='large' startIcon={<AddIcon />}>
            Dodaj do koszyka
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export { MediaCard };
