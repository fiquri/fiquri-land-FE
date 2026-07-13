import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 text-white py-12 md:py-20">
      <div className="custom-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-12 border-b border-white/10 mb-8">
          <div>
            <p className="font-serif text-xl font-bold mb-3">Darrell Vesterfelt</p>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
              Entrepreneur, investor, and coach helping founders build businesses
              that don't consume their lives.
            </p>
          </div>

          <div>
            <p className="text-[0.6875rem] font-semibold tracking-wider uppercase text-neutral-400 mb-5 font-sans">Navigate</p>
            <ul className="list-none flex flex-col gap-2.5 p-0 m-0">
              <li><a href="#" className="text-sm text-neutral-300 no-underline transition-colors hover:text-white">Growth Notes</a></li>
              <li><a href="#" className="text-sm text-neutral-300 no-underline transition-colors hover:text-white">My Writing</a></li>
              <li><a href="#" className="text-sm text-neutral-300 no-underline transition-colors hover:text-white">Damn Near Automatic</a></li>
              <li><a href="#" className="text-sm text-neutral-300 no-underline transition-colors hover:text-white">Coaching</a></li>
              <li><a href="#" className="text-sm text-neutral-300 no-underline transition-colors hover:text-white">Consulting</a></li>
              <li><a href="#" className="text-sm text-neutral-300 no-underline transition-colors hover:text-white">Contact Me</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[0.6875rem] font-semibold tracking-wider uppercase text-neutral-400 mb-5 font-sans">Connect</p>
            <ul className="list-none flex flex-col gap-2.5 p-0 m-0">
              <li><a href="https://www.linkedin.com/in/darrellvesterfelt" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-300 no-underline transition-colors hover:text-white">LinkedIn</a></li>
              <li><a href="https://x.com/dvest" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-300 no-underline transition-colors hover:text-white">Twitter / X</a></li>
              <li><a href="https://www.instagram.com/dvest/" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-300 no-underline transition-colors hover:text-white">Instagram</a></li>
              <li><a href="#" className="text-sm text-neutral-300 no-underline transition-colors hover:text-white">Email</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[0.6875rem] font-semibold tracking-wider uppercase text-neutral-400 mb-5 font-sans">Location</p>
            <p className="text-sm text-neutral-400 leading-relaxed font-sans">Minneapolis,<br />Minnesota</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-neutral-500 font-sans">&copy; {new Date().getFullYear()} Darrell Vesterfelt. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-neutral-500 no-underline transition-colors hover:text-neutral-300 font-sans">Privacy Policy</a>
            <a href="#" className="text-xs text-neutral-500 no-underline transition-colors hover:text-neutral-300 font-sans">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
