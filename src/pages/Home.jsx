import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Flame, Trophy, Leaf, Zap, Battery, Heart, Shield, Star } from 'lucide-react'
import HeroBanner from '../components/HeroBanner'
import ProductCard from '../components/ProductCard'
import products from '../data/products.json'

const categories = [
  { label: 'Whey Protein', icon: Zap, color: 'from-blue-600/20 to-blue-400/5', border: 'hover:border-blue-500/40', iconColor: 'text-blue-400' },
  { label: 'Creatine', icon: Flame, color: 'from-orange-600/20 to-orange-400/5', border: 'hover:border-orange-500/40', iconColor: 'text-orange-400' },
  { label: 'Pre-Workout', icon: Battery, color: 'from-primary/20 to-primary/5', border: 'hover:border-primary/40', iconColor: 'text-primary' },
  { label: 'Mass Gainer', icon: Trophy, color: 'from-purple-600/20 to-purple-400/5', border: 'hover:border-purple-500/40', iconColor: 'text-purple-400' },
  { label: 'Fat Burners', icon: Flame, color: 'from-red-600/20 to-red-400/5', border: 'hover:border-red-500/40', iconColor: 'text-red-400' },
  { label: 'Multivitamins', icon: Heart, color: 'from-emerald-600/20 to-emerald-400/5', border: 'hover:border-emerald-500/40', iconColor: 'text-emerald-400' },
  { label: 'Glutamine', icon: Leaf, color: 'from-teal-600/20 to-teal-400/5', border: 'hover:border-teal-500/40', iconColor: 'text-teal-400' },
  { label: 'L-Arginine', icon: Shield, color: 'from-accent/20 to-accent/5', border: 'hover:border-accent/40', iconColor: 'text-accent' },
]

const whyUs = [
  {
    icon: Shield,
    title: '100% Authentic Products',
    desc: 'Every product is sourced directly from authorized distributors. Zero fake supplements, guaranteed.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
  {
    icon: Zap,
    title: 'Same Day Delivery',
    desc: 'Order before 6 PM and get your supplements delivered the same day within our local radius.',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    icon: Trophy,
    title: 'Top Brands Only',
    desc: 'We stock only the most trusted brands — GNC, MuscleBlaze, and Avvatar. No unknowns.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: Star,
    title: 'Best Local Prices',
    desc: 'Get prices lower than major e-commerce platforms with no delivery charges within our radius.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
]

const testimonials = [
  {
    name: 'Rohit M.',
    role: 'Competitive Bodybuilder',
    text: 'Finally a local store that stocks legit GNC and MuscleBlaze. Delivery was at my door in 3 hours. Unreal service.',
    rating: 5,
  },
  {
    name: 'Priya S.',
    role: 'Fitness Enthusiast',
    text: 'Ordered Avvatar Whey at midnight, got it next morning. The prices are better than online too. Highly recommend.',
    rating: 5,
  },
  {
    name: 'Aman K.',
    role: 'Gym Trainer',
    text: 'I recommend Mega Star Nutrition to all my clients now. Authentic products, fast delivery, no nonsense.',
    rating: 5,
  },
]

function SectionHeader({ badge, title, highlight, subtitle }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <span className="inline-block glass px-4 py-1.5 rounded-full text-xs font-semibold text-accent border border-accent/20 mb-4 uppercase tracking-widest">
        {badge}
      </span>
      <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
        {title}{' '}
        <span className="gradient-text">{highlight}</span>
      </h2>
      {subtitle && (
        <p className="text-white/50 text-base max-w-xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  )
}

function Home() {
  const navigate = useNavigate()
  const featuredProducts = products.slice(0, 4)

  return (
    <main className="overflow-x-hidden">

      {/* Hero */}
      <HeroBanner />

      {/* Categories */}
      <section className="section bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Browse by Goal"
            title="Shop by"
            highlight="Category"
            subtitle="Find exactly what your body needs — from muscle building to fat loss."
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6, scale: 1.04 }}
                onClick={() => navigate(`/products?category=${encodeURIComponent(cat.label)}`)}
                className={`cursor-pointer bg-gradient-to-b ${cat.color} rounded-2xl p-4 flex flex-col items-center gap-3 border border-white/5 ${cat.border} transition-all duration-300 group`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <cat.icon size={22} className={cat.iconColor} />
                </div>
                <span className="text-white/80 text-xs font-semibold text-center leading-tight">
                  {cat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section bg-[#212121]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Handpicked For You"
            title="Featured"
            highlight="Products"
            subtitle="Our top picks across categories — trusted by athletes and gym enthusiasts."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12"
          >
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary shine inline-flex items-center gap-2"
              >
                View All Products
                <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge="Why Us"
            title="Why Choose"
            highlight="Mega Star?"
            subtitle="We're not just another supplement store. Here's what makes us different."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass rounded-2xl p-6 border border-white/5 hover:border-white/15 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={24} className={item.color} />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Strip */}
      <section className="py-12 bg-[#212121] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-white/30 text-xs font-semibold uppercase tracking-widest mb-8">
            Authorized Stockist Of
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16">
            {['MuscleBlaze', 'GNC', 'Avvatar'].map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => navigate(`/products?brand=${encodeURIComponent(brand)}`)}
                className="cursor-pointer glass px-8 py-4 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300"
              >
                <span className="text-white/70 hover:text-white font-black text-xl tracking-tight transition-colors duration-200">
                  {brand}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Real Reviews"
            title="What Our"
            highlight="Customers Say"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 border border-white/5 hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-accent" fill="#FFC107" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-5 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-[#212121]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #2a0000 0%, #1a1a1a 50%, #1a0a00 100%)',
            }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />
            </div>
            <div className="relative z-10 text-center py-16 px-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl sm:text-5xl font-black text-white mb-4"
              >
                Ready to Level Up?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-white/60 text-lg mb-8 max-w-lg mx-auto"
              >
                Browse our full range of supplements and get them delivered to your door today.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary shine inline-flex items-center gap-2 text-base px-8 py-4"
                  >
                    Shop All Products
                    <ArrowRight size={20} />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}

export default Home