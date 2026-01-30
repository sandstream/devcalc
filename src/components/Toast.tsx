import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  isVisible: boolean
  onHide: () => void
}

export function Toast({ message, isVisible, onHide }: ToastProps) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
      const timer = setTimeout(() => {
        onHide()
      }, 1500)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onHide])

  if (!shouldRender) return null

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-[var(--accent)] text-white font-medium rounded-lg shadow-lg transition-all duration-200 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
      data-testid="toast"
    >
      {message}
    </div>
  )
}
