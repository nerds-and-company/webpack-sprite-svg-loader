class WebpackSpriteSvgLoaderState {
  static instance = new WebpackSpriteSvgLoaderState();

  constructor() {
    this.sprites = {};
  }

  get spritesWithContent() {
    return Object.entries(this.sprites).map(([spriteFilename, svgs]) => {
      return [spriteFilename, this.svgsToContent(svgs)];
    });
  }

  addSvg(symbolId, svgContent, spriteFilename) {
    this.sprites[spriteFilename] = this.sprites[spriteFilename] || {};
    this.sprites[spriteFilename][symbolId] = this.transformSvg(svgContent);
  }

  transformSvg(svgContent) {
    const [_, parsedAttributes, content] = svgContent.match(/<svg(.*?)>(.*?)<\/svg>/s);

    const attributes = parsedAttributes.split(' ').reduce((result, attribute) => {
      if (attribute.startsWith('xmlns')) {
        return result;
      }

      result.push(attribute);
      return result;
    }, []).join(' ');

    return {
      attributes,
      content,
    };
  }

  svgsToContent(svgs) {
    return `${Object.keys(svgs).reduce(
      (result, symbolId) =>
        `${result}<symbol id="${symbolId}"${svgs[symbolId].attributes}>${svgs[symbolId].content}</symbol>`,
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'
    )}</svg>`;
  }
}

module.exports = WebpackSpriteSvgLoaderState;
