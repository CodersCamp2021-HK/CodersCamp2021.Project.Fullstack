import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const FiltersContextCurrent = createContext<{ filters: []; addFilters: (args: []) => void }>({
  filters: [],
  addFilters: () => {},
});

const FiltersContext = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  const [filters, setFilters] = useState([]);

  const addFilters = useCallback((args: []) => setFilters(args), []);

  const value = useMemo(() => ({ filters, addFilters }), [filters, addFilters]);

  return <FiltersContextCurrent.Provider value={value}>{children}</FiltersContextCurrent.Provider>;
};

const useFiltersContext = () => useContext(FiltersContextCurrent);

export { FiltersContext, useFiltersContext };
