import type { NextConfig } from "next";

/**
 * `npm run dev` / `npm run build` behave normally.
 *
 * The GitHub Pages workflow sets STATIC_EXPORT=1 and NEXT_PUBLIC_BASE_PATH,
 * which switches this to a static export served from a repo subpath. Keeping
 * both behind env vars means local development is unaffected.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(process.env.STATIC_EXPORT ? { output: "export", trailingSlash: true } : {}),
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
