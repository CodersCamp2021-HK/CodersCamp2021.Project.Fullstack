import { CuisineTypes, OperationalCities, RestaurantTags } from '../../../restaurants/database';
import { QueryFilters } from './QueryFiltersDecorator';

const ParamRestaurantsFilter = () =>
  QueryFilters([
    { name: 'city', required: false, enum: OperationalCities, enumName: 'QOperationalCityEnum' },
    { name: 'cuisineType', required: false, enum: CuisineTypes, enumName: 'QCuisineTypeEnum', isArray: true },
    { name: 'tags', required: false, enum: RestaurantTags, enumName: 'QRestaurantTagEnum', isArray: true },
  ]);

export { ParamRestaurantsFilter };
