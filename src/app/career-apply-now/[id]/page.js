'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Label from '@/components/ui/form/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import ValidationSchema from '@/components/Validation';
import CommonBanner from '@/components/global/CommonBanner';
import toast from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';

const ApplyNowpage = () => {
    const [loading, setLoading] = useState(false);
    const [resume, setResume] = useState(null);
    const { careerApplySchema } = ValidationSchema();
    const [location, setLocation] = useState({ data: [] })

    const pathname = usePathname();
    const [lastSegment, setLastSegment] = useState('');


    const [jobTitle, setJobTitle] = useState('');

    // useEffect(() => {
    //     if (router.isReady && router.query.id) {
    //         setValue("jobId", router.query.id);
    //     }
    // }, [router.isReady, router.query.id, setValue]);

    // const locations = [
    //     "Ahmedabad", "Bangkok", "Bengaluru", "Chennai", "Coimbatore",
    //     "Dubai", "Gandhidham", "Houston", "Hyderabad"
    // ];

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        shouldFocusError: true,
        resolver: yupResolver(careerApplySchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            mobile: "",
            location: "",
            resume: null,
            jobId: "",
        },
    });

    useEffect(() => {
        // Split the pathname into segments and get the last one
        const pathSegments = pathname.split('/');
        const lastValue = pathSegments.filter(Boolean).pop(); // Remove empty strings and get the last part
        setLastSegment(lastValue);
        setValue("jobId", lastValue) // Set the last segment in state
    }, [pathname, setValue]);

    const handlePost = (values) => {
        console.log(values);
        if (!values.jobId) {
            toast.error("Job ID is missing.");
            return; // Prevent submission if jobId is empty
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("firstname", values.firstname);
        formData.append("lastname", values.lastname);
        formData.append("email", values.email);
        formData.append("mobile", values.mobile);
        formData.append("location", values.location); // Add selected location
        formData.append("message", values.message);
        formData.append("resume", values.resume[0]);
        formData.append("jobId", values.jobId);

        axios.post("https://starconcord.onrender.com/api/applyJob", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                console.log(res.data, "response+++++++++++++");
                setLoading(false);
                setResume(null);
                toast.success(res.data.message);
                reset();  // Reset form after successful submission
            })
            .catch((err) => {
                console.log(err);
                toast.error("An error occurred, please try again.");
                setLoading(false);
            });
    };

    const handleGetLocation = () => {
        setLoading(true);
        axios("https://starconcord.onrender.com/api/jobLocations", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        })
            .then((res) => {
                setLocation(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        handleGetLocation();
    }, []);

    return (
        <div className="container w-full pb-10 mx-auto lg:space-y-20 space-y-7">
            <CommonBanner
                image="/static/images/page title img.jpg"
                title="Careers"
                page="Careers"
            />
            <div className='w-full space-y-4 lg:w-3/4'>
                {/* <p className="text-sm font-semibold text-left uppercase md:text-base text-primary_color">
                    {jobTitle ? jobTitle : "Job Title"}
                </p> */}
                <p>Please fill up the form below to send us a message or you can contact us directly at our address or via E-mail.</p>
                <form className='space-y-4' onSubmit={handleSubmit(handlePost)}>
                    {/* First and Last Name */}
                    <div className="flex flex-col w-full gap-3 lg:flex-row">
                        <div className="w-full space-y-1 text-left lg:w-1/2">
                            <Label htmlFor="first_name" text="First Name" />
                            <input
                                type="text"
                                name="firstname"
                                className="input_field"
                                {...register("firstname")}
                            />
                            {errors.firstname && <p className="text-red-600">{errors.firstname.message}</p>}
                        </div>
                        <input
                            type="hidden"
                            name="jobId"
                            className="input_field"
                            {...register("jobId")}
                        />

                        <div className="w-full space-y-1 text-left lg:w-1/2">
                            <Label htmlFor="last_name" text="Last Name" />
                            <input
                                type="text"
                                name="lastname"
                                className="input_field"
                                {...register("lastname")}
                            />
                            {errors.lastname && <p className="text-red-600">{errors.lastname.message}</p>}
                        </div>
                    </div>

                    {/* Email and Mobile */}
                    <div className="flex flex-col w-full gap-3 lg:flex-row">
                        <div className="w-full space-y-1 text-left lg:w-1/2">
                            <Label htmlFor="email" text="Your e-mail" />
                            <input
                                type="email"
                                name="email"
                                className="input_field"
                                {...register("email")}
                            />
                            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                        </div>
                        <div className="w-full space-y-1 text-left lg:w-1/2">
                            <Label htmlFor="mobile" text="Your Mobile Number" />
                            <input
                                type="tel"
                                name="mobile"
                                maxLength={10}
                                className="input_field"
                                {...register("mobile")}
                            />
                            {errors.mobile && <p className="text-red-600">{errors.mobile.message}</p>}
                        </div>
                    </div>

                    {/* Location and Resume Upload */}
                    <div className="flex flex-col w-full gap-3 lg:flex-row">
                        <div className="w-full space-y-1 text-left lg:w-1/2">
                            <Label htmlFor="location" text="Location" />
                            <Select onValueChange={(value) => setValue("location", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    {location.data && location.data.length > 0 ? ( // Check if data exists and is not empty
                                        location.data.map((loc, idx) => (
                                            <SelectItem key={idx} value={loc}>
                                                {loc}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <p>No locations available</p> // Fallback if no data
                                    )}
                                </SelectContent>
                            </Select>
                            {errors.location && <p className="text-red-600">{errors.location.message}</p>}
                        </div>

                        <div className="w-full space-y-1 text-left lg:w-1/2">
                            <Label htmlFor="resume" text="Upload Resume" />
                            <input
                                type="file"
                                name="resume"
                                className="input_field"
                                {...register("resume", {
                                    onChange: (e) => setResume(e.target.files[0]),
                                })}
                            />
                            {resume !== null && (
                                <div className="mt-2 text-lg text-center">
                                    {resume?.name}
                                </div>
                            )}
                            {errors.resume && <p className="text-red-600">{errors.resume.message}</p>}
                        </div>
                    </div>

                    {/* Message */}
                    <div className='w-full space-y-1 text-left'>
                        <Label htmlFor="message" text="Your message" />
                        <textarea
                            name="message"
                            className="input_field"
                            {...register("message")}
                        />
                    </div>

                    {/* Submit Button */}
                    <Button variant="primary" type="submit" className="flex items-center uppercase">
                        {loading ? 'Submitting...' : 'Apply Now'}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default ApplyNowpage;
