import Footer from '@/components/footer'
import Header from '@/components/header'
import { db } from '@/server/db'
import { services } from '@/server/db/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import Card from './card'

export default async function ServicePage({ params: { slug } }: { params: { slug: string } }) {
  const service = await db.query.services.findFirst({ where: eq(services.slug, slug) })
  if (!service) redirect('/catalog')

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Card service={service} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
