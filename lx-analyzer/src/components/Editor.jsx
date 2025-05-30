// src/components/Editor.jsx
import React from 'react';

import Editor from '@monaco-editor/react'
import { useEffect } from 'react'
import { analyzeCode } from '../utils/lexer'
import { cKeywords } from '../utils/keywords'

export default function CodeEditor({ code, setCode, setTokens, setErrors }) {
  const handleChange = (value) => {
    setCode(value)
    const { tokens, errors } = analyzeCode(value)
    setTokens(tokens)
    setErrors(errors)
  }

  const handleEditorMount = (editor, monaco) => {
    monaco.languages.registerCompletionItemProvider('c', {
      provideCompletionItems: () => {
        const suggestions = cKeywords.map((word) => ({
          label: word,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: word,
        }))
        return { suggestions }
      },
    })
  }

  return (
    <div data-testid="code-editor" className="w-full h-full p-1  bg-gray-500">
      <Editor
        // height="100%"
        language="c"
        theme="vs-dark"
        value={code}
        onChange={handleChange}
        onMount={handleEditorMount}
      />
    </div>
  )
}
