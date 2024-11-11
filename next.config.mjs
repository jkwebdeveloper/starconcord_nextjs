/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["starconcord.com.in"],
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "starconcord.com.in",
      },
    ],
  },
};

export default nextConfig;
