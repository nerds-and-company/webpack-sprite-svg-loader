# webpack-sprite-svg-loader

[![npm version](https://img.shields.io/npm/v/@nerdsandcompany/webpack-sprite-svg-loader)](https://www.npmjs.com/package/@nerdsandcompany/webpack-sprite-svg-loader)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/nerds-and-company/webpack-sprite-svg-loader/blob/master/LICENSE)

Webpack loader for generating external svg symbol sprite files, inspired by https://github.com/vadymshymko/svg-sprite-generation-loader

## Table of contents

- [How it works?](#how-it-works)
- [TODO (limitations)](#todo)
- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)

## TODO

- Currently you have to restart your webpacker after you've added or removed a SVG,
- Caching is currently disabled (perhaps related to previous bullet).

## How it works?

webpack-sprite-svg-loader is a webpack-loader that takes a multiple svg files, transform (parse and return as an object with `symbolId` and `attributes` keys) and put them back in one file.

Input multiple svg files, e.g:

```html
<!-- file1.svg -->
<svg viewBox="0 0 10 10">
  <!-- file1.svg content -->
</svg>

<!-- file2.svg -->
<svg viewBox="0 0 10 30">
  <!-- file2.svg content -->
</svg>

<!-- file3.svg -->
<svg viewBox="0 0 15 40">
  <!-- file3.svg content -->
</svg>
```

Output one svg file (svg sprite):

```html
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol viewBox="0 0 10 10" id="file1">
    <!-- file1.svg content -->
  </symbol>

  <symbol viewBox="0 0 10 30" id="file2">
    <!-- file1.svg content -->
  </symbol>

  <symbol viewBox="0 0 15 40" id="file3">
    <!-- file3.svg content -->
  </symbol>
</svg>
```

You can refer to this file to display all your icons using [SVG stacking technique](https://css-tricks.com/svg-fragment-identifiers-work/#article-header-id-4)

## Installation:

```bash
npm install webpack-sprite-svg-loader --save-dev
```

**yarn**

```bash
yarn add webpack-sprite-svg-loader --dev
```

## Usage:

In your webpack config:

```javascript
const path = require('path');
const glob = require('glob');

const WebpackSpriteSvgLoaderState = require('webpack-sprite-svg-loader/src/plugin.js');

module.exports = {
  entry: {
    sprite: glob.sync(path.resolve(__dirname, './src/assets/img/sprite/**/*.svg'))
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: 'webpack-sprite-svg-loader',
        options: {
          spriteFilename: 'assets/img/sprite.svg'
        }
      },
    ],
  },
  plugins: [new WebpackSpriteSvgLoaderState()]
};
```

## Options

TODO: test the options and write docs
