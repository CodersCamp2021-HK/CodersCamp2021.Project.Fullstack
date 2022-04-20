import Grid from '@mui/material/Grid';

import cardImg from '../assets/default.png';
import { MediaCard } from './MediaCard';

const MediaCardsGrid = () => {
  return (
    <Grid container spacing={2} sx={{ paddingTop: '3rem' }}>
      <Grid item>
        <MediaCard
          name='Bowl japoński'
          content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
          img={{ url: cardImg, alt: '' }}
          price={32}
          calories={{ perPortion: 550 }}
          fats={{ perPortion: 250 }}
          proteins={{ perPortion: 20 }}
          carbohydrates={{ perPortion: 50 }}
        />
      </Grid>
      <Grid item>
        <MediaCard
          name='Bowl japoński'
          content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
          img={{ url: cardImg, alt: '' }}
          price={32}
          calories={{ perPortion: 550 }}
          fats={{ perPortion: 250 }}
          proteins={{ perPortion: 20 }}
          carbohydrates={{ perPortion: 50 }}
        />
      </Grid>
      <Grid item>
        <MediaCard
          name='Bowl japoński'
          content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
          img={{ url: cardImg, alt: '' }}
          price={32}
          calories={{ perPortion: 550 }}
          fats={{ perPortion: 250 }}
          proteins={{ perPortion: 20 }}
          carbohydrates={{ perPortion: 50 }}
        />
      </Grid>
      <Grid item>
        <MediaCard
          name='Bowl japoński'
          content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
          img={{ url: cardImg, alt: '' }}
          price={32}
          calories={{ perPortion: 550 }}
          fats={{ perPortion: 250 }}
          proteins={{ perPortion: 20 }}
          carbohydrates={{ perPortion: 50 }}
        />
      </Grid>
      <Grid item>
        <MediaCard
          name='Bowl japoński'
          content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
          img={{ url: cardImg, alt: '' }}
          price={32}
          calories={{ perPortion: 550 }}
          fats={{ perPortion: 250 }}
          proteins={{ perPortion: 20 }}
          carbohydrates={{ perPortion: 50 }}
        />
      </Grid>
    </Grid>
  );
};

export { MediaCardsGrid };
