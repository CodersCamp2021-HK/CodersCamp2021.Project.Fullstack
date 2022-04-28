import { DishDto, DishesApi } from '@fullstack/sdk';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

import { apiConfiguration } from '../../config';
import { MediaCard } from './MediaCard';

const dishesApi = new DishesApi(apiConfiguration);

interface MediaCardGridProps {
  orderingEnabled: boolean;
}

const MediaCardsGrid = ({ orderingEnabled }: MediaCardGridProps) => {
  const [dishes, setDishes] = useState<DishDto[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const dishReponse = await dishesApi.listAllDishes();
        setDishes(dishReponse.data);
      } catch (error) {
        setDishes([]);
      }
    }

    fetchData();
  }, []);

  const cardsGrid = dishes.map((dish) => {
    return (
      <Grid item key={dish.id}>
        <MediaCard dish={dish} orderingEnabled={orderingEnabled} />
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
