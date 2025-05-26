import { describe, it, expect } from 'vitest'
import { analyzeCode } from '../utils/lexer'  // Adjust this path if necessary

describe('analyzeCode function', () => {
  it('should tokenize keywords, identifiers, numbers, operators, and symbols correctly', () => {
    const code = `
      int main() {
        int a = 5;
        float b = 3.14;
        if (a > b) {
          // comment here
          a = a + 1;
        }
      }
    `
    const { tokens, errors } = analyzeCode(code)

    expect(tokens.some(t => t.type === 'keyword' && t.value === 'int')).toBe(true)
    expect(tokens.some(t => t.type === 'identifier' && t.value === 'main')).toBe(true)
    expect(tokens.some(t => t.type === 'number' && t.value === '5')).toBe(true)
    expect(tokens.some(t => t.type === 'operator' && t.value === '=')).toBe(true)
    expect(errors.length).toBe(0)
  })

  it('should detect invalid tokens', () => {
    const code = `int $invalid_token = 10;`
    const { tokens, errors } = analyzeCode(code)

    expect(errors.length).toBeGreaterThan(0)
    expect(tokens.some(t => t.type === 'invalid')).toBe(true)
  })

  it('should detect unclosed string literal', () => {
    const code = `char* str = "Hello world;`
    const { tokens, errors } = analyzeCode(code)

    expect(errors.some(e => e.includes('Unclosed string literal'))).toBe(true)
  })

  it('should ignore comments', () => {
    const code = `
      // this is a comment
      int x = 10; /* block comment */
      x++;
    `
    const { tokens, errors } = analyzeCode(code)

    expect(errors.length).toBe(0)
    expect(tokens.some(t => t.value === 'int')).toBe(true)
    expect(tokens.some(t => t.value === 'x')).toBe(true)
    expect(tokens.some(t => t.value === '++')).toBe(true)
  })

  it('should detect near-miss keyword using Levenshtein logic', () => {
    const code = `innt main() { return 0; }` // 'innt' is a near-miss for 'int'
    const { tokens, errors } = analyzeCode(code)

    expect(tokens.some(t => t.value === 'innt' && t.type === 'invalid')).toBe(true)
    expect(errors.some(e => e.includes('did you mean "int"'))).toBe(true)
  })
})
