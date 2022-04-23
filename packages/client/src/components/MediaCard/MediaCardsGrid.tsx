import Grid from '@mui/material/Grid';

import { MediaCard } from './MediaCard';

const MediaCardsGrid = () => {
  const dishes = {
    data: [
      {
        id: '6200218668fc82e7bdf15088',
        name: 'Danie 1',
        mealType: ['lunch', 'obiad'],
        description: 'Opis dania',
        price: 23,
        ingredients: [
          {
            name: 'bazylia',
            canBeExcluded: false,
          },
        ],
        portionWeight: 0,
        calories: {
          per100g: 0,
          perPortion: 0,
        },
        fats: {
          per100g: 0,
          perPortion: 0,
        },
        proteins: {
          per100g: 0,
          perPortion: 0,
        },
        carbohydrates: {
          per100g: 0,
          perPortion: 0,
        },
        restaurant: '6200218668fc82e7bdf15088',
      },
      {
        id: '6200218668fc82e7bdf15088',
        name: 'Danie 1',
        photo: '',
        mealType: ['lunch', 'obiad'],
        description: 'Opis dania',
        price: 25,
        ingredients: [
          {
            name: 'bazylia',
            canBeExcluded: false,
          },
        ],
        portionWeight: 0,
        calories: {
          per100g: 0,
          perPortion: 0,
        },
        fats: {
          per100g: 0,
          perPortion: 0,
        },
        proteins: {
          per100g: 0,
          perPortion: 0,
        },
        carbohydrates: {
          per100g: 0,
          perPortion: 0,
        },
        restaurant: '6200218668fc82e7bdf15088',
      },
      {
        id: '6200218668fc82e7bdf15088',
        name: 'Danie 1',
        photo: '',
        mealType: ['lunch', 'obiad'],
        description: 'Opis dania',
        price: 20,
        ingredients: [
          {
            name: 'bazylia',
            canBeExcluded: false,
          },
        ],
        portionWeight: 0,
        calories: {
          per100g: 0,
          perPortion: 0,
        },
        fats: {
          per100g: 0,
          perPortion: 0,
        },
        proteins: {
          per100g: 0,
          perPortion: 0,
        },
        carbohydrates: {
          per100g: 0,
          perPortion: 0,
        },
        restaurant: '6200218668fc82e7bdf15088',
      },
    ],
    pages: 0,
  };

  const cardsGrid = dishes.data?.map((dish) => {
    return (
      <Grid item key={dish.id}>
        <MediaCard dish={dish} />
      </Grid>
    );
  });

  return (
    <Grid container spacing={2} pt={6}>
      {cardsGrid}
    </Grid>
  );
};

export { MediaCardsGrid };