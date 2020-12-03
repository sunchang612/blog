# webpack 进阶用法

## 自动清除构建目录
- 安装
```js
npm i clean-webpack-plugin  -D
```
- 修改 webpack.config.js
```js
plugins: [
  new CleanWebpackPlugin()
]
```

## CSS 自动补全前缀信息
- postcss-loader
- autoprefixer
```js
npm i postcss-loader autoprefixer -D
```
```js
module: {
	rules: [
		{
			test: /.js$/,
			use: 'babel-loader'
		},
		{
			test: /.css$/,
			use: [
				'style-loader',
				'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              requeire('autoprefixer')({
                // 需要兼容的版本 某个浏览器的最近两个版本，使用大于 1%，ios 7 以上版本
                browers: ['lase 2 version', '>1%', 'ios 7']
              })
            ] 
          }
        }
			]
		}
	]
}
```

## CSS 自动做 px 转 rem
- 使用 px2rem-loader
```
npm i px2rem-loader -D
```
- lib-flexible 动态计算根元素 rem 单位
```
npm i lib-flexible -S
```
- 使用
```js
{
  test: /.css$/,
  use: [
    'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [
          requeire('autoprefixer')({
            // 需要兼容的版本 某个浏览器的最近两个版本，使用大于 1%，ios 7 以上版本
            browers: ['lase 2 version', '>1%', 'ios 7']
          })
        ] 
      }
    },
    {
      loader: 'px2rem-loader',
      options: {
        // rem 相对于 px 的转换单位， 1 rem = 75 适合 750视觉稿
        remUnit: 75,
        // px 转换成 rem 小数点的个数
        remPrecision: 8
      }
    }
  ]
}
```

## 资源内联 
- 一般是将一些资源文件关联到 HTML 文件上
#### 内联的意义
- 代码层面
  - 页面框架的初始化脚本
  - 上报相关打点
  - css 内联避免页面闪动
- 请求层面
  - 减少 HTTP 网络请求数

#### HTML 和 JS 内联
- raw-loader

#### CSS 内联
- 借助 style-loader

- html-inline-css-webpack-plugin

## 多页面打包
#### 原始的做法
  ```js
    module.exports = {
      entry: {
        index: './src/index.html',
        main: './src/main.html'
      }
    }
  ```
#### 动态获取 entry 和 设置 html-webpack-plugin
- glob
  - 根据正则匹配文件，动态获取 entry 文件
  ```js
    entry: glob.sync(path.join(__dirname, './src/*/index.js'))
  ```
- 安装
```js
npm i glob -D 
```
- 代码
```js
const setMPA = () => {
  const entry = {}
  const HtmlWebpackPlugins = []
  // 获取文件地址
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
  Object.keys(entryFiles).map((i) => {
    const entryFile = entryFiles[i]
    // 匹配文件名称
    const matchName = entryFile.match(/src\/(.*)\/index\.js/)
    const patchName = matchName && matchName[1]

    entry[patchName] = entryFile
    HtmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        // 模板 所在的位置
        template: path.join(__dirname, `src/${patchName}/index.html`),
        // 指定打包后的文件名称
        filename: `${patchName}.html`,
        // 声明 HTML 使用什么 chunks
        chunks: [patchName],
        // 把引入的 js 或 css 自动注入
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      })
    )
  })
  return {
    entry,
    HtmlWebpackPlugins
  }
}

module.exports = {
  plugins: [
    new OptimizeCssAssetsWebpackPlugin({
      assetNameEegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new CleanWebpackPlugin() 
  ].concat(HtmlWebpackPlugins)
}

```

## source map
#### 作用
- 通过 source map 定位到源代码
- 开发环境开启，线上环境关闭

#### 关键字
- eval: 使用 eval 包裹模块代码
- source map: 产生 .map 文件
- cheap: 不包含列信息 (例如，报错时不会告诉你在哪一列)
- inline: 将 .map 作为 DataURL 嵌入，不单独生成 .map 文件
- module: 包含 loader 的 source map
#### 具体配置参数选项
- 可以查看 webpack 的中文官网 [点击查看](https://webpack.docschina.org/configuration/devtool/)，可配置项较多，我就不写出来了.


## 提取公共资源
#### 使用 cdn 的方式引入
- 例如： 我们在使用 react 时，会引入 react 和 react-dom 包，使用 cdn 引入，不打入 bundle 文件中
- 方法 使用 html-webpack-externals-plugin
- 安装：
```js
npm i html-webpack-external-plugin -D
```
- 修改 webpack 配置
```js
plugins: [
  // 使用 cdn 抽分离文件
  new HtmlWebpackExternalsPlugins({
    externals: [
      {
        module: 'react',
        entry: 'https://cdn.bootcdn.net/ajax/libs/react/16.9.0/cjs/react.production.min.js',
        global: 'React'
      }
    ]
  }),
]

// 然后需要在 .html 文件中引入 cdn 文件
<script src="https://cdn.bootcdn.net/ajax/libs/react/16.9.0/cjs/react.production.min.js"></script>
```

#### SplitChunksPlugin 进行公共脚本分离
- 在 webpack4 之后内置了，不需要安装任何插件
- 分离公共脚本，例如： react react-dom
```js
optimization: {
  splitChunks: {
    // 分离公共的脚本
    cacheGroups: {
      commons: {
        test: /(react|react-dom)/,
        // 打包后的文件名，需要在  HtmlWebpackPlugin 的 chunks 中加入设置的文件名称
        name: 'vendors',
        chunks: 'all'
      }
    },
  }
}
```

- 分离页面的公共文件代码
```js
optimization: {
  splitChunks: {
    minSize: 100, // 待分离文件的代码，如果是 0 就是有引入便分割，> 100 k 才会分离
    cacheGroups: {
      commons: {
        // 打包后的文件名，需要在  HtmlWebpackPlugin 中的 chunks 加入这个文件名称
        name: 'commons',
        chunks: 'all',
        miniChunks: 2, //至少引入两次才会被分离 和 minSize
      }
    }
  }
}
```
> minSize 和 miniChunks 是并行的，必须两个条件都要满足

## tree shaking
#### 概念
- 一个模块可能有多个方法，只要其中的某个方法使用到了，则整个文件都会被打包到 bundle 中，tree shaking 是只把用到的文件的方法打入 bundle，没有用到的方法会在 uglify 阶段被删除掉.

#### 使用
- webpack4 之后已经默认支持，在 .babelrc 里面设置 modules: false 即可 / 或者 mode: production 状况下也是默认开启。

#### 要求
- 必须是 ES6 的语法，CJS 的方式不支持 （require）

#### 什么情况下会被擦出掉
1. 代码不会被执行，不可到达
```js
if(false) { 
  console.log('不会被执行')
}
```
2. 代码执行的结果不会被用到
3. 代码只会影响死变量（只写不读）

#### Tree-shaking 原理
- 利用 ES6 模块的特点：
  - 只能作为模块顶层的语句出现
  - import 的模块名只能是字符串常量
  - import binding 是 immutable 的
> ES6 引入模块都是常量而不是变量
- 代码擦除： uglify 阶段删除无用代码
