/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist'
}

module.exports = nextConfig


module.exports = nextConfig
//  {
//     async rewrites() {
//       return [
//         {
//           source: '/api/:path*',
//           destination: 'https://sohpie0217nzmymoneyapi.azurewebsites.net/api/:path*' // Proxy to Backend
//         }
//       ]
//     }
//   }

