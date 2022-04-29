import { Stack } from '@mui/material';
import Container from '@mui/material/Container';
import { useState } from 'react';

import { BasicSelect, Filters, MediaCardsGrid } from '../../components';
import { CartSummary } from '../../components/CartSummary';

const Main = () => {
  const [day, setDay] = useState<Date | null>(null);

  const sortObj = {
    priceAsc: 'wg. ceny rosnąco',
    kcalAsc: 'wg. kaloryczności rosnąco',
  };

  return (
    <Container maxWidth={false}>
      <Stack sx={{ flex: 1 }} direction='row'>
        <Stack
          spacing={2}
          sx={{
            maxWidth: 280,
            width: '100%',
            position: 'sticky',
            top: '0',
            height: '100vh',
            overflowY: 'scroll',
            justifyContent: 'flex-start',
            pr: 1,
            pb: 6,
            mt: 6,
            mr: 4,
          }}
        >
          <BasicSelect label='Sortuj' selectObj={sortObj} />
          <Stack spacing={2}>
            <Filters />
          </Stack>
        </Stack>
        <MediaCardsGrid day={day} />
        <CartSummary day={day} onDayChange={setDay} />
      </Stack>
    </Container>
  );
};

export { Main };
