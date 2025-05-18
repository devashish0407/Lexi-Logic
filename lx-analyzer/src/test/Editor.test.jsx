import { render } from '@testing-library/react';
import CodeEditor from '../components/Editor';
import { describe, it, vi } from 'vitest';


describe('CodeEditor', () => {
  it('renders without crashing', () => {
    render(
      <CodeEditor
        code="int main() {}"
        setCode={vi.fn()}
        setTokens={vi.fn()}
        setErrors={vi.fn()}
      />
    );
  });
});