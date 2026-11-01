import createMDX from '@next/mdx';
import rehypePostSections from './lib/rehype-post-sections.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  async headers() {
    return [
      {
        source: '/:all*.(png|jpg|jpeg|gif|svg|webp|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypePostSections],
  },
});

export default withMDX(nextConfig);
