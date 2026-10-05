import type { ButtonHTMLAttributes, ReactNode } from 'react'

const variants = {
  primary: 'bg-zinc-900 text-white hover:bg-zinc-700',
  secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200',
} as const

type ButtonVariant = keyof typeof variants

type ButtonProps = {
  children: ReactNode
  variant?: ButtonVariant
  className?: string
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>

export function Button({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  className = '',
}: ButtonProps) {
  const styles = variants[variant] ?? variants.primary

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${styles} ${className}`}
    >
      {children}
    </button>
  )
}
