/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export → deployable to GitHub Pages (bahost01.github.io) with zero server.
  output: "export",
  // User/organization GitHub Pages are served from the domain root, so no basePath needed.
  images: {
    // Static export cannot use the Next image optimizer.
    unoptimized: true,
  },
  trailingSlash: true,
  // Static export pipeline has no ESLint config in-repo; type safety is enforced
  // separately via `tsc --noEmit` (npm run typecheck).
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
