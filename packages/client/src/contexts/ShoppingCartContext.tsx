import { DishDto, OrderDishDto } from '@fullstack/sdk';
import produce from 'immer';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

type SubOrderDish = Omit<OrderDishDto, 'dishId'> & { dish: DishDto };

interface SubOrder {
  deliveryDate: Date;
  dishes: SubOrderDish[];
}

const orderDishKey = (orderDish: SubOrderDish) =>
  `${orderDish.dish.id}:${JSON.stringify(orderDish.excludedIngredients ?? [])}"`;

const getDayDishes = (draft: SubOrder[], date: Date | null) =>
  draft.find(({ deliveryDate }) => deliveryDate === date)?.dishes;

const getTargetDish = (dayDishes: SubOrderDish[], suborderDish: SubOrderDish) => {
  const idx = dayDishes.findIndex((foundDish) => orderDishKey(foundDish) === orderDishKey(suborderDish));
  return [idx, idx === -1 ? undefined : dayDishes[idx]] as const;
};

const ShoppingCartContext = createContext({
  cart: [] as SubOrder[],
  addToCart: (() => {}) as (suborderDish: SubOrderDish, date?: Date | null) => void,
  selectedDate: null as Date | null,
  setSelectedDate: (() => {}) as (date: Date | null) => void,
  modifyDishCount: (() => {}) as (suborderDish: SubOrderDish, date: Date, modifier: (prev: number) => number) => void,
  removeFromCart: (() => {}) as (suborderDish: SubOrderDish, date: Date) => void,
  editInCart: (() => {}) as (oldSuborderDish: SubOrderDish, newSuborderDish: SubOrderDish, date: Date) => void,
  clearCart: () => {},
});

const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<SubOrder[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const addToCart = useCallback(
    (suborderDish: SubOrderDish, date: Date | null = selectedDate) =>
      setCart(
        produce((draft) => {
          const dayDishes = getDayDishes(draft, date);
          if (!dayDishes) {
            draft.push({ deliveryDate: date as Date, dishes: [suborderDish] });
            return;
          }

          const [, duplicateDish] = getTargetDish(dayDishes, suborderDish);
          if (duplicateDish) {
            duplicateDish.count += suborderDish.count;
          } else {
            dayDishes.push(suborderDish);
          }
        }),
      ),
    [selectedDate],
  );

  const modifyDishCount = useCallback(
    (suborderDish: SubOrderDish, date: Date, modifier: (prev: number) => number) =>
      setCart(
        produce((draft) => {
          const dayDishes = getDayDishes(draft, date);
          if (!dayDishes) return;

          const [, targetDish] = getTargetDish(dayDishes, suborderDish);
          if (!targetDish) return;

          targetDish.count = modifier(targetDish.count ?? 1);
        }),
      ),
    [],
  );

  const removeFromCart = useCallback(
    (suborderDish: SubOrderDish, date: Date) =>
      setCart(
        produce((draft) => {
          const dayDishes = getDayDishes(draft, date);
          if (!dayDishes) return;

          const [targetIndex, targetDish] = getTargetDish(dayDishes, suborderDish);
          if (!targetDish) return;

          dayDishes.splice(targetIndex, 1);
          if (dayDishes.length === 0) {
            draft.splice(
              draft.findIndex(({ deliveryDate }) => deliveryDate === date),
              1,
            );
          }
        }),
      ),
    [],
  );

  const editInCart = useCallback(
    (oldSuborderDish: SubOrderDish, newSuborderDish: SubOrderDish, date: Date) =>
      setCart(
        produce((draft) => {
          const dayDishes = getDayDishes(draft, date);
          if (!dayDishes) return;

          const [targetIndex, targetDish] = getTargetDish(dayDishes, oldSuborderDish);
          if (!targetDish) return;

          dayDishes[targetIndex] = newSuborderDish;
        }),
      ),
    [],
  );

  const clearCart = useCallback(() => setCart([]), []);

  const value = useMemo(
    () => ({ cart, addToCart, selectedDate, setSelectedDate, modifyDishCount, removeFromCart, editInCart, clearCart }),
    [cart, addToCart, selectedDate, setSelectedDate, modifyDishCount, removeFromCart, editInCart, clearCart],
  );

  return <ShoppingCartContext.Provider value={value}>{children}</ShoppingCartContext.Provider>;
};

const useShoppingCart = () => useContext(ShoppingCartContext);

export { orderDishKey, ShoppingCartProvider, useShoppingCart };
export type { SubOrder, SubOrderDish };
