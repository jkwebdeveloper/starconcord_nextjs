'use client'
import PageLoader from '@/components/ui/pageloader'
import axios from 'axios'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { LuClock4 } from 'react-icons/lu'
import { useLocation } from "react-router-dom";

const ArticleDetailspage = () => {
    const [articlesDetails, setArticlesDetails] = useState({})
    const [loading, setLoading] = useState(false)


    const params = useParams();
    const { id } = params;


    const handleGetArticlesDetails = () => {

        if (!id) return
        setLoading(true)
        axios.get(`https://starconcord.onrender.com/api/articleList/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        })
            .then((res) => {

                setArticlesDetails(res.data.data);
                setLoading(false)
                console.log(res.data.data, "response👍💥😊😊");
            })
            .catch((err) => {
                console.log(err);

                setLoading(false)
            })
    }

    useEffect(() => {
        handleGetArticlesDetails()
    }, [id])

    return (
        <div className="container w-full pb-10 mx-auto lg:space-y-20 space-y-7">
            {loading ? (
                <PageLoader />
            ) : (
                <>
                    <div className="relative md:h-80 h-60">
                        <Image
                            // src={dynamicImage ? BaseUrl.concat(dynamicImage) : image}
                            src="/static/images/page title img.jpg"
                            alt='banner'
                            loading="lazy"
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                            className="rounded-2xl"
                        />
                        <div className="absolute w-full space-y-2 text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <div className="flex items-center justify-center gap-2">
                                <LuClock4 className="text-lg font-semibold text-primary_color" />
                                <p className="text-lg font-semibold text-primary_color">
                                    {articlesDetails
                                        ? format(Date(articlesDetails?.createdAt), 'dd, MMM yyyy')
                                        : ''}
                                </p>
                            </div>
                            <h1 className="text-2xl font-bold text-center text-black capitalize md:text-4xl">
                                {articlesDetails?.title}
                            </h1>
                            <div className="flex items-center justify-center gap-3">
                                <Link href="/">
                                    <p className="text-lg text-black">Home</p>
                                </Link>
                                <IoIosArrowForward className="text-lg" />
                                <p className="text-lg text-black">Articles</p>
                            </div>
                        </div>
                    </div>
                    <div className="px-0 pb-20 space-y-20 lg:px-20">
                        <div className='space-y-10'>
                            {articlesDetails?.image && (
                                <div className="relative w-full h-[450px] rounded-xl">
                                    <Image
                                        src={`https://starconcord.onrender.com/uploads${articlesDetails?.image}`}
                                        alt='banner'
                                        loading="lazy"
                                        layout="fill"
                                        objectFit="cover"
                                        quality={100}
                                        className="rounded-2xl"
                                    />
                                </div>
                            )}
                            <div
                                className="text-[#6C6C6C] space-y-4 hcontent tag"
                                dangerouslySetInnerHTML={{
                                    __html: articlesDetails?.content,
                                }}
                            ></div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ArticleDetailspage