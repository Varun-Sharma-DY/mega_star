import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  cartItems: [],

  addToCart: (product, selectedVariant) => {
    const { cartItems } = get()
    const existingItem = cartItems.find(
      (item) => item.id === product.id && item.selectedVariant === selectedVariant
    )

    if (existingItem) {
      set({
        cartItems: cartItems.map((item) =>
          item.id === product.id && item.selectedVariant === selectedVariant
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      })
    } else {
      set({
        cartItems: [
          ...cartItems,
          {
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            originalPrice: product.originalPrice,
            discount: product.discount,
            image: product.image,
            selectedVariant: selectedVariant || product.variants[0],
            quantity: 1,
          },
        ],
      })
    }
  },

  removeFromCart: (id, selectedVariant) => {
    set({
      cartItems: get().cartItems.filter(
        (item) => !(item.id === id && item.selectedVariant === selectedVariant)
      ),
    })
  },

  updateQuantity: (id, selectedVariant, quantity) => {
    if (quantity < 1) return
    set({
      cartItems: get().cartItems.map((item) =>
        item.id === id && item.selectedVariant === selectedVariant
          ? { ...item, quantity }
          : item
      ),
    })
  },

  clearCart: () => set({ cartItems: [] }),

  getTotalItems: () => {
    return get().cartItems.reduce((total, item) => total + item.quantity, 0)
  },

  getTotalPrice: () => {
    return get().cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  },

  getTotalSavings: () => {
    return get().cartItems.reduce(
      (total, item) =>
        total + (item.originalPrice - item.price) * item.quantity,
      0
    )
  },
}))

export default useCartStore