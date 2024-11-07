'use client';
import CommonBanner from '@/components/global/CommonBanner';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FaRegCircleCheck } from 'react-icons/fa6';
import axios from 'axios';
import PageLoader from '@/components/ui/pageloader';
import LocationSection from '@/components/home/Location';
import PacificSection from '@/components/home/Pacific';
import TextSection from '@/components/home/TextSection';

const AboutUs = () => {
    const [selectedTab, setSelectedTab] = useState('mission');
    const [membershipTab, setmembershipTab] = useState('');
    const [aboutUs, setAboutUs] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGetAboutUs = () => {
        setLoading(true);
        axios("https://starconcord.onrender.com/api/aboutUsPage", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        })
            .then((res) => {
                console.log(res.data, "response");
                setmembershipTab(res.data.data?.certificateList?.[0]?.title || '');
                setAboutUs(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        handleGetAboutUs();
    }, []);

    const firstTwoUsps = aboutUs?.uspsList?.slice(0, 2);
    const remainingUsps = aboutUs?.uspsList?.slice(2);

    return (
        <div className="container w-full px-5 mx-auto lg:space-y-20 space-y-7 lg:px-10">
            {loading ? (
                <PageLoader />
            ) : (
                <>
                    <CommonBanner
                        image="/static/images/page title img.jpg"
                        title="About us"
                        page="About us"
                    />
                    {/* About company Sevtion */}
                    <div className="grid items-start justify-center gap-5 px-3 lg:px-10 lg:grid-cols-2 xl:gap-40 md:gap-20">
                        <div className="w-full text-[#1B1B1B] space-y-20">
                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <p className="text-lg font-semibold">
                                        WHO WE ARE
                                    </p>
                                </div>
                                <p className='text-4xl font-bold'>{aboutUs?.aboutContentTitle}</p>
                                <div className='tag' dangerouslySetInnerHTML={{ __html: aboutUs?.aboutContent }}></div>
                                {aboutUs.ceoName && (
                                    <div className='flex items-center gap-3 md:gap-16'>
                                        <p className="font-semibold">CEO {aboutUs?.ceoName}</p>
                                        <Image
                                            src={`https://starconcord.onrender.com/uploads${aboutUs?.ceoSignature}`}
                                            alt="unsplash"
                                            loading="lazy"
                                            width={200}
                                            height={100}
                                            className="object-cover rounded-xl"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="space-y-8">
                                <div className="grid items-start w-full grid-cols-2 text-left">
                                    <button
                                        className={`text-lg font-semibold ${selectedTab === 'mission'
                                            ? 'text-primary_color border-b-2 text-left border-primary_color'
                                            : 'border-b-2 text-left border-[#C4C4C4]'
                                            }`}
                                        onClick={() => setSelectedTab('mission')}
                                    >
                                        Our mission
                                    </button>
                                    <button
                                        className={`text-lg font-semibold ${selectedTab === 'vision'
                                            ? 'text-primary_color text-left border-b-2 border-primary_color'
                                            : 'border-b-2 text-left border-[#C4C4C4]'
                                            }`}
                                        onClick={() => setSelectedTab('vision')}
                                    >
                                        Our vision
                                    </button>
                                </div>
                                <div className="space-y-6">
                                    {selectedTab === 'mission' && (
                                        <div className="space-y-8">
                                            <div className='space-y-3 hcontent tag' dangerouslySetInnerHTML={{ __html: aboutUs?.ourMission }}></div>
                                        </div>
                                    )}
                                    {selectedTab === 'vision' && (
                                        <div className="space-y-8">
                                            <div className='space-y-3 hcontent tag' dangerouslySetInnerHTML={{ __html: aboutUs?.ourVision }}></div>
                                            {/* <Button variant="primary">
                                                Explore more
                                            </Button> */}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <Image
                                src={`https://starconcord.onrender.com/uploads${aboutUs?.rightBanner}`}
                                alt="unsplash"
                                loading="lazy"
                                width={600}
                                height={900}
                                className="object-cover rounded-xl"
                            />
                        </div>
                    </div>

                    <LocationSection />
                    <PacificSection />
                    <TextSection />

                    {aboutUs?.secBanner && aboutUs?.secContentTitle && aboutUs?.secContent ? (
                        <div className="grid items-start justify-center gap-5 px-3 lg:px-10 lg:grid-cols-2 xl:gap-40 md:gap-20">
                            <div className="">
                                <Image
                                    src={`https://starconcord.onrender.com/uploads${aboutUs?.secBanner}`}
                                    alt="unsplash"
                                    loading="lazy"
                                    width={600}
                                    height={900}
                                    className="object-cover rounded-xl"
                                />
                            </div>
                            <div className="w-full text-[#1B1B1B] space-y-6">
                                <p className="text-xl font-bold xl:text-5xl md:text-2xl">
                                    {aboutUs?.secContentTitle}
                                </p>
                                <div
                                    className="space-y-4 text-sm text-justify hcontent md:text-base tag md:text-left"
                                    dangerouslySetInnerHTML={{ __html: aboutUs?.secContent }}
                                />
                            </div>
                        </div>
                    ) : null}


                    {/* Why us */}
                    <div className="grid items-start justify-center gap-5 px-3 lg:px-10 lg:grid-cols-2 xl:gap-40 md:gap-20">
                        <Image
                            src={`https://starconcord.onrender.com/uploads${aboutUs?.whyusImage}`}
                            alt="unsplash"
                            loading="lazy"
                            width={600}
                            height={900}
                            className="object-cover"
                        />
                        <div className="space-y-8">
                            {/* <p> WHY CHOOSE STAR CONCORD?</p> */}
                            <p className="text-[#1B1B1B] font-semibold">WHY CHOOSE STAR CONCORD?</p>
                            <p className="text-xl font-bold lg:text-4xl">
                                {aboutUs?.whyusTitle}
                            </p>
                            <hr className="w-1/5 h-0.5 border-t-0 bg-primary_color dark:bg-white/10" />
                            <div className="text-[#1B1B1B] hcontent tag"
                                dangerouslySetInnerHTML={{ __html: aboutUs.whyusContent }}></div>
                            <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                                {aboutUs?.whyusPoints?.map((item1) => (
                                    <div className="flex items-center gap-3" key={item1._id}>
                                        <FaRegCircleCheck className="text-xl text-primary_color" />
                                        <p className="text-xl font-semibold">
                                            {item1?.name}
                                        </p>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>

                    {/* Accreditations */}
                    <div className="container w-full px-5 mx-auto lg:space-y-20 space-y-7 lg:px-10">
                        <div className="px-3 space-y-8 lg:px-10">
                            <p className="text-xl font-bold lg:text-5xl">
                                Accreditations / Alliances / Memberships
                            </p>

                            {/* Tabs */}
                            <div className="flex gap-3">
                                {aboutUs.certificateList?.map((item) => (
                                    <button
                                        key={item._id}
                                        className={`text-lg font-semibold ${membershipTab === item.title
                                            ? 'text-black border-b-2 border-primary_color'
                                            : 'text-[#6C6C6C] border-b-2 border-[#C4C4C4]'
                                            }`}
                                        onClick={() => setmembershipTab(item.title)}
                                    >
                                        {item.title}
                                    </button>
                                ))}
                            </div>

                            {/* Content and Images */}
                            <div className="space-y-4">
                                <div className="grid items-start w-full gap-5 text-left lg:grid-cols-2 xl:gap-40 md:gap-20">
                                    {/* Left side content */}
                                    <div className='w-full'>
                                        {aboutUs.certificateList?.map((item) =>
                                            membershipTab === item.title ? (
                                                <div key={item._id}>
                                                    <div className="text-lg hcontent tag" dangerouslySetInnerHTML={{ __html: item.content }}></div>
                                                </div>
                                            ) : null
                                        )}
                                    </div>

                                    {/* Right side image */}
                                    <div className='flex justify-center'>
                                        {aboutUs.certificateList?.map((item) =>
                                            membershipTab === item.title ? (
                                                <div key={item._id}>
                                                    <Image
                                                        src={`https://starconcord.onrender.com/uploads${item.image}`}
                                                        alt={item.title}
                                                        loading="lazy"
                                                        width={200}
                                                        height={200}
                                                        quality={100}
                                                        className="object-cover p-2 drop-shadow-md"
                                                    />
                                                </div>
                                            ) : null
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Our USPS */}
                    <div className="px-5 pb-10 space-y-10 lg:px-10">
                        <div className="grid items-start justify-center gap-5 px-3 lg:px-10 lg:grid-cols-2">
                            <div className="space-y-3">
                                <p className="text-4xl font-bold">Our USPs</p>
                                <div className="text-[#6C6C6C] hcontent tag" dangerouslySetInnerHTML={{ __html: aboutUs?.uspsDescription }}>
                                </div>
                            </div>
                            <div className="grid items-start gap-5 lg:grid-cols-2">
                                {firstTwoUsps?.map((uspsItem) => (
                                    <div key={uspsItem._id} className="p-5 space-y-4 rounded-md cursor-pointer hover:shadow-lg hover:bg-white">
                                        <Image
                                            src={`https://starconcord.onrender.com/uploads${uspsItem.uspsIconImage}`}
                                            alt={uspsItem.uspsName}
                                            loading="lazy"
                                            width={50}
                                            height={50}
                                            className=""
                                        />
                                        <p className="text-[#1B1B1B] text-xl font-semibold">
                                            {uspsItem.uspsName}
                                        </p>
                                        <div
                                            className="text-[#1B1B1B] hcontent"
                                            dangerouslySetInnerHTML={{ __html: uspsItem.uspsContent }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid items-start gap-5 px-3 lg:px-10 lg:grid-cols-4 md:grid-cols-2">
                            {remainingUsps?.map((uspsItem) => (
                                <div key={uspsItem._id} className="p-5 space-y-4 rounded-md cursor-pointer hover:shadow-lg hover:bg-white">
                                    <Image
                                        src={`https://starconcord.onrender.com/uploads${uspsItem.uspsIconImage}`}
                                        alt={uspsItem.uspsName}
                                        loading="lazy"
                                        width={50}
                                        height={50}
                                        className=""
                                    />
                                    <p className="text-[#1B1B1B] text-xl font-semibold">
                                        {uspsItem.uspsName}
                                    </p>
                                    <div
                                        className="text-[#1B1B1B] hcontent tag"
                                        dangerouslySetInnerHTML={{ __html: uspsItem.uspsContent }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>


                </>
            )}
        </div>
    );
};

export default AboutUs;
