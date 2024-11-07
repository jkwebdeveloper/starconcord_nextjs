"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import axios from 'axios';
import PageLoader from '../ui/pageloader';
import Link from 'next/link';
// import AOS from "aos";
// import "aos/dist/aos.css";

const TransportSection = () => {
    // useEffect(() => {
    //     AOS.init();
    //   }, []);
    const [transport, setTransport] = useState({});
    const [loading, setLoading] = useState(false);

    const handleGetTransport = () => {
        setLoading(true);
        axios("https://starconcord.onrender.com/api/homePage", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        })
            .then((res) => {
                setTransport(res.data.data);
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
        <div className="container w-full mx-auto">
            {loading ? (
                <div className='flex items-center justify-center'>
                    <PageLoader />
                </div>
            ) : (
                <div className="grid items-start gap-5 lg:grid-cols-2 xl:gap-40 md:gap-20">
                    <div className="space-y-4 lg:space-y-8">
                        <h1 className="text-lg font-bold leading-4 lg:text-5xl">
                            {transport?.topTitle}
                        </h1>
                        <hr className="w-1/5 h-0.5 border-t-0 bg-primary_color dark:bg-white/10" />
                        <div className="text-[#1B1B1B] text-base hcontent tag" dangerouslySetInnerHTML={{ __html: transport?.topContent }}>

                        </div>
                        <Link href="/service-detail/66976cceff68443e1c005c53">
                            <Button variant="primary" className="">
                                More Details
                            </Button>
                        </Link>
                    </div>
                    <div>
                        <Image
                            src={`https://starconcord.onrender.com/uploads${transport?.topBanner}`}
                            alt="banner"
                            loading="lazy"
                            width={800}
                            layout="responsive"
                            height={800}
                            objectFit="cover"
                            className="object-cover rounded-xl "
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransportSection;
