import { DishDto, DishesApi, DishTagsEnum, MealTypeEnum } from '@fullstack/sdk';
// import { Stack } from '@mui/material';
import { CircularProgress, Grid, Typography} from '@mui/material';
import { _ } from 'lodash';
import { useEffect, useState } from 'react';

import { apiConfiguration } from '../../config';
import { useFiltersContext } from '../../contexts/FiltersContext';
import { MediaCard } from './MediaCard';

const dishesApi = new DishesApi(apiConfiguration);

const MediaCardsGrid = () => {
  const [dishes, setDishes] = useState<DishDto[]>([]);
  const { filters } = useFiltersContext();

  function enumMap(objProperty: [], enumName: {}) {
    return objProperty?.map((item) => enumName[item]);
  }



  useEffect(() => {

	console.log(typeof MealTypeEnum);
    let hasChanged = true;

    const filtersGrouped = _.mapValues(_.groupBy(filters, 'name'), (flist: { name: string | null, value: string | null }[]) => flist.map((filter) => filter.value));
    const params = {
      ...(filtersGrouped?.mealType && { mealType: enumMap(filtersGrouped.mealType, MealTypeEnum) }),
      ...(filtersGrouped?.tags && { tags: enumMap(filtersGrouped.tags, DishTagsEnum) }),
    };

    const fetchData = async () => {
      const dishResponse = await dishesApi.listAllDishes(params);
      if (hasChanged) {
        setDishes(dishResponse.data);
      }
    };

    fetchData().catch(console.error);
    return () => (hasChanged = false);
  }, [filters]);

  const cardsGrid = dishes.map((dish) => {
    return (
      <Grid item key={dish.id}>
        <MediaCard dish={dish} />
      </Grid>
	  
    );
  });

  if (cardsGrid.length === 0 && filters.length === 0) {
    return (
      <Grid container spacing={2} pt={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }
  if (cardsGrid.length === 0 && filters.length > 0) {
    return (
      <Grid container spacing={2} pt={6}>
        <Typography variant='h5' pt={5}>
          wyszukiwanie nie spełnia warunków
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
