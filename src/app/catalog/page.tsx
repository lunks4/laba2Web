import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import IconFromDb from '../IconFromDb'
import { getServices } from '@/actions'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ search: string | string[] | undefined }>
}) {
  const search = (await searchParams).search?.toString() ?? ''

  const services = await getServices({ search })

  const filteredServices = services.filter(service => {
    return (
      service.title.toLowerCase().includes(search.toLowerCase()) ||
      service.description.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <form action="/catalog" className="flex flex-nowrap m-2 gap-2">
            <Input
              type="text"
              name="search"
              placeholder="Введите название услуги"
              className="rounded-xl"
            ></Input>
            <Button className="min-w-20 rounded-xl">Поиск</Button>
          </form>

          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Наши услуги</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service, index) => (
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
        </div>
      </main>

      <Footer />
    </div>
  )
}
