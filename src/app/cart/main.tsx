'use client'
import { useEffect } from 'react'
import { CartItem } from './cart-item'
import { CartSummary } from './cart-summary'
import { useCart } from '@/hooks/use-cart'
import { useToast } from '@/hooks/use-toast'
import { createOrder } from '@/actions'
import { User } from '@/server/db/schema'

export default function Main({ user }: { user: { id: number } }) {
  const { items, load, clear, updateItem } = useCart()
  const { toast } = useToast()
  useEffect(load, [])

  const onPurchase = async () => {
    await createOrder({ cartItems: items, userId: user.id })
    clear()
    toast({
      title: 'Заказ оформлен',
      description:
        'Ваш заказ оформлен и будет в рассмотрении на получение консультации с нашим специалистом.',
    })
  }

  return (
    <main className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>
      {items.length === 0 ? (
        <p className="text-xl">Ваша корзина пуста</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {items.map(item => (
              <CartItem
                key={item.service.id}
                item={item}
                onRemove={() => updateItem(item.service.id, 0)}
                onUpdateQuantity={quantity => updateItem(item.service.id, quantity)}
              />
            ))}
          </div>
          <div className="md:col-span-1">
            <CartSummary onPurchase={onPurchase} items={items} />
          </div>
        </div>
      )}
    </main>
  )
}
