/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "103.129.205.239",
        port: "8081",
      },
    ],
  },
};

export default nextConfig;
