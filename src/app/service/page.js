"use client"
import CommonBanner from '@/components/global/CommonBanner';
import PageLoader from '@/components/ui/pageloader';
import { Item } from '@radix-ui/react-accordion';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';

const ServicePage = () => {
    const [service, setService] = useState([]);
    const [otherText, setOtherText] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGetService = () => {
        setLoading(true);
        axios("https://starconcord.onrender.com/api/serviceList", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        })
            .then((res) => {
                console.log('API Response:', res.data.data);
                setService(res.data.data || []);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        handleGetService();
    }, []);

    const handleGetOtherText = () => {
        setLoading(true);
        axios("https://starconcord.onrender.com/api/otherContent", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        })
            .then((res) => {
                setOtherText(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        handleGetOtherText();
    }, []);

    return (
        <div className="container w-full mx-auto lg:space-y-20 space-y-7">
            {loading ? (
                <PageLoader />
            ) : (
                <>
                    <CommonBanner
                        image="/static/images/page title img.jpg"
                        title="Services"
                        page="Services"
                    />
                    <div className="grid items-start justify-center gap-5 px-3 lg:px-10 lg:grid-cols-2 xl:gap-40 md:gap-20">
                        <p className="text-4xl font-bold">{otherText?.serTitle}</p>
                        <p className="text-[#1B1B1B]">
                            {otherText?.serDescription}
                        </p>
                    </div>
                    <div className="px-3 pb-5 space-y-7 lg:px-10">
                        <p className="text-4xl font-semibold">
                            Proficient LCL Consolidation service and much more…
                        </p>
                        <div className="grid items-start gap-5 pb-5 md:grid-cols-2 lg:grid-cols-4">
                            {service.map((item) => {
                                if (item.serviceType === "IIF")
                                    return (
                                        <>
                                            <div className="bg-[#F7F9FB] rounded-lg p-5 pb-5 flex flex-col min-h-[350px]" key={item._id}>
                                                <div className="flex">
                                                    <Image
                                                        src={`https://starconcord.onrender.com/uploads${item.serviceIconImage}`}
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
                                                    <Link href={`/service-detail/${item._id}`} state={{ id: item._id }} key={item?._id}>
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-[#104B59] text-sm font-bold">
                                                                READ MORE
                                                            </p>
                                                            <FaArrowRightLong className="text-[#104B59]" />
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </>
                                    )
                            })}

                        </div>
                    </div>

                    {/* <div className="px-3 pb-20 space-y-7 lg:px-10">
                        <p className="text-4xl font-semibold">Other Services</p>
                        <div className="grid items-start justify-center gap-5 pb-5 md:grid-cols-2 lg:grid-cols-4">
                            {service.map((item) => {
                                if (item.serviceType === "OS")
                                    return (
                                        <>
                                            <div className="bg-[#F7F9FB] rounded-lg p-5 pb-5 flex flex-col min-h-[350px]" key={item._id}>
                                                <div className="flex">
                                                    <Image
                                                        src={`https://starconcord.onrender.com/uploads${item.serviceIconImage}`}
                                                        alt="unsplash"
                                                        loading="lazy"
                                                        width={130}
                                                        height={130}
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-grow space-y-4"></div>
                                                <div className="flex-col items-center justify-center w-full gap-3 mt-auto space-y-2">
                                                    <p className="text-2xl font-bold text-[#104B59]">
                                                        {item?.serviceName}
                                                    </p>
                                                    <Link href={`/service-detail/${item._id}`} state={{ id: item._id }} key={item?._id}>
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-[#104B59] text-sm font-bold">
                                                                READ MORE
                                                            </p>
                                                            <FaArrowRightLong className="text-[#104B59]" />
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </>
                                    )
                            })}

                        </div>
                    </div> */}
                </>
            )}
        </div>
    );
};

export default ServicePage;
