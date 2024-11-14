import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import Footer from '@/components/footer'
import { getServices } from '@/actions'
import { useUser } from '@/hooks/use-user'
import Header from '@/components/header'
import FeedbackForm from './form'

export default async function FeedbackPage() {
  const services = await getServices()
  const { user } = await useUser()

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      {!user && <div className="m-10 h-dvh">Войдите, чтобы оставить отзыв</div>}
      {user && <FeedbackForm user={user} services={services} />}
      <Footer />
    </div>
  )
}
