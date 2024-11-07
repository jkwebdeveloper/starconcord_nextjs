'use client';
import { HeroSection, TransportSection, OurService, ClientImage, OurIndustries, ServiceImage, ContactUs, Location, Pacific, TextSection } from '@/components'

export default function Home() {
    return (
        <div className="space-y-6 xl:space-y-14">
            <HeroSection />
            <div className="container px-3 pb-10 mx-auto space-y-6 xl:space-y-14 lg:px-10">
                <TransportSection />
                <OurService />
                <OurIndustries />
                <ServiceImage />
                <ContactUs />
                <ClientImage />
                {/* <Location />
                <Pacific /> */}
            </div>
            {/* <div className="">
                <TextSection />
            </div> */}
        </div>
    );
}
