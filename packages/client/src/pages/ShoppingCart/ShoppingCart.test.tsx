import { render, screen } from '@testing-library/react';

import { ShoppingCart } from './ShoppingCart';

describe('<ShoppingCart />', () => {
  it('should show price summary to user', async () => {
    // Given
    render(<ShoppingCart />);

    // Then
    expect(await screen.findByText('Do zapłaty')).toBeInTheDocument();
  });
});
