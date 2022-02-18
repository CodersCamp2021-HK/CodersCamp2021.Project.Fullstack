import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { App } from './App';

const fetchMock = jest.fn();
window.fetch = fetchMock;

describe('<App/>', () => {
  it('should', async () => {
    fetchMock.mockResolvedValueOnce({
      status: 200,
      ok: true,
      json: async () => ({ data: [{ id: '123' }, { id: '135' }], pages: 12 }),
    });

    // Given
    render(<App />);

    // Then
    expect(await screen.findByText('{"id":"123"}')).toBeInTheDocument();

    // When
    const btn = screen.getByRole(/button/i, { name: /count is: 0/i });
    userEvent.click(btn);

    // Then
    expect(screen.queryByRole(/button/i, { name: /count is: 0/i })).not.toBeInTheDocument();
    expect(screen.getByRole(/button/i, { name: /count is: 1/i })).toBeInTheDocument();
  });
});
