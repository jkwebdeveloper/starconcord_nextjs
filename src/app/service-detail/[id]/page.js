'use client';
import CommonBanner from '@/components/global/CommonBanner';
import GetInTouchSection from '@/components/home/ContactUs';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useParams, useRouter } from 'next/navigation';
import PageLoader from '@/components/ui/pageloader';

const ServiceDetail = () => {
    const [service, setService] = useState([]);
    const [loading, setLoading] = useState(false);
    const [serviceDetails, setServiceDetails] = useState({});
    const [activeService, setActiveService] = useState(null);

    const router = useRouter();
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        handleGetService();
    }, []);

    useEffect(() => {
        if (id) {
            handleGetServiceDetail(id);
        }
    }, [id]);

    const handleGetServiceDetail = (id) => {
        if (!id) return;
        setLoading(true);
        axios.get(`https://starconcord.onrender.com/api/serviceList/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        })
            .then((res) => {
                console.log(res.data, 'service details');
                setServiceDetails(res.data.data || {});
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    const handleGetService = () => {
        setLoading(true);
        axios("https://starconcord.onrender.com/api/serviceList", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        })
            .then((res) => {
                console.log(res.data);
                const servicesData = res.data.data || [];
                setService(servicesData);
                setLoading(false);

                if (servicesData.length > 0) {
                    const activeService = servicesData.find(item => item._id === id);
                    setActiveService(activeService ? activeService._id : servicesData[0]._id);
                }
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    const handleServiceClick = (item) => {
        setActiveService(item._id);
        router.push(`/service-detail/${item._id}`);
    };

    return (
        <div className="container w-full pb-10 mx-auto lg:space-y-20 space-y-7">
            <div className="relative md:h-80 h-60">
                <Image
                    src="/static/images/page title img.jpg"
                    alt='banner'
                    loading="lazy"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    className="rounded-2xl"
                />
                <div className="absolute w-full space-y-2 text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    <h1 className="text-2xl font-bold text-center text-black capitalize md:text-4xl">
                        {serviceDetails.serviceName || "Service Details"}
                    </h1>
                    <div className="flex items-center justify-center gap-3">
                        <Link href="/">
                            <p className="text-lg text-black">Home</p>
                        </Link>
                        <IoIosArrowForward className="text-lg" />
                        <p className="text-lg text-black">Services</p>
                    </div>
                </div>
            </div>
            <div className="container flex flex-col min-h-[55dvh] gap-10 px-1 md:flex-row md:px-5 relative mt-[-3rem] z-[2] md:mb-10">
                <div className="h-fit min-h-[350px] md:w-[40%] lg:w-[25%] w-[90%] mx-auto space-y-5">
                    <div className="space-y-4">
                        <p className="text-xl font-semibold">
                            Services
                        </p>
                        <hr className="w-full h-0.5 border-t-0 bg-[#dfdfdf] dark:bg-white/10" />
                        <div className="space-y-5">
                            {service.length > 0 ? (
                                service.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex items-center gap-5 cursor-pointer"
                                        onClick={() => handleServiceClick(item)}
                                    >
                                        <div
                                            className={`w-0.5 min-h-[25px] ${item._id === activeService ? 'bg-primary_color' : 'bg-[#EBF1E4]'}`}
                                        ></div>
                                        <p
                                            className={`font-semibold text-xl ${item._id === activeService ? 'text-black' : 'text-[#8C929C]'}`}
                                        >
                                            {item?.serviceName}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>No Services available</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="inline-block h-auto w-0.5 self-stretch bg-[#dfdfdf] dark:bg-white/10"></div>
                <div className="md:w-[70%] w-[90%] mx-auto space-y-5 h-fit min-h-[350px]">
                    {loading ? (
                        <PageLoader />
                    ) : Object.keys(serviceDetails).length > 0 ? (
                        <>
                            {serviceDetails ? (
                                <>
                                    <Image
                                        src={`https://starconcord.onrender.com/uploads${serviceDetails?.featuredBanners}`}
                                        loading="lazy"
                                        alt=''
                                        width={890}
                                        height={550}
                                        quality={100}
                                        className="object-cover min-w-full rounded-2xl"
                                    />
                                    <div className="space-y-10">
                                        <div className="space-y-4">
                                            <div className="text-[#1B1B1B] md:text-left text-justify hcontent tag" dangerouslySetInnerHTML={{
                                                __html: serviceDetails?.serviceTopContent,
                                            }} />
                                        </div>

                                        {serviceDetails.showWcdContent && (
                                            <div className="space-y-10">
                                                {/* <p className="text-2xl font-bold">
                                                    Why is STAR CONCORD’s LCL Consolidation Solutions the best for you?
                                                </p> */}
                                                {serviceDetails.wcdContent
                                                    ?.sort((a, b) => a.sort - b.sort)
                                                    .map((item) => (
                                                        <div key={item?._id} className="flex items-start gap-3">
                                                            <Image
                                                                src={`https://starconcord.onrender.com/uploads/${item?.image}`}
                                                                loading="lazy"
                                                                width={40}
                                                                height={40}
                                                                alt="Icon"
                                                                quality={100}
                                                                layout="fixed"
                                                                className=""
                                                            />
                                                            <div className="flex-col space-y-2">
                                                                <p className="text-xl font-semibold">
                                                                    {item.title}
                                                                </p>
                                                                <p className="text-[#6C6C6C]">
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                <Link href="/contact-us" >
                                                    <Button variant="primary" className='mt-10'>
                                                        Contact Us
                                                    </Button>
                                                </Link>
                                            </div>
                                        )}
                                        {serviceDetails.showBSContent && (
                                            <div className="space-y-8">
                                                <p className="text-2xl font-bold">
                                                    Buyer and Seller Consoles
                                                </p>
                                                <div className="text-[#6C6C6C] hcontent tag" dangerouslySetInnerHTML={{
                                                    __html: serviceDetails?.beforeImgContent,
                                                }} />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="flex-1">
                                                        <Image
                                                            src={`https://starconcord.onrender.com/uploads${serviceDetails.image1}`}
                                                            loading="lazy"
                                                            width={300}
                                                            height={250}
                                                            quality={100}
                                                            layout="responsive"
                                                            alt="Main Image"
                                                            className="rounded-2xl"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-between gap-4">
                                                        <div>
                                                            <Image
                                                                src={`https://starconcord.onrender.com/uploads${serviceDetails.image2}`}
                                                                loading="lazy"
                                                                width={300}
                                                                height={250}
                                                                quality={100}
                                                                layout="responsive"
                                                                alt="Top Right Image"
                                                                className="object-cover rounded-2xl"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Image
                                                                src={`https://starconcord.onrender.com/uploads${serviceDetails.image3}`}
                                                                loading="lazy"
                                                                width={300}
                                                                height={250}
                                                                quality={100}
                                                                layout="responsive"
                                                                alt="Bottom Right Image"
                                                                className="object-cover rounded-2xl"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div>No service details found.</div>
                            )}
                        </>
                    ) : (
                        <p>No service details available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ServiceDetail;
