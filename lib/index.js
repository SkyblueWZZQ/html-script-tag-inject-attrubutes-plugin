/**
 * @author  kyrie ving
 * @descrition  inject script's attributes
 */

function typeOf(value) {
  if (Object.prototype.toString.call(value) === '[object Object]') {
    return 'object';
  } else if (Object.prototype.toString.call(value) === '[object Function]') {
    return 'function';
  } else if (Object.prototype.toString.call(value) === '[object String]') {
    return 'string';
  } else if (Object.prototype.toString.call(value) === '[object Boolean]') {
    return 'boolean';
  }
  return '';
}
function addAttributes(tags, options) {
  if (tags.length > 0) {
    tags.forEach((tag) => {
      if (tag.tagName === 'script') {
        Object.keys(options).forEach((key) => {
          const value = options[key];
          tag.attributes[key] = value;
          if (typeOf(value) === 'function') {
            tag.attributes[key] = value(tag);
          } else if (typeOf(value) === 'object') {
            tag.attributes[key] = JSON.stringify(value);
          } else if (typeOf(value) === false) {
            delete tag.attributes[key];
          }
        });
      }
    });
  }
}

class HtmlScriptAttributsInjectPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-alter-asset-tags', (htmlData, callback) => {
        addAttributes(htmlData.head, this.options);
        addAttributes(htmlData.body, this.options);
        callback();
      });
    });
  }
}

module.exports = HtmlScriptAttributsInjectPlugin;
