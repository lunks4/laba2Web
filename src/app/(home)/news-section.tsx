'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'

import Autoplay from 'embla-carousel-autoplay'

const carouselItems = [
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

export default function NewsSection() {
  return (
    <section className="flex justify-center w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Новости
        </h2>
        {window && (
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className="w-[800px] mx-auto"
          >
            <CarouselContent className="h-[400px]">
              {carouselItems.map(item => (
                <CarouselItem key={item.url} className="relative h-full w-full">
                  <a href={item.url} className="relative h-full w-full">
                    <img src={item.img} alt={item.alt} className="w-full" />
                    <div className="absolute top-5 inset-x-10 ">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </section>
  )
}
