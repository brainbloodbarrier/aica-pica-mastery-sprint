import React from 'react'
import { cn } from '@/lib/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'gradient' | 'bordered'
  hoverable?: boolean
  onClick?: () => void
}

export function Card({
  children,
  className,
  variant = 'default',
  hoverable = false,
  onClick,
}: CardProps) {
  const baseStyles = 'rounded-xl p-6 transition-all duration-300'

  const variants = {
    default: 'bg-white shadow-md',
    gradient: 'bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg',
    bordered: 'bg-white border-2 border-gray-200',
  }

  const hoverStyles = hoverable
    ? 'hover:shadow-xl hover:scale-105 cursor-pointer'
    : ''

  return (
    <div
      className={cn(baseStyles, variants[variant], hoverStyles, className)}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
