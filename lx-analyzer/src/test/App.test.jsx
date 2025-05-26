import { render, screen } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, beforeEach } from 'vitest';

describe('App Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  it('renders Lexi Logic title', () => {
    const titleElement = screen.getByText(/Lexi Logic/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders Editor and TokenDisplay components', () => {
    // Check Tokens header once, since only one "Tokens" text exists
    const tokensElements = screen.getAllByText(/Tokens/i);
    expect(tokensElements.length).toBeGreaterThan(0);  // or expect it to equal a specific number


    // Check Editor container by test id
    const editorContainer = screen.getByTestId('code-editor');
    expect(editorContainer).toBeInTheDocument();
  });
});
