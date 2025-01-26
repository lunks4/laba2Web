import { db } from '.'
import { NewBanner, users as usersTable, services as servicesTable, banners as bannersTable, categories as categoriesTable, type NewService, type NewUser, NewCategory } from './schema'
import { hash } from 'argon2'

const makeUsers = async () => {
  const users: NewUser[] = [
    {
      email: 'uuu@uuu.com',
      firstname: 'Артемий',
      lastname: 'Набойщиков',
      middlename: 'Андреевич',
      phone: '+74951234567',
      passwordHash: await hash('uuuu')
    }
  ]
  return users
}

const categories: NewCategory[] = [
  {
    id: 1,
    title: 'Авто',
    slug: 'auto',
    icon: 'Car',
  },
  {
    id: 2,
    title: 'Здоровье',
    slug: 'health',
    icon: 'Heart',
  },
  {
    id: 3,
    title: 'Иммущество',
    slug: 'property',
    icon: 'Home',
  },
]

const services: NewService[] = [
  {
    categoryId: 1,
    title: 'Каско',
    slug: 'kasko',
    description: 'Полная защита вашего автомобиля и ответственности на дороге.',
    img: '/images/services/kasko.jpg',
    price: 35000,
  },
  {
    categoryId: 1,
    title: 'ОСАГО',
    slug: 'osago',
    description: 'Полис ОСАГО — это обязательное страхование автогражданской ответственности за причинение вреда жизни, здоровью и имуществу третьих лиц при эксплуатации автомобиля.',
    img: '/images/services/osago.jpg',
    price: 23000,
  },
  {
    categoryId: 2,
    title: 'Спортсменам',
    slug: 'sportsman',
    description: 'Защита от разных рисков, связанных с поездками, начиная с затрат на лечение и заканчивая отменой поездки.',
    img: '/images/services/sportsman.jpg',
    price: 15000,
  },
  {
    categoryId: 2,
    title: 'Несчастный случай',
    slug: 'accident',
    description: 'Индивидуальные решения для всесторонней защиты.',
    img: '/images/services/accident.jpg',
    price: 45000,
  },
  {
    categoryId: 3,
    title: 'Ипотека',
    slug: 'ipoteka',
    description: 'Комплексная защита при покупке недвижимости в ипотеку',
    img: '/images/services/ipoteka.jpg',
    price: 50000,
  },
  {
    categoryId: 3,
    title: 'Квартира и дом',
    slug: 'house',
    description: 'Защита от пожара, затопления, кражи и повреждения имущества',
    img: '/images/services/house.jpg',
    price: 50000,
  },
]

const banners: NewBanner[] = [
  {
    img: '/carousel/1.jpeg',
    alt: 'Carousel 1',
    title:
      'Директором Центрально-Черноземной региональной дирекции «Гелиос» назначен Александр Томаленко',
    url: 'https://www.skgelios.ru/news/direktorom-tsentralno-chernozemnoy-regionalnoy-direktsii-gelios-naznachen-aleksandr-tomalenko/',
  },
  {
    img: '/carousel/2.jpeg',
    alt: 'Carousel 2',
    title:
      '«Гелиос» расширяет территориальное присутствие в регионах и объявляет о новых офисах в Москве',
    url: 'https://www.skgelios.ru/news/gelios-rasshiryaet-territorialnoe-prisutstvie-v-regionakh-i-obyavlyaet-o-novykh-ofisakh-v-moskve/',
  },
  {
    img: '/carousel/3.jpeg',
    alt: 'Carousel 3',
    title: 'Розничные продажи в Страховой Компании «Гелиос» возглавил Никита Нечаев',
    url: 'https://www.skgelios.ru/news/roznichnye-prodazhi-v-strakhovoy-kompanii-gelios-vozglavil-nikita-nechaev/',
  },
  {
    img: '/carousel/4.jpeg',
    alt: 'Carousel 4',
    title: 'Департамент урегулирования убытков в «Гелиос» возглавил Евгений Степанов',
    url: 'https://www.skgelios.ru/news/departament-uregulirovaniya-ubytkov-v-gelios-vozglavil-evgeniy-stepanov-/',
  },
]

const seed = async () => {
  console.log('Seeding database...')
  await db.insert(usersTable).values(await makeUsers())
  await db.insert(categoriesTable).values(categories)
  await db.insert(servicesTable).values(services)
  await db.insert(bannersTable).values(banners)
  console.log('Database seeded.')
}

seed()

