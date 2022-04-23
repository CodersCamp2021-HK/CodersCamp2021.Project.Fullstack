import Container from '@mui/material/Container';

import { AppNavBar, MediaCardsGrid } from '../../components';

const Main = () => (
  <>
    <AppNavBar />
    <Container maxWidth='xl'>
      <MediaCardsGrid />
    </Container>
  </>
);

export { Main };
