import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Zap,
  Tag,
  Truck,
  Shield,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react'
import useCartStore from '../store/cartStore'

function Cart() {
  const navigate = useNavigate()
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalSavings,
    getTotalItems,
  } = useCartStore()

  const totalPrice = getTotalPrice()
  const totalSavings = getTotalSavings()
  const totalItems = getTotalItems()
  const deliveryCharge = 0

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#212121] flex items-center justify-center pt-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          {/* Empty Cart Icon */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
              <ShoppingCart size={52} className="text-primary/50" />
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-[#212121] rounded-full flex items-center justify-center">
              <span className="text-white/20 font-black text-lg">0</span>
            </div>
          </div>

          <h2 className="text-3xl font-black text-white mb-3">
            Your cart is <span className="gradient-text">empty</span>
          </h2>
          <p className="text-white/40 text-base mb-8 leading-relaxed">
            Looks like you haven't added anything yet. Browse our range of
            premium supplements and fuel your grind.
          </p>
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary shine inline-flex items-center gap-2 px-8 py-4 text-base"
            >
              <ShoppingBag size={20} />
              Start Shopping
            </motion.button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#212121] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-1">
              Your <span className="gradient-text">Cart</span>
            </h1>
            <p className="text-white/40 text-sm">
              {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="hidden sm:flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform duration-200"
            />
            Continue Shopping
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.selectedVariant}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  layout
                  className="glass rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden"
                >
                  <div className="flex gap-4 p-4 sm:p-5">

                    {/* Product Image */}
                    <Link
                      to={`/product/${item.id}`}
                      className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#383838] group"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-1">
                            {item.brand}
                          </p>
                          <Link to={`/product/${item.id}`}>
                            <h3 className="text-white font-bold text-sm sm:text-base leading-snug hover:text-primary/80 transition-colors line-clamp-2">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-white/30 text-xs mt-1">
                            Variant: {item.selectedVariant}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            removeFromCart(item.id, item.selectedVariant)
                          }
                          className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center transition-all duration-200 group"
                        >
                          <Trash2
                            size={14}
                            className="text-white/30 group-hover:text-red-400 transition-colors"
                          />
                        </motion.button>
                      </div>

                      {/* Price + Quantity Row */}
                      <div className="flex items-center justify-between mt-4">

                        {/* Quantity Stepper */}
                        <div className="flex items-center bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.selectedVariant,
                                item.quantity - 1
                              )
                            }
                            className="w-9 h-9 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all"
                          >
                            <Minus size={14} />
                          </motion.button>
                          <span className="w-10 text-center text-white font-bold text-sm">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.selectedVariant,
                                item.quantity + 1
                              )
                            }
                            className="w-9 h-9 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all"
                          >
                            <Plus size={14} />
                          </motion.button>
                        </div>

                        {/* Item Price */}
                        <div className="text-right">
                          <p className="text-white font-black text-lg">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-white/30 text-xs line-through">
                            ₹{(item.originalPrice * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Savings Bar */}
                  <div className="px-4 sm:px-5 pb-4">
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1.5">
                      <Tag size={12} className="text-emerald-400 flex-shrink-0" />
                      <span className="text-emerald-400 text-xs font-medium">
                        You save ₹
                        {(
                          (item.originalPrice - item.price) *
                          item.quantity
                        ).toLocaleString()}{' '}
                        on this item
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Clear Cart */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-end pt-2"
            >
              <button
                onClick={clearCart}
                className="text-white/30 hover:text-red-400 text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                <Trash2 size={14} />
                Clear Cart
              </button>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass rounded-2xl border border-white/5 p-6 sticky top-24"
            >
              <h2 className="text-white font-black text-xl mb-6 flex items-center gap-2">
                <Zap size={20} className="text-primary" fill="#D32F2F" />
                Order Summary
              </h2>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">
                    Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})
                  </span>
                  <span className="text-white font-semibold">
                    ₹{(totalPrice + totalSavings).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Discount</span>
                  <span className="text-emerald-400 font-semibold">
                    -₹{totalSavings.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50 flex items-center gap-1.5">
                    <Truck size={13} />
                    Delivery
                  </span>
                  <span className="text-emerald-400 font-semibold">FREE</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="text-white font-bold text-base">Total</span>
                  <span className="text-white font-black text-xl">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Savings Highlight */}
              {totalSavings > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 mb-6 flex items-center gap-2"
                >
                  <Tag size={16} className="text-emerald-400 flex-shrink-0" />
                  <p className="text-emerald-400 text-sm font-semibold">
                    You're saving ₹{totalSavings.toLocaleString()} on this order!
                  </p>
                </motion.div>
              )}

              {/* Checkout Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full btn-primary shine flex items-center justify-center gap-2 py-4 text-base font-bold rounded-xl mb-4"
              >
                Proceed to Checkout
                <ArrowRight size={20} />
              </motion.button>

              {/* Continue Shopping */}
              <Link to="/products">
                <button className="w-full py-3 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/30 text-sm font-medium transition-all duration-200">
                  Continue Shopping
                </button>
              </Link>

              {/* Trust Row */}
              <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-white/30">
                  <Shield size={13} />
                  <span className="text-xs">Secure</span>
                </div>
                <div className="w-1 h-1 bg-white/10 rounded-full" />
                <div className="flex items-center gap-1.5 text-white/30">
                  <Truck size={13} />
                  <span className="text-xs">Free Delivery</span>
                </div>
                <div className="w-1 h-1 bg-white/10 rounded-full" />
                <div className="flex items-center gap-1.5 text-white/30">
                  <Zap size={13} />
                  <span className="text-xs">Same Day</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart