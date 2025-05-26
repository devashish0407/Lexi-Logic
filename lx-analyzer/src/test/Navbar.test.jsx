import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { describe, it } from 'vitest';

describe('Navbar Component', () => {
  it('renders navbar title correctly', () => {
    render(<Navbar />);
    expect(screen.getByText(/Lexi Logic/i)).toBeInTheDocument();
  });
});
