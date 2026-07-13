import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Input } from 'shared/components/Input'
import { Button } from 'shared/components/Button'

export const LoginModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  if (!isAuthModalOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name.trim()) {
      setError('Name is required')
      return
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Valid email address is required')
      return
    }

    try {
      await login(email, name)
      setName('')
      setEmail('')
    } catch (err: any) {
      setError(err.message || 'Failed to login')
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
      onClick={closeAuthModal}
    >
      <div 
        className="relative w-full max-w-md bg-neutral-50 p-8 border border-neutral-200 animate-scale-up shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6 text-center">
          <span className="text-[0.6875rem] font-semibold tracking-widest uppercase text-neutral-400">
            Operator Account
          </span>
          <h2 className="font-serif text-3xl font-bold mt-2 text-neutral-900">
            Access The Vault
          </h2>
          <p className="text-sm text-neutral-500 mt-2">
            Enter your details to sign in and view exclusive founder insights.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="auth-name"
            label="First Name"
            placeholder="Your first name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            required
          />

          <Input
            id="auth-email"
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />

          {error && (
            <p className="text-sm text-red-500 text-left bg-red-50 border-l-2 border-red-500 p-2">
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="fill"
            className="w-full justify-center py-4 mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Logging in...
              </span>
            ) : (
              'Enter →'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
