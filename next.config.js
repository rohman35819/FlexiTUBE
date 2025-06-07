// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Wajib untuk static export
  images: {
    unoptimized: true, // ← WAJIB ditambahkan untuk mencegah error Image Optimization
  },
};

module.exports = nextConfig;
