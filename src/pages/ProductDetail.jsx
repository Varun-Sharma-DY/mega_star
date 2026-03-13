import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingCart,
  Zap,
  Star,
  ArrowLeft,
  Shield,
  Truck,
  RotateCcw,
  CheckCircle,
  Plus,
  Minus,
  ChevronRight,
} from 'lucide-react'
import useCartStore from '../store/cartStore'
import ProductCard from '../components/ProductCard'
import products from '../data/products.json'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const addToCart = useCartStore((state) => state.addToCart)

  const product = products.find((p) => p.id === id)
  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== id)
    .slice(0, 4)

  const [selectedVariant, setSelectedVariant] = useState(
    product ? product.variants[0] : ''
  )
  const [quantity, setQuantity] = useState(1)
  const [addedFeedback, setAddedFeedback] = useState(false)
  const [activeTab, setActiveTab] = useState('benefits')

  if (!product) {
    return (
      <div className="min-h-screen bg-[#212121] flex items-center justify-center pt-24">
        <div className="text-center">
          <h2 className="text-white text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/products">
            <button className="btn-primary">Back to Products</button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedVariant)
    }
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 2000)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate('/cart')
  }

  const savings = product.originalPrice - product.price
  const totalSavings = savings * quantity

  const trustBadges = [
    { icon: Shield, label: '100% Authentic', color: 'text-emerald-400' },
    { icon: Truck, label: 'Same Day Delivery', color: 'text-blue-400' },
    { icon: RotateCcw, label: 'Easy Returns', color: 'text-accent' },
  ]

  return (
    <div className="min-h-screen bg-[#212121] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-white/40 text-sm mb-8"
        >
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-white transition-colors">Products</Link>
          <ChevronRight size={14} />
          <span className="text-white/70 line-clamp-1">{product.name}</span>
        </motion.div>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium mb-8 transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform duration-200"
          />
          Back
        </motion.button>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">

          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="relative rounded-3xl overflow-hidden bg-[#2c2c2c] border border-white/5 aspect-square">

              {/* Glow behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 pointer-events-none" />

              <motion.img
                key={product.image}
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Badge */}
              {product.badge && (
                <div
                  className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold ${
                    product.badge === 'Best Seller'
                      ? 'bg-accent text-dark'
                      : product.badge === 'Top Rated'
                      ? 'bg-emerald-500 text-white'
                      : product.badge === 'New'
                      ? 'bg-blue-500 text-white'
                      : 'bg-primary text-white'
                  }`}
                >
                  {product.badge}
                </div>
              )}

              {/* Discount */}
              <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-xl text-white text-sm font-bold">
                -{product.discount}% OFF
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="glass rounded-xl p-3 flex flex-col items-center gap-1.5 border border-white/5"
                >
                  <badge.icon size={18} className={badge.color} />
                  <span className="text-white/60 text-xs font-medium text-center">
                    {badge.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col"
          >
            {/* Brand + Category */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-primary text-sm font-bold uppercase tracking-wider">
                {product.brand}
              </span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span className="text-white/40 text-sm">{product.category}</span>
            </div>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'text-accent' : 'text-white/20'}
                    fill={i < Math.floor(product.rating) ? '#FFC107' : 'none'}
                  />
                ))}
              </div>
              <span className="text-white font-semibold text-sm">{product.rating}</span>
              <span className="text-white/40 text-sm">
                ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price Block */}
            <div className="glass rounded-2xl p-5 border border-white/5 mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-black text-white">
                  ₹{(product.price * quantity).toLocaleString()}
                </span>
                <span className="text-white/30 text-lg line-through">
                  ₹{(product.originalPrice * quantity).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full">
                  You save ₹{totalSavings.toLocaleString()}
                </span>
                <span className="text-white/30 text-xs">
                  ({product.discount}% off)
                </span>
              </div>
            </div>

            {/* Variant Selector */}
            <div className="mb-6">
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
                Select Size / Variant
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <motion.button
                    key={variant}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                      selectedVariant === variant
                        ? 'border-primary bg-primary/20 text-primary glow-red'
                        : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {variant}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
                Quantity
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center glass rounded-xl border border-white/10 overflow-hidden">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Minus size={16} />
                  </motion.button>
                  <span className="w-12 text-center text-white font-bold text-lg">
                    {quantity}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-11 h-11 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Plus size={16} />
                  </motion.button>
                </div>
                <span className="text-white/30 text-sm">
                  {product.inStock ? (
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle size={14} />
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-400">Out of Stock</span>
                  )}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base transition-all duration-300 ${
                  addedFeedback
                    ? 'bg-emerald-500 text-white'
                    : 'bg-primary/20 border border-primary text-primary hover:bg-primary hover:text-white'
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {addedFeedback ? (
                  <>
                    <CheckCircle size={20} />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Add to Cart
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 btn-primary shine flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Zap size={20} fill="white" />
                Buy Now
              </motion.button>
            </div>

            {/* Tabs — Benefits / Description */}
            <div className="glass rounded-2xl border border-white/5 overflow-hidden">
              <div className="flex border-b border-white/5">
                {['benefits', 'description'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-sm font-semibold capitalize transition-all duration-200 ${
                      activeTab === tab
                        ? 'text-primary border-b-2 border-primary bg-primary/5'
                        : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="p-5"
                >
                  {activeTab === 'benefits' ? (
                    <ul className="space-y-3">
                      {product.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle
                            size={16}
                            className="text-primary flex-shrink-0 mt-0.5"
                          />
                          <span className="text-white/70 text-sm leading-relaxed">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-white/60 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between mb-8"
            >
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Related <span className="gradient-text">Products</span>
              </h2>
              <Link
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="text-primary text-sm font-semibold hover:text-primary/70 transition-colors flex items-center gap-1"
              >
                View All
                <ChevronRight size={16} />
              </Link>
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default ProductDetail