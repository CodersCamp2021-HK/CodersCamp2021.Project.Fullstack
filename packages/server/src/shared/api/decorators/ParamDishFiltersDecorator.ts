import { DishTags, MealType } from '../../../restaurants/dishes/database';
import { QueryFilters } from './QueryFiltersDecorator';

const ParamDishFilters = () =>
  QueryFilters([
    { name: 'city', required: false },
    { name: 'mealType', required: false, enum: MealType, enumName: 'MealTypeEnum', isArray: true },
    { name: 'tags', required: false, enum: DishTags, enumName: 'DishTagEnum', isArray: true },
  ]);

export { ParamDishFilters };
