import { cKeywords, operators, symbols } from './keywords.js'

// Levenshtein Distance to detect near-miss keywords
function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) =>
    Array(b.length + 1).fill(0)
  )

  for (let i = 0; i <= a.length; i++) dp[i][0] = i
  for (let j = 0; j <= b.length; j++) dp[0][j] = j

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
      }
    }
  }

  return dp[a.length][b.length]
}

export function analyzeCode(code) {
  // Remove comments
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
        // Identifier — check for near-miss keywords
        const closeKeyword = cKeywords.find(
          kw => levenshtein(value.toLowerCase(), kw) === 1
        )

        if (closeKeyword) {
          type = 'invalid'
          errors.push(
            `Possible misspelled keyword "${value}" on line ${lineNum + 1} — did you mean "${closeKeyword}"?`
          )
        } else {
          type = 'identifier'
        }
      } else {
        type = 'invalid'
        errors.push(`Unrecognized token "${value}" on line ${lineNum + 1}`)
      }

      tokens.push({ type, value, line: lineNum + 1 })
      lastIndex = index + value.length
    })

    if (lastIndex < line.length) {
      const unknown = line.slice(lastIndex).trim()
      if (unknown.length > 0) {
        errors.push(`Unrecognized token "${unknown}" on line ${lineNum + 1}`)
        tokens.push({ type: 'invalid', value: unknown, line: lineNum + 1 })
      }
    }
  })

  const totalQuotes = (withoutComments.match(/"/g) || []).length
  if (totalQuotes % 2 !== 0) {
    errors.push(`Unclosed string literal in code`)
  }

  console.log('Errors:', errors)

  return { tokens, errors }
}
