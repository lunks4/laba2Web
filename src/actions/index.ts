'use server'

import { useUser } from '@/hooks/use-user'
import { db } from '@/server/db'
import { services as servicesTable, users as usersTable, feedbacks as feedbackTable } from '@/server/db/schema'
import { hash, verify } from 'argon2'
import { eq, like, or, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { z } from 'zod'

export const getServices = async (params?: { search?: string }) => {
  const services = await db.select().from(servicesTable)

  if (!params?.search) return services
  const { search } = params

  const filteredServices = services.filter((service) => {
    return service.title.toLowerCase().includes(search.toLowerCase()) || service.description.toLowerCase().includes(search.toLowerCase())
  })
  return filteredServices
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})

export const login = async (loginData: typeof loginSchema._type) => {
  const res = loginSchema.safeParse(loginData)
  if (res.error)
    return {
      error: true,
      ...res.error.flatten().fieldErrors,
    }
  console.log(res)
  const user = (await db.select().from(usersTable).where(eq(usersTable.email, res.data.email)))[0]
  if (!user)
    return {
      error: true,
      message: 'Неверный email или пароль',
    }
  console.log(res.data)
  const verified = await verify(user.passwordHash, res.data.password)
  if (!verified)
    return {
      error: true,
      message: 'Неверный email или пароль',
    }
  const { passwordHash: _, ...safeUser } = user

  const cookie = await cookies()
  cookie.set('user', JSON.stringify(safeUser), { path: '/', httpOnly: true, maxAge: 60 * 60 * 2 })

  return {
    error: false,
    user: safeUser
  }
}

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(4),
  confirmPassword: z.string().min(4),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
})

export const register = async (registerData: typeof registerSchema._type) => {
  const res = registerSchema.safeParse(registerData)
  if (res.error)
    return {
      error: true,
      ...res.error.flatten().fieldErrors,
    }
  const existingUser = (await db.select().from(usersTable).where(eq(usersTable.email, res.data.email)))[0]
  if (existingUser)
    return {
      error: true,
      message: 'Пользователь с такой почтой уже существует',
    }

  const passwordHash = await hash(res.data.password)
  const user = (await db.insert(usersTable).values({
    name: res.data.name,
    email: res.data.email,
    passwordHash,
  }).returning())[0]!

  const { passwordHash: _, ...safeUser } = user

  const cookie = await cookies()
  cookie.set('user', JSON.stringify(safeUser), { path: '/', httpOnly: true, maxAge: 60 * 60 * 2 })

  return {
    error: false,
    user: safeUser
  }
}

export const logout = async () => {
  const cookie = await cookies()
  cookie.delete('user')
}

const createFeedbackSchema = z.object({
  serviceId: z.union([z.string(), z.number()]).refine(id => id !== '', { message: 'Не выбран тип страхования' }).transform(Number),
  subject: z.string().min(4),
  message: z.string().min(10),
})

export const createFeedback = async (feedbackData: typeof createFeedbackSchema._type) => {
  console.log('unparsed', feedbackData)
  const res = createFeedbackSchema.safeParse(feedbackData)
  if (res.error)
    return {
      error: true,
      ...res.error.flatten().fieldErrors,
    }
  console.log(res.data)

  const { user } = await useUser()
  if (!user)
    return {
      error: true,
      errorMessage: 'Пожалуйста, войдите в систему',
    }
  console.log(user)
  const feedback = (await db.insert(feedbackTable).values({
    userId: user.id,
    serviceId: res.data.serviceId,
    subject: res.data.subject,
    message: res.data.message,
  }).returning())[0]!

  return {
    error: false,
    feedback,
  }
}
