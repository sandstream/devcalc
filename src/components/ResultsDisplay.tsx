import { useEffect, useState } from 'react'
import type { CalculatorResult } from '../utils/calculator'

interface ResultsDisplayProps {
  result: CalculatorResult
}

interface BaseDisplayProps {
  label: string
  value: string
  testId: string
  animate: boolean
}

function BaseDisplay({ label, value, testId, animate }: BaseDisplayProps) {
  return (
    <div
      className={`flex justify-between px-4 py-3 bg-[var(--bg-secondary)] rounded-lg transition-all duration-200 ${
        animate ? 'scale-[1.02] opacity-90' : 'scale-100 opacity-100'
      }`}
    >
      <span className="text-[var(--text-secondary)] font-medium">{label}</span>
      <span className="font-mono text-[var(--text-primary)]" data-testid={testId}>
        {value}
      </span>
    </div>
  )
}

export function ResultsDisplay({ result }: ResultsDisplayProps) {
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
      />
      <BaseDisplay
        label="HEX"
        value={result.hex}
        testId="result-hex"
        animate={animate}
      />
      <BaseDisplay
        label="BIN"
        value={result.binary}
        testId="result-bin"
        animate={animate}
      />
      <BaseDisplay
        label="OCT"
        value={result.octal}
        testId="result-oct"
        animate={animate}
      />
    </div>
  )
}
