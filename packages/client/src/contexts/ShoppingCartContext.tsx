import { DishDto, OrderDishDto } from '@fullstack/sdk';
import produce from 'immer';
import { isEqual } from 'lodash';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

type SubOrderDish = Omit<OrderDishDto, 'dishId'> & { dish: DishDto };
interface SubOrder {
  deliveryDate: Date;
  dishes: SubOrderDish[];
}

const ShoppingCartContext = createContext<{
  cart: SubOrder[];
  addToCart: (suborderDish: SubOrderDish) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}>({
  cart: [],
  addToCart: () => {},
  selectedDate: null,
  setSelectedDate: () => {},
});

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

          const duplicateDish = suborder.dishes.find(
            ({ dish, excludedIngredients }) =>
              dish.id === suborderDish.dish.id && isEqual(excludedIngredients, suborderDish.excludedIngredients),
          );

          if (duplicateDish) {
            duplicateDish.count = (duplicateDish.count ?? 1) + (suborderDish.count ?? 1);
            return;
          }

          suborder.dishes.push(suborderDish);
        }),
      ),
    [selectedDate],
  );

  const value = useMemo(
    () => ({ cart, addToCart, selectedDate, setSelectedDate }),
    [cart, addToCart, selectedDate, setSelectedDate],
  );

  return <ShoppingCartContext.Provider value={value}>{children}</ShoppingCartContext.Provider>;
};

const useShoppingCart = () => useContext(ShoppingCartContext);

export { ShoppingCartProvider, useShoppingCart };
export type { SubOrder, SubOrderDish };
