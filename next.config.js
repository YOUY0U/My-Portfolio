/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    // Autoriser les avatars Chess.com
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.chesscomfiles.com",
      },
    ],
  },
};

export default config;
