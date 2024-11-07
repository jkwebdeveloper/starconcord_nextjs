"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import PageLoader from '../ui/pageloader';

const PacificSection = () => {
    const [pacific, setPacific] = useState({});
    const [loading, setLoading] = useState(false);
    const [isCounting, setIsCounting] = useState(false);

    const { ref, inView } = useInView({
        triggerOnce: true, // Trigger the animation once when the component is in view
        onChange: (inView) => {
            if (inView) {
                setIsCounting(true);
            }
        },
    });

    const handleGetPacific = () => {
        setLoading(true);
        axios("https://starconcord.onrender.com/api/aboutUsPage", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        })
            .then((res) => {
                setPacific(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        handleGetPacific();
    }, []);

    const parseKTEUS = (kteus) => {
        const regex = /^(\d+)(\w)$/;
        const match = kteus.match(regex);
        return match ? { numberPart: match[1], letterPart: match[2] } : { numberPart: '0', letterPart: '' };
    };

    const { numberPart, letterPart } = parseKTEUS(pacific.kteus || '');

    return (
        <div className="container w-full mx-auto space-y-5">
            {/* <h2 className="text-4xl font-bold text-center text-black">
                Pacific Star Group
            </h2> */}
            <div ref={ref} className="grid items-start gap-5 md:grid-cols-2 lg:grid-cols-4">
                {loading ? (
                    <PageLoader/>
                ) : (
                    <>
                        <div className="bg-[#F7F9FB] space-y-3 rounded-xl p-3 md:p-6">
                            <div className="text-3xl font-bold md:text-5xl text-primary_color">
                                +
                                {isCounting ? (
                                    <CountUp end={pacific.employees} duration={2} />
                                ) : (
                                    '0'
                                )}
                            </div>
                            <div className="text-sm text-gray-600 md:text-base">
                                Employees
                            </div>
                        </div>
                        <div className="bg-[#F7F9FB] space-y-3 rounded-xl p-3 md:p-6">
                            <div className="text-3xl font-bold md:text-5xl text-primary_color">
                                +
                                {isCounting ? (
                                    <>
                                        <CountUp end={parseInt(numberPart)} duration={2} />
                                        {letterPart}
                                    </>
                                ) : (
                                    '0'
                                )}
                            </div>
                            <div className="text-sm text-gray-600 md:text-base">
                                TEUs Moved
                            </div>
                        </div>
                        <div className="bg-[#F7F9FB] space-y-3 rounded-xl p-3 md:p-6">
                            <div className="text-3xl font-bold md:text-5xl text-primary_color">
                                +
                                {isCounting ? (
                                    <CountUp end={pacific.offices} duration={2} />
                                ) : (
                                    '0'
                                )}
                            </div>
                            <div className="text-sm text-gray-600 md:text-base">
                                Offices in Asia
                            </div>
                        </div>
                        <div className="bg-[#F7F9FB] space-y-3 rounded-xl p-3 md:p-6">
                            <div className="text-3xl font-bold md:text-5xl text-primary_color">
                                +
                                {isCounting ? (
                                    <CountUp end={pacific.worldwide} duration={2} />
                                ) : (
                                    '0'
                                )}
                            </div>
                            <div className="text-sm text-gray-600 md:text-base">
                                Destinations Worldwide
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PacificSection;
