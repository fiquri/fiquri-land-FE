import React, { useState, useEffect } from 'react'
import { useAuth } from 'features/auth'
import { Product } from '../types'
import { Input } from 'shared/components/Input'
import { Button } from 'shared/components/Button'

interface ProductInquiryModalProps {
  isOpen: boolean
  onClose: () => void
  selectedProductId: string
  products: Product[]
}

export const ProductInquiryModal: React.FC<ProductInquiryModalProps> = ({
  isOpen,
  onClose,
  selectedProductId,
  products
}) => {
  const { user } = useAuth()
  const [productId, setProductId] = useState(selectedProductId)
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [company, setCompany] = useState(user?.company || '')
  const [website, setWebsite] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setProductId(selectedProductId)
  }, [selectedProductId])

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setCompany(user.company || '')
    }
  }, [user])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim()) {
      setError('Name and Email are required.')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
    }, 1000)
  }

  const handleClose = () => {
    setIsSuccess(false)
    setWebsite('')
    setMessage('')
    setError('')
    onClose()
  }

  const activeProduct = products.find(p => p.id === productId)

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-lg bg-neutral-50 p-8 border border-neutral-200 animate-scale-up shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-200">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif text-3xl font-bold text-neutral-900 mb-2">
              Inquiry Received
            </h3>
            <p className="text-sm text-neutral-500 max-w-md mx-auto">
              Thank you for applying. Darrell will review your details for the{' '}
              <strong>{activeProduct?.name.replace(/<br\s*\/?>/gi, ' ')}</strong> partnership and reach out within 24 hours.
            </p>
            <Button variant="fill" className="mt-8 px-8" onClick={handleClose}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="text-[0.6875rem] font-semibold tracking-wider uppercase text-neutral-400">
                Partnership Inquiry
              </span>
              <h2 className="font-serif text-3xl font-bold mt-1 text-neutral-900">
                Start Building
              </h2>
              <p className="text-sm text-neutral-500 mt-2">
                Apply to work directly with Darrell to grow your business.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[0.75rem] font-semibold tracking-wider uppercase text-neutral-700">
                  Select Program
                </label>
                <select
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3.5 border border-neutral-300 bg-neutral-50 font-sans text-[0.9375rem] text-neutral-900 outline-none transition-all duration-150 focus:border-neutral-950 focus:bg-white"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name.replace(/<br\s*\/?>/gi, ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="inq-name"
                  label="Full Name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <Input
                  id="inq-email"
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="inq-company"
                  label="Company Name"
                  placeholder="Your company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={isLoading}
                />
                <Input
                  id="inq-website"
                  label="Website URL"
                  placeholder="https://..."
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="inq-msg" className="text-[0.75rem] font-semibold tracking-wider uppercase text-neutral-700">
                  Tell me about your growth hurdles
                </label>
                <textarea
                  id="inq-msg"
                  rows={3}
                  placeholder="What is the bottleneck in your business right now?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-3.5 border border-neutral-300 bg-neutral-50 font-sans text-[0.9375rem] text-neutral-900 outline-none transition-all duration-150 focus:border-neutral-950 focus:bg-white resize-none"
                />
              </div>

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
                    Submitting Application...
                  </span>
                ) : (
                  'Submit Inquiry →'
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
