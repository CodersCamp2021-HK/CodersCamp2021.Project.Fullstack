import { DishDto, DishesApi, DishTagsEnum, MealTypeEnum } from '@fullstack/sdk';
import { CircularProgress, Grid, Typography } from '@mui/material';
import _ from 'lodash';
import { useEffect, useState } from 'react';

import { apiConfiguration } from '../../config';
import { SingleFilterType, useFiltersContext } from '../../contexts/FiltersContext';
import { MediaCard } from './MediaCard';

const dishesApi = new DishesApi(apiConfiguration);

function enumMap(objProperty: (string | null)[], enumName: Record<string, string>) {
  return objProperty.map((item) => (item ? enumName[item] : ''));
}
type CityQueryParam = {
  cityQuery: string | null;
};
const MediaCardsGrid = ({ cityQuery }: CityQueryParam) => {
  const [dishes, setDishes] = useState<DishDto[]>([]);
  const { filters } = useFiltersContext();

  useEffect(() => {
    const filtersGrouped: { [x: string]: (string | null)[] } = _.mapValues(
      _.groupBy(filters, 'name'),
      (flist: SingleFilterType[]) => flist.map((filter) => filter.value),
    );

    const params = {
      ...(filtersGrouped?.mealType && { mealType: enumMap(filtersGrouped.mealType, MealTypeEnum) }),
      ...(filtersGrouped?.tags && { tags: enumMap(filtersGrouped.tags, DishTagsEnum) }),
      ...(cityQuery ? { city: cityQuery } : ''),
    };

    const fetchData = async () => {
      const dishResponse = await dishesApi.listAllDishes(params);
      setDishes(dishResponse.data);
    };
    // eslint-disable-next-line no-console
    fetchData().catch(console.error);
  }, [filters, cityQuery]);

  const cardsGrid = dishes.map((dish) => {
    return (
      <Grid item key={dish.id}>
        <MediaCard dish={dish} />
      </Grid>
    );
  });

  if (cardsGrid.length === 0 && filters.length === 0 && cityQuery?.length === 0) {
    return (
      <Grid
        container
        spacing={2}
        pt={6}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </Grid>
    );
  }
  if (cardsGrid.length === 0 && (filters.length > 0 || cityQuery)) {
    return (
      <Grid container spacing={2} pt={6}>
        <Typography variant='h5' pt={5}>
          Wyszukiwanie nie spełnia warunków
        </Typography>
      </Grid>
    );
  }
  if (cityQuery === '' || cityQuery === null) {
    return (
      <Grid container spacing={2} pt={6}>
        <Typography variant='h5' pt={5}>
          Przepraszamy, nie ma opcji zamawiania z wielu miast
        </Typography>
      </Grid>
    );
  }
  return (
    <Grid container spacing={2} pt={6}>
      {cardsGrid}
    </Grid>
  );
};

export { MediaCardsGrid };
