# script-inject-attrubutes-plugin
inject script's attributes into script tag in html after 'html-webpack-plugin'


# How to use ?

#### Install

- npm: npm install script-attributes-inject-plugin --save-dev  
- yarn: yarn add script-attributes-inject-plugin -D

#### Example

>只能用在`'html-webpack-plugin'`后面

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptAttributesInjectPlugin = require('script-attributes-inject-plugin');

new HtmlWebpackPlugin({
  template: 'template/index.html'
}),
new ScriptAttributesInjectPlugin({
  include: 'head',
  attrs: {
    crossorigin : process.env.NODE_ENV === 'production' ? 'anonymous' : false,
  }
}),

```

#### Options

##### include `<String>`

- head ：只操作 head 内的 script 标签
- body ：只操作 body 内的 script 标签
  
  > 默认 head + body 

##### attrs `<Object>`

- 支持添加 script 标签所有原生属性
- 支持添加自定义属性

  > 所有属性都可以使用 **false** 删除