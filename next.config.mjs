/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    reactStrictMode: false,
    images: {
        domains: ["starconcord.com.in"],
        unoptimized: true,
    },
};

export default nextConfig;
