import { DishDto, DishesApi, DishTagsEnum, MealTypeEnum } from '@fullstack/sdk';
// import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { _ } from 'lodash';
import { useEffect, useState } from 'react';

import { apiConfiguration } from '../../config';
import { useFiltersContext } from '../../contexts/FiltersContext';
import { MediaCard } from './MediaCard';

const dishesApi = new DishesApi(apiConfiguration);

// const NoCards = () => {
//   return <Stack>Niestety wyszukiwanie nie spełnia warunków</Stack>;
// };

const MediaCardsGrid = () => {
  const [dishes, setDishes] = useState<DishDto[]>([]);
  const { filters } = useFiltersContext();

  function enumMap(objProperty: [], enumName: MealTypeEnum | DishTagsEnum) {
    return objProperty?.map((item) => enumName[item]);
  }

  useEffect(() => {
    const filtersGrouped = _.mapValues(_.groupBy(filters, 'name'), (flist) => flist.map((filter) => filter.value));
    const params = {
      ...(filtersGrouped?.mealType && { mealType: enumMap(filtersGrouped.mealType, MealTypeEnum) }),
      ...(filtersGrouped?.tags && { tags: enumMap(filtersGrouped.tags, DishTagsEnum) }),
    };
    const fetchData = async () => {
      try {
        const dishResponse = await dishesApi.listAllDishes(params);
        setDishes(dishResponse.data);
      } catch (error) {
        setDishes([]);
      }
    };
    fetchData();
  }, [filters]);

  const cardsGrid = dishes.map((dish) => {
    return (
      <Grid item key={dish.id}>
        <MediaCard dish={dish} />
      </Grid>
    );
  });

  // console.log(dishes.length);

  return (
    <Grid container spacing={2} pt={6}>
      {cardsGrid}
    </Grid>
  );
};

export { MediaCardsGrid };
