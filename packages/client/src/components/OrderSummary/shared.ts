import { get, sum } from 'lodash';

import { SubOrderDish } from '../../contexts';

const sumDishProperty = (dishes: SubOrderDish[], path: string) => {
  return sum(dishes.map(({ dish, count }) => (get(dish, path) ?? 0) * count));
};

export { sumDishProperty };
