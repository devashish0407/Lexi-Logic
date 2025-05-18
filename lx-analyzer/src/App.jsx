import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Editor from './components/Editor'
import TokenDisplay from './components/TokenDisplay'

export default function App() {
  const [code, setCode] = useState('')
  const [tokens, setTokens] = useState([])

  return (
    <div className="flex flex-col w-full h-screen p-4 bg-blue-100">
      <Navbar />
      
      <div className="flex gap-4 mt-4 h-full overflow-y-auto">
        <div className="flex-1 overflow-auto h-full">
          <Editor 
            code={code} 
            setCode={setCode} 
            setTokens={setTokens} 
          />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="h-[100%] overflow-y-auto">
            <TokenDisplay tokens={tokens} />
          </div>
        </div>
      </div>
    </div>
  )
}
