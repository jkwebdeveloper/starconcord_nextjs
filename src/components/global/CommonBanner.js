import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const CommonBanner = ({ title, image, page }) => {
    return (
        <div className="relative md:h-80 h-60">
            <Image
                // src={dynamicImage ? BaseUrl.concat(dynamicImage) : image}
                src={image}
                alt={title}
                loading="lazy"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="rounded-2xl"
            />
            <div className="absolute text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <h1 className="text-2xl font-bold text-center text-black capitalize md:text-4xl">
                    {title}
                </h1>
                <div className="flex items-center gap-3 px-0 lg:px-4">
                    <Link href="/">
                        <p className="text-sm text-black lg:text-lg">Home</p>
                    </Link>
                    <IoIosArrowForward className="text-sm lg:text-lg" />
                    <p className="text-lg text-black">{page}</p>
                </div>
            </div>
        </div>
    );
};

export default CommonBanner;
