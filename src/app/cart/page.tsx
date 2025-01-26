import Footer from '@/components/footer'
import Header from '@/components/header'
import Main from './main'
import { useUser } from '@/hooks/use-user'
import { redirect } from 'next/navigation'

export default async function CartPage() {
  const { user } = await useUser()
  if (!user) redirect('/login')

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <Main user={user} />
      <Footer />
    </div>
  )
}
