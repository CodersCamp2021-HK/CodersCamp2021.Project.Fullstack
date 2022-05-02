import { createContext, useMemo, useState } from 'react';

const FiltersContextCurrent = createContext({
  createFiltersArray: () => {},
});

const FiltersContext = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  const [filters, setFilters] = useState({});

  const filtersContextValue = useMemo(
    () => ({
      createFiltersArray: (args: []) => {
        setFilters(args);
      },
    }),
    [],
  );

  return <FiltersContextCurrent.Provider value={filtersContextValue}>{children}</FiltersContextCurrent.Provider>;
};

export { FiltersContext, FiltersContextCurrent };
