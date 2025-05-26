import { cKeywords, operators, symbols } from './keywords.js'

export function analyzeCode(code) {
  // Remove comments first
  const withoutComments = code
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//gm, '')

  const lines = withoutComments.split('\n')
  const tokens = []
  const errors = []

 const tokenRegex = /"([^"\\]|\\.)*"|\b[_a-zA-Z][_a-zA-Z0-9]*\b|[0-9]+|(\+\+|--|==|!=|>=|<=|>>|<<)|[+\-*/%=&|^~<>!;.,{}()[\]]/g


  lines.forEach((line, lineNum) => {
    const matches = [...line.matchAll(tokenRegex)]
    let lastIndex = 0

    matches.forEach(match => {
      const value = match[0]
      const index = match.index

      // Handle unrecognized characters before the token
      if (index > lastIndex) {
        const unknown = line.slice(lastIndex, index).trim()
        if (unknown.length > 0) {
          errors.push(`Unrecognized token "${unknown}" on line ${lineNum + 1}`)
          tokens.push({ type: 'invalid', value: unknown, line: lineNum + 1 })
        }
      }

      let type = 'identifier'

      if (value.startsWith('"') && value.endsWith('"')) {
        type = 'string_literal'
      } else if (cKeywords.includes(value)) {
        type = 'keyword'
      } else if (!isNaN(value)) {
        type = 'number'
      } else if (operators.includes(value)) {
        type = 'operator'
      } else if (symbols.includes(value)) {
        type = 'symbol'
      } else if (/^[_a-zA-Z][_a-zA-Z0-9]*$/.test(value)) {
        type = 'identifier'
      } else {
        type = 'invalid'
        errors.push(`Unrecognized token "${value}" on line ${lineNum + 1}`)
      }

      tokens.push({ type, value, line: lineNum + 1 })
      lastIndex = index + value.length
    })

    // Check for any unknown trailing characters after last token
    if (lastIndex < line.length) {
      const unknown = line.slice(lastIndex).trim()
      if (unknown.length > 0) {
        errors.push(`Unrecognized token "${unknown}" on line ${lineNum + 1}`)
        tokens.push({ type: 'invalid', value: unknown, line: lineNum + 1 })
      }
    }
  })

  // Check unclosed string literal in entire code (after removing comments)
  const totalQuotes = (withoutComments.match(/"/g) || []).length
  if (totalQuotes % 2 !== 0) {
    errors.push(`Unclosed string literal in code`)
  }

  // Debug: log errors to see what's going wrong
  console.log('Errors:', errors)

  return { tokens, errors }
}
