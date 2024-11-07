"use client"
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import PageLoader from '../ui/pageloader';

const LocationSection = () => {
    const [location, setLocation] = useState({})
    const [loading, setLoading] = useState(false)

    const handleGetLocation = () => {
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
        handleGetLocation()
    }, [])
    return (
        <div className="container w-full mx-auto space-y-4 text-center">
            {loading ? (
                <PageLoader/>
            ) : (
                <>
                    <p className="text-sm text-[#104B59]">
                        {location?.locationSubtitle}
                    </p>
                    <p className="mx-auto text-xl font-bold text-center lg:w-1/2 lg:text-5xl">
                        {location?.locationTitle}
                    </p>
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
        </div>
    );
};

export default LocationSection;
