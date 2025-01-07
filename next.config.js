/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.clerk.dev", "img.clerk.com"],
  },
  async redirects() {
    return [
      {
        source: "/flow",
        destination: "/comprar",
        permanent: true,
      },
      {
        source: "/comprar/flow",
        destination: "/comprar",
        permanent: true,
      },
      {
        source: "/comprar/eth",
        destination: "/eth",
        permanent: true,
      },
      {
        source: "/comprar/polygon",
        destination: "/polygon",
        permanent: true,
      },
      {
        source: "/comprar/btc",
        destination: "/btc",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
