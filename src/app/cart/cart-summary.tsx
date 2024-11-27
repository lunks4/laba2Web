import { Button } from '@/components/ui/button'
import { CartItem } from '../providers/cart-provider'

interface CartSummaryProps {
  items: CartItem[]
  onPurchase: () => void
}

export function CartSummary({ items, onPurchase }: CartSummaryProps) {
  const total = items.reduce((sum, item) => sum + item.service.price * item.quantity, 0)

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Итого</h2>
      <div className="flex justify-between mb-4">
        <span>Сумма:</span>
        <span>{total} ₽</span>
      </div>
      <Button onClick={onPurchase} className="w-full">
        Оформить заказ
      </Button>
    </div>
  )
}
