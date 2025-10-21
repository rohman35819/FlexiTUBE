/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // wajib untuk static
  images: {
    unoptimized: true, // cegah error Image Optimization
  },
  trailingSlash: true, // optional tapi bantu file HTML dikenali di Netlify
};

module.exports = nextConfig;
