"use client"
import CommonBanner from '@/components/global/CommonBanner';
import GetInTouchSection from '@/components/home/ContactUs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoDotFill } from 'react-icons/go';

const ContactUs = () => {
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState([]);

    const handleGetLocation = () => {
        setLoading(true);
        axios('https://starconcord.onrender.com/api/locationList', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        })
            .then((res) => {
                console.log('API Response:', res.data.data); // Debugging log
                const indiaLocations = res.data.data
                    .flatMap((item) => item.locations)
                    .filter((loc) => loc.country === 'India');
                setLocation(indiaLocations);
                setLoading(false);
            })
            .catch((err) => {
                console.error('API Error:', err); // Debugging log for errors
                setLoading(false);
            });
    };

    useEffect(() => {
        handleGetLocation();
    }, []);


    return (
        <div className="container w-full mx-auto lg:space-y-20 space-y-7">
            <CommonBanner
                image="/static/images/page title img.jpg"
                title="Contact Us"
                page="Contact us"
            />
            <GetInTouchSection />
            {loading ? (
                <div>
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="bg-[#F7F9FB] w-full py-20">
                    <div className="grid items-start justify-center gap-5 px-2 lg:px-10 lg:grid-cols-2">
                        {location.length > 0 ? (
                            location.map((item) => (
                                <div key={item._id} className="p-5 space-y-6 border border-[#D4DEEF] rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <GoDotFill className="text-primary_color" />
                                        <p className="text-xl font-semibold">
                                            {item.city} Office
                                        </p>
                                    </div>
                                    <hr className="w-full h-0.5 border-t-0 bg-[#c5c5c5] dark:bg-white/10" />
                                    <div className="grid items-start lg:grid-cols-2">
                                        <div className="flex-col space-y-2 lg:flex-row">
                                            <p className="text-[#6C6C6C] text-lg font-medium">
                                                Phone number:
                                            </p>
                                            <p className="text-xl font-bold">
                                                {item.phone}
                                            </p>
                                        </div>
                                        <div className="flex-col space-y-2 lg:flex-row">
                                            <p className="text-[#6C6C6C] text-lg font-medium">
                                                Email:
                                            </p>
                                            <p className="text-xl font-bold">
                                                {item.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[#6C6C6C] text-lg font-medium">
                                            {item.isHeadOffice ? `Head Office (${item.city}):` : 'Address:'}
                                        </p>
                                        <p className="text-lg font-semibold">
                                            {item.addressLineOne}, {item.city}, {item.country} - {item.pincode}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className='text-center'>No India locations found.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactUs;
