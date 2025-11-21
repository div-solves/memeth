/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable static export for Hostinger deployment
  output: 'export',
  images: {
    // Use unoptimized for static export
    unoptimized: true,
  },
  // Trailing slash for better static hosting compatibility
  trailingSlash: true,
};

module.exports = nextConfig;
