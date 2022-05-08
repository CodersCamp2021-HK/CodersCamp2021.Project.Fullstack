import { Button, Container, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { BasicSelect, Filters, MediaCardsGrid } from '../../components';
import { CartSummary } from '../../components/CartSummary';
import { routes } from '../../config/routes';
import { FiltersContext } from '../../contexts/FiltersContext';

const sortObj = {
  priceAsc: 'wg. ceny rosnąco',
  kcalAsc: 'wg. kaloryczności rosnąco',
};

const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

const Main = () => {
  const query = useQuery();

  return (
    <Container maxWidth={false}>
      <FiltersContext>
        <Stack mt={6}>
          <Typography variant='h3'>
            Wyszukujesz dania dla:
            <Typography color='primary' variant='h3' sx={{ fontWeight: 'bold', marginLeft: 2 }} component='span'>
              {query.get('city') ? query.get('city') : 'wszystkich miast'}
            </Typography>
            {!query.get('city') ? (
              <Button href={routes.home} sx={{ height: 'auto', marginLeft: 2 }} variant='contained' color='secondary'>
                Wyszukaj ponownie
              </Button>
            ) : (
              ''
            )}
          </Typography>
        </Stack>
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
            <Filters />
          </Stack>
          <MediaCardsGrid cityQuery={query.get('city') ? query.get('city') : ''} />
          <CartSummary />
        </Stack>
      </FiltersContext>
    </Container>
  );
};

export { Main };
