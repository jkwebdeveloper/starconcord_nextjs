'use client'
import React, { useEffect, useState } from 'react'
// import { BsFillArrowUpSquareFill } from 'react-icons/bs'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Lottie from 'lottie-react'
import scroll from "../../../public/static/icons/scrolltotop.json"
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { FaArrowAltCircleUp } from "react-icons/fa";
import Image from 'next/image'



const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)
    const goToBtn = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const listenToScroll = () => {
        let heightToHidden = 300
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop
        if (winScroll > heightToHidden) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', listenToScroll)
        return () => window.removeEventListener('scroll', listenToScroll)
    }, [])
    useEffect(() => {
        AOS.init()
    }, [])
    return (
        <>
            {isVisible && (
                <div data-aos="fade-left" className="fixed z-50 flex items-end justify-end cursor-pointer right-7 bottom-10" onClick={goToBtn}>
                    {/* <Lottie
                        animationData={scroll}
                        loop={true}
                        style={{ height: '50px' }}
                    /> */}
                    {/* <FaArrowAltCircleUp className='text-5xl text-primary_color' /> */}
                    <Image src={'/static/images/arrow.png'}
                        alt=""
                        loading="lazy"
                        width={40}
                        height={40}
                        className="object-cover" />
                </div>
            )}
        </>
    )
}

export default ScrollToTop
