/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, process: false };
    return config;
  },
  images: {
    domains: ["cqrlonoblajaublsikmb.supabase.co"],
  },
};

export default nextConfig;
