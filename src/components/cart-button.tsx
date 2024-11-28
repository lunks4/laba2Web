import { redirect, useRouter } from 'next/navigation'
import { Button, buttonVariants } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '@/hooks/use-user'

export async function CartButton() {
  const { user } = await useUser()

  const handleClick = () => {
    redirect('/cart')
  }

  return (
    user && (
      <Link
        href={'/cart'}
        className="flex justify-center bg-primary items-center fixed bottom-4 right-4 rounded-full w-16 h-16 shadow-lg"
      >
        <ShoppingCart className="w-6 h-6 text-background" />
      </Link>
    )
  )
}
