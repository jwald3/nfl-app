/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
};

module.exports = {
    images: {
        domains: ["static.www.nfl.com", "b.fssta.com"],
    },
};
