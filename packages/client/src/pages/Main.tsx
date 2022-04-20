import { AppNavBar, MediaCard } from '../components';

const Main = () => (
  <>
    <AppNavBar />
    <MediaCard
      name='Bowl japoński'
      content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
      img={{ url: '', alt: '' }}
      price={32}
    />
  </>
);

export { Main };
