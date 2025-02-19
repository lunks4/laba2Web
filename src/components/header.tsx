import { useUser } from '@/hooks/use-user'
import { Shield } from 'lucide-react'
import Link from 'next/link'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { logout } from '@/actions'

export default async function Header() {
  const { user } = await useUser()

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center">
      <Link className="flex items-center justify-center" href="/">
        <Shield className="h-6 w-6 text-primary" />
        <span className="ml-2 text-2xl font-bold text-primary">Гелиос</span>
      </Link>
      <div className="ml-8 flex gap-4">
        {!user && (
          <>
            <Link className="flex items-center justify-center" href="/login">
              <span className="text-base font-medium hover:underline underline-offset-4">
                Войти
              </span>
            </Link>
            <Link className="flex items-center justify-center" href="/register">
              <span className="text-base font-medium hover:underline underline-offset-4">
                Зарегистрироваться
              </span>
            </Link>
          </>
        )}
        {user && (
          <Popover>
            <PopoverTrigger>
              {user.lastname} {user.firstname}
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <Button onClick={logout} variant={'destructive'}>
                Выйти
              </Button>
            </PopoverContent>
          </Popover>
        )}
      </div>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/catalog">
          Услуги
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/#about">
          О нас
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/#contact">
          Контакты
        </Link>
      </nav>
    </header>
  )
}
