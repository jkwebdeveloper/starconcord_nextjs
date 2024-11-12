// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false,
//   images: {
//     domains: ["starconcord.com.in"],
//     unoptimized: true,
//     remotePatterns: [
//       {
//         hostname: "starconcord.com.in",
//       },
//     ],
//   },
// };

// export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["starconcord.com.in"],
//     unoptimized: true,
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["starconcord.com.in"],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "starconcord.com.in",
        // port: "",
        pathname: "/scbk/uploads/**",
      },
    ],
  },
};

export default nextConfig;
