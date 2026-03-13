import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, MapPin, Phone, Mail, Instagram, Youtube, Facebook } from 'lucide-react'

function Footer() {
  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'All Products', path: '/products' },
    { label: 'Whey Protein', path: '/products?category=Whey Protein' },
    { label: 'Creatine', path: '/products?category=Creatine' },
    { label: 'Pre-Workout', path: '/products?category=Pre-Workout' },
    { label: 'Cart', path: '/cart' },
  ]

  const brands = [
    { label: 'MuscleBlaze', path: '/products?brand=MuscleBlaze' },
    { label: 'GNC', path: '/products?brand=GNC' },
    { label: 'Avvatar', path: '/products?brand=Avvatar' },
  ]

  return (
    <footer className="bg-[#1a1a1a] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
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
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Your local supplement store in Panvel. Authentic products,
              same-day delivery, unbeatable prices.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Youtube, label: 'Youtube' },
                { icon: Facebook, label: 'Facebook' },
              ].map(({ icon: Icon, label }) => (
                <motion.button
                  key={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 glass rounded-lg flex items-center justify-center border border-white/5 hover:border-primary/30 transition-all duration-200"
                  aria-label={label}
                >
                  <Icon size={16} className="text-white/50 hover:text-primary transition-colors" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/40 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
              Our Brands
            </h3>
            <ul className="space-y-3">
              {brands.map((brand) => (
                <li key={brand.path}>
                  <Link
                    to={brand.path}
                    className="text-white/40 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {brand.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5 mt-8">
              Delivery Info
            </h3>
            <ul className="space-y-2">
              <li className="text-white/40 text-sm">✓ Same-day delivery</li>
              <li className="text-white/40 text-sm">✓ 5–10 km radius</li>
              <li className="text-white/40 text-sm">✓ Free delivery</li>
              <li className="text-white/40 text-sm">✓ UPI & Cash on Delivery</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={15} className="text-primary" />
                </div>
                <div>
                  <p className="text-white/70 text-sm font-medium">Store Location</p>
                  <p className="text-white/40 text-xs mt-0.5 leading-relaxed">
                    Mega Star Nutrition, Panvel,<br />
                    Navi Mumbai, Maharashtra
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={15} className="text-primary" />
                </div>
                <div>
                  <p className="text-white/70 text-sm font-medium">Phone / WhatsApp</p>
                  <p className="text-white/40 text-xs mt-0.5">+91 XXXXX XXXXX</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail size={15} className="text-primary" />
                </div>
                <div>
                  <p className="text-white/70 text-sm font-medium">Email</p>
                  <p className="text-white/40 text-xs mt-0.5">
                    megastarnutrition@gmail.com
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs text-center sm:text-left">
            © 2025 Mega Star Nutrition. All rights reserved. Panvel, Navi Mumbai.
          </p>
          <p className="text-white/20 text-xs">
            Built for Varun Sharma · Demo Version
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer