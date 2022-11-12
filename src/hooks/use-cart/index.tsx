import { createContext, useContext, useEffect, useState } from 'react'
import { CardProps } from '../../atomic/molecule/Card'
import api from '../../service/api'
import { formatPrice } from '../../utils/format-price'


type CartItem = {
  subTotal: string
} & CardProps

export type CartContextData = {
  items: CartItem[]
  quantity: number
  total: string
  isInCart: (id: string) => boolean
  addToCart: (id: string) => void
  removeToCart: (id: string) => void
  clearCart: () => void
  loading: boolean
  getCartItems: () => void
  handleIncrement: (id: string)=> void
  handleDecrement: (id: string) => void
}

export const CartContextDefaultValues = {
  items: [],
  quantity: 0,
  total: '$0.00',
  isInCart: () => false,
  addToCart: () => null,
  removeToCart: () => null,
  clearCart: () => null,
  getCartItems: () => null,
  loading: false,
  handleIncrement: (id: string) => null,
  handleDecrement: (id: string ) => null
}

export const CartContext = createContext<CartContextData>(
  CartContextDefaultValues
)

export type CartProviderProps = {
  children: React.ReactNode
}

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<string[]>([])
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState<CartItem[]>([])

  
    async function getCartItems() {
      if(cartItems.length === 0) return 
      setLoading(true)
      try {

        const url = `equipments?${cartItems.map(id => `id=${id}`).toString()}`
        const parsedUrl = url.replace(/,/g, '&')
        const {data} = await api.get(parsedUrl)
        //TODO criar um mapper
        const formatResponse = data.map((equipment: CardProps)  => ({
          ...equipment,
          formatPrice: formatPrice(equipment.price),
          amount: 1,
          subTotal:  formatPrice(equipment.price)
        }))

        console.log('renan', formatResponse)

      setData(formatResponse)
      } catch(err) {
        alert('erro')
        console.log(err)
      } finally {
       setLoading(false)
      }
    }
    
   

  const total = data?.reduce((initialValue, equipment) => {
    return initialValue + equipment.price * Number(equipment?.amount)
  }, 0)

  const isInCart = (id: string) => {
    return cartItems.includes(id)
  }

  
  const saveCart = (cartItems: string[]) => {
    setCartItems(cartItems)
  }

  const addToCart = (id: string) => {
    const newItems = [...cartItems, id]
    saveCart(newItems)
  }

  const removeToCart = (id: string) => {
    const ids = cartItems.filter((cartItem) => cartItem !== id)
    const items = data.filter((i) => i.id !== id)
    saveCart(ids)
    setData(items)
  }

  const handleIncrement = (id: string) => {
    const u = data.map(itemOnCart => {
      if(itemOnCart.id === id) {
        
        return {
          ...itemOnCart,
          amount: itemOnCart.amount += 1,
          subTotal:  formatPrice(itemOnCart.amount * itemOnCart.price)
        }
      } else {
        return itemOnCart
      }
    })

    setData(u)
  }

  const handleDecrement = (id: string) => {
    const result = data.map(itemOnCart => {
     
      if(itemOnCart.id === id) {
        console.log(itemOnCart)
        if(itemOnCart.amount === 1) return itemOnCart

        return {
          ...itemOnCart,
          amount: itemOnCart!.amount = itemOnCart!.amount - 1,
          subTotal:  formatPrice(itemOnCart?.amount * itemOnCart.price)
        }
      } else {
        return itemOnCart
      }
    })

    setData(result)
  }

  const clearCart = () => {
    saveCart([])
  }

  return (
    <CartContext.Provider
      value={{
        items: data,
        quantity: cartItems.length,
        total: formatPrice(total || 0),
        isInCart,
        addToCart,
        removeToCart,
        clearCart,
        loading: isLoading,
        getCartItems,
        handleIncrement,
        handleDecrement,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart }