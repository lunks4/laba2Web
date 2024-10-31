
import { Shield, Home, Car, Heart} from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from '@/components/ui/input'

const services = [
  {
    icon: <Home className="h-8 w-8 mb-2 text-primary" />,
    title: "Страхование имущества",
    description: "Защитите свой дом и имущество от непредвиденных ситуаций.",
    link: "/services/property"
  },
  {
    icon: <Car className="h-8 w-8 mb-2 text-primary" />,
    title: "Авто",
    description: "Полная защита вашего автомобиля и ответственности на дороге.",
    link: "/services/auto"
  },
  {
    icon: <Heart className="h-8 w-8 mb-2 text-primary" />,
    title: "Здоровье",
    description: "Забота о вашем здоровье с нашими медицинскими страховыми планами.",
    link: "/services/health"
  },
  {
    icon: <Shield className="h-8 w-8 mb-2 text-primary" />,
    title: "Комплексные",
    description: "Индивидуальные решения для всесторонней защиты.",
    link: "/services/comprehensive"
  },
  {
    icon: <Shield className="h-8 w-8 mb-2 text-primary" />,
    title: "Путешествия",
    description: "Защита от разных рисков, связанных с поездками, начиная с затрат на лечение и заканчивая отменой поездки.",
    link: "/services/travel"
  },
  {
    icon: <Shield className="h-8 w-8 mb-2 text-primary" />,
    title: "ОСАГО",
    description: "Полис ОСАГО — это обязательное страхование автогражданской ответственности за причинение вреда жизни, здоровью и имуществу третьих лиц при эксплуатации автомобиля.",
    link: "/services/osago"
  }
]

export default function ServicesPage() {
   
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-white">
        <Link className="flex items-center justify-center" href="/">
          <Shield className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold text-primary">Гелиос</span>
        </Link>
        <Link className="flex items-center justify-center ml-5" href="/login">
          <span className="text-base font-medium hover:underline underline-offset-4">Войти</span>
        </Link>
        <Link className="flex items-center justify-center ml-5" href="/register">
          <span className="text-base font-medium hover:underline underline-offset-4">Зарегистрироваться</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/catalog">
            Услуги
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
            О нас
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
            Контакты
          </Link>
        </nav>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="flex flex-nowrap m-2 gap-2">
                <Input type='text' placeholder="Введите название услуги" className="rounded-xl"></Input>
                <Button className='min-w-20 rounded-xl'>Поиск</Button>
            </div>

          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Наши услуги</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="flex flex-col justify-between">
                  <CardHeader>
                    {service.icon}
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={service.link}>Подробнее</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 Гелиос Страхование. Все права защищены.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/feedback">
            Обратная связь
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Политика конфиденциальности
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Условия использования
          </Link>
        </nav>
      </footer>
    </div>
  )
}