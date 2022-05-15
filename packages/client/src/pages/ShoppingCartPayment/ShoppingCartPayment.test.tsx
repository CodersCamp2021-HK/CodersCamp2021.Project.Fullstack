import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ShoppingCartPayment } from './ShoppingCartPayment';

describe('<ShoppingCart />', () => {
  it('should show address text', async () => {
    // Given
    render(
      <MemoryRouter>
        <ShoppingCartPayment />
      </MemoryRouter>,
    );

    // Then
    expect(await screen.findByText('Uwagi do zamówienia')).toBeInTheDocument();
  });
});
