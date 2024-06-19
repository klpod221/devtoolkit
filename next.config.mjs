/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  basePath: "/devtoolkit",
};

export default nextConfig;
