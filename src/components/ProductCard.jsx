import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Star, Zap } from 'lucide-react'
import useCartStore from '../store/cartStore'

function ProductCard({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [addedFeedback, setAddedFeedback] = useState(false)
  const addToCart = useCartStore((state) => state.addToCart)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, selectedVariant)
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 1500)
  }

  const handleVariantClick = (e, variant) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedVariant(variant)
  }

  const badgeColors = {
    'Best Seller': 'bg-accent text-dark',
    'Top Rated': 'bg-emerald-500 text-white',
    'New': 'bg-blue-500 text-white',
    'Hot': 'bg-primary text-white',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="card-3d shine group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="bg-[#2c2c2c] rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300">

          {/* Image Container */}
          <div className="relative overflow-hidden bg-[#383838] aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Badge */}
            {product.badge && (
              <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold ${badgeColors[product.badge] || 'bg-primary text-white'}`}>
                {product.badge}
              </div>
            )}

            {/* Discount Tag */}
            <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm px-2 py-1 rounded-lg text-white text-xs font-bold">
              -{product.discount}%
            </div>

            {/* Quick Add Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-dark/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  addedFeedback
                    ? 'bg-emerald-500 text-white'
                    : 'bg-primary text-white glow-red'
                }`}
              >
                {addedFeedback ? (
                  <>
                    <Zap size={16} fill="white" />
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} />
                    Add to Cart
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>

          {/* Card Body */}
          <div className="p-4">

            {/* Brand */}
            <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-1">
              {product.brand}
            </p>

            {/* Name */}
            <h3 className="text-white font-bold text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary/90 transition-colors duration-200">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    className={i < Math.floor(product.rating) ? 'text-accent' : 'text-white/20'}
                    fill={i < Math.floor(product.rating) ? '#FFC107' : 'none'}
                  />
                ))}
              </div>
              <span className="text-white/40 text-xs">
                {product.rating} ({product.reviews.toLocaleString()})
              </span>
            </div>

            {/* Variants */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.variants.map((variant) => (
                <button
                  key={variant}
                  onClick={(e) => handleVariantClick(e, variant)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all duration-200 ${
                    selectedVariant === variant
                      ? 'border-primary bg-primary/20 text-primary'
                      : 'border-white/10 text-white/50 hover:border-white/30'
                  }`}
                >
                  {variant}
                </button>
              ))}
            </div>

            {/* Price Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-white font-black text-lg">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-white/30 text-xs line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              </div>

              {/* Mobile Add to Cart */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  addedFeedback
                    ? 'bg-emerald-500'
                    : 'bg-primary/20 hover:bg-primary border border-primary/30'
                }`}
              >
                {addedFeedback ? (
                  <Zap size={16} className="text-white" fill="white" />
                ) : (
                  <ShoppingCart size={16} className="text-primary hover:text-white" />
                )}
              </motion.button>
            </div>

          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard