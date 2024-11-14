"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import PageLoader from "../ui/pageloader";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const OurService = () => {
  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const handleGetService = () => {
    setLoading(true);
    axios("https://starconcord.com.in/scbk/api/homePage", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => {
        setService(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetService();
  }, []);

  useEffect(() => {
    const updateControlsVisibility = () => {
      const isDesktop = window.innerWidth > 1023;
      const hasEnoughItems = service?.ourServices?.length > 5;

      // Show controls on mobile/tablet or on desktop if there are more than 5 items
      setShowControls(!isDesktop || hasEnoughItems);
    };

    updateControlsVisibility();
    window.addEventListener("resize", updateControlsVisibility);

    return () => window.removeEventListener("resize", updateControlsVisibility);
  }, [service]);

  return (
    <div className="w-full mx-auto space-y-6 text-center">
      <p className="text-xl font-bold lg:text-5xl">
        Other Value-Added Services
      </p>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="w-full">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {service?.ourServices?.length > 0 ? (
                service.ourServices.map((item) => (
                  <CarouselItem
                    className="md:basis-[50%] xl:basis-[20%] lg:basis-[20%]"
                    key={item?.alias}
                  >
                    <>
                      <Link
                        href={`/service-detail/${item.alias}`}
                        state={{ id: item.alias }}
                        key={item?.alias}
                      >
                        <div
                          className="bg-[#F7F9FB] rounded-lg p-5 pb-5 flex flex-col min-h-[350px]"
                          key={item.alias}
                        >
                          <div className="flex mx-auto">
                            <Image
                              src={`https://starconcord.com.in/scbk/uploads/${item?.serviceIconImage}`}
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
                          <div className="flex items-center justify-center w-full gap-2">
                            <p className="text-[#104B59] text-sm font-bold">
                              READ MORE
                            </p>
                            <FaArrowRightLong className="text-[#104B59]" />
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
            {showControls && (
              <>
                <CarouselPrevious className="" />
                <CarouselNext className="" />
              </>
            )}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default OurService;
