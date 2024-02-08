/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*' // Proxy to Backend
      },
      {
        source: '/login',
        destination: 'http://localhost:8080/login' // Proxy to Backend
      },
    ];
  }
}

module.exports = nextConfig


