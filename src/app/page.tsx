import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { db } from '@/server/db'
import { services as servicesTable } from '@/server/db/schema'
import { Shield, Home, Car, Plane, Heart, Phone, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'
import IconFromDb from './IconFromDb'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default async function LandingPage() {
  const services = await db.select().from(servicesTable)

  return (
    <div className="flex flex-col min-h-screen justify-center">
      <Header />
      <main className="flex-1">
        <div className="">
          <section className="flex justify-center w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center text-white mx-auto">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Надежная защита с Гелиос
                </h1>
                <p className="mx-auto max-w-[700px] text-lg sm:text-xl">
                  Мы предоставляем широкий спектр страховых услуг для вашего спокойствия и
                  уверенности в завтрашнем дне.
                </p>
                <Button className="bg-white text-primary hover:bg-primary-foreground">
                  Получить консультацию
                </Button>
              </div>
            </div>
          </section>
          <section id="services" className="flex justify-center w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                Наши услуги
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {services.map((service, index) => (
                  <Card key={index} className="flex flex-col justify-between">
                    <CardHeader>
                      <IconFromDb icon={service.icon} />
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/catalog/${service.slug}`}>Подробнее</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          <section
            id="about"
            className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-muted"
          >
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                О компании Гелиос
              </h2>
              <p className="mx-auto max-w-[700px] text-lg sm:text-xl text-center mb-8">
                Гелиос - это надежная страховая компания с многолетним опытом работы на рынке. Мы
                стремимся обеспечить нашим клиентам максимальную защиту и спокойствие.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="text-2xl font-bold mb-2">20+</h3>
                  <p>лет на рынке</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">100 000+</h3>
                  <p>довольных клиентов</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">99%</h3>
                  <p>положительных отзывов</p>
                </div>
              </div>
            </div>
          </section>
          <section id="contact" className="flex justify-center w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                Свяжитесь с нами
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <Phone className="w-8 h-8 mb-2 mx-auto text-primary" />
                  <p>+7 (123) 456-78-90</p>
                </div>
                <div>
                  <Mail className="w-8 h-8 mb-2 mx-auto text-primary" />
                  <p>info@gelios-insurance.ru</p>
                </div>
                <div>
                  <MapPin className="w-8 h-8 mb-2 mx-auto text-primary" />
                  <p>г. Москва, ул. Страховая, д. 1</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
