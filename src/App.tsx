import { useState, useMemo } from 'react'
import './App.css'
import { evaluate, CalculatorError } from './utils/calculator'
import type { CalculatorResult } from './utils/calculator'

function App() {
  const [expression, setExpression] = useState('')

  const result = useMemo((): CalculatorResult | null => {
    if (!expression.trim()) return null
    try {
      return evaluate(expression)
    } catch (e) {
      if (e instanceof CalculatorError) {
        return null
      }
      return null
    }
  }, [expression])

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
      {result && (
        <div className="mt-6 w-full max-w-xl space-y-2" data-testid="calc-results">
          <div className="flex justify-between px-4 py-2 bg-[var(--bg-secondary)] rounded">
            <span className="text-[var(--text-secondary)]">DEC</span>
            <span className="font-mono text-[var(--text-primary)]" data-testid="result-dec">{result.decimal}</span>
          </div>
          <div className="flex justify-between px-4 py-2 bg-[var(--bg-secondary)] rounded">
            <span className="text-[var(--text-secondary)]">HEX</span>
            <span className="font-mono text-[var(--text-primary)]" data-testid="result-hex">{result.hex}</span>
          </div>
          <div className="flex justify-between px-4 py-2 bg-[var(--bg-secondary)] rounded">
            <span className="text-[var(--text-secondary)]">BIN</span>
            <span className="font-mono text-[var(--text-primary)]" data-testid="result-bin">{result.binary}</span>
          </div>
          <div className="flex justify-between px-4 py-2 bg-[var(--bg-secondary)] rounded">
            <span className="text-[var(--text-secondary)]">OCT</span>
            <span className="font-mono text-[var(--text-primary)]" data-testid="result-oct">{result.octal}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
