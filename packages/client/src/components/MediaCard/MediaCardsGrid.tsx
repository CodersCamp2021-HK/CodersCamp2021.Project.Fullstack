import { AllergensEnum, DishDto, DishesApi, DishTagsEnum } from '@fullstack/sdk';
import Grid from '@mui/material/Grid';
import { useContext, useEffect, useState } from 'react';

import { apiConfiguration } from '../../config';
import { FiltersContextCurrent } from '../../contexts/FiltersContext';
import { MediaCard } from './MediaCard';

const EXAMPLE_DISHES = [
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
];
const dishesApi = new DishesApi(apiConfiguration);

const MediaCardsGrid = () => {
  const filtersParam = useContext(FiltersContextCurrent);
  console.log(filtersParam);
  const [dishes, setDishes] = useState<DishDto[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const dishReponse = await dishesApi.listAllDishes();
        setDishes(dishReponse.data);
      } catch (error) {
        setDishes(EXAMPLE_DISHES);
      }
    }

    fetchData();
  }, []);

  const cardsGrid = dishes.map((dish) => {
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
