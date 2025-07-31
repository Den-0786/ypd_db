/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Suppress case sensitivity warnings
    config.infrastructureLogging = {
      level: "error",
    };

    // Ignore specific warnings about case sensitivity
    config.ignoreWarnings = [
      /There are multiple modules with names that only differ in casing/,
      /This can lead to unexpected behavior when compiling on a filesystem with other case-semantic/,
      /Use equal casing/,
    ];

    return config;
  },
};

export default nextConfig;
