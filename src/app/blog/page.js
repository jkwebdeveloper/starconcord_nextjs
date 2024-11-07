"use client";
import dynamic from "next/dynamic";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa6";

// Dynamically import components with ssr disabled
const CommonBanner = dynamic(() => import("@/components/global/CommonBanner"), {
  ssr: false,
});
const PageLoader = dynamic(() => import("@/components/ui/pageloader"), {
  ssr: false,
});

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetBlogs = () => {
    setLoading(true);
    axios("https://starconcord.onrender.com/api/blogList", {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    })
      .then((res) => {
        setBlogs(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetBlogs();
  }, []);

  return (
    <div className="container w-full mx-auto lg:space-y-20 space-y-7">
      <CommonBanner
        image="/static/images/page title img.jpg"
        title="Blogs"
        page="Blogs"
      />
      <div className="px-0 pb-20 space-y-10 lg:px-10">
        {loading ? (
          <PageLoader />
        ) : blogs.length > 0 ? (
          <div className="grid items-start justify-center gap-5 lg:grid-cols-3">
            {blogs.map((item) => (
              <Link href={`/blog-detail/${item._id}`} key={item._id}>
                <div className="space-y-3">
                  <div className="relative w-full overflow-hidden h-80 rounded-xl">
                    <Image
                      src={`https://starconcord.onrender.com/uploads${item?.blogImage}`}
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
                      {new Date(item?.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <p className="text-2xl font-bold">{item?.title}</p>
                  <p className="text-[#6C6C6C]">{item?.sortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex justify-center w-64 mx-auto mt-28">
            <p>No Blogs...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
