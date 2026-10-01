/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Set by the Pages workflow so the demo works under /<repo>/.
  basePath: process.env.PAGES_BASE_PATH || '',
  images: { unoptimized: true },
};

export default nextConfig;
