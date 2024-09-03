/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "linux.do",
      },
    ],
  },
};

export default nextConfig;
