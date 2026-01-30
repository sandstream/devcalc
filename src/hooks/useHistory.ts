import { useState, useCallback, useRef } from 'react'

const MAX_HISTORY_SIZE = 50
const STORAGE_KEY = 'devcalc-history'

function loadHistory(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveHistory(history: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  } catch {
    // Ignore storage errors
  }
}

export function useHistory() {
  const [history, setHistory] = useState<string[]>(loadHistory)
  const [historyIndex, setHistoryIndex] = useState(-1)
  const tempExpression = useRef<string>('')

  const addToHistory = useCallback((expression: string) => {
    const trimmed = expression.trim()
    if (!trimmed) return

    setHistory((prev) => {
      // Don't add duplicates of the most recent entry
      if (prev.length > 0 && prev[0] === trimmed) {
        return prev
      }
      const newHistory = [trimmed, ...prev].slice(0, MAX_HISTORY_SIZE)
      saveHistory(newHistory)
      return newHistory
    })
    setHistoryIndex(-1)
    tempExpression.current = ''
  }, [])

  const navigateHistory = useCallback(
    (direction: 'up' | 'down', currentExpression: string): string | null => {
      if (history.length === 0) return null

      let newIndex: number

      if (direction === 'up') {
        if (historyIndex === -1) {
          // Save current expression before navigating into history
          tempExpression.current = currentExpression
          newIndex = 0
        } else if (historyIndex < history.length - 1) {
          newIndex = historyIndex + 1
        } else {
          // Already at oldest, stay there
          return null
        }
      } else {
        // direction === 'down'
        if (historyIndex === -1) {
          // Already at current, nothing to do
          return null
        } else if (historyIndex === 0) {
          // Return to current expression
          setHistoryIndex(-1)
          return tempExpression.current
        } else {
          newIndex = historyIndex - 1
        }
      }

      setHistoryIndex(newIndex)
      return history[newIndex]
    },
    [history, historyIndex]
  )

  const resetHistoryNavigation = useCallback(() => {
    setHistoryIndex(-1)
    tempExpression.current = ''
  }, [])

  return {
    history,
    addToHistory,
    navigateHistory,
    resetHistoryNavigation,
    historyIndex,
  }
}
