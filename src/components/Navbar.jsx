import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Search, Menu, X, Zap } from 'lucide-react'
import useCartStore from '../store/cartStore'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const navigate = useNavigate()
  const getTotalItems = useCartStore((state) => state.getTotalItems)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setIsSearchOpen(false)
    }
  }

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Cart', path: '/cart' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center glow-red group-hover:scale-110 transition-transform duration-300">
              <Zap size={20} className="text-white" fill="white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-black text-lg tracking-tight">
                MEGA STAR
              </span>
              <span className="text-accent text-[10px] font-semibold tracking-[0.2em] uppercase">
                Nutrition
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">

            {/* Search */}
            <AnimatePresence>
              {isSearchOpen && (
                <motion.form
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSearch}
                  className="overflow-hidden"
                >
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search supplements..."
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-primary transition-colors"
                  />
                </motion.form>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg glass hover:border-primary/50 transition-all duration-200"
            >
              {isSearchOpen ? (
                <X size={18} className="text-white/70" />
              ) : (
                <Search size={18} className="text-white/70" />
              )}
            </button>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 flex items-center justify-center rounded-lg glass hover:border-primary/50 transition-all duration-200"
              >
                <ShoppingCart size={18} className="text-white/70" />
                {getTotalItems() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary rounded-full text-white text-[10px] font-bold flex items-center justify-center glow-red"
                  >
                    {getTotalItems()}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg glass"
            >
              {isMobileMenuOpen ? (
                <X size={18} className="text-white" />
              ) : (
                <Menu size={18} className="text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white/70 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar