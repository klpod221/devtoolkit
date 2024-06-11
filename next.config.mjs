/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["flowbite.com", "github.com"],
    },
};

export default nextConfig;
