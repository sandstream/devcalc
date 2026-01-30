import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import './App.css'
import { evaluate, CalculatorError } from './utils/calculator'
import type { CalculatorResult } from './utils/calculator'
import { useDebounce } from './hooks/useDebounce'
import { useClipboard } from './hooks/useClipboard'
import { useHistory } from './hooks/useHistory'
import { useTheme } from './hooks/useTheme'
import { ResultsDisplay } from './components/ResultsDisplay'
import { TimestampDisplay } from './components/TimestampDisplay'
import { HistoryPanel } from './components/HistoryPanel'
import { Toast } from './components/Toast'
import { ThemeToggle } from './components/ThemeToggle'
import { parseTimestamp, getCurrentTimestamp } from './utils/timestamp'

function App() {
  const [expression, setExpression] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedExpression = useDebounce(expression, 150)
  const { copied, copyToClipboard, clearCopied } = useClipboard()
  const { history, addToHistory, navigateHistory, resetHistoryNavigation, clearHistory } = useHistory()
  const { theme, toggleTheme } = useTheme()

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

  const timestampResult = useMemo(() => {
    return parseTimestamp(debouncedExpression)
  }, [debouncedExpression])

  const hasError = debouncedExpression.trim() !== '' && error !== null

  const handleClear = () => {
    setExpression('')
    inputRef.current?.focus()
  }

  const handleNow = () => {
    setExpression(getCurrentTimestamp())
    inputRef.current?.focus()
  }

  const handleCopy = useCallback((value: string) => {
    copyToClipboard(value)
  }, [copyToClipboard])

  const handleHistorySelect = useCallback((historyExpression: string) => {
    setExpression(historyExpression)
    inputRef.current?.focus()
  }, [])

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Arrow Up: Navigate to older history
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        const historyExpression = navigateHistory('up', expression)
        if (historyExpression !== null) {
          setExpression(historyExpression)
        }
        return
      }

      // Arrow Down: Navigate to newer history
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const historyExpression = navigateHistory('down', expression)
        if (historyExpression !== null) {
          setExpression(historyExpression)
        }
        return
      }

      // Enter: Add current expression to history (for explicit commit)
      if (e.key === 'Enter' && expression.trim()) {
        addToHistory(expression)
        resetHistoryNavigation()
        return
      }
    },
    [expression, navigateHistory, addToHistory, resetHistoryNavigation]
  )

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Handle Escape globally: clear input and focus it
    if (e.key === 'Escape') {
      e.preventDefault()
      handleClear()
      return
    }

    // Handle Cmd/Ctrl+C for copying primary (decimal) result
    if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
      // Only copy if there's no text selection and we have a result
      const selection = window.getSelection()
      const hasSelection = selection && selection.toString().length > 0

      if (!hasSelection && result) {
        e.preventDefault()
        copyToClipboard(result.decimal)
      }
    }
  }, [result, copyToClipboard])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <h1 className="text-3xl font-bold mb-8 text-[var(--text-primary)]">DevCalc</h1>
      <div className="relative w-full max-w-xl">
        <input
          ref={inputRef}
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Enter expression..."
          autoFocus
          className={`w-full px-4 py-3 pr-10 text-xl font-mono bg-[var(--bg-secondary)] text-[var(--text-primary)] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] ${
            hasError
              ? 'border-red-500 focus:border-red-500'
              : 'border-[var(--text-secondary)] focus:border-[var(--accent)]'
          }`}
          data-testid="calc-input"
        />
        {expression && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-secondary)] rounded"
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
      <div className="mt-2 w-full max-w-xl flex justify-end">
        <button
          onClick={handleNow}
          className="px-3 py-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)]/80 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]"
          data-testid="now-button"
        >
          Now
        </button>
      </div>
      {hasError && (
        <div className="mt-2 w-full max-w-xl text-red-500 text-sm" data-testid="error-message">
          {error}
        </div>
      )}
      {result && <ResultsDisplay result={result} onCopy={handleCopy} />}
      {timestampResult.isTimestamp && <TimestampDisplay timestamp={timestampResult} onCopy={handleCopy} />}
      <HistoryPanel history={history} onSelect={handleHistorySelect} onClear={clearHistory} />
      <Toast message="Copied!" isVisible={copied} onHide={clearCopied} />
    </div>
  )
}

export default App
