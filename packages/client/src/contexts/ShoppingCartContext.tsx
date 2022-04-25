import { DishDto, OrderDishDto } from '@fullstack/sdk';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type SubOrderDish = Omit<OrderDishDto, 'dishId'> & { dish: DishDto };
interface SubOrder {
  deliveryDate: Date;
  dishes: SubOrderDish[];
}

const ShoppingCartContext = createContext<{
  cart: SubOrder[];
  addDayToCart: (suborder: SubOrder) => void;
}>({
  cart: [],
  addDayToCart: () => {},
});

const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<SubOrder[]>([]);

  const addDayToCart = useCallback((suborder: SubOrder) => setCart((existingDays) => [...existingDays, suborder]), []);

  const value = useMemo(() => ({ cart, addDayToCart }), [cart, addDayToCart]);

  return <ShoppingCartContext.Provider value={value}>{children}</ShoppingCartContext.Provider>;
};

const useShoppingCart = () => useContext(ShoppingCartContext);

export { ShoppingCartProvider, useShoppingCart };
export type { SubOrder, SubOrderDish };
