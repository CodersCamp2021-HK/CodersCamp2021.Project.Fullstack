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
};

const MediaCard = ({ name, content, img, price }: CardProps) => (
  <Card sx={{ maxWidth: 330 }}>
    <CardMedia component='img' height='320' image={img.url} alt={img.alt} />
    <CardContent>
      <Typography gutterBottom variant='h5' component='div'>
        {name}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        {content}
      </Typography>
      <Typography variant='h5' color='primary.main'>
        {price} zł
      </Typography>
      <CardActions>
        <Button color='secondary' variant='contained' size='large' startIcon={<AddIcon />}>
          Dodaj do koszyka
        </Button>
      </CardActions>
    </CardContent>
  </Card>
);

export { MediaCard };
