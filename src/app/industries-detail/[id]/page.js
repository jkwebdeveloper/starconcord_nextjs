'use client';
import CommonBanner from '@/components/global/CommonBanner';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useParams, useRouter } from 'next/navigation'
import PageLoader from '@/components/ui/pageloader';


const IndustriesDetail = () => {
    const [industries, setIndustries] = useState({ industry: [] });
    const [loading, setLoading] = useState(false);
    const [industriesDetails, setIndustriesDetails] = useState({})
    const [activeIndustry, setActiveIndustry] = useState(null);

    const router = useRouter();
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        handleGetIndustries();
    }, []);

    useEffect(() => {
        if (activeIndustry, id) {
            handleGetIndustriesDetails(activeIndustry);
            handleGetIndustriesDetails(id);
        }
    }, [activeIndustry, id]);

    const handleGetIndustries = () => {
        setLoading(true);
        axios.get('https://starconcord.onrender.com/api/industryList', {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setIndustries(res.data.data || { industry: [] });
                setLoading(false);
                if (res.data.data.industry.length > 0) {
                    setActiveIndustry(res.data.data.industry[0]);
                }
                const industry = res.data.data.industry.find(item => item._id === id);
                setActiveIndustry(industry ? industry._id : res.data.data.industry[0]?._id);
            })
            .catch((err) => {
                console.error('API Error:', err);
                setLoading(false);
            });
    };

    const handleGetIndustriesDetails = (id) => {
        if (!id) return;
        setLoading(true);
        axios.get(`https://starconcord.onrender.com/api/industryList/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                setIndustriesDetails(res.data.data || {});
                setLoading(false);
            })
            .catch((err) => {
                console.error('API Error:', err);
                setLoading(false);
            });
    };

    const handleIndustryClick = (item) => {
        setActiveIndustry(item._id);
        router.push(`/industries-detail/${item._id}`)
        setIndustriesDetails(item);
    };



    return (
        <div className="container w-full pb-10 mx-auto lg:space-y-20 space-y-7">
            <div className="relative md:h-80 h-60">
                <Image
                    // src={dynamicImage ? BaseUrl.concat(dynamicImage) : image}
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

                        {industriesDetails.industryName || "Healthcare and Pharmaceuticals Logistics"}
                    </h1>
                    <div className="flex items-center justify-center gap-3">
                        <Link href="/">
                            <p className="text-lg text-black">Home</p>
                        </Link>
                        <IoIosArrowForward className="text-lg" />
                        <p className="text-lg text-black">Industries</p>
                    </div>
                </div>
            </div>
            <div className="container flex flex-col min-h-[55dvh] gap-10 px-1 md:flex-row md:px-5 relative mt-[-3rem] z-[2] md:mb-10">
                <div className="h-fit min-h-[350px] md:w-[40%] lg:w-[25%] w-[90%] mx-auto space-y-5">
                    <div className="space-y-4">
                        <p className="text-xl font-semibold">
                            Industries
                        </p>
                        <hr className="w-full h-0.5 border-t-0 bg-[#dfdfdf] dark:bg-white/10" />

                        <div className="space-y-5">
                            {industries?.industry.length > 0 ? (
                                industries.industry.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex items-center gap-5 cursor-pointer"
                                        onClick={() => handleIndustryClick(item)}
                                    >
                                        <div
                                            className={`w-0.5 min-h-[25px] ${item._id === activeIndustry ? 'bg-primary_color' : 'bg-[#EBF1E4]'}`}
                                        ></div>
                                        <p
                                            className={`font-semibold text-xl ${item._id === activeIndustry ? 'text-black' : 'text-[#8C929C]'}`}
                                        >
                                            {item?.industryName}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>No industries available</p>
                            )}

                        </div>
                    </div>
                </div>
                <div className="inline-block h-auto w-0.5 self-stretch bg-[#dfdfdf] dark:bg-white/10"></div>
                <div className="md:w-[70%] w-[90%] mx-auto space-y-5 h-fit min-h-[350px]">
                    {loading ? (
                        <PageLoader />
                    ) : (
                        <>
                            {industriesDetails ? (
                                <>
                                    <Image
                                        src={`https://starconcord.onrender.com/uploads${industriesDetails.banners}`}
                                        loading="lazy"
                                        alt='image'
                                        width={890}
                                        height={550}
                                        className="object-cover min-w-full rounded-2xl"
                                    />
                                    <div className="space-y-7">
                                        <div className="text-[#1B1B1B] space-y-4 md:text-left hcontent tag text-justify"
                                            dangerouslySetInnerHTML={{
                                                __html: industriesDetails?.bannerContent,
                                            }}
                                        >

                                        </div>
                                        {/* Add more details here as needed */}
                                    </div>
                                </>
                            ) : (
                                <p>No industry details available</p>
                            )}
                        </>
                    )}

                </div>
            </div>

        </div>
    );
};

export default IndustriesDetail;
