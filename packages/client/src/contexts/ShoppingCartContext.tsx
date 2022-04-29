import { DishDto, OrderDishDto } from '@fullstack/sdk';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type SubOrderDish = Omit<OrderDishDto, 'dishId'> & { dish: DishDto };
interface SubOrder {
  deliveryDate: Date;
  dishes: SubOrderDish[];
}

const ShoppingCartContext = createContext<{
  cart: SubOrder[];
  addToCart: (dish: DishDto, count: number, deliveryDate: Date) => void;
}>({
  cart: [],
  addToCart: () => {},
});

const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cart, setCart] = useState<SubOrder[]>([]);

  const addToCart = useCallback((dish: DishDto, count: number, deliveryDate: Date) => {
    // eslint-disable-next-line no-console
    console.log({ dish, count, deliveryDate });
  }, []);

  const value = useMemo(() => ({ cart, addToCart }), [cart, addToCart]);

  return <ShoppingCartContext.Provider value={value}>{children}</ShoppingCartContext.Provider>;
};

const useShoppingCart = () => useContext(ShoppingCartContext);

export { ShoppingCartProvider, useShoppingCart };
export type { SubOrder, SubOrderDish };
