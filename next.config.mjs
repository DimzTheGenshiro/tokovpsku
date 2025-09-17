/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false, // Menonaktifkan SWC
  compiler: {
    // Gunakan Babel sebagai pengganti SWC
    // Perlu instal @babel/core dan @babel/preset-env
  },
};

export default nextConfig;

