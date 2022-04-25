import Container from '@mui/material/Container';
import { SetStateAction, useState } from 'react';

import { MediaCardsGrid } from '../../components';
import { CartSummary } from '../../components/CartSummary';

const Main = () => {
  const [day, setDay] = useState('');
  const handleChange = (e: SetStateAction<string>) => {
    setDay(e);
  };

  return (
    <Container maxWidth='xl' sx={{ display: 'flex' }}>
      <MediaCardsGrid />
      <CartSummary day={day} onDayChange={handleChange} />
    </Container>
  );
};

export { Main };
