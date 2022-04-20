import { SubOrderDto } from '@fullstack/sdk';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type SubOrder = Omit<SubOrderDto, 'hourStart' | 'hourEnd'>;

const ShoppingCartContext = createContext({
  cart: [] as SubOrder[],
});

const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<SubOrder[]>([]);

  const addDayToCart = useCallback((subOrder: SubOrder) => setCart((existing) => [...existing, subOrder]), []);

  const value = useMemo(() => ({ cart, addDayToCart }), [cart, addDayToCart]);

  return <ShoppingCartContext.Provider value={value}>{children}</ShoppingCartContext.Provider>;
};

const useShoppingCart = () => useContext(ShoppingCartContext);

export { ShoppingCartProvider, useShoppingCart };
