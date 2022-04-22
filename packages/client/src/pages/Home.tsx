import { AppNavBar, Filters, Footer, Hero } from '../components';
import { HomeSteps } from '../components/HomeSteps';

const Home = () => (
  <>
    <AppNavBar />
    <Hero />
    <Filters />
    <HomeSteps />
    <Footer />
  </>
);

export { Home };
