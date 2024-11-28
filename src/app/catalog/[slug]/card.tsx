'use client'

import IconFromDb from '@/app/IconFromDb'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { Service } from '@/server/db/schema'

export default function Card({ service }: { service: Service }) {
  const { addItem, updateItem, useIsInCart } = useCart()
  const isInCart = useIsInCart(service.id)

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-6">
        <IconFromDb icon={service.icon} />
      </div>
      <h1 className="text-2xl font-bold text-center mb-4">Умные Часы X3000</h1>
      <p className="text-gray-600 mb-6 text-center">
        Инновационные умные часы с расширенным мониторингом здоровья, длительным временем работы от
        батареи и элегантным дизайном.
      </p>
      <div className="text-3xl font-bold text-center mb-6">14 999 ₽</div>
      {!isInCart && (
        <Button onClick={() => addItem(service)} className="w-full">
          Добавить в корзину
        </Button>
      )}
      {isInCart && (
        <Button onClick={() => updateItem(service.id, 0)} className="w-full">
          Удалить из корзины
        </Button>
      )}
    </div>
  )
}
