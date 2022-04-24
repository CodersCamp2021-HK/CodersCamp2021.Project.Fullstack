import Container from '@mui/material/Container';

import { AppNavBar, MediaCardsGrid } from '../components';
import { CartSummary } from '../components/CartSummary';

const Main = () => (
  <>
    <AppNavBar />
    <Container maxWidth='xl' sx={{ display: 'flex' }}>
      <MediaCardsGrid />
      <CartSummary />
    </Container>
  </>
);

export { Main };
