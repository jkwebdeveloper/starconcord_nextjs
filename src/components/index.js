'use client';
import dynamic from "next/dynamic";

//Global components
const PageLoader = dynamic(() => import("@/components/ui/pageloader"));
const loader = <PageLoader show={true} width="100" height="100" text="Request" />
const Button = dynamic(() => import("@/components/ui/button"));
const Spinner = dynamic(() => import("@/components/ui/spinner"))

//Home components
const HeroSection = dynamic(() => import("@/components/home/HeroSection"), { loading: () => loader })
const TransportSection = dynamic(() => import("@/components/home/TransportSection"), { loading: () => loader })
const OurService = dynamic(() => import("@/components/home/OurService"), { loading: () => loader })
const ClientImage = dynamic(() => import("@/components/home/ClientImage"), { loading: () => loader })
const OurIndustries = dynamic(() => import("@/components/home/OurIndustries"), { loading: () => loader })
const ServiceImage = dynamic(() => import("@/components/home/ServiceImage"), { loading: () => loader })
const ContactUs = dynamic(() => import("@/components/home/ContactUs"), { loading: () => loader })
const Location = dynamic(() => import("@/components/home/Location"), { loading: () => loader })
const Pacific = dynamic(() => import("@/components/home/Pacific"), { loading: () => loader })
const TextSection = dynamic(() => import("@/components/home/TextSection"), { loading: () => loader })


export { Button, PageLoader, Spinner }
export { HeroSection, TransportSection, OurService, ClientImage, OurIndustries, ServiceImage, ContactUs, Location, Pacific, TextSection }
// export {HeroSection}