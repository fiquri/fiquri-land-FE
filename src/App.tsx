import React, { useState, useEffect } from 'react'
import { Navbar } from 'shared/components/Navbar'
import { Footer } from 'shared/components/Footer'
import { Button } from 'shared/components/Button'
import { Input } from 'shared/components/Input'
import { useAuth, LoginModal } from 'features/auth'
import { ProfileSideDrawer } from 'features/profile'
import { ProductInquiryModal, Product } from 'features/product'

const products: Product[] = [
  {
    id: 'damn-near-automatic',
    number: '01',
    name: 'Damn Near<br />Automatic',
    description: 'A private network for founders tired of building alone. Live sessions, small groups, and systems that compound.',
    features: ['Monthly live sessions', 'Curated founder rooms', 'Private community + vault'],
    ctaText: 'Learn More'
  },
  {
    id: 'coaching',
    number: '02',
    name: '1-on-1<br />Coaching',
    description: 'Direct access to work on the specific challenges holding you back. Strategy, operations, mindset. Whatever you need.',
    features: ['Monthly sessions + Voxer access', '$3,000 / month', '12-month commitment'],
    ctaText: 'Apply Now'
  },
  {
    id: 'consulting',
    number: '03',
    name: 'Strategic<br />Consulting',
    description: "You know what your business could be. I'll show you why it isn't there yet. Deep diagnosis and embedded partnership.",
    features: ['6-week growth assessment', 'Optional 12-month partnership', 'For $1M+ revenue companies'],
    ctaText: 'Get Started'
  }
]

const posts = [
  {
    id: 'plan-you-believe',
    date: 'Jan 15, 2026',
    title: 'Build a Plan You Actually Believe',
    excerpt: "Most strategic plans are performative BS. Here's how to build one that actually drives decisions."
  },
  {
    id: 'no-failure',
    date: 'Jan 8, 2026',
    title: 'What If There Is No Such Thing as Failure?',
    excerpt: "Every failure I've had taught me something I couldn't have learned any other way."
  },
  {
    id: 'people-still-here',
    date: 'Dec 28, 2025',
    title: 'The People Still Here Are the Ones Who Refused to Quit',
    excerpt: "20 years in, I've watched thousands of founders come and go. The common thread isn't talent."
  }
]

function App() {
  const { user } = useAuth()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState('coaching')

  const [nlName, setNlName] = useState('')
  const [nlEmail, setNlEmail] = useState('')
  const [nlLoading, setNlLoading] = useState(false)
  const [nlSuccess, setNlSuccess] = useState(false)
  const [nlError, setNlError] = useState('')

  useEffect(() => {
    if (user) {
      setNlName(user.name)
      setNlEmail(user.email)
    } else {
      setNlName('')
      setNlEmail('')
    }
  }, [user])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setNlError('')
    if (!nlName.trim()) {
      setNlError('Name is required')
      return
    }
    if (!nlEmail.trim() || !nlEmail.includes('@')) {
      setNlError('Valid email is required')
      return
    }

    setNlLoading(true)
    setTimeout(() => {
      setNlLoading(false)
      setNlSuccess(true)
    }, 1000)
  }

  const handleOpenInquiry = (productId: string) => {
    setSelectedProductId(productId)
    setIsInquiryOpen(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onOpenProfile={() => setIsProfileOpen(true)} />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="custom-container animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="custom-label mb-6 block">Darrell Vesterfelt</span>
                <h1 className="font-serif text-4xl md:text-6xl font-extrabold leading-tight text-neutral-900 mb-6">
                  I help founders escape the messy middle
                </h1>
                <p className="text-base md:text-lg text-neutral-600 leading-relaxed mb-10 max-w-lg">
                  Most people teaching growth stopped building years ago. I'm still in the trenches.
                  Making decisions every day. I've spent 20 years starting companies, selling companies,
                  and sometimes failing at companies. Learning the hard way what actually works.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="fill" onClick={() => handleOpenInquiry('coaching')}>
                    Work With Me
                  </Button>
                  <Button variant="arrow" href="#writing">
                    Read My Writing
                  </Button>
                </div>
              </div>

              <div className="relative group hidden md:block">
                <div className="aspect-[4/5] bg-neutral-200 overflow-hidden shadow-2xl relative">
                  <img
                    src="/darrell_portrait.png"
                    alt="Darrell Vesterfelt"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-neutral-950 text-white px-6 py-5 shadow-xl max-w-[180px]">
                  <strong className="block text-2xl font-bold font-serif mb-0.5 text-amber-500">20</strong>
                  <span className="text-xs text-neutral-400 font-sans tracking-wide">Years building businesses</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-[1px] bg-neutral-200"></div>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-neutral-50/50">
          <div className="custom-container">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-12 md:gap-16 items-start">
              <div>
                <span className="custom-label">About</span>
              </div>
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold leading-snug text-neutral-900 mb-8">
                  20 years in.<br />Still making mistakes.<br />Still learning.
                </h2>
                <div className="space-y-6 text-neutral-600 leading-relaxed text-base md:text-md">
                  <p>
                    I started my first company at 24. Failed at some. Sold others. Built teams of 50+ people.
                    Generated millions in annual revenue.
                  </p>
                  <p>
                    I'm not a consultant who studied business. I'm an operator who's been in the trenches
                    for two decades.
                  </p>
                  <p>
                    Right now I'm working on pricing, hiring, positioning, and systems across real businesses
                    I run and invest in. Same problems you're facing. Same seat you're sitting in.
                  </p>
                  <div className="pt-6">
                    <Button variant="arrow" href="#services">
                      See how we can work together
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-[1px] bg-neutral-200"></div>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-24 bg-neutral-950 text-white">
          <div className="custom-container">
            <div className="mb-16">
              <span className="custom-label text-neutral-500 mb-4 block font-sans">What I Do</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight">Three ways to<br />work together</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-neutral-800">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-neutral-950 p-8 md:p-10 flex flex-col justify-between min-h-[420px] transition-all duration-300 hover:bg-neutral-900/60 hover:-translate-y-1"
                >
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-neutral-500 mb-6 block font-sans">
                      {product.number}
                    </span>
                    <h3
                      className="font-serif text-2xl font-bold mb-4 leading-snug"
                      dangerouslySetInnerHTML={{ __html: product.name }}
                    />
                    <p className="text-sm leading-relaxed text-neutral-400 mb-8">
                      {product.description}
                    </p>
                    <ul className="list-none p-0 m-0 space-y-3 mb-8">
                      {product.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-neutral-400 relative pl-5 before:content-['→'] before:absolute before:left-0 before:text-amber-500"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleOpenInquiry(product.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-transparent border-0 border-b border-white/20 pb-0.5 mt-auto transition-colors hover:border-white w-fit cursor-pointer"
                  >
                    {product.ctaText} &rarr;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Writing Section */}
        <section id="writing" className="py-16 md:py-24 bg-white">
          <div className="custom-container">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
              <div>
                <span className="custom-label mb-3 block font-sans">Writing</span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold">Recent thoughts</h2>
              </div>
              <Button variant="arrow" href="#">
                All essays
              </Button>
            </div>

            <div className="flex flex-col">
              {posts.map((post) => (
                <a
                  key={post.id}
                  href="#"
                  className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-8 py-8 border-t border-neutral-100 last:border-b last:border-neutral-100 group no-underline text-neutral-900 transition-colors hover:bg-neutral-50/50 px-4"
                >
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest pt-1 font-sans">
                    {post.date}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-bold group-hover:text-neutral-700 transition-colors mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section id="newsletter" className="py-16 md:py-24 bg-neutral-100">
          <div className="custom-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="custom-label mb-4 block font-sans">Newsletter</span>
                <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-4">
                  <em className="italic text-amber-600 font-serif">Growth</em><br />Notes
                </h2>
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-6 max-w-sm">
                  My weekly newsletter for leaders obsessed with growing their company.
                  Frameworks, patterns, and insights from my work with founders.
                </p>
                <p className="text-xs text-neutral-500 font-sans">Join 3,000+ founders &mdash; unsubscribe anytime.</p>
              </div>

              <div className="bg-white p-8 border border-neutral-200/60 shadow-sm relative">
                {nlSuccess ? (
                  <div className="text-center py-6 animate-scale-up">
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-100">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-neutral-900 mb-1">
                      You're Subscribed!
                    </h3>
                    <p className="text-xs text-neutral-500 max-w-[280px] mx-auto leading-relaxed font-sans">
                      Thanks for joining, <strong>{nlName}</strong>. Check your inbox soon for the first edition of Growth Notes.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <Input
                      id="nl-name"
                      label="First Name"
                      placeholder="Your first name"
                      value={nlName}
                      onChange={(e) => setNlName(e.target.value)}
                      disabled={nlLoading}
                      required
                    />

                    <Input
                      id="nl-email"
                      label="Email Address"
                      type="email"
                      placeholder="you@example.com"
                      value={nlEmail}
                      onChange={(e) => setNlEmail(e.target.value)}
                      disabled={nlLoading}
                      required
                    />

                    {nlError && (
                      <p className="text-xs text-red-500 text-left bg-red-50 border-l-2 border-red-500 p-2">
                        {nlError}
                      </p>
                    )}

                    <Button
                      type="submit"
                      variant="fill"
                      className="w-full justify-center py-4"
                      disabled={nlLoading}
                    >
                      {nlLoading ? (
                        <span className="flex items-center gap-2 justify-center">
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Subscribing...
                        </span>
                      ) : (
                        'Subscribe →'
                      )}
                    </Button>
                    <p className="text-[0.6875rem] text-neutral-400 text-center font-sans">No spam. Unsubscribe at any time.</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <LoginModal />

      <ProfileSideDrawer isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      <ProductInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        selectedProductId={selectedProductId}
        products={products}
      />
    </div>
  )
}

export default App
