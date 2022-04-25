import { AllergensEnum, DishTagsEnum } from '@fullstack/sdk/src';
import Grid from '@mui/material/Grid';

import { MediaCard } from './MediaCard';

const MediaCardsGrid = () => {
  const dishes = {
    data: [
      {
        id: '6200218668fc82e7bdf15088',
        name: 'Danie 1',
        mealType: ['lunch', 'obiad'],
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        price: 2300,
        tags: [DishTagsEnum.Wegetariaska, DishTagsEnum.Wegaska],
        ingredients: [
          {
            name: 'bazylia',
            canBeExcluded: false,
          },
          {
            name: 'pomidor',
            canBeExcluded: true,
          },
          {
            name: 'cebula',
            canBeExcluded: true,
          },
          {
            name: 'koperek',
            canBeExcluded: false,
          },
        ],
        allergens: [AllergensEnum.NasionaSezamu, AllergensEnum.Seler],
        portionWeight: 300,
        calories: {
          per100g: 100,
          perPortion: 300,
        },
        fats: {
          per100g: 50,
          perPortion: 150,
        },
        proteins: {
          per100g: 30,
          perPortion: 90,
        },
        carbohydrates: {
          per100g: 40,
          perPortion: 120,
        },
        restaurant: '6200218668fc82e7bdf15088',
      },
      {
        id: '6200218668fc82e7bdf15088',
        name: 'Danie 2',
        photo: '',
        mealType: ['lunch', 'obiad'],
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        price: 2500,
        tags: [DishTagsEnum.BardzoOstre, DishTagsEnum.Wegaska],
        ingredients: [
          {
            name: 'bazylia',
            canBeExcluded: false,
          },
          {
            name: 'pomidor',
            canBeExcluded: true,
          },
          {
            name: 'cebula',
            canBeExcluded: true,
          },
          {
            name: 'koperek',
            canBeExcluded: false,
          },
        ],
        allergens: [AllergensEnum.Gluten, AllergensEnum.Skorupiaki],
        portionWeight: 400,
        calories: {
          per100g: 50,
          perPortion: 200,
        },
        fats: {
          per100g: 60,
          perPortion: 240,
        },
        proteins: {
          per100g: 50,
          perPortion: 200,
        },
        carbohydrates: {
          per100g: 10,
          perPortion: 40,
        },
        restaurant: '6200218668fc82e7bdf15088',
      },
      {
        id: '6200218668fc82e7bdf15088',
        name: 'Danie 3',
        photo: '',
        mealType: ['lunch', 'obiad'],
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        price: 2000,
        tags: [DishTagsEnum.Ostre, DishTagsEnum.Wegaska],
        ingredients: [
          {
            name: 'bazylia',
            canBeExcluded: false,
          },
          {
            name: 'pomidor',
            canBeExcluded: true,
          },
          {
            name: 'cebula',
            canBeExcluded: true,
          },
          {
            name: 'koperek',
            canBeExcluded: false,
          },
        ],
        allergens: [AllergensEnum.Gluten, AllergensEnum.Mleko],
        portionWeight: 200,
        calories: {
          per100g: 100,
          perPortion: 200,
        },
        fats: {
          per100g: 50,
          perPortion: 100,
        },
        proteins: {
          per100g: 20,
          perPortion: 40,
        },
        carbohydrates: {
          per100g: 50,
          perPortion: 100,
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
