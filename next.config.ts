import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(md|sh)$/,
      use: "raw-loader",
    });
    return config;
  },
};

export default nextConfig;