import React from 'react'
import { useAuth } from 'features/auth'
import { Button } from 'shared/components/Button'

interface ProfileSideDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export const ProfileSideDrawer: React.FC<ProfileSideDrawerProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth()

  if (!isOpen || !user) return null

  const handleLogout = () => {
    logout()
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="absolute top-0 right-0 h-full w-full max-w-md bg-neutral-50 border-l border-neutral-200 shadow-2xl p-8 flex flex-col justify-between animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
            <h3 className="font-serif text-2xl font-bold text-neutral-900">
              Operator Profile
            </h3>
            <button 
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-900 transition-colors p-1"
              aria-label="Close drawer"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User Details */}
          <div className="flex items-center gap-4 mb-6">
            <img 
              src={user.avatarUrl} 
              alt={user.name} 
              className="w-16 h-16 rounded-full border-2 border-amber-600 object-cover"
            />
            <div>
              <h4 className="font-sans font-semibold text-lg text-neutral-900">{user.name}</h4>
              <p className="text-sm text-neutral-500">{user.email}</p>
            </div>
          </div>

          {/* Company & Bio */}
          <div className="space-y-4 mb-8">
            <div>
              <span className="text-[0.6875rem] font-semibold tracking-wider uppercase text-neutral-400 block mb-1">
                Company
              </span>
              <p className="text-sm font-medium text-neutral-800">{user.company || 'Not Specified'}</p>
            </div>
            <div>
              <span className="text-[0.6875rem] font-semibold tracking-wider uppercase text-neutral-400 block mb-1">
                Bio
              </span>
              <p className="text-sm text-neutral-600 leading-relaxed">{user.bio}</p>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-neutral-100 border border-neutral-200 p-6 space-y-4">
            <h5 className="text-[0.6875rem] font-semibold tracking-wider uppercase text-neutral-400">
              Operator Stats
            </h5>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 border border-neutral-200">
                <span className="text-2xl font-bold text-neutral-900">20+</span>
                <span className="block text-[0.6875rem] text-neutral-400 mt-1">Growth Projects</span>
              </div>
              <div className="bg-white p-3 border border-neutral-200">
                <span className="text-2xl font-bold text-neutral-900">98%</span>
                <span className="block text-[0.6875rem] text-neutral-400 mt-1">Consistency</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-neutral-200">
          <Button 
            variant="outline"
            className="w-full justify-center text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
            onClick={handleLogout}
          >
            Logout Session
          </Button>
        </div>
      </div>
    </div>
  )
}
