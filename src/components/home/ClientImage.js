"use client"
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import PageLoader from '../ui/pageloader';

const ClientImage = () => {
    const [images, setImages] = useState({});
    const [loading, setLoading] = useState(false);
    const [testimonial, setTestimonial] = useState([]);

    const handleGetImages = () => {
        setLoading(true);
        axios("https://starconcord.onrender.com/api/homePage", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        })
            .then((res) => {
                setImages(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        handleGetImages();
    }, []);

    const handleGetTestimonial = () => {
        setLoading(true);
        axios("https://starconcord.onrender.com/api/testimonials", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        })
            .then((res) => {
                setTestimonial(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        handleGetTestimonial();
    }, []);



    return (
        <div className="container relative w-full p-2 mx-auto space-y-2 text-center lg:space-y-4">
            {loading ? (
                <PageLoader />
            ) : (
                <>
                    <div className='relative w-full mx-auto overflow-hidden lg:min-h-screen h-80 rounded-xl'>

                        <Image
                            src={`https://starconcord.onrender.com/uploads${images.bannerTwo}`}
                            alt=""
                            loading="lazy"
                            fill
                            objectFit="cover"
                            quality={100}
                            className="rounded-xl"
                        />
                    </div>
                    <div className="absolute top-0 flex items-center justify-start w-[90%] h-full text-left md:w-[53%]">
                        <div className="mx-5 space-y-4 lg:space-y-10 lg:mx-20">
                            <Carousel
                                opts={{
                                    align: 'start',
                                    loop: true,
                                }}
                                className="w-full"
                            >
                                <CarouselContent>
                                    {testimonial?.length > 0 ? (
                                        testimonial.map(item => (
                                            <CarouselItem
                                                className="w-full space-y-2 md:space-y-8"
                                                key={item?._id}
                                            >
                                                <image
                                                    src={'/static/images/testig.png'}
                                                    // src={`https://starconcord.onrender.com/uploads${item.image}`}
                                                    alt="banner"
                                                    loading="lazy"
                                                    layout="responsive"
                                                    // objectFit="cover"
                                                    width={50}
                                                    height={50}
                                                    className=""

                                                />
                                                <div className="text-sm font-semibold text-justify text-white md:text-xl lg:text-2xl hcontent tag" dangerouslySetInnerHTML={{ __html: item?.content }}>

                                                </div>
                                                <hr className="w-1/3 h-0.5 border-t-0 bg-[#C4C4C4] opacity-40 dark:bg-white/10" />
                                                <div className="flex items-center gap-6">
                                                    {/* <div className="bg-[#C4C4C4] rounded-full w-14 h-14"></div> */}
                                                    <Image
                                                        // src={'/static/images/home-banner.jpg'}
                                                        src={`https://starconcord.onrender.com/uploads${item.image}`}
                                                        alt="banner"
                                                        loading="lazy"
                                                        layout="responsive"
                                                        // objectFit="cover"
                                                        width={100}
                                                        height={100}
                                                        className="rounded-xl max-w-16"

                                                    />
                                                    <div className="flex-row text-white">
                                                        <p className="text-sm font-bold md:text-lg">
                                                            {item?.name}
                                                        </p>
                                                        <p>{item?.location}</p>
                                                    </div>
                                                </div>
                                            </CarouselItem>
                                        ))
                                    ) : (
                                        <p>No industries available</p>
                                    )}
                                </CarouselContent>
                                {/* <CarouselPrevious />
                                    <CarouselNext /> */}
                            </Carousel>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ClientImage;
