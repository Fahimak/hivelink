/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      "images.veehive.ai",
      "veehiveprod-images.s3.ap-south-1.amazonaws.com",
      "lh3.googleusercontent.com",
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "1000mb",
    },
  },
};

export default nextConfig;
