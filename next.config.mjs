import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  images: {
    domains: ['i.pravatar.cc'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    turboMode: true,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

