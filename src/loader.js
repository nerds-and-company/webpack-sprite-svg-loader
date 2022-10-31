const loaderUtils = require('loader-utils');
const WebpackSpriteSvgLoaderState = require('./state');

function loader(svgContent) {
  // Webpack caching disabled for now
  this.cacheable(false);

  const options = {
    symbolId: '[name]',
    spriteFilename: 'sprite.svg',
    ...this.getOptions(),
  }

  const symbolId = loaderUtils.interpolateName(this, options.symbolId);
  WebpackSpriteSvgLoaderState.instance.addSvg(symbolId, svgContent, options.spriteFilename);

  return `export default ${JSON.stringify({symbolId, svgContent})}`;
}

module.exports = loader;
