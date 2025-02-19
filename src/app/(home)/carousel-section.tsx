'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { Banner } from '@/server/db/schema'

import Autoplay from 'embla-carousel-autoplay'

export default function CarouselSection({ banners }: { banners: Banner[] }) {
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
              {banners.map(item => (
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
