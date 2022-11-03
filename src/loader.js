const loaderUtils = require('loader-utils');
const { optimize } = require('svgo');
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
  const { data } = optimize(
    svgContent,
    {
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              inlineStyles: false
            },
          },
        },
        'removeXMLNS',
        {
          name: 'prefixIds',
          params: {
            prefix: symbolId
          }
        }
      ],
    }
  );

  WebpackSpriteSvgLoaderState.instance.addSvg(symbolId, data, options.spriteFilename);

  return `export default ${JSON.stringify({symbolId, data})}`;
}

module.exports = loader;
