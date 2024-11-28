'use client'

import { createContext, useMemo, useState } from 'react'
import { Service } from '@/server/db/schema'

export type CartItem = {
  service: Service
  quantity: number
}

export type CartContextType = {
  items: CartItem[]
  addItem: (service: Service) => void
  updateItem: (serviceId: number, quantity: number) => void
  clear: () => void
  useIsInCart: (serviceId: number) => boolean
  load: () => void
}

export const CartContext = createContext<CartContextType>({} as CartContextType)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])

  const load = () => {
    try {
      const items = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[]
      console.log('Cart loaded', items)
      setItems(items)
    } catch (_e) {}
  }

  const addItem = (service: Service) => {
    const items_ = [...items, { service, quantity: 1 }]
    localStorage.setItem('cart', JSON.stringify(items_))
    setItems(items_)
  }

  const updateItem = (serviceId: number, quantity: number) => {
    if (quantity === 0) {
      const items_ = items.filter(i => i.service.id !== serviceId)
      localStorage.setItem('cart', JSON.stringify(items_))
      setItems(items_)
    } else {
      const items_ = items.map(i => (i.service.id === serviceId ? { ...i, quantity } : i))
      localStorage.setItem('cart', JSON.stringify(items_))
      setItems(items_)
    }
    console.log('Cart updated', items)
  }

  const isInStore = (serviceId: number, items: CartItem[]) =>
    items.some(i => i.service.id === serviceId)

  const useIsInCart = (serviceId: number) =>
    useMemo(() => isInStore(serviceId, items), [serviceId, items])

  const clear = () => {
    localStorage.removeItem('cart')
    setItems([])
  }

  return (
    <CartContext.Provider value={{ items, addItem, updateItem, clear, useIsInCart, load }}>
      {children}
    </CartContext.Provider>
  )
}
