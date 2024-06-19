/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
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
  basePath: "/developer-toolkit",
};

export default nextConfig;
