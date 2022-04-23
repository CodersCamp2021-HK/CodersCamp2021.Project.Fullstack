import { DishDto, OrderDishDto } from '@fullstack/sdk';
import { get, sum } from 'lodash';

const sumDishProperty = (dishes: OrderDishDto[], dishMap: Record<string, DishDto>, path: string) => {
  return sum(dishes.map(({ dishId, count = 1 }) => (get(dishMap[dishId], path) ?? 0) * count));
};

export { sumDishProperty };
