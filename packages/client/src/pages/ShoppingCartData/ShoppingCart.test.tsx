import { render, screen } from '@testing-library/react';

import { ShoppingCartData } from './ShoppingCartData';

describe('<ShoppingCart />', () => {
  it('should show address text', async () => {
    // Given
    render(<ShoppingCartData />);

    // Then
    expect(await screen.findByText('Adres dostawy')).toBeInTheDocument();
  });
});
