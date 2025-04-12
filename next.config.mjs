import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  images: {
    domains: ['i.pravatar.cc','images.unsplash.com',"randomuser.me"],
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

