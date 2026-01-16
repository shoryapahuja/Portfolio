/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

// You are using a custom domain (www.shoryapahuja.ca), so DO NOT use /Portfolio basePath.
const useBasePath = false;

const repoName = process.env.GITHUB_REPOSITORY?.split("/")?.[1];
const basePath = useBasePath && repoName ? `/${repoName}` : "";

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    ...(isGithubActions ? { unoptimized: true } : {}),
  },
  ...(isGithubActions
    ? {
        output: "export",
        trailingSlash: true,
        ...(useBasePath ? { basePath, assetPrefix: basePath } : {}),
      }
    : {}),
};

export default nextConfig;
