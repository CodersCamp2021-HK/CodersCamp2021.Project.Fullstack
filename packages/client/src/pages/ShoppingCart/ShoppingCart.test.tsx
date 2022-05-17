import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ShoppingCart } from './ShoppingCart';

describe('<ShoppingCart />', () => {
  it('should show price summary to user', async () => {
    // Given
    render(
      <MemoryRouter>
        <ShoppingCart />
      </MemoryRouter>,
    );

    // Then
    expect(await screen.findByText('Do zapłaty')).toBeInTheDocument();
  });
});
