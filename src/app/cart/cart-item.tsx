'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type CartItem } from '../providers/cart-provider'

interface CartItemProps {
  item: CartItem
  onRemove: () => void
  onUpdateQuantity: (quantity: number) => void
}

export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value)
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      onUpdateQuantity(newQuantity)
    }
  }

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{item.service.title}</h3>
        <p className="text-gray-600">{item.service.price} ₽</p>
      </div>
      <div className="flex items-center gap-4">
        <Input
          type="number"
          min={1}
          max={10}
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-20"
        />
        <Button variant="destructive" onClick={onRemove}>
          Удалить
        </Button>
      </div>
    </div>
  )
}
