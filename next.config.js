/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',

  async rewrites() {
    return [
      {
        source: "/home",
        destination: "/"
      },
      {
        source: "/login",
        destination: "/"
      }
    ];
  }
};

module.exports = nextConfig;
