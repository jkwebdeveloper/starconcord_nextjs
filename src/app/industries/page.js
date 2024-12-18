"use client";
import CommonBanner from "@/components/global/CommonBanner";
import PageLoader from "@/components/ui/pageloader";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const IndustriesSection = () => {
  const [industries, setIndustries] = useState({ industry: [] });
  const [loading, setLoading] = useState(false);

  const handleGetIndustries = () => {
    setLoading(true);
    axios("https://starconcord.com.in/scbk/api/industryList", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => {
        setIndustries(res.data.data || { industry: [] });
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetIndustries();
  }, []);

  return (
    <div className="container w-full mx-auto lg:space-y-20 space-y-7">
      {loading ? (
        <PageLoader />
      ) : (
        <>
          <CommonBanner
            image="/static/images/page title img.jpg"
            title="Industries"
            page="Industries"
          />
          <div className="px-0 pb-20 xl:px-10 space-y-14">
            <div className="grid items-center grid-cols-1 gap-3 md:grid-cols-2">
              <p className="text-4xl font-bold text-[#1B1B1B]">
                {industries?.config?.indTitle}
              </p>
              <p className="text-[#1B1B1B]">
                {industries?.config?.indDescription}
              </p>
            </div>
            <div className="grid items-start justify-center grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {industries?.industry && industries.industry.length > 0 ? (
                industries.industry.map((item) => (
                  <Link
                    href={`/industries-detail/${item.alias}`}
                    // state={{ id: item.alias }}
                    key={item.alias}
                  >
                    <div className="relative">
                      <div className="relative w-full mx-auto overflow-hidden h-80 rounded-xl">
                        <Image
                          src={`https://starconcord.com.in/scbk/uploads/${item?.banners}`}
                          // src={`https://starconcord.com.in/scbk/uploads/[1731061631688stock-photo-gateway-of-india-mumbai-maharashtra-india-mumbai-famous-landmark-1640476336.jpg]`}
                          alt={item?.industryName}
                          loading="lazy"
                          layout="fill"
                          style={{ objectFit: 'cover' }}
                          quality={100}
                          className="z-0 object-cover transition-all duration-300 hover:scale-110"
                        />
                      </div>
                      <div className="absolute bottom-0 p-4 space-y-2">
                        <p className="font-bold text-white capitalize">
                          {item?.industryName}
                        </p>
                        <hr className="w-full h-0.5 border-t-0 bg-white dark:bg-white/10" />
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>
                  No industries available at the moment. Please check back
                  later.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IndustriesSection;
