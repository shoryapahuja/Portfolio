/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

// If you're deploying to a custom domain, we must NOT use a basePath like /Portfolio
const isCustomDomain = process.env.NEXT_PUBLIC_CUSTOM_DOMAIN === "true";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")?.[1];
const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH;

// Only use basePath for repo-based GitHub Pages URLs (username.github.io/Repo)
const basePath =
  isGithubActions && !isCustomDomain
    ? (envBasePath || (repoName ? `/${repoName}` : ""))
    : "";

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // GitHub Pages needs unoptimized images in export mode
    ...(isGithubActions ? { unoptimized: true } : {}),
  },

  ...(isGithubActions
    ? {
        output: "export",
        trailingSlash: true,
        ...(basePath
          ? { basePath, assetPrefix: basePath }
          : {}), // <— IMPORTANT: don't set these at all for custom domain
      }
    : {}),
};

export default nextConfig;
