import { db } from '.'
import { users as UsersTable, services as servicesTable, type NewService, type NewUser } from './schema'
import { hash } from 'argon2'

const makeUsers = async () => {
  const users: NewUser[] = [
    {
      email: 'uuu@uuu.com',
      name: 'Uuuuu',
      passwordHash: await hash('uuuu')
    }
  ]
  return users
}

const services: NewService[] = [
  {
    icon: 'Home',
    title: 'Страхование имущества',
    description: 'Защитите свой дом и имущество от непредвиденных ситуаций.',
    slug: 'property',
    price: 40000
  },
  {
    icon: 'Car',
    title: 'Авто',
    description: 'Полная защита вашего автомобиля и ответственности на дороге.',
    slug: 'auto',
    price: 35000
  },
  {
    icon: 'Heart',
    title: 'Здоровье',
    description: 'Забота о вашем здоровье с нашими медицинскими страховыми планами.',
    slug: 'health',
    price: 60000
  },
  {
    icon: 'Shield',
    title: 'Комплексные',
    description: 'Индивидуальные решения для всесторонней защиты.',
    slug: 'comprehensive',
    price: 45000
  },
  {
    icon: 'Shield',
    title: 'Путешествия',
    description: 'Защита от разных рисков, связанных с поездками, начиная с затрат на лечение и заканчивая отменой поездки.',
    slug: 'travel',
    price: 15000
  },
  {
    icon: 'Shield',
    title: 'ОСАГО',
    description: 'Полис ОСАГО — это обязательное страхование автогражданской ответственности за причинение вреда жизни, здоровью и имуществу третьих лиц при эксплуатации автомобиля.',
    slug: 'osago',
    price: 23000
  },
]

const seed = async () => {
  console.log('Seeding database...')
  await db.insert(UsersTable).values(await makeUsers())
  await db.insert(servicesTable).values(services)
  console.log('Database seeded.')
}

seed()

