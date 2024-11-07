"use client"
import CommonBanner from '@/components/global/CommonBanner';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import axios from 'axios';
import { PageLoader } from '@/components';
import Link from 'next/link';

const Locationpage = () => {
    const [locationData, setLocationData] = useState([]);
    const [location, setLocation] = useState({})
    const [loading, setLoading] = useState(false);

    const handleGetLocation = () => {
        setLoading(true);
        axios("https://starconcord.onrender.com/api/locationList", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        })
            .then((res) => {
                setLocationData(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        handleGetLocation();
    }, []);

    const handleGetLocationImages = () => {
        setLoading(true)
        axios('https://starconcord.onrender.com/api/aboutUsPage', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        })
            .then((res) => {
                setLocation(res.data.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
            })
    }

    useEffect(() => {
        handleGetLocationImages()
    }, [])

    return (
        <div className="container w-full pb-20 mx-auto lg:space-y-20 space-y-7">
            <CommonBanner
                image="/static/images/page title img.jpg"
                title="Locations"
                page="Locations"
            />
            <div className="container px-3 space-y-10 lg:px-10">
                {loading ? (
                    <PageLoader />
                ) : (
                    <>
                        <Image
                            src={`https://starconcord.onrender.com/uploads${location?.locationBanner}`}
                            alt="banner"
                            loading="lazy"
                            quality={100}
                            width={1200}
                            height={900}
                            className="object-cover w-full"
                        />
                    </>
                )}
                {loading ? (
                    <PageLoader />
                ) : (
                    <Accordion type="single" collapsible className="w-full">
                        {locationData.map((countryData, countryIndex) => (
                            <AccordionItem key={countryIndex} value={`item-${countryIndex}`}>
                                <AccordionTrigger className="text-3xl font-bold">
                                    {countryData.country}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid items-start justify-center gap-5 px-2 lg:grid-cols-2">
                                        {countryData.locations.map((location) => (
                                            <div key={location._id} className="p-5 space-y-6 border border-[#D4DEEF] rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <GoDotFill className="text-primary_color" />
                                                    <p className="text-xl font-semibold">
                                                        {location.city} Office
                                                    </p>
                                                </div>
                                                <hr className="w-full h-0.5 border-t-0 bg-[#c5c5c5] dark:bg-white/10" />
                                                <div className="grid items-start lg:grid-cols-2">
                                                    <div className="flex-col space-y-2 lg:flex-row">
                                                        <p className="text-[#6C6C6C] text-lg font-medium">
                                                            Phone number:
                                                        </p>
                                                        <Link href={`tel:${location.phone}`}>
                                                            <p className="text-xl font-bold">
                                                                {location.phone}
                                                            </p>
                                                        </Link>
                                                    </div>
                                                    <div className="flex-col space-y-2 lg:flex-row">
                                                        <p className="text-[#6C6C6C] text-lg font-medium">
                                                            Fax number:
                                                        </p>
                                                        <p className="text-xl font-bold">
                                                            {location.fxNumber}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="grid items-start lg:grid-cols-2">
                                                    {location.email && (
                                                        <>
                                                            <div className="flex-col space-y-2 lg:flex-row">
                                                                <p className="text-[#6C6C6C] text-lg font-medium">
                                                                    Email:
                                                                </p>
                                                                <Link href={`mailto:${location.email}`}>
                                                                    <p className="text-xl font-bold">
                                                                        {location.email}
                                                                    </p>
                                                                </Link>
                                                            </div>
                                                        </>
                                                    )}
                                                    {location.portName && (
                                                        <div className="flex-col space-y-2 lg:flex-row">
                                                            <p className="text-[#6C6C6C] text-lg font-medium">
                                                                Port name:
                                                            </p>
                                                            <p className="text-xl font-bold">
                                                                {location.portName}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-[#6C6C6C] text-lg font-medium">
                                                        {location.isHeadOffice ? `Head Office (${location.city}):` : 'Address:'}
                                                    </p>
                                                    <p className="text-lg font-semibold">
                                                        {location.addressLineOne}, {location.city}, {location.country} - {location.pincode}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </div>
        </div>
    );
};

export default Locationpage;
