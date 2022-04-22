import Grid from '@mui/material/Grid';

import cardImg from '../assets/default.png';
import { MediaCard } from './MediaCard';

const MediaCardsGrid = () => {
  return (
    <Grid container spacing={2} pt={6}>
      <Grid item>
        <MediaCard
          dish={{
            name: 'Bowl japoński',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
            photo: cardImg,
            price: 32,
            calories: { perPortion: 550, per100g: 0 },
            fats: { perPortion: 250, per100g: 0 },
            proteins: { perPortion: 20, per100g: 0 },
            carbohydrates: { perPortion: 20, per100g: 0 },
            updated: true,
          }}
        />
      </Grid>
      <Grid item>
        <MediaCard
          dish={{
            name: 'Bowl japoński',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
            photo: cardImg,
            price: 32,
            calories: { perPortion: 550, per100g: 0 },
            fats: { perPortion: 250, per100g: 0 },
            proteins: { perPortion: 20, per100g: 0 },
            carbohydrates: { perPortion: 20, per100g: 0 },
            updated: true,
          }}
        />
      </Grid>
      <Grid item>
        <MediaCard
          dish={{
            name: 'Bowl japoński',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
            photo: cardImg,
            price: 32,
            calories: { perPortion: 550, per100g: 0 },
            fats: { perPortion: 250, per100g: 0 },
            proteins: { perPortion: 20, per100g: 0 },
            carbohydrates: { perPortion: 20, per100g: 0 },
            updated: true,
          }}
        />
      </Grid>
      <Grid item>
        <MediaCard
          dish={{
            name: 'Bowl japoński',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
            photo: cardImg,
            price: 32,
            calories: { perPortion: 550, per100g: 0 },
            fats: { perPortion: 250, per100g: 0 },
            proteins: { perPortion: 20, per100g: 0 },
            carbohydrates: { perPortion: 20, per100g: 0 },
            updated: true,
          }}
        />
      </Grid>
      <Grid item>
        <MediaCard
          dish={{
            name: 'Bowl japoński',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
            photo: cardImg,
            price: 32,
            calories: { perPortion: 550, per100g: 0 },
            fats: { perPortion: 250, per100g: 0 },
            proteins: { perPortion: 20, per100g: 0 },
            carbohydrates: { perPortion: 20, per100g: 0 },
            updated: true,
          }}
        />
      </Grid>
    </Grid>
  );
};

export { MediaCardsGrid };
