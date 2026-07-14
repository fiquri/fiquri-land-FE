import React, { useState } from 'react'
import { useAuth } from 'features/auth'
// import { login } from "@/features/auth/api";

interface NavbarProps {
  onOpenProfile: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenProfile }) => {
  const { isAuthenticated, user, openAuthModal } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Work With Me' },
    { href: '#writing', label: 'Writing' },
    { href: '#newsletter', label: 'Newsletter' }
  ]

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-neutral-50/80 backdrop-blur-md">
      <div className="custom-container">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#"
            className="font-serif text-[1.05rem] font-bold tracking-tight text-neutral-950 no-underline"
          >
            Darrell Vesterfelt
          </a>

          {/* Desktop Navigation */}
          <ul className="m-0 hidden list-none items-center gap-8 p-0 md:flex">
            {navLinks.map((link) => (
              <li key={link.href} className="m-0 p-0">
                <a
                  href={link.href}
                  className="text-[0.8125rem] font-medium tracking-wide text-neutral-600 no-underline transition-colors hover:text-neutral-950"
                >
                  {link.label}
                </a>
              </li>
            ))}

            {isAuthenticated && user ? (
              <li className="m-0 p-0">
                <button
                  onClick={onOpenProfile}
                  className="flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-[0.8125rem] font-medium text-neutral-700 transition-colors hover:text-neutral-950 focus:outline-none"
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="size-7 rounded-full border border-amber-600 object-cover"
                  />
                  <span>{user.name.split(' ')[0]}</span>
                </button>
              </li>
            ) : (
              <li className="m-0 p-0">
                <button
                  onClick={openAuthModal}
                  className="cursor-pointer border-[1.5px] border-neutral-950 bg-transparent px-[1.1rem] py-2 text-[0.8125rem] font-medium text-neutral-950 transition-all duration-200 hover:bg-neutral-950 hover:text-neutral-50"
                >
                  Get Started
                </button>
              </li>
            )}
          </ul>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            className="flex cursor-pointer flex-col gap-1.5 border-0 bg-transparent p-1 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`block h-[1.5px] w-6 bg-neutral-950 transition-transform duration-200 ${
                isMobileMenuOpen ? 'translate-y-[7.5px] rotate-45' : ''
              }`}
            ></span>
            <span
              className={`block h-[1.5px] w-6 bg-neutral-950 transition-opacity duration-200 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`block h-[1.5px] w-6 bg-neutral-950 transition-transform duration-200 ${
                isMobileMenuOpen ? 'translate-y-[7.5px] -rotate-45' : ''
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div className="bg-neutral-50/98 animate-fade-in absolute left-0 top-16 z-30 w-full border-b border-neutral-200 shadow-lg backdrop-blur-lg md:hidden">
          <ul className="m-0 flex list-none flex-col gap-4 border-t border-neutral-100 p-6">
            {navLinks.map((link) => (
              <li key={link.href} className="m-0 p-0">
                <a
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm font-medium tracking-wide text-neutral-600 transition-colors hover:text-neutral-950"
                >
                  {link.label}
                </a>
              </li>
            ))}

            <li className="m-0 border-t border-neutral-200 pt-2">
              {isAuthenticated && user ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    onOpenProfile()
                  }}
                  className="flex w-full cursor-pointer items-center gap-3 border-0 bg-transparent p-0 text-left text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-950 focus:outline-none"
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="size-8 rounded-full border border-amber-600 object-cover"
                  />
                  <span>{user.name} (View Profile)</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    openAuthModal()
                  }}
                  className="w-full cursor-pointer border-[1.5px] border-neutral-950 bg-neutral-950 px-4 py-3 text-center text-sm font-medium text-neutral-50 transition-colors hover:bg-neutral-800"
                >
                  Get Started
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
