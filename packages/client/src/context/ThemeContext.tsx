import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, useMemo, useState } from 'react';

import { darkTheme, defaultTheme } from '../theme';

const ThemeContext = createContext({
  toggleColorMode: () => {},
});

const ThemeContextProvider = (props: { children: JSX.Element[] | JSX.Element }) => {
  const { children } = props;
  const defaultMode = 'light';
  const ls = window.localStorage;

  if (ls.getItem('theme') == null) {
    ls.setItem('theme', defaultMode);
  }

  const [mode, setMode] = useState<null | string>(ls.getItem('theme'));

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        if (ls.getItem('theme') === defaultMode) {
          ls.setItem('theme', 'dark');
          setMode('dark');
        } else {
          ls.setItem('theme', defaultMode);
          setMode(defaultMode);
        }
      },
    }),
    [ls],
  );

  const theme = useMemo(() => createTheme(mode === 'light' ? defaultTheme : { ...defaultTheme, ...darkTheme }), [mode]);

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
