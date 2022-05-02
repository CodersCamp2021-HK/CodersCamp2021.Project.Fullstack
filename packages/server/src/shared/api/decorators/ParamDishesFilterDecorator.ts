import { CuisineTypes, OperationalCities } from '../../../restaurants/database';
import { DishTags, MealType } from '../../../restaurants/dishes/database';
import { QueryFilters } from './QueryFiltersDecorator';

const ParamDishesFilter = () =>
  QueryFilters([
    { name: 'city', required: false, enum: OperationalCities, enumName: 'OperationalCityEnum' },
    { name: 'cuisineType', required: false, enum: CuisineTypes, enumName: 'CuisineTypeEnum', isArray: true },
    { name: 'mealType', required: false, enum: MealType, enumName: 'MealTypeEnum', isArray: true },
    { name: 'tags', required: false, enum: DishTags, enumName: 'DishTagEnum', isArray: true },
  ]);

export { ParamDishesFilter };
