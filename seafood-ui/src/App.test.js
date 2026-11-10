import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SeaFood Marketplace title', () => {
  render(<App />);
  const titleElements = screen.getAllByText(/SeaFood Marketplace/i);
  expect(titleElements.length).toBeGreaterThan(0);
});
