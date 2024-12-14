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
};

module.exports = nextConfig;
