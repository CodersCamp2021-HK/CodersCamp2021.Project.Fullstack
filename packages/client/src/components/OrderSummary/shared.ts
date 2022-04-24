import { get, sum } from 'lodash';

import { SubOrderDish } from '../../context';

const sumDishProperty = (dishes: SubOrderDish[], path: string) => {
  return sum(dishes.map(({ dish, count = 1 }) => (get(dish, path) ?? 0) * count));
};

export { sumDishProperty };
