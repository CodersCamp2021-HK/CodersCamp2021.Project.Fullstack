import { DishDto, OrderDishDto, UserDto } from '@fullstack/sdk';
import produce from 'immer';
import { isEqual } from 'lodash';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

type SubOrderDish = Omit<OrderDishDto, 'dishId'> & { dish: DishDto };
type UserData = Omit<UserDto, 'id' | 'card'>;
interface SubOrder {
  deliveryDate: Date;
  dishes: SubOrderDish[];
}

const ShoppingCartContext = createContext<{
  cart: SubOrder[];
  addToCart: (suborderDish: SubOrderDish) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
}>({
  cart: [],
  addToCart: () => {},
  selectedDate: null,
  setSelectedDate: () => {},
  userData: {},
  setUserData: () => {},
});

const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<SubOrder[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

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
            duplicateDish.count += suborderDish.count;
            return;
          }

          suborder.dishes.push(suborderDish);
        }),
      ),
    [selectedDate],
  );

  const value = useMemo(
    () => ({ cart, addToCart, selectedDate, setSelectedDate, userData, setUserData }),
    [cart, addToCart, selectedDate, setSelectedDate, userData, setUserData],
  );

  return <ShoppingCartContext.Provider value={value}>{children}</ShoppingCartContext.Provider>;
};

const useShoppingCart = () => useContext(ShoppingCartContext);

export { ShoppingCartProvider, useShoppingCart };
export type { SubOrder, SubOrderDish };
