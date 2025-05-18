import { render, screen } from '@testing-library/react';
import TokenDisplay from '../components/TokenDisplay';
import { describe, it } from 'vitest';

const mockTokens = [
  { line: 1, column: 0, type: 'keyword', value: 'int' },
  { line: 1, column: 4, type: 'identifier', value: 'main' }
];

describe('TokenDisplay', () => {
  it('renders no tokens when array is empty', () => {
    render(<TokenDisplay tokens={[]} />);
    expect(screen.getByText(/no tokens to display/i)).toBeTruthy();
  });

  it('renders tokens when provided', () => {
    render(<TokenDisplay tokens={mockTokens} />);
    expect(screen.getByText(/int/i)).toBeTruthy();
    expect(screen.getByText(/main/i)).toBeTruthy();
  });
});