/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'sugary-dreams.s3.amazonaws.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // Skips type-checking during build
  },
  
};

export default nextConfig;
