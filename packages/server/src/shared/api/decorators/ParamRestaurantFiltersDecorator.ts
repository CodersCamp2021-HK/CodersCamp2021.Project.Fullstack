import { CuisineTypes, RestaurantTags } from '../../../restaurants/database';
import { QueryFilters } from './QueryFiltersDecorator';

const ParamRestaurantsFilter = () =>
  QueryFilters([
    { name: 'city', required: false },
    { name: 'cuisineType', required: false, enum: CuisineTypes, enumName: 'CuisineTypeEnum', isArray: true },
    { name: 'tags', required: false, enum: RestaurantTags, enumName: 'RestaurantTagEnum', isArray: true },
  ]);

export { ParamRestaurantsFilter };
