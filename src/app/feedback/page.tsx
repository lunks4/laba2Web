import Footer from '@/components/footer'
import { getServices } from '@/actions'
import { useUser } from '@/hooks/use-user'
import Header from '@/components/header'
import FeedbackForm from './form'
import { redirect } from 'next/navigation'

export default async function FeedbackPage() {
  const services = await getServices()
  const { user } = await useUser()
  if (!user) redirect('/login')

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="h-dvh">
        <Header />
        <FeedbackForm user={user} services={services} />
      </div>
      <Footer />
    </div>
  )
}
