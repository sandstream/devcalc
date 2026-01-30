import { useState, useMemo, useRef, useEffect } from 'react'
import './App.css'
import { evaluate, CalculatorError } from './utils/calculator'
import type { CalculatorResult } from './utils/calculator'
import { useDebounce } from './hooks/useDebounce'
import { ResultsDisplay } from './components/ResultsDisplay'

function App() {
  const [expression, setExpression] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedExpression = useDebounce(expression, 150)

  const { result, error } = useMemo((): { result: CalculatorResult | null; error: string | null } => {
    if (!debouncedExpression.trim()) return { result: null, error: null }
    try {
      return { result: evaluate(debouncedExpression), error: null }
    } catch (e) {
      if (e instanceof CalculatorError) {
        return { result: null, error: e.message }
      }
      return { result: null, error: 'Invalid expression' }
    }
  }, [debouncedExpression])

  const hasError = debouncedExpression.trim() !== '' && error !== null

  const handleClear = () => {
    setExpression('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleClear()
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-[var(--text-primary)]">DevCalc</h1>
      <div className="relative w-full max-w-xl">
        <input
          ref={inputRef}
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter expression..."
          autoFocus
          className={`w-full px-4 py-3 pr-10 text-xl font-mono bg-[var(--bg-secondary)] text-[var(--text-primary)] border rounded-lg focus:outline-none ${
            hasError
              ? 'border-red-500 focus:border-red-500'
              : 'border-[var(--text-secondary)] focus:border-[var(--accent)]'
          }`}
          data-testid="calc-input"
        />
        {expression && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            data-testid="clear-button"
            aria-label="Clear input"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
      {hasError && (
        <div className="mt-2 w-full max-w-xl text-red-500 text-sm" data-testid="error-message">
          {error}
        </div>
      )}
      {result && <ResultsDisplay result={result} />}
    </div>
  )
}

export default App
