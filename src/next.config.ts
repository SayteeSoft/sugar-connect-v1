
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  watchOptions: {
    ignored: [
      '**/.git/**',
      '**/.next/**',
      '**/node_modules/**',
      'src/ai/**', // Ignore Genkit files
    ],
  },
};

export default nextConfig;
