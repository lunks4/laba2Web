'use client'

import IconFromDb from '@/app/IconFromDb'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { useUser } from '@/hooks/use-user'
import { Service } from '@/server/db/schema'
import Image from 'next/image'

export default function Card({ service, loggedIn }: { service: Service; loggedIn: boolean }) {
  const { addItem, updateItem, useIsInCart } = useCart()
  const isInCart = useIsInCart(service.id)

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <Image
        src={service.img}
        alt={service.title}
        width={200}
        height={200}
        className="w-full object-fill aspect-video"
      />
      <h1 className="text-2xl font-bold mt-4 mb-4">{service.title}</h1>
      <p className="text-gray-600 mb-6">{service.description}</p>
      <div className="text-3xl font-bold text-center mb-6">{service.price} ₽</div>
      {loggedIn && (
        <>
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
        </>
      )}
      {!loggedIn && (
        <p className="text-yellow-700 "> Войдите в систему, чтобы добавить в корзину</p>
      )}
    </div>
  )
}
