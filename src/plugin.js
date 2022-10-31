const WebpackSpriteSvgLoaderState = require('./state');

class WebpackSpriteSvgLoaderPlugin {
  apply(compiler) {
    const { webpack } = compiler;
    const { RawSource } = webpack.sources;

    compiler.hooks.thisCompilation.tap(
      WebpackSpriteSvgLoaderPlugin.name,
      async (compilation) => {
        // Webpack caching disabled for now
        // const cache = compilation.getCache('WebpackSpriteSvgLoaderPlugin.name');
        // await cache.get('sprites', null, (_, result) => {
        //   if (result) {
        //     WebpackSpriteSvgLoaderState.instance.sprites = result;
        //   }
        // });

        compilation.hooks.processAssets.tap(
          WebpackSpriteSvgLoaderPlugin.name,
          async () => {
            // await cache.store(
            //   'sprites',
            //   null,
            //   WebpackSpriteSvgLoaderState.instance.sprites,
            //   (_, _result) => {}
            // );

            WebpackSpriteSvgLoaderState.instance.spritesWithContent
              .forEach(([spriteFilename, content]) => {
                compilation.emitAsset(spriteFilename, new RawSource(content));
              });
          }
        );
      }
    );
  }
}

module.exports = WebpackSpriteSvgLoaderPlugin;
