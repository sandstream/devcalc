import { useEffect, useState } from 'react'
import type { CalculatorResult } from '../utils/calculator'

interface ResultsDisplayProps {
  result: CalculatorResult
  onCopy: (value: string) => void
}

interface BaseDisplayProps {
  label: string
  value: string
  testId: string
  animate: boolean
  onCopy: (value: string) => void
}

function stripPrefix(value: string): string {
  if (value === 'N/A') return value
  // Remove 0x, 0b, 0o prefixes for copying
  return value.replace(/^-?0[xbo]/, (match) => (match.startsWith('-') ? '-' : ''))
}

function BaseDisplay({ label, value, testId, animate, onCopy }: BaseDisplayProps) {
  const handleClick = () => {
    if (value !== 'N/A') {
      onCopy(stripPrefix(value))
    }
  }

  const isClickable = value !== 'N/A'

  return (
    <div
      className={`flex justify-between px-4 py-3 bg-[var(--bg-secondary)] rounded-lg transition-all duration-200 ${
        animate ? 'scale-[1.02] opacity-90' : 'scale-100 opacity-100'
      } ${isClickable ? 'cursor-pointer hover:bg-[var(--bg-secondary)]/80 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]' : ''}`}
      onClick={handleClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => e.key === 'Enter' && handleClick() : undefined}
      aria-label={isClickable ? `Copy ${label} value ${value}` : undefined}
    >
      <span className="text-[var(--text-secondary)] font-medium">{label}</span>
      <span className="font-mono text-[var(--text-primary)]" data-testid={testId}>
        {value}
      </span>
    </div>
  )
}

export function ResultsDisplay({ result, onCopy }: ResultsDisplayProps) {
  const [animate, setAnimate] = useState(false)
  const [prevResult, setPrevResult] = useState<string | null>(null)

  useEffect(() => {
    const currentResultKey = `${result.decimal}-${result.hex}-${result.binary}-${result.octal}`
    if (prevResult !== null && prevResult !== currentResultKey) {
      setAnimate(true)
      const timer = setTimeout(() => setAnimate(false), 150)
      return () => clearTimeout(timer)
    }
    setPrevResult(currentResultKey)
  }, [result, prevResult])

  return (
    <div
      className="mt-6 w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-2"
      data-testid="calc-results"
    >
      <BaseDisplay
        label="DEC"
        value={result.decimal}
        testId="result-dec"
        animate={animate}
        onCopy={onCopy}
      />
      <BaseDisplay
        label="HEX"
        value={result.hex}
        testId="result-hex"
        animate={animate}
        onCopy={onCopy}
      />
      <BaseDisplay
        label="BIN"
        value={result.binary}
        testId="result-bin"
        animate={animate}
        onCopy={onCopy}
      />
      <BaseDisplay
        label="OCT"
        value={result.octal}
        testId="result-oct"
        animate={animate}
        onCopy={onCopy}
      />
    </div>
  )
}
