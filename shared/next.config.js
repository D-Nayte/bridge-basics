const path = require("path");

const ENV = require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: ENV,
  webpack: (config, options) => {
    // Add the TypeScript loader
    config.module.rules.push({
      test: /\.ts$/,
      loader: "ts-loader",
    });
    return config;
  },
};

module.exports = nextConfig;
