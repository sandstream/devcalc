import { useEffect, useState } from 'react'
import type { TimestampResult } from '../utils/timestamp'

interface TimestampDisplayProps {
  timestamp: TimestampResult
}

interface TimeDisplayProps {
  label: string
  value: string
  testId: string
  animate: boolean
}

function TimeDisplay({ label, value, testId, animate }: TimeDisplayProps) {
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

export function TimestampDisplay({ timestamp }: TimestampDisplayProps) {
  const [animate, setAnimate] = useState(false)
  const [prevTimestamp, setPrevTimestamp] = useState<string | null>(null)

  useEffect(() => {
    const currentKey = `${timestamp.utc}-${timestamp.local}`
    if (prevTimestamp !== null && prevTimestamp !== currentKey) {
      setAnimate(true)
      const timer = setTimeout(() => setAnimate(false), 150)
      return () => clearTimeout(timer)
    }
    setPrevTimestamp(currentKey)
  }, [timestamp, prevTimestamp])

  if (!timestamp.isTimestamp) {
    return null
  }

  return (
    <div
      className="mt-4 w-full max-w-xl grid grid-cols-1 gap-2"
      data-testid="timestamp-results"
    >
      <TimeDisplay
        label="UTC"
        value={timestamp.utc}
        testId="result-utc"
        animate={animate}
      />
      <TimeDisplay
        label="Local"
        value={timestamp.local}
        testId="result-local"
        animate={animate}
      />
    </div>
  )
}
