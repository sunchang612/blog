# 怎么编写一个 webpack loader
- 编写 loader 前需要知道 webpack loader 的执行循序？
  - 从右到左执行。

- 为什么 webpack 的 loader 执行循序是从右到左
  - 因为 webpack 中是采用 Compose 的执行方式，Compose 是从右向左执行

## loader-runner
- loader-runner 允许在不安装 webpack 的情况下运行 loaders
### 作用
- 作为 webpack 的依赖，webpack 中使用它执行 loader
- 进行 loader 的开发和调试

## 利用 loader-runner 编写一个 demo loader
- npm i loader-runner
```js
// run.loader.js
const { runLoaders } = require('loader-runner')

const fs = require('fs')
const path = require('path')

runLoaders({
  resource: path.join(__dirname, './src/demo.txt'),
  loaders: [ path.join(__dirname, './src/loader.js')],
  context: {
    minimize: true
  },
  readResource: fs.readFile.bind(fs)
}, (err, result) => {
  console.log(result)
})
```

```js
//loader.js
const json = JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

return `export default ${json}`
```

## 利用 loader-utils 获取 loader 参数
- npm run loader-utils
```js
// run.loader.js
const { runLoaders } = require('loader-runner')

const fs = require('fs')
const path = require('path')

runLoaders({
  resource: path.join(__dirname, './src/demo.txt'),
  loaders: [
    {
      loader: path.join(__dirname, './src/loader.js'),
      options: {
        name: '哈哈'
      }
    }
  ],
  context: {
    minimize: true
  },
  readResource: fs.readFile.bind(fs)
}, (err, result) => {
  console.log(result)
})
```
```js
// loader.js
const loaderUtils = require('loader-utils')
const fs =  require('fs')
const path = require('path')

module.exports = function(source) {
  const { name } = loaderUtils.getOptions(this)
  // this.cacheable(false)
  console.log('name 参数-->', name)
  // 异步读取
  // const callback = this.async()
  const json = JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  // return `export default ${json}`

  // fs.readFile(path.join(__dirname, './async.txt'), 'utf-8', (err, data) => {
  //   callback(err, data)
  // })
  // 第一个参数是抛出异常
  this.callback(null, json)
}
```

## loader 同步抛出异常
- throw new Error 抛出异常
- 通过 this.callback 传递错误
```js
  this.callback(err, conent, sourceMap?: SourceMap, meta?: any)
```

## loader 抛出异步异常
- 通过 this.async 来返回一个异常函数
  - 第一个参数是 Error，第二个参数是处理的结果
- 例如：读一个文件
```js
// loader.js
const loaderUtils = require('loader-utils')
const fs =  require('fs')
const path = require('path')

module.exports = function(source) {
  const { name } = loaderUtils.getOptions(this)
  // 异步读取
  const callback = this.async()
  fs.readFile(path.join(__dirname, './async.txt'), 'utf-8', (err, data) => {
    callback(err, data)
  })
}
```

## loader 中使用缓存
- webpack 中默认开启 loader 缓存
  - 可以使用 this.cacheable(false) 关掉缓存

- 缓存条件：loader 的结果在相同的输入下有确定的输出
  - 有依赖的 loader 无法使用缓存

[loader deom github](https://github.com/sunchang612/code-snippet/tree/master/webpack/custom-loader)


## 编写一个雪碧图 loader
- 利用了 spritesmith 这个库

```js
const fs = require('fs')
const path = require('path')
const Spritesmith = require('spritesmith')
module.exports = function (source) {
  const callback = this.async()
  // 匹配路径
  const imgs = source.match(/url\((\S*)\?_sprite/g)

  console.log('imgs --', imgs)

  const matchedImgs = []
  for (let i = 0; i < imgs.length; i++) {
    // 分别取出图片的路径
    const img = imgs[i].match(/url\((\S*)\?_sprite/)[1]
    matchedImgs.push(path.join(__dirname, img))    
  }

  Spritesmith.run({
    src: matchedImgs
  }, (err, result) => {
    // 把合成后雪碧图 写入到 目标文件中
    fs.writeFileSync(path.join(process.cwd(), 'build/sprite.jpg'), result.image)

    // 匹配 css 文件，替换图片 url 地址
    source = source.replace(/url\((\S*)\?_sprite/g, () => {
      return `url('build/sprite.jpg'`
    })
    // 将替换后的文件，写入到 目标文件中
    fs.writeFileSync(path.join(process.cwd(), 'build/index.css'), source)

    callback(null, source)
  })
}
```
[prites-loader  github](https://github.com/sunchang612/code-snippet/tree/master/webpack/sprites-loader)
