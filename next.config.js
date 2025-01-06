/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  distDir: ".next",
  cleanDistDir: true,
  generateBuildId: async () => {
    return "build-" + Date.now();
  },
  poweredByHeader: false,
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  },
};

module.exports = nextConfig;
