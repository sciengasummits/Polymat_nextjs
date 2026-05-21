/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint runs separately — skip it during next build to avoid
    // flat-config serialization errors with parser function values.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.bing.com' },
    ],
  },
};

export default nextConfig;
