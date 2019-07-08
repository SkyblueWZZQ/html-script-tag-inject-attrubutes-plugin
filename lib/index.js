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
    tags.forEach(function (tag) {
      if (tag.tagName === 'script') {
        Object.keys(options).forEach(function (key) {
          var value = options[key];
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


function HtmlScriptAttributsInjectPlugin(options) {
  this.options = options;

}

HtmlScriptAttributsInjectPlugin.prototype.apply = apply;
HtmlScriptAttributsInjectPlugin.prototype._handleHtml = _handleHtml;

function apply(compiler) {
  var handler = this._handleHtml.bind(this);
  // 兼容wp4
  if (compiler.hooks) {
    var ID = 'script-attributes-inject-plugin';
    compiler.hooks.compilation.tap(ID, function (compilation) {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tap(ID, handler)
    })
  } else {
    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('html-webpack-plugin-alter-asset-tags', handler);
    });
  }
}
function _handleHtml(htmlData, callback) {
  var include = this.options.include;
  var content = htmlData.head.concat(htmlData.body);

  if (include === 'head') {
    content = htmlData.head;
  }
  if (include === 'body') {
    content = htmlData.body;
  }
  addAttributes(content, this.options.attrs);
  // wp4 没有callback了
  if (callback) callback();
}

module.exports = HtmlScriptAttributsInjectPlugin;
