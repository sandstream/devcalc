import { useState } from 'react'
import './App.css'

function App() {
  const [expression, setExpression] = useState('')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-[var(--text-primary)]">DevCalc</h1>
      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="Enter expression..."
        autoFocus
        className="w-full max-w-xl px-4 py-3 text-xl font-mono bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--text-secondary)] rounded-lg focus:outline-none focus:border-[var(--accent)]"
        data-testid="calc-input"
      />
    </div>
  )
}

export default App
