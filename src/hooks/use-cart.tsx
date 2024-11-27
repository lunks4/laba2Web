import { CartContext } from '@/app/providers/cart-provider'
import { useContext } from 'react'

export const useCart = () => useContext(CartContext)
