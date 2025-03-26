/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_BACKEND_URL: process.env.REACT_BACKEND_URL,
  },
};

export default nextConfig;
