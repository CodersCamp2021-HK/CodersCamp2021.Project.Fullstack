import { Stack } from '@mui/material';

import step1 from '../../assets/steps/1.svg';
import step2 from '../../assets/steps/2.svg';
import step3 from '../../assets/steps/3.svg';
import { HomeStep } from './HomeStep';

const HomeSteps = () => (
  <Stack id='steps' p={{ xs: 4, s: 8, md: 16 }} spacing={8}>
    <HomeStep number={1} title='Wpisz swoje miasto' img={step1}>
      Wyszukaj swoje miasto powyżej. Obsługujemy aż 18 miast w Polsce! Na pewno znajdziesz restaurację z dowozem w
      Twojej okolicy.
    </HomeStep>
    <HomeStep flipped number={2} title='Ustal menu i&nbsp;wartości odżywcze' img={step2}>
      Znajdź pyszne danie i dodaj do koszyka. Przy każdym posiłku podajemy wartości odżywcze, więc bez problemów
      znajdziesz danie pasujące idealnie do Twojej diety. Z nami odbędziesz podróż po kuchniach świata nie ruszając się
      z domu.
    </HomeStep>
    <HomeStep number={3} title='Zapłać i&nbsp;czekaj na dostawę' img={step3}>
      Zapłać za swoje dania wygodnie online. Nasz kurier przywiezie posiłki pod Twoje drzwi w wybranych przez Ciebie
      godzinach. Smacznego!
    </HomeStep>
  </Stack>
);

export { HomeSteps };
