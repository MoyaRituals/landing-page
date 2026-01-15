/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  // Allow cross-origin requests from browser devtools and local development
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    '*.localhost',
  ],
  // Explicitly set workspace root to avoid confusion with home directory lockfiles
  turbopack: {
    root: process.cwd(),
  },
}

module.exports = nextConfig
