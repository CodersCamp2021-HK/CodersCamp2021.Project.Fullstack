import { createContext, useCallback, useContext, useMemo, useState } from 'react';

type SingleFilterType = {
  name: string | null;
  value: string | null;
};

const FiltersContextCurrent = createContext<{
  filters: SingleFilterType[];
  overrideFilters: (args: SingleFilterType[]) => void;
}>({
  filters: [],
  overrideFilters: () => {},
});

const FiltersContext = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  const [filters, setFilters] = useState<SingleFilterType[]>([]);

  const overrideFilters = useCallback((args: SingleFilterType[]) => setFilters(args), []);

  const value = useMemo(() => ({ filters, overrideFilters }), [filters, overrideFilters]);

  return <FiltersContextCurrent.Provider value={value}>{children}</FiltersContextCurrent.Provider>;
};

const useFiltersContext = () => useContext(FiltersContextCurrent);

export { FiltersContext, useFiltersContext };
export type { SingleFilterType };
