const path = require("path");

const ENV = require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

console.log("ENV :>> ", ENV);
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: ENV,
};

module.exports = nextConfig;
