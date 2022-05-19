import { RestaurantDto, RestaurantsApi } from '@fullstack/sdk';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { apiConfiguration } from '../config';

const restaurantApi = new RestaurantsApi(apiConfiguration);

const RestaurantCacheContext = createContext({
  cache: {} as Record<string, RestaurantDto | undefined>,
  addToCache: (() => {}) as (id: string) => void,
});

const RestaurantCacheProvider = ({ children }: { children: ReactNode }) => {
  const [cache, setCache] = useState({});

  const addToCache = useCallback((id: string) => {
    // Mark id as getting currently fetched, so we don't accidentaly fetch it multiple
    // types if multiple useRestaurantData hooks are called at the same time
    setCache((prev) => ({ ...prev, [id]: undefined }));

    restaurantApi.findById({ id }).then((dto) => setCache((prev) => ({ ...prev, [id]: dto })));
  }, []);

  const value = useMemo(() => ({ cache, addToCache }), [cache, addToCache]);
  return <RestaurantCacheContext.Provider value={value}>{children}</RestaurantCacheContext.Provider>;
};

const useRestaurantData = (id: string) => {
  const { cache, addToCache } = useContext(RestaurantCacheContext);

  useEffect(() => {
    if (!(id in cache)) addToCache(id);
  }, [id, cache, addToCache]);

  return cache[id];
};

export { RestaurantCacheProvider, useRestaurantData };
