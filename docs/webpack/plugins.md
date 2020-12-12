# 编写一个 webapck plugins

## 创建插件
webpack 插件由以下组成：
  - 一个 JavaScript 命名函数。
  - 在插件函数的 prototype 上定义一个 apply 方法。
  - 指定一个绑定到 webpack 自身的事件钩子。
  - 处理 webpack 内部实例的特定数据。
  - 功能完成后调用 webpack 提供的回调。

```js
// 一个 JavaScript 命名函数。
function MyWebpackPlugin() {

};

// 在插件函数的 prototype 上定义一个 `apply` 方法。
MyWebpackPlugin.prototype.apply = function(compiler) {
  // 指定一个挂载到 webpack 自身的事件钩子。
  compiler.plugin('webpacksEventHook', function(compilation /* 处理 webpack 内部实例的特定数据。*/, callback) {
    console.log("This is an example plugin!!!");

    // 功能完成后调用 webpack 提供的回调。
    callback();
  });
};
```
## Compiler 和 Compilation
- Compiler 和 Compilation 是插件开发中最重要的两个资源
- Compiler 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。

- compilation 对象代表了一次资源版本构建。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。


## 编写一个基础插件
- 插件是由「具有 apply 方法的 prototype 对象」所实例化出来的。这个 apply 方法在安装插件时，会被 webpack compiler 调用一次。apply 方法可以接收一个 webpack compiler 对象的引用，从而可以在回调函数中访问到 compiler 对象.

```js
module.exports = class MyPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    // 这里会打印在 调用此插件传递的参数
    console.log('options', this.options)
  }
}
```
- 安装插件 在 webpack.config 配置 plugins 
```js
const path = require('path')
const MyPlugin = require('./plugins/plugin-demo')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  mode: 'production',
  plugins: [
    new MyPlugin({
      name: 'webpack'
    })
  ]
}
```

## 编写一个压缩构建资源为 zip 包的插件
- 安装相关依赖
```
npm i jszip webpack-sources 
```
- 代码
```js
const JSZip = require('jszip')
const path = require('path')
const RawSource = require('webpack-sources').RawSource
const zip = new JSZip
module.exports = class ZipPLugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    console.log('compiler', this.options)
    compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
      // 创建一个目录
      const folder = zip.folder(this.options.filename)

      for(let filename in compilation.assets) {
        // 获取 source 也就是文件的内容
        const source = compilation.assets[filename].source()
        // 把内容添加到文件中
        folder.file(filename, source)
      }

      zip.generateAsync({
        type: 'nodebuffer'
      }).then((content) => {
        // 获取文件路径地址
        const outPutPath = path.join(compilation.options.output.path, this.options.filename + '.zip')
        // 文件路径的绝对定位改成相对定位，
        const outPutRelativePath = path.relative(
          compilation.options.output.path,
          outPutPath
        )
        compilation.assets[outPutRelativePath] = new RawSource(content)
        callback()
      })
    })
  }
}
```
[github plugins-learn](https://github.com/sunchang612/code-snippet/tree/master/webpack/plugin-learn)
