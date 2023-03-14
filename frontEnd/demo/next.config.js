const path = require("path");

const ENV = require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: ENV,

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Use any custom loaders or presets here
    config.module.rules.push({
      test: /\.tsx?$/,
      include: [
        path.resolve(__dirname, "../../shared"), // Include the "shared" folder
        path.resolve(__dirname, "./"), // Include the "this" folder
        path.resolve(__dirname, "../display/"),
      ],
      use: [
        defaultLoaders.babel,
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true, // This skips type checking
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
