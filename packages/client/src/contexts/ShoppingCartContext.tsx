import { DishDto, OrderDishDto } from '@fullstack/sdk';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type SubOrderDish = Omit<OrderDishDto, 'dishId'> & { dish: DishDto };
interface SubOrder {
  deliveryDate: Date;
  dishes: SubOrderDish[];
}

const ShoppingCartContext = createContext<{
  cart: SubOrder[];
  addToCart: (dish: DishDto, count: number) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}>({
  cart: [],
  addToCart: () => {},
  selectedDate: null,
  setSelectedDate: () => {},
});

const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cart, setCart] = useState<SubOrder[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const addToCart = useCallback(
    (dish: DishDto, count: number) => {
      // eslint-disable-next-line no-console
      console.log({ dish, count, selectedDate });
    },
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
