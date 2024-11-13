"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import PageLoader from "../ui/pageloader";
import Link from "next/link";

const ServiceImage = () => {
  const [serviceData, setServiceData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleGetTransport = () => {
    setLoading(true);
    axios("https://starconcord.com.in/scbk/api/homePage", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => {
        setServiceData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetTransport();
  }, []);
  return (
    <div className="relative w-full mx-auto space-y-2 text-center lg:space-y-4">
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <div className="relative w-full mx-auto overflow-hidden lg:min-h-screen h-80 rounded-xl">
            <Image
              src={`https://starconcord.com.in/scbk/uploads/${serviceData?.bannerThree}`}
              alt="banner"
              loading="lazy"
              width={900}
              height={900}
              className="object-cover w-full h-full rounded-xl "
            />
          </div>
          <div className="absolute top-0 flex items-center justify-start w-full h-full text-left">
            <div className="mx-5 space-y-2 lg:space-y-6 lg:mx-28">
              <div
                className="text-base font-bold text-justify text-white md:text-2xl lg:text-5xl"
                dangerouslySetInnerHTML={{
                  __html: serviceData?.bannerThreeText,
                }}
              ></div>
              <div
                className="text-sm text-white md:base hcontent tag"
                dangerouslySetInnerHTML={{
                  __html: serviceData?.bannerThreeSubText,
                }}
              ></div>
              <Link href="/contact-us">
                <Button variant="primary" className="mt-5">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceImage;
