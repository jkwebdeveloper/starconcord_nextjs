"use client"
import React, { useEffect, useState } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { v4 } from 'uuid';
import axios from 'axios';
import PageLoader from '../ui/pageloader';
import Link from 'next/link';
import { Button } from '../ui/button';

const OurIndustriesSection = () => {
    const [industries, setIndustries] = useState({ ourIndustries: [] });
    const [loading, setLoading] = useState(false);

    const handleGetIndustries = () => {
        setLoading(true);
        axios("https://starconcord.onrender.com/api/homePage", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        })
            .then((res) => {
                setIndustries(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        handleGetIndustries();
    }, []);
    return (
        <div className="container w-full mx-auto space-y-10">
            <p className="text-xl font-bold text-center lg:text-5xl">
                Industries We Serve
            </p>
            {loading ? (
                <PageLoader />
            ) : (
                <>
                    <div className="grid items-start justify-center grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {industries?.ourIndustries && industries.ourIndustries.length > 0 ? (
                            industries.ourIndustries.map(item => (
                                <Link href={`/industries-detail/${item._id}`} state={{ id: item._id }} key={item._id}>
                                    <div className="relative">
                                        <div className="relative w-full mx-auto overflow-hidden h-80 rounded-xl">
                                            <Image
                                                src={`https://starconcord.onrender.com/uploads${item?.banners}`}
                                                alt={item?.industryName}
                                                loading="lazy"
                                                layout="fill"
                                                objectFit="cover"
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
                            <p>No industries available</p>
                        )}
                    </div>
                    <div className='flex items-center justify-center'>
                        <Link href="/industries">
                            <Button variant="primary" className="">
                                View All Industries
                            </Button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default OurIndustriesSection;
