/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: config => {
      config.externals.push('pino-pretty', 'lokijs', 'encoding');
      return config;
    },
  images: {
    domains: ['images.unsplash.com'],
  },
  env: {
    THIRDWEB_CLIENT_ID: process.env.THIRDWEB_CLIENT_ID,
  }
  };


  
  export default nextConfig;
