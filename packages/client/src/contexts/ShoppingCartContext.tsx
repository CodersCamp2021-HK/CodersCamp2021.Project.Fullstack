import { DishDto, OrderDishDto } from '@fullstack/sdk';
import produce from 'immer';
import { isEqual } from 'lodash';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

type SubOrderDish = Omit<OrderDishDto, 'dishId'> & { dish: DishDto };
interface SubOrder {
  deliveryDate: Date;
  dishes: SubOrderDish[];
}

const orderDishKey = (orderDish: SubOrderDish) =>
  `${orderDish.dish.id}:${JSON.stringify(orderDish.excludedIngredients ?? [])}"`;

const areDishesEqual = (suborderDish1: SubOrderDish, suborderDish2: SubOrderDish) =>
  suborderDish1.dish.id === suborderDish2.dish.id &&
  isEqual(suborderDish1.excludedIngredients, suborderDish2.excludedIngredients);

/* eslint-disable @typescript-eslint/no-unused-vars */
const ShoppingCartContext = createContext({
  cart: [] as SubOrder[],
  addToCart: (suborderDish: SubOrderDish) => {},
  selectedDate: null as Date | null,
  setSelectedDate: (date: Date | null) => {},
  modifyDishCount: (date: Date, suborderDish: SubOrderDish, modifier: (prev: number) => number) => {},
  removeFromCart: (date: Date, suborderDish: SubOrderDish) => {},
});
/* eslint-enable @typescript-eslint/no-unused-vars */

const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<SubOrder[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const addToCart = useCallback(
    (suborderDish: SubOrderDish) =>
      setCart(
        produce((draft) => {
          if (selectedDate === null) return;

          const suborder = draft.find(({ deliveryDate }) => deliveryDate === selectedDate);

          if (!suborder) {
            draft.push({ deliveryDate: selectedDate, dishes: [suborderDish] });
            return;
          }

          const duplicateDish = suborder.dishes.find((foundDish) => areDishesEqual(foundDish, suborderDish));
          if (duplicateDish) {
            duplicateDish.count = (duplicateDish.count ?? 1) + (suborderDish.count ?? 1);
            return;
          }

          suborder.dishes.push(suborderDish);
        }),
      ),
    [selectedDate],
  );

  const modifyDishCount = useCallback((date: Date, suborderDish: SubOrderDish, modifier: (prev: number) => number) => {
    setCart(
      produce((draft) => {
        const targetDish = draft
          .find(({ deliveryDate }) => deliveryDate === date)
          ?.dishes?.find((foundDish) => areDishesEqual(foundDish, suborderDish));

        if (!targetDish) return;

        targetDish.count = modifier(targetDish.count ?? 1);
      }),
    );
  }, []);

  const removeFromCart = useCallback((date: Date, suborderDish: SubOrderDish) => {
    setCart(
      produce((draft) => {
        const dayDishes = draft.find(({ deliveryDate }) => deliveryDate === date)?.dishes;
        if (!dayDishes) return;

        const targetIndex = dayDishes.findIndex((foundDish) => areDishesEqual(foundDish, suborderDish));
        if (targetIndex === -1) return;

        dayDishes.splice(targetIndex, 1);

        if (dayDishes.length === 0) {
          draft.splice(
            draft.findIndex(({ deliveryDate }) => deliveryDate === date),
            1,
          );
        }
      }),
    );
  }, []);

  const value = useMemo(
    () => ({ cart, addToCart, selectedDate, setSelectedDate, modifyDishCount, removeFromCart }),
    [cart, addToCart, selectedDate, setSelectedDate, modifyDishCount, removeFromCart],
  );

  return <ShoppingCartContext.Provider value={value}>{children}</ShoppingCartContext.Provider>;
};

const useShoppingCart = () => useContext(ShoppingCartContext);

export { orderDishKey, ShoppingCartProvider, useShoppingCart };
export type { SubOrder, SubOrderDish };
