import { useState, useCallback } from 'react'

interface UseClipboardReturn {
  copied: boolean
  copyToClipboard: (text: string) => Promise<void>
  clearCopied: () => void
}

export function useClipboard(): UseClipboardReturn {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      // Fallback for older browsers or when clipboard API is unavailable
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-9999px'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
    }
  }, [])

  const clearCopied = useCallback(() => {
    setCopied(false)
  }, [])

  return { copied, copyToClipboard, clearCopied }
}
