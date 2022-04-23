import { render, screen } from '@testing-library/react';

import { App } from './main';

describe('<App />', () => {
  it('should render Home page at launch', async () => {
    // Given
    render(<App />);

    // Then
    expect(await screen.findByText('Wybieraj dania z najlepszych restauracji')).toBeInTheDocument();
  });
});
