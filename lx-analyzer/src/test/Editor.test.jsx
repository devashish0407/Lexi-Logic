import { render } from '@testing-library/react';
import CodeEditor from '../components/Editor';
import { describe, it, vi } from 'vitest';

describe('CodeEditor Component', () => {
  it('renders editor without crashing', () => {
    render(
      <CodeEditor
        code="int main() {}"
        setCode={vi.fn()}
        setTokens={vi.fn()}
        setErrors={vi.fn()}
      />
    );
  });

  // You can optionally simulate editor change if needed using Monaco mock (advanced)
});
