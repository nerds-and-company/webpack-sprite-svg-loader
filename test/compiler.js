import path from 'path';
import webpack from 'webpack';
import { createFsFromVolume, Volume } from 'memfs';
const WebpackSpriteSvgLoaderPlugin = require('../src/plugin');

const volume = new Volume();
const compiler = (entry, loaderOptions = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: entry,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: {
            loader: path.resolve(__dirname, '../src/loader.js'),
            options: loaderOptions,
          },
        },
      ],
    },
    plugins: [
      new WebpackSpriteSvgLoaderPlugin()
    ]
  });

  compiler.outputFileSystem = createFsFromVolume(volume);
  compiler.outputFileSystem.join = path.join.bind(path);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors()) reject(stats.toJson().errors);

      resolve(stats);
    });
  });
};

module.exports = {
  compiler,
  volume,
};
