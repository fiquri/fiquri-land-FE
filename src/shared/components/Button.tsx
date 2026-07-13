import React from 'react'
import { cn } from '../lib/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'fill' | 'arrow'
  href?: string
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'outline',
  href,
  className,
  children,
  ...props
}) => {
  const isArrow = variant === 'arrow'

  const styles = cn(
    isArrow
      ? 'arrow-link group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 border-b border-neutral-300 pb-0.5 transition-all duration-200 hover:text-neutral-700 hover:border-neutral-900'
      : cn(
          'btn inline-flex items-center justify-center gap-2 px-7 py-3.5 font-sans text-sm font-medium tracking-wide border-1.5 border-neutral-900 bg-transparent text-neutral-900 cursor-pointer transition-all duration-200 hover:bg-neutral-900 hover:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2',
          variant === 'fill' && 'bg-neutral-900 text-neutral-50 hover:bg-neutral-800 hover:border-neutral-800'
        ),
    className
  )

  if (href) {
    const isExternal = href.startsWith('http')
    return (
      <a
        href={href}
        className={styles}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
        {isArrow && (
          <span className="inline-block text-[0.8rem] transition-transform duration-200 group-hover:translate-x-[3px]">&rarr;</span>
        )}
      </a>
    )
  }

  return (
    <button className={styles} {...props}>
      {children}
      {isArrow && (
        <span className="inline-block text-[0.8rem] transition-transform duration-200 group-hover:translate-x-[3px]">&rarr;</span>
      )}
    </button>
  )
}
