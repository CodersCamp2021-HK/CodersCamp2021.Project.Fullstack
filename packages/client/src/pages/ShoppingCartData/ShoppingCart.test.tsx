import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ShoppingCartData } from './ShoppingCartData';

describe('<ShoppingCart />', () => {
  it('should show address text', async () => {
    // Given
    render(
      <MemoryRouter>
        <ShoppingCartData />
      </MemoryRouter>,
    );

    // Then
    expect(await screen.findByText('Adres dostawy')).toBeInTheDocument();
  });
});
