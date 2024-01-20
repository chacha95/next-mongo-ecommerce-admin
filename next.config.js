const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['jhcha-dev.s3.ap-northeast-2.amazonaws.com']
  },
  compiler: {
    styledComponents: true
  }
};

module.exports = nextConfig;
