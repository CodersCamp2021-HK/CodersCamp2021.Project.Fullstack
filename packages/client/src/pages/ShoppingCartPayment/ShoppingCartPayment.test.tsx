import { render, screen } from '@testing-library/react';

import { ShoppingCartPayment } from './ShoppingCartPayment';

describe('<ShoppingCart />', () => {
  it('should show address text', async () => {
    // Given
    render(<ShoppingCartPayment />);

    // Then
    expect(await screen.findByText('Uwagi do zamówienia')).toBeInTheDocument();
  });
});
