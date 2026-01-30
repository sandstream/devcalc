interface HistoryPanelProps {
  history: string[]
  onSelect: (expression: string) => void
  onClear: () => void
}

export function HistoryPanel({ history, onSelect, onClear }: HistoryPanelProps) {
  if (history.length === 0) {
    return (
      <div
        className="mt-6 w-full max-w-xl text-center text-[var(--text-secondary)] text-sm"
        data-testid="history-empty"
      >
        No history yet. Press Enter after a calculation to save it.
      </div>
    )
  }

  return (
    <div className="mt-6 w-full max-w-xl" data-testid="history-panel">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[var(--text-secondary)] text-sm font-medium">History</span>
        <button
          onClick={onClear}
          className="px-2 py-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-secondary)]/80 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)]"
          data-testid="history-clear-button"
        >
          Clear
        </button>
      </div>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {history.map((item, index) => (
          <button
            key={`${index}-${item}`}
            onClick={() => onSelect(item)}
            className="w-full text-left px-3 py-2 font-mono text-sm bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded hover:bg-[var(--bg-secondary)]/80 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] truncate"
            data-testid="history-item"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}
