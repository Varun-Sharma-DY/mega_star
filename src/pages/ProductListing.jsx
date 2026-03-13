import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import products from '../data/products.json'

const ALL_CATEGORIES = [
  'Whey Protein',
  'Creatine',
  'Pre-Workout',
  'Mass Gainer',
  'Fat Burners',
  'Multivitamins',
  'Glutamine',
  'L-Arginine',
]

const ALL_BRANDS = ['MuscleBlaze', 'GNC', 'Avvatar']

const SORT_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Best Rated', value: 'rating' },
  { label: 'Most Reviewed', value: 'reviews' },
  { label: 'Biggest Discount', value: 'discount' },
]

function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get('category') ? [searchParams.get('category')] : []
  )
  const [selectedBrands, setSelectedBrands] = useState(
    searchParams.get('brand') ? [searchParams.get('brand')] : []
  )
  const [priceRange, setPriceRange] = useState([0, 4000])
  const [sortBy, setSortBy] = useState('default')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)

  useEffect(() => {
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const brand = searchParams.get('brand')
    if (search) setSearchQuery(search)
    if (category) setSelectedCategories([category])
    if (brand) setSelectedBrands([brand])
  }, [searchParams])

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange([0, 4000])
    setSortBy('default')
    setSearchParams({})
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand))
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'reviews':
        result.sort((a, b) => b.reviews - a.reviews)
        break
      case 'discount':
        result.sort((a, b) => b.discount - a.discount)
        break
      default:
        break
    }

    return result
  }, [searchQuery, selectedCategories, selectedBrands, priceRange, sortBy])

  const hasActiveFilters =
    searchQuery || selectedCategories.length > 0 || selectedBrands.length > 0 || sortBy !== 'default'

  const FilterPanel = () => (
    <div className="space-y-6">

      {/* Search */}
      <div>
        <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
          Search
        </p>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search supplements..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
          Category
        </p>
        <div className="space-y-2">
          {ALL_CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                onClick={() => toggleCategory(cat)}
                className={`w-4 h-4 rounded flex items-center justify-center border transition-all duration-200 flex-shrink-0 ${
                  selectedCategories.includes(cat)
                    ? 'bg-primary border-primary'
                    : 'border-white/20 group-hover:border-white/40'
                }`}
              >
                {selectedCategories.includes(cat) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <span
                onClick={() => toggleCategory(cat)}
                className={`text-sm transition-colors duration-200 ${
                  selectedCategories.includes(cat)
                    ? 'text-white'
                    : 'text-white/50 group-hover:text-white/80'
                }`}
              >
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
          Brand
        </p>
        <div className="space-y-2">
          {ALL_BRANDS.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                onClick={() => toggleBrand(brand)}
                className={`w-4 h-4 rounded flex items-center justify-center border transition-all duration-200 flex-shrink-0 ${
                  selectedBrands.includes(brand)
                    ? 'bg-primary border-primary'
                    : 'border-white/20 group-hover:border-white/40'
                }`}
              >
                {selectedBrands.includes(brand) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <span
                onClick={() => toggleBrand(brand)}
                className={`text-sm transition-colors duration-200 ${
                  selectedBrands.includes(brand)
                    ? 'text-white'
                    : 'text-white/50 group-hover:text-white/80'
                }`}
              >
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">
          Max Price: ₹{priceRange[1].toLocaleString()}
        </p>
        <input
          type="range"
          min={0}
          max={4000}
          step={100}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full accent-primary cursor-pointer"
        />
        <div className="flex justify-between text-white/30 text-xs mt-1">
          <span>₹0</span>
          <span>₹4,000</span>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/30 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
        >
          <X size={14} />
          Clear All Filters
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#212121] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">
            All <span className="gradient-text">Products</span>
          </h1>
          <p className="text-white/40 text-base">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </motion.div>

        <div className="flex gap-8">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="glass rounded-2xl p-6 border border-white/5 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-base flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-primary" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
              </div>
              <FilterPanel />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">

            {/* Mobile Filter + Sort Bar */}
            <div className="flex items-center gap-3 mb-6 lg:hidden">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex-1 glass rounded-xl py-2.5 px-4 text-sm font-medium text-white/70 flex items-center justify-center gap-2 border border-white/5"
              >
                <SlidersHorizontal size={15} />
                Filters
                {hasActiveFilters && (
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="relative flex-1">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="w-full glass rounded-xl py-2.5 px-4 text-sm font-medium text-white/70 flex items-center justify-center gap-2 border border-white/5"
                >
                  Sort
                  <ChevronDown size={14} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 left-0 right-0 glass rounded-xl border border-white/10 overflow-hidden z-20"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => { setSortBy(opt.value); setIsSortOpen(false) }}
                          className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                            sortBy === opt.value
                              ? 'text-primary bg-primary/10'
                              : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop Sort Bar */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-white/40 text-sm">
                Showing <span className="text-white font-semibold">{filteredProducts.length}</span> results
              </p>
              <div className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="glass rounded-xl py-2 px-4 text-sm font-medium text-white/70 flex items-center gap-2 border border-white/5 hover:border-white/20 transition-colors"
                >
                  {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                  <ChevronDown size={14} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 right-0 w-52 glass rounded-xl border border-white/10 overflow-hidden z-20"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => { setSortBy(opt.value); setIsSortOpen(false) }}
                          className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                            sortBy === opt.value
                              ? 'text-primary bg-primary/10'
                              : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Active Filter Tags */}
            {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map((cat) => (
                  <motion.span
                    key={cat}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="inline-flex items-center gap-1.5 bg-primary/20 border border-primary/30 text-primary text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {cat}
                    <X
                      size={12}
                      className="cursor-pointer hover:text-white transition-colors"
                      onClick={() => toggleCategory(cat)}
                    />
                  </motion.span>
                ))}
                {selectedBrands.map((brand) => (
                  <motion.span
                    key={brand}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/30 text-accent text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {brand}
                    <X
                      size={12}
                      className="cursor-pointer hover:text-white transition-colors"
                      onClick={() => toggleBrand(brand)}
                    />
                  </motion.span>
                ))}
              </div>
            )}

            {/* Product Grid */}
            <AnimatePresence mode="wait">
              {filteredProducts.length > 0 ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-24"
                >
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={32} className="text-white/20" />
                  </div>
                  <h3 className="text-white/60 font-semibold text-lg mb-2">No products found</h3>
                  <p className="text-white/30 text-sm mb-6">Try adjusting your filters or search query</p>
                  <button
                    onClick={clearFilters}
                    className="btn-primary text-sm px-6 py-2.5"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-[#212121] border-r border-white/10 z-50 overflow-y-auto lg:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-white font-bold text-lg flex items-center gap-2">
                    <SlidersHorizontal size={18} className="text-primary" />
                    Filters
                  </h2>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="w-8 h-8 glass rounded-lg flex items-center justify-center"
                  >
                    <X size={16} className="text-white/70" />
                  </button>
                </div>
                <FilterPanel />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProductListing