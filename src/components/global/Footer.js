"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { ImLocation2 } from 'react-icons/im';
import { FaTwitter } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa6';
import Link from 'next/link';
import axios from 'axios';
import PageLoader from '../ui/pageloader';

const Footer = () => {
    const [service, setService] = useState([]);
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
    return (
        <>
            <div
                className="w-full "
                style={{
                    backgroundImage: `url('/static/images/Footer-bg.jpg')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    objectFit: 'cover',
                    loading: 'lazy',
                    // width: "100%",
                    height: '',
                }}
            >
                <div className="container py-20 mx-auto text-white">
                    <div className="grid items-start justify-center grid-cols-1 gap-5 px-10 lg:grid-cols-2">
                        <div className="space-y-4">
                            <ImLocation2 className="text-2xl text-white lg:text-5xl" />
                            <p className="w-full text-xl font-bold capitalize lg:text-4xl lg:w-1/2">
                                Find Our Office
                            </p>
                            <Link href="/location">
                                <Button className="border-[1px] mt-4 active:scale-90 transition border-primary bg-background shadow-sm hover:bg-black hover:text-white">
                                    Star Concord Global Presence
                                </Button>
                            </Link>
                        </div>
                        <div className="grid items-start justify-center grid-cols-1 gap-5 lg:gap-0 lg:grid-cols-2">
                            <div className="space-y-6">
                                <p className="text-lg font-bold">Quick Links</p>
                                <div className="space-y-2">
                                    <Link href="/about-us">
                                        <p className="mb-2">About Us</p>
                                    </Link>
                                    <Link href="/service">
                                        <p className="mb-2">Services</p>
                                    </Link>
                                    <Link href="/industries">
                                        <p className="mb-2">Industries</p>
                                    </Link>
                                    <Link href="/contact-us">
                                        <p className="mb-2">Contact Us</p>
                                    </Link>
                                    <Link href="/blog">
                                        <p className="mb-2">Blogs</p>
                                    </Link>
                                    <Link href="/article">
                                        <p className="mb-2">Articles</p>
                                    </Link>
                                    <Link href="/location">
                                        <p>Location</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <p className="text-lg font-bold">Services</p>
                                {loading ? (
                                    <PageLoader />
                                ) : (
                                    <div className='space-y-4'>
                                        {service.length > 0 ? (
                                            service.map((item) => (
                                                <div
                                                    key={item._id}
                                                    className="space-y-4"
                                                >
                                                    <Link href={`/service-detail/${item._id}`} state={{ id: item._id }} key={item?._id}>
                                                        <p
                                                            className=""
                                                        >
                                                            {item?.serviceName}
                                                        </p>
                                                    </Link>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No industries available</p>
                                        )}
                                    </div>
                                )}

                            </div>
                            {/* <hr className="w-full h-0.5 border-t-0 bg-[#c5c5c5] dark:bg-white/10" /> */}
                        </div>
                        <div></div>
                        {/* <div className="flex items-center gap-10">
                            <Image
                                src={'/static/images/image 2.png'}
                                alt="unsplash"
                                loading="lazy"
                                width={100}
                                height={100}
                                className="object-cover"
                            />
                            <Image
                                src={'/static/images/image 3.png'}
                                alt="unsplash"
                                loading="lazy"
                                width={100}
                                height={100}
                                className="object-cover"
                            />
                            <Image
                                src={'/static/images/image 4.png'}
                                alt="unsplash"
                                loading="lazy"
                                width={100}
                                height={100}
                                className="object-cover"
                            />
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="container px-10 py-4 mx-auto text-white">
                <div className="flex flex-col items-center justify-between space-y-4 lg:flex-row">
                    <p className="text-sm text-primary_color">
                        © 2024, Star Concord India Pvt Ltd, All Rights Reserved
                    </p>
                    <div className="flex items-center gap-5">
                        <FaTwitter className="text-[#6C6C6C] cursor-pointer  hover:rounded-full p-3  text-5xl hover:bg-primary_color hover:text-white" />
                        <FaLinkedinIn className="text-[#6C6C6C] cursor-pointer  hover:rounded-full p-3  text-5xl hover:bg-primary_color hover:text-white" />
                        <FaInstagram className="text-[#6C6C6C] cursor-pointer  hover:rounded-full p-3  text-5xl hover:bg-primary_color hover:text-white" />
                        <FaFacebookF className="text-[#6C6C6C] cursor-pointer  hover:rounded-full p-3  text-5xl hover:bg-primary_color hover:text-white" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
