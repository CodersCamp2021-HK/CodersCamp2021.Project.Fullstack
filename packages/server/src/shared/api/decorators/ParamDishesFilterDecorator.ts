import { OperationalCities } from '../../../restaurants/database';
import { DishTags, MealType } from '../../../restaurants/dishes/database';
import { QueryFilters } from './QueryFiltersDecorator';

const ParamDishesFilter = () =>
  QueryFilters([
    { name: 'city', required: false, enum: OperationalCities, enumName: 'OperationalCityEnum' },
    { name: 'mealType', required: false, enum: MealType, enumName: 'MealTypeEnum', isArray: true },
    { name: 'tags', required: false, enum: DishTags, enumName: 'DishTagEnum', isArray: true },
  ]);

export { ParamDishesFilter };
