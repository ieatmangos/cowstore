/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Required:
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.schema.io",
        port: "",
        pathname: "/cow-store/**",
      },
    ],
  },
};

module.exports = nextConfig;
