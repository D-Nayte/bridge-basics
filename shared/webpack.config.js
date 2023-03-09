const path = require("path");

module.exports = {
  // ... other configurations ...
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Use any custom loaders or presets here
    config.module.rules.push({
      test: /\.tsx?$/,
      include: [
        path.resolve(__dirname, "./src"), // Include the "shared" folder
        path.resolve(__dirname, "./"), // Include the "shared" folder
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
