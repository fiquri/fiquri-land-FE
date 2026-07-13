import React from 'react'
import { cn } from '../lib/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  id,
  error,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      <label
        htmlFor={id}
        className="text-[0.75rem] font-semibold tracking-wider uppercase text-neutral-700"
      >
        {label}
      </label>
      <input
        id={id}
        className={cn(
          "w-full px-4 py-3.5 border border-neutral-300 bg-neutral-50 font-sans text-[0.9375rem] text-neutral-900 outline-none transition-all duration-150 focus:border-neutral-950 focus:bg-white",
          error && "border-red-500 focus:border-red-500",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  )
}
