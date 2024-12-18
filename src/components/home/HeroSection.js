"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import PageLoader from "../ui/pageloader";

const HeroSection = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const [banners, setBanners] = useState({});
  const [loading, setLoading] = useState(false);

  const handleGetBanners = () => {
    setLoading(true);
    axios("https://starconcord.com.in/scbk/api/homePage", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => {
        setBanners(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetBanners();
  }, []);
  return (
    <div className="container relative w-full mx-auto">
      {loading ? (
        <PageLoader />
      ) : (
        banners.bannerOne && (
          <>
            <div className="relative w-full mx-auto overflow-hidden lg:min-h-screen h-80 rounded-xl">
              <Image
                src={`https://starconcord.com.in/scbk/uploads/${banners.bannerOne}`}
                alt=""
                loading="lazy"
                layout="fill"
                style={{ objectFit: 'cover' }}
                quality={100}
                className="z-0 object-cover transition-all duration-300 hover:scale-110"
              />
            </div>
            <div className="absolute left-0 flex items-center justify-center w-full h-full md:top-0 -top-6">
              <div className="text-center md:space-y-7">
                <div
                  className="md:w-1/2 w-[90%] leading-8 mx-auto text-base font-bold text-center hcontent tag text-white lg:text-5xl"
                  dangerouslySetInnerHTML={{ __html: banners?.bannerOneText }}
                ></div>
                <div
                  className="md:w-1/2 mx-auto mt-2 text-[12px] px-4 text-center text-white lg:mt-4 hcontent tag lg:w-auto lg:text-sm"
                  dangerouslySetInnerHTML={{
                    __html: banners?.bannerOneSubText,
                  }}
                ></div>
              </div>
            </div>
            <div className="container absolute bottom-0 grid grid-cols-2 gap-1 p-3 mx-auto text-sm text-white md:grid-cols-4 md:gap-5 lg:p-4 lg:text-lg">
              {banners.bannerLinks.map((item) => {
                return (
                  <Link href={item?.link} key={item?._id}>
                    <div className="px-5 space-y-2" key={item._id}>
                      <p className="cursor-pointer hover:font-semibold w-[70%] leading-10 border-b-2 border-white hover:border-primary_color">
                        {item?.name}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default HeroSection;
