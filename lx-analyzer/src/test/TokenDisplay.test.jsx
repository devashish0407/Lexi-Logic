import { render, screen, fireEvent } from '@testing-library/react';
import TokenDisplay from '../components/TokenDisplay';
import { describe, it, expect } from 'vitest';

const mockTokens = [
  { line: 1, column: 0, type: 'keyword', value: 'int' },
  { line: 1, column: 4, type: 'identifier', value: 'main' },
  { line: 2, column: 0, type: 'invalid', value: '@invalid_token' }
];

describe('TokenDisplay Component', () => {
  it('renders "No tokens to display" for empty array', () => {
    render(<TokenDisplay tokens={[]} />);
    expect(screen.getByText(/no tokens to display/i)).toBeInTheDocument();
  });

  it('renders valid tokens', () => {
    render(<TokenDisplay tokens={mockTokens} />);
    expect(screen.getByText('int')).toBeInTheDocument();
    expect(screen.getByText('main')).toBeInTheDocument();
  });

  it('renders and filters by token type', () => {
    render(<TokenDisplay tokens={mockTokens} />);
    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'keyword' } });
    expect(screen.getByText('int')).toBeInTheDocument();
    expect(screen.queryByText('main')).not.toBeInTheDocument();
  });

  it('renders invalid tokens separately', () => {
    render(<TokenDisplay tokens={mockTokens} />);
    expect(screen.getByText('@invalid_token')).toBeInTheDocument();
  });
});
