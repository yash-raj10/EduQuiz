/** @type {import('next').NextConfig} */

const nextConfig = {
  trailingSlash: true,

  images: {
    domains: [
      "raw.githubusercontent.com",
      "images.unsplash.com",
      "avatars.githubusercontent.com",
    ],
    unoptimized: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
