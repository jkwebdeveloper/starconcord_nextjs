'use client'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import PageLoader from '../ui/pageloader'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Link from 'next/link'

const OurService = () => {
  const [service, setService] = useState([])
  const [loading, setLoading] = useState(false)

  const handleGetService = () => {
    setLoading(true)
    axios('https://starconcord.onrender.com/api/homePage', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
      .then((res) => {
        setService(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      })
  }

  useEffect(() => {
    handleGetService()
  }, [])

  const showCarouselControls = service?.ourServices?.length >= 6

  return (
    <div className="container w-full mx-auto space-y-6 text-center">
      <p className="text-xl font-bold lg:text-5xl">
        Other Value-Added Services
      </p>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="w-full">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {service?.ourServices?.length > 0 ? (
                service.ourServices.map((item) => (
                  <CarouselItem
                    className="md:basis-[50%] xl:basis-[20%] lg:basis-[20%]"
                    key={item?._id}
                  >
                    <>
                      <Link
                        href={`/service-detail/${item._id}`}
                        state={{ id: item._id }}
                        key={item?._id}
                      >
                        <div
                          className="bg-[#F7F9FB] rounded-lg p-5 pb-5 flex flex-col min-h-[350px]"
                          key={item._id}
                        >
                          <div className="flex">
                            <Image
                              src={`https://starconcord.onrender.com/uploads${item?.serviceIconImage}`}
                              // src="/static/images/Conveyor Belt 1 (2).png"
                              alt="unsplash"
                              loading="lazy"
                              width={160}
                              height={160}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-grow space-y-4"></div>
                          <div className="flex-col items-center justify-center w-full gap-3 mt-auto space-y-2">
                            <p className="text-2xl font-bold pb-2 text-[#104B59]">
                              {item?.serviceName}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </>
                  </CarouselItem>
                ))
              ) : (
                <p>No Services available</p>
              )}
            </CarouselContent>
            {showCarouselControls && (
              <>
                <CarouselPrevious className="hidden lg:block" />
                <CarouselNext className="hidden lg:block" />
              </>
            )}
          </Carousel>
        </div>
      )}
    </div>
  )
}

export default OurService
