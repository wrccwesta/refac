/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
     domains: ["static.dollardave.app"], 
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
}

export default nextConfig