import { render, screen } from '@testing-library/react';
import App from './App';

test('renders example text', () => {
  render(<App />);
  const element = screen.getByText(/Example/i);
  expect(element).toBeInTheDocument();
});
