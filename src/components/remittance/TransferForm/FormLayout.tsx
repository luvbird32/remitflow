
import { ReactNode } from 'react'

interface FormLayoutProps {
  children: ReactNode
  onSubmit: (e: React.FormEvent) => void
}

export function FormLayout({ children, onSubmit }: FormLayoutProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {children}
    </form>
  )
}
