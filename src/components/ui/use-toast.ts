import { useState } from 'react'

interface Toast {
  title?: string
  description?: string
}

export function useToast() {
  const [toast, setToast] = useState<Toast | null>(null)

  const showToast = ({ title, description }: Toast) => {
    setToast({ title, description })
    setTimeout(() => setToast(null), 3000) // Hide toast after 3 seconds
  }

  return {
    toast,
    showToast,
  }
}

export { type Toast }