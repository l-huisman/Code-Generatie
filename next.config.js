/** @type {import('next').NextConfig} */
const withImages = require("next-images");

const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    domains: ["localhost"],
  },
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: `${
          process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
            ? process.env.API_URL
            : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
            ? process.env.API_URL
            : "http://localhost:8080"
        }/:path*`,
      },
    ];
  },
};

module.exports = withImages(nextConfig);
