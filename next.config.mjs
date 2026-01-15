/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")?.[1];
const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const basePath = envBasePath || (isGithubPages && repoName ? `/${repoName}` : undefined);

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    ...(isGithubPages ? { unoptimized: true } : {}),
  },
  ...(isGithubPages
    ? {
        // GitHub Pages requires a fully static site
        output: "export",
        trailingSlash: true,
        basePath,
        assetPrefix: basePath,
      }
    : {}),
};

export default nextConfig;
