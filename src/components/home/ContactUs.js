"use client"
import React, { Fragment, useEffect, useState } from 'react';
import { RiMailSendLine } from 'react-icons/ri';
import { IoSend } from 'react-icons/io5';
import { MdOutlinePhoneInTalk } from 'react-icons/md';
import { IoMailOutline } from 'react-icons/io5';
import { SlLocationPin } from 'react-icons/sl';
import { Button } from '../ui/button';
import ValidationSchema, { contactValidation } from '../Validation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Spinner from '../ui/spinner';


const GetInTouchSection = () => {

    const [loading, setLoading] = useState(false);
    const [contact, setContact] = useState({})

    const handleGetContact = () => {
        setLoading(true)
        axios('https://starconcord.onrender.com/api/contactUs', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        })
            .then((res) => {
                setContact(res.data.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
            })
    }

    useEffect(() => {
        handleGetContact()
    }, [])

    const handlePost = (values, actions) => {
        console.log(values);
        setLoading(true);
        axios("https://starconcord.onrender.com/api/send-meesage", {
            method: "post",
            data: {
                email: values.email,
                name: values.name,
                phone: values.phone,
                message: values.message,
            },
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                console.log(res.data);
                setLoading(false);
                toast.success(res.data.massage, {
                    zIndex: "9999px",
                });
                actions.resetForm(); // Reset form after successful submission
            })
            .catch((err) => {
                console.log(err, "error");
                toast.error("Phone is invalid", { duration: 3000 });
                setLoading(false);
            });
    };

    return (
        <div className="container w-full mx-auto">
            <div className="grid items-center gap-5 lg:grid-cols-2 xl:gap-40 md:gap-20">
                <div className="space-y-5 lg:space-y-8">
                    <p className="text-base font-bold lg:text-2xl">
                        Get in touch with us
                    </p>
                    <p className="text-[#6C6C6C] text-sm">
                        Our team of experts is ever ready to assist you by offering the best freight forwarding solutions for your needs. Get in touch with us today.
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <MdOutlinePhoneInTalk className="text-xl text-primary_color" />
                            <p className="text-[#6C6C6C] text-lg">
                                Phone number
                            </p>
                        </div>
                        <p className="text-lg font-bold">{contact?.phone}</p>
                        <div className="flex items-center gap-3">
                            <IoMailOutline className="text-xl text-primary_color" />
                            <p className="text-[#6C6C6C] text-lg">Email</p>
                        </div>
                        <p className="text-lg font-bold">
                            {contact?.email}
                        </p>
                        <div className="flex items-center gap-3">
                            <SlLocationPin className="text-xl text-primary_color" />
                            <p className="text-[#6C6C6C] text-lg">Address</p>
                        </div>
                        <p className="text-lg font-bold w-[70%]">
                            {contact?.address}
                        </p>
                    </div>
                </div>
                <div className="w-full rounded-3xl bg-[#F7F9FB] p-8 space-y-8">
                    <div className="flex items-center gap-3">
                        <RiMailSendLine className="text-2xl text-primary_color" />
                        <p className="text-xl font-bold">Send us message</p>
                    </div>
                    <Formik
                        initialValues={contactValidation.initialState}
                        validationSchema={contactValidation.schema}
                        onSubmit={handlePost}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <Form>
                                <div className="flex flex-col gap-6">
                                    <div className="relative w-full h-11">
                                        <Field
                                            placeholder="Full name"
                                            className="w-full font-semibold h-full bg-transparent border-b peer border-[#7A7A7A] placeholder:font-semibold placeholder-[#6C6C6C]  focus:border-primary_color focus:outline-0 "
                                            type="text"
                                            name="name"
                                        />
                                        <ErrorMessage
                                            name="name"
                                            component="span"
                                            className="text-red-600"
                                        />
                                    </div>
                                    <div className="relative w-full h-11">
                                        <Field
                                            placeholder="Phone number"
                                            className="w-full font-semibold h-full bg-transparent border-b peer border-[#7A7A7A] placeholder:font-semibold placeholder-[#6C6C6C]  focus:border-primary_color focus:outline-0 "
                                            type="tel"
                                            maxLength={10}
                                            name="phone"
                                        />
                                        <ErrorMessage
                                            name="phone"
                                            component="span"
                                            className="text-red-600"
                                        />
                                    </div>
                                    <div className="relative w-full h-11">
                                        <Field
                                            placeholder="Email address"
                                            className="w-full font-semibold h-full bg-transparent border-b peer border-[#7A7A7A] placeholder:font-semibold placeholder-[#6C6C6C]  focus:border-primary_color focus:outline-0 "
                                            type="email"
                                            name="email"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="span"
                                            className="text-red-600"
                                        />
                                    </div>
                                    <div className="relative w-full min-w-[200px]">
                                        <Field
                                            as="textarea"
                                            className="w-full font-semibold h-full bg-transparent border-b peer border-[#7A7A7A] placeholder:font-semibold placeholder-[#6C6C6C]  focus:border-primary_color focus:outline-0"
                                            placeholder="Message"
                                            name="message"
                                        ></Field>
                                        <ErrorMessage
                                            name="message"
                                            component="span"
                                            className="text-red-600"
                                        />
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className="flex items-center gap-3 mt-6"
                                    variant="primary"
                                    disabled={loading}
                                >
                                    <IoSend />
                                    {loading ? "Sending..." : "Send message"}
                                    {/* <Spinner show={loading}
                                        width="35"
                                        height="35"
                                        text="Send message" /> */}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default GetInTouchSection;
