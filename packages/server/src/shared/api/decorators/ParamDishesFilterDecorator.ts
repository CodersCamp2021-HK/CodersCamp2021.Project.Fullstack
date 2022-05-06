import { OperationalCities } from '../../../restaurants/database';
import { DishTags, MealType } from '../../../restaurants/dishes/database';
import { QueryFilters } from './QueryFiltersDecorator';

const ParamDishesFilter = () =>
  QueryFilters([
    { name: 'city', required: false, enum: OperationalCities, enumName: 'QOperationalCityEnum' },
    { name: 'mealType', required: false, enum: MealType, enumName: 'QMealTypeEnum', isArray: true },
    { name: 'tags', required: false, enum: DishTags, enumName: 'QDishTagsEnum', isArray: true },
  ]);

export { ParamDishesFilter };
