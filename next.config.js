/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig


module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://sohpie0217nzmymoneyapi.azurewebsites.net/api/:path*' // Proxy to Backend
        }
      ]
    }
  }