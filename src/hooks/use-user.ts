import { User } from '@/server/db/schema'
import { cookies } from 'next/headers'
import { useState } from 'react'

export async function useUser() {
  const cookie = await cookies()
  const userCookie = cookie.get('user')
  let user = null
  try {
    user = userCookie ? JSON.parse(userCookie.value) as Omit<User, 'passwordHash'> : null
  } catch (_e) {

  }
  // const [user, setUser] = useState<Omit<User, 'passwordHash'> | null>(user_)

  // useEffect(() => {
  //   const getUser = async () => {
  //     const user = await getUserFromLocalStorage()
  //     setUser(user)
  //   }
  //   getUser()
  // }, [])

  return { user }
}