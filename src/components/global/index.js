'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { RiMenu3Line } from 'react-icons/ri';
import { FaCartShopping, FaChevronRight } from 'react-icons/fa6';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { FaChevronDown } from "react-icons/fa";
import axios from 'axios';
import PageLoader from '../ui/pageloader';

const Header = () => {
    const router = useRouter();
    const [sticky, setSticky] = useState(false);
    const [active, setActive] = useState('Home');
    const [openSidebar, setOpenSidebar] = useState(false);
    const [industries, setIndustries] = useState({ industry: [] });
    const [services, setServices] = useState({ service: [] });
    const [loading, setLoading] = useState(false);

    const handleGetIndustries = () => {
        setLoading(true);
        axios('https://starconcord.onrender.com/api/industryList', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        })
            .then((res) => {
                console.log('API Response:', res.data.data);
                setIndustries(res.data.data || { industry: [] });
                setLoading(false);
            })
            .catch((err) => {
                console.error('API Error:', err);
                setLoading(false);
            });
    };

    useEffect(() => {
        handleGetIndustries();
    }, []);

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
                setServices(res.data.data || []);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        handleGetService();
    }, []);

    const handleLinkClick = link => {
        setActive(link);
        setOpenSidebar(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        });
        return () => {
            window.removeEventListener('scroll', () => { });
        };
    }, []);
    return (
        <div
            className={`bg-white duration-300 transition-all text-black w-full ${sticky &&
                'z-50 top-0 duration-300 transition-all fixed shadow-2xl'
                }`}
        >
            {/* mobile header start */}
            <div
                className={`lg:hidden bg-white space-y-5  text-black absolute top-0 -left-1 z-20 min-h-screen max-h-screen min-w-[80%] ${openSidebar ? 'translate-x-0' : '-translate-x-full'
                    } transition duration-300 ease-linear`}
            >
                <div className="flex items-center justify-between p-5">
                    <Link href="/">
                        <Image
                            src={'/static/images/logo_final.png'}
                            alt="logo"
                            loading="lazy"
                            width={100}
                            height={100}
                            className='object-cover'
                        />
                    </Link>
                    <div>
                        <AiOutlineClose
                            className="ml-auto text-2xl cursor-pointer"
                            onClick={() => setOpenSidebar(false)}
                        />
                    </div>
                </div>

                <div className="px-20 space-y-6 text-left">
                    {[
                        { name: 'About us', href: '/about-us' },
                        { name: 'Services', href: '/service' },
                    ].map(link => (
                        <Link key={link.name} href={link.href}>
                            <li
                                onClick={() => handleLinkClick(link.name)}
                                className={`cursor-pointer text-[16px] font-semibold capitalize ${active === link.name
                                    ? 'text-black font-semibold'
                                    : 'text-[#6C6C6C] font-normal'
                                    }`}
                            >
                                <span className="inline-block footer">
                                    {link.name}
                                </span>
                            </li>
                        </Link>
                    ))}
                    {/* <div
                        className={`cursor-pointer text-[16px] font-semibold capitalize group flex flex-row gap-1 relative z-10 ${active === "Industries"
                            ? 'text-black font-semibold'
                            : 'text-[#6C6C6C] font-normal'
                            }`}
                    >
                        <Link href="/industries">
                            <p className="flex items-center gap-2 pb-1 ml-5 -mt-5">
                                Industries
                                <FaChevronDown className={`ml-auto min-h-4 min-w-[1rem] group-hover:mb-0 duration-300 group-hover:rotate-180 transition-all `} />
                            </p>
                        </Link> */}
                    {/* dropdown */}
                    {/* <div className="absolute overflow-y-auto z-10 min-w-[20rem] group-hover:scale-100 scale-0 custom_scrollbar transition-all origin-top  bg-white text-left ease-in-out duration-300 top-9 -left-5 rounded-lg shadow-2xl text-textColor space-y-2">
                            {loading ? (
                                <PageLoader />
                            ) : (
                                <ul className="max-h-full overflow-y-auto font-semibold tracking-wide capitalize">
                                    {industries?.industry.length > 0 &&
                                        industries?.industry.map((item) => (
                                            <Link href={`/industries-detail/${item._id}`} state={{ id: item._id }} key={item._id}>
                                                <li
                                                    className={`cursor-pointer text-[16px] px-5 py-2 hover:bg-primary_color hover:text-white flex items-center justify-between font-semibold capitalize ${active === "Contact"
                                                        ? 'text-black font-semibold'
                                                        : 'text-[#6C6C6C] font-normal'
                                                        }`}
                                                    key={item?._id}
                                                >
                                                    <span className="whitespace-nowrap">
                                                        {item?.industryName}
                                                    </span>
                                                    <FaChevronRight className="" />
                                                </li>
                                            </Link>
                                        ))}
                                </ul>
                            )}
                        </div> */}
                    {/* </div> */}
                    {[

                        { name: 'Industries', href: '/industries' },
                        { name: 'Articles', href: '/article' },
                        { name: 'Blogs', href: '/blog' },
                        { name: 'Contact us', href: '/contact-us' },
                        { name: 'Careers ', href: '/career' },
                        { name: 'Locations', href: '/location' },

                    ].map(link => (
                        <Link key={link.name} href={link.href}>
                            <li
                                onClick={() => handleLinkClick(link.name)}
                                className={`cursor-pointer text-[16px] font-semibold capitalize ${active === link.name
                                    ? 'text-black font-semibold'
                                    : 'text-[#6C6C6C] font-normal'
                                    }`}
                            >
                                <span className="inline-block footer">
                                    {link.name}
                                </span>
                            </li>
                        </Link>
                    ))}
                    <hr />
                    <div className="flex items-center gap-3 text-center">
                        <Button
                            variant="primary"
                            className="hover:text-primary_color"
                        >
                            Login
                        </Button>
                        <Button variant="primary_button" className="">
                            Signup
                        </Button>
                    </div>
                </div>
            </div>
            {openSidebar && (
                <div
                    onClick={() => setOpenSidebar(false)}
                    className="md:hidden inset-0 z-0 absolute overflow-hidden backdrop-blur-sm bg-lightBlack bg-opacity-50 min-h-screen max-h-screen max-w-[100%]"
                ></div>
            )}
            {openSidebar && (
                <div
                    onClick={() => setOpenSidebar(false)}
                    className="lg:hidden inset-0 z-0 absolute overflow-hidden backdrop-blur-sm bg-lightBlack bg-opacity-50 min-h-screen max-h-screen max-w-[100%]"
                ></div>
            )}
            {/* mobile header end */}

            <div
                className="container py-3 mx-auto xl:flex xl:justify-between md:items-center"
                id="topMenu"
            >
                <nav className="container flex items-center justify-between mx-auto">
                    <Link href="/">
                        <Image
                            src={'/static/images/logo_final.png'}
                            alt="logo"
                            loading="lazy"
                            width={200}
                            height={200}
                            className="object-cover"
                        />
                    </Link>
                    <div className=" h-10 hidden xl:flex min-h-[5px] w-0.5 bg-[#CECECE] dark:bg-white/10"></div>
                    <ul className="hidden md:gap-8 xl:gap-11 lg:flex">
                        {[
                            { name: 'About us', href: '/about-us' },
                            // { name: 'Services', href: '/service' },
                        ].map(link => (
                            <Link key={link.name} href={link.href}>
                                <li
                                    onClick={() => handleLinkClick(link.name)}
                                    className={`cursor-pointer text-[16px] font-semibold capitalize ${active === link.name
                                        ? 'text-black font-semibold'
                                        : 'text-[#6C6C6C] font-normal'
                                        }`}
                                >
                                    <span className="inline-block footer">
                                        {link.name}
                                    </span>
                                </li>
                            </Link>
                        ))}

                        {/* service dropdown  */}
                        <div
                            className={`cursor-pointer text-[16px] font-semibold capitalize group flex items-center flex-row justify-center gap-1 relative z-10 ${active === "Industries"
                                ? 'text-black font-semibold'
                                : 'text-[#6C6C6C] font-normal'
                                }`}
                        >
                            <Link href="/service">
                                <p className="flex items-center gap-2">
                                    Services
                                    <FaChevronDown className={`ml-auto min-h-4 min-w-[1rem] group-hover:mb-0 duration-300 group-hover:rotate-180 transition-all `} />
                                </p>
                            </Link>
                            {/* dropdown */}
                            <div className="absolute overflow-y-auto z-10 min-w-[20rem] group-hover:scale-100 scale-0 custom_scrollbar transition-all origin-top  bg-white text-left ease-in-out duration-300 top-9 -left-5 rounded-lg shadow-2xl text-textColor space-y-2">
                                {/* left side */}
                                {loading ? (
                                    <PageLoader />
                                ) : (
                                    <ul className="max-h-full overflow-y-auto font-semibold tracking-wide capitalize">
                                        {/* {services?.length > 0 &&
                                            services?.map((item) => (
                                                <Link href={`/service-detail/${item._id}`} state={{ id: item._id }} key={item._id}>
                                                    <li
                                                        className={`cursor-pointer text-[16px] px-5 py-2 hover:bg-primary_color hover:text-white flex items-center justify-between font-semibold capitalize ${active === "Contact"
                                                            ? 'text-black font-semibold'
                                                            : 'text-[#6C6C6C] font-normal'
                                                            }`}
                                                        key={item?._id}
                                                    >
                                                        <span className="whitespace-nowrap">
                                                            {item?.serviceName}
                                                        </span>
                                                        <FaChevronRight className="" />
                                                    </li>
                                                </Link>
                                            ))} */}
                                        {services.length > 0 ? (
                                            services.map((item) => (
                                                <div
                                                    key={item._id}
                                                    className="space-y-4"
                                                >
                                                    <Link href={`/service-detail/${item._id}`} state={{ id: item._id }} key={item._id}>
                                                        <li
                                                            className={`cursor-pointer text-[16px] px-5 py-2 hover:bg-primary_color hover:text-white flex items-center justify-between font-semibold capitalize ${active === "Contact"
                                                                ? 'text-black font-semibold'
                                                                : 'text-[#6C6C6C] font-normal'
                                                                }`}
                                                            key={item?._id}
                                                        >
                                                            <span className="whitespace-nowrap">
                                                                {item?.serviceName}
                                                            </span>
                                                            <FaChevronRight className="" />
                                                        </li>
                                                    </Link>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No industries available</p>
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* industries dropdown  */}
                        <div
                            className={`cursor-pointer text-[16px] font-semibold capitalize group flex items-center flex-row justify-center gap-1 relative z-10 ${active === "Industries"
                                ? 'text-black font-semibold'
                                : 'text-[#6C6C6C] font-normal'
                                }`}
                        >
                            <Link href="/industries">
                                <p className="flex items-center gap-2">
                                    Industries
                                    <FaChevronDown className={`ml-auto min-h-4 min-w-[1rem] group-hover:mb-0 duration-300 group-hover:rotate-180 transition-all `} />
                                </p>
                            </Link>
                            {/* dropdown */}
                            <div className="absolute overflow-y-auto z-10 min-w-[20rem] group-hover:scale-100 scale-0 custom_scrollbar transition-all origin-top  bg-white text-left ease-in-out duration-300 top-9 -left-5 rounded-lg shadow-2xl text-textColor space-y-2">
                                {/* left side */}
                                {loading ? (
                                    <PageLoader />
                                ) : (
                                    <ul className="max-h-full overflow-y-auto font-semibold tracking-wide capitalize">
                                        {industries?.industry.length > 0 &&
                                            industries?.industry.map((item) => (
                                                <Link href={`/industries-detail/${item._id}`} state={{ id: item._id }} key={item._id}>
                                                    <li
                                                        className={`cursor-pointer text-[16px] px-5 py-2 hover:bg-primary_color hover:text-white flex items-center justify-between font-semibold capitalize ${active === "Contact"
                                                            ? 'text-black font-semibold'
                                                            : 'text-[#6C6C6C] font-normal'
                                                            }`}
                                                        key={item?._id}
                                                    >
                                                        <span className="whitespace-nowrap">
                                                            {item?.industryName}
                                                        </span>
                                                        <FaChevronRight className="" />
                                                    </li>
                                                </Link>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        {[

                            { name: 'Articles', href: '/article' },
                            { name: 'Blogs', href: '/blog' },
                            { name: 'Contact us', href: '/contact-us' },
                            { name: 'Careers ', href: '/career' },
                            { name: 'Locations', href: '/location' },

                        ].map(link => (
                            <Link key={link.name} href={link.href}>
                                <li
                                    onClick={() => handleLinkClick(link.name)}
                                    className={`cursor-pointer text-[16px] font-semibold capitalize ${active === link.name
                                        ? 'text-black font-semibold'
                                        : 'text-[#6C6C6C] font-normal'
                                        }`}
                                >
                                    <span className="inline-block footer">
                                        {link.name}
                                    </span>
                                </li>
                            </Link>
                        ))}
                    </ul>

                    <div className="hidden gap-3 text-center lg:flex">
                        <Button
                            variant="primary"
                            className="font-bold"
                        >
                            Login
                        </Button>
                        <Button variant="primary_button" className="font-semibold">
                            Signup
                        </Button>
                    </div>
                    <RiMenu3Line
                        onClick={() => setOpenSidebar(true)}
                        className={`lg:hidden text-3xl cursor-pointer ${sticky ? 'text-black' : 'text-black'
                            }`}
                    />
                </nav>
            </div>
        </div>
    );
};

export default Header;
