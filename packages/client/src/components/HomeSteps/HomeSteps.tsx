import { Stack } from '@mui/material';

import step1 from '../assets/steps/1.svg';
import step2 from '../assets/steps/2.svg';
import step3 from '../assets/steps/3.svg';
import { HomeStep } from './HomeStep';

const HomeSteps = () => (
  <Stack id='steps' p={{ xs: 4, s: 8, md: 16 }} spacing={8}>
    <HomeStep number={1} title='Wpisz swoje miasto' img={step1}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non aliquet nunc. In hac habitasse platea dictumst.
      Pellentesque rutrum venenatis velit at maximus. Vestibulum cursus massa vel justo facilisis, vel facilisis metus
      pharetra. Aliquam laoreet elit dolor, ac interdum est aliquet quis.
    </HomeStep>
    <HomeStep flipped number={2} title='Ustal menu i&nbsp;wartości odżywcze' img={step2}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non aliquet nunc. In hac habitasse platea dictumst.
      Pellentesque rutrum venenatis velit at maximus. Vestibulum cursus massa vel justo facilisis, vel facilisis metus
      pharetra. Aliquam laoreet elit dolor, ac interdum est aliquet quis.
    </HomeStep>
    <HomeStep number={3} title='Zapłać i&nbsp;czekaj na dostawę' img={step3}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non aliquet nunc. In hac habitasse platea dictumst.
      Pellentesque rutrum venenatis velit at maximus. Vestibulum cursus massa vel justo facilisis, vel facilisis metus
      pharetra. Aliquam laoreet elit dolor, ac interdum est aliquet quis.
    </HomeStep>
  </Stack>
);

export { HomeSteps };
