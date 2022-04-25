import { render, screen } from '@testing-library/react';

import { PartnerLoginForm } from './PartnerLoginForm';
import { PartnerRegisterForm } from './PartnerRegisterForm';
import { UserLoginForm } from './UserLoginForm';
import { UserRegisterForm } from './UserRegisterForm';

describe('<PartnerLoginForm/>', () => {
  it('should render PartnerLoginForm', async () => {
    // Given
    render(<PartnerLoginForm />);

    // Then
    expect(await screen.findByText(/Witamy ponownie!/)).toBeInTheDocument();
  });
});

describe('<PartnerRegisterForm/>', () => {
  it('should render PartnerRegisterForm', async () => {
    // Given
    render(<PartnerRegisterForm />);

    // Then
    expect(await screen.findByText(/Dołącz do naszych partnerów/)).toBeInTheDocument();
  });
});

describe('<UserLoginForm/>', () => {
  it('should render UserLoginForm', async () => {
    // Given
    render(<UserLoginForm />);

    // Then
    expect(await screen.findByText(/Witamy ponownie!/)).toBeInTheDocument();
  });
});

describe('<UserRegisterForm/>', () => {
  it('should render UserRegisterForm', async () => {
    // Given
    render(<UserRegisterForm />);

    // Then
    expect(await screen.findByText(/Zarejestruj się/)).toBeInTheDocument();
  });
});
