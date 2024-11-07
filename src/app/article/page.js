'use client'
import CommonBanner from '@/components/global/CommonBanner'
import PageLoader from '@/components/ui/pageloader'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaRegClock } from 'react-icons/fa6'

const Article = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)

  const handleGetArticles = () => {
    setLoading(true)
    axios('https://starconcord.onrender.com/api/articleList', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
      .then((res) => {
        setArticles(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      })
  }

  useEffect(() => {
    handleGetArticles()
  }, [])

  return (
    <div className="container w-full mx-auto lg:space-y-20 space-y-7">
      <CommonBanner
        image="/static/images/page title img.jpg"
        title="Articles"
        page="Articles"
      />
      <div className="px-0 pb-20 space-y-10 lg:px-10">
        {loading ? (
          <PageLoader className="flex items-center justify-center" />
        ) : articles.length > 0 ? (
          <>
            <div className="grid items-start justify-center gap-5 lg:grid-cols-3">
              {articles.map((item) => (
                <Link
                  href={`/article-detail/${item._id}`}
                  state={{ id: item._id }}
                  key={item._id}
                >
                  <div className="space-y-3" key={item._id}>
                    <div className="relative w-full overflow-hidden h-80 rounded-xl">
                      <Image
                        src={`https://starconcord.onrender.com/uploads${item?.image}`}
                        alt={item.title}
                        loading="lazy"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <FaRegClock className="text-[#6C6C6C] text-lg" />
                      <p className="text-[#6C6C6C] text-lg">
                        {new Date(item?.createdAt).toLocaleDateString('en-US', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <p className="text-2xl font-bold">{item?.title}</p>
                    <p className="text-[#6C6C6C]">{item?.sortDescription}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="flex justify-center w-64 mx-auto mt-28">
            <p>No Articles...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Article