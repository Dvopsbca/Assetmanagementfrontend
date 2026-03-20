import { render, screen } from '@testing-library/react';
import App from './App';

test('renders asset management heading', () => {
  render(<App />);
  const heading = screen.getByText(/Asset Management System - Frontend/i);
  expect(heading).toBeInTheDocument();
});
