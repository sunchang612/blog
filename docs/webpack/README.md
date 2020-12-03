# webpack 知识概括

## 基本使用
- 现在流行的框架 Vue ，react 都已经 webpack 基础配置都做好了，我们基本上不需要配置任何东西，当一些常用的配置还是要懂得。

## 几个核心的概念
#### entry
- 可以在 webpack 中配置 entry，用来指定一个入口起点（或者多个入口），默认是 ./src

```js
  module.exports = {
    entry: './src/index.js'
  }
```
#### output
- output 属性是告诉 webpack 在哪里创建 bundles，如何命名这些文件，默认的文件名是 dist,
```js
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js'
  }
} 
```
- 通过 filename 和 path 属性，告诉 webpack bundle 的名称和文件生成的地方。

#### loader
- loader 是让 webpack 能够去处理那些 非 JavaScript 文件，loader 可以将所有类型的你文件转换成 webpack 能够处理的有效模块。
- 有两个重要的属性，他们用来告诉编译器，在进行某个文件打包之前，要先用loader 转换一下。
  1. test 属性，用于标识出应该被对应的 loader 进行转换的某个文件或者某些文件
  2. use 属性，表示进行转换时，应该使用哪个 loader。
```js
// 来自 webpack 官网
const config = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

```
- 常见的loader 有哪些?
 - babel-loader 处理 ES6
 - style-loader， css-loader, postcss-loader 处理 css
 - fill-loader, url-loader 处理 图片

```注意 如果一个文件同时使用多个 loader 时，loader 执行顺序是，从后往前```

## 插件
- plugins 和 loader 的区别
- loader 是被用于转换某些类型的模块，而插件是可以用于执行范围更广的任务，可以从打包优化到压缩，一直到重新定义环境中的变量。

- 使用一个插件
```js
// 代码 来自 webpack 官网
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

const config = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;   
```

- 一些常用的插件 （官方自带的）
  - DllPlugin 为了极大减少构建时间，进行分离打包
  - IgnorePlugin 从 bundle 中排出某些模块
  - HtmlWebpackPlugin 创建 HTML 文件，用于服务器访问
  - MinChunkSizePlugin 设置 chunk 的大小不超过指定限制


## 如何配置多文件打包
#### Vue 版
- vue.config.js
```js
// 需要在 public 中下 添加新的 HTML 文件
module.exports = {
  pages: {
    index: {
      entry: 'src/pages/index/main.js'
      template: 'public/index.html',
      chunks: [index],
    }
    ...
  }
}
```

#### React 版
- 首先在 config 下 paths.js 文件中添加导入页面地址
```js
module.exports = {
  appHtml: resolveApp('public/index.html'),
  appIndexJS: resolveApp('public/index'),
  appNewHtml: resolveApp('public/newIndex.html'),
  appNewIndexJS: resolveApp('public/newIndex'),
  ...
}
```
- 在 webpack.config.js 中的 entry 加入 入口文件
```js
entry: {
  index: [
    paths.appIndexJs,
    isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient')
  ].filter(Boolean)
  ...
}
```
- 在 plugins 中添加新的 HtmlWebpackPlugin
```js
  plugins: [new HtmlWebpackPlugin()]  
```

## 抽离 css 文件
- 安装 npm install --save-dev mini-css-extract-plugin

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

```js
plugins: [
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "[name].css",
    filename: 'css/[name].[contentHash:8].css'
    chunkFilename: "[id].css"
  })
],
module: {
  rules: [
    {
      test: '/\.css$/,
      loader: [
        MiniCssExtractPlugin.loader, // 这里不再用style-css
        'css-loader',
        'postcss-loader'
      ],
      options: {
          publicPath: '', // 抽离指定文件
      }
    }
  ],
},

```

## 压缩 js 和 css  文件
- npm install terser-webpack-plugin --save-dev
- npm install optimize-css-assets-webpack-plugin --save-dev
``` js
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [new TerserJSPlugin({}),
    new OptimizeCSSAssetsPlugin({})],
  },
};
```

##  抽离公众代码
- splitChunks
```js
  optimization: {
    splitChunks: {
      chunks: 'all',
      /**
        initial 入口 chunk，对于异步导入的文件不处理
        async 异步 chunk ，只对异步导入的文件处理
        all 全部 chunk
      */
    }
  }
```

- cacheGroups 缓存分组
```js
  optimization: {
    cacheGroups: {
      // 第三方模块
      vendor: {
        name: 'vendor', // chunk 名称
        priority: 1, // 权限更高，优先抽离
        test: /node_modules/,
        minSize: 0, // 大小限制
        minChunks: 1 // 最少复用过几次
      },
      // priority 权重
      // minChunks 如果有一次复用，就单独抽离出来
      // 公共的模块
      common: {
        name: 'common', // chunk 名称
        priority: 0, // 权限更高，优先抽离
        minSize: 0, // 大小限制
        minChunks: 2 // 最少复用过几次
      }
    }
  }  
```

## module chunk bundle 的区别
- module  是不同的源码文件，webpack 中一切皆模块（源码）

- chunk 这是 webpack 特定的术语被用在内部来管理 building 过程, 多模块合并后的文件， 如 entry，import splitChunk。

- bundle 最终输出的文件，客户端下载并在浏览器使用的文件
```js
output:{
  filename:"[name].bundle.js"
}
```

## 优化打包构建速度
### 优化 babel-loader 加入缓存
  - cacheDirectory
```js
  rules: [
    test: /\.js$/,
    use: ['babel-loader?cacheDirectory], // 开启缓存,
    include: path.resolve(__dirname, 'src'), // 明确范围
    // 排除范围，include 和 exclude 二者选择一个即可
    // exclude: path.resolve(__dirname, 'node_modules')
  ]
```
  - cacheDirectory 默认值是 false，当设置为 true 时，webpack 构建会将尝试读取缓存，来避免每次执行时，可能产生的，高性能消耗的babel，如果设置了空值 ```(loader: 'babel-loader?cacheDirectory') 或者 true (loader: 'babel-loader?cacheDirectory=true')```， loader 将使用默认的缓存目录 ```node_modules/.cache/babel-loader```，如果在任何根目录下都没有找到 ``` node_modules ``` 目录，将会降级回退到操作系统默认的临时文件目录。

### IgnorePlugin 
- 避免引入无用模块

```js
new webpack.IgnorePlugin({resourceRegExp, contextRegExp});

```
- resourceRegExp 匹配（test）资源请求路径的正则表达式
- contextRegExp 匹配（test）资源上下文（目录）的正则表达式

- 例如忽略 moment 本地化内容
```js
new webpack.IgnorePlugin({
  resourceRegExp: /^\.\/locale$/,
  contextRegExp: /moment$/
})
```
  - 表示 ./locale 在任何 moment 结尾的目录中都将被忽略。

### noParse 
- 避免重复打包
```js
  module: {
    // 对完整的 react.min.js 文件没有必要采用模块化
    // 忽略对 react.min.js 文件的递归解析处理
    noParse: [/react\.main\.js$/]
  }
```

### IgnorePlugin 和 noParse 的区别
- IgnorePlugin 直接不引入，代码中没有
- noParse 引入，但不打包

### happyPack
- 开启多进程打包
- npm install --save-dev happypack
```js
  rules: [
    {
      test: /\.js$/,
      // 把对 .js 文件的处理转交给 id 为 babel 的 happyPack 实力
      use: ['happypack/loader?id=babel'],
    }
  ]

  plugins: [
    // happyPack 开启多进程打包  babel 打包配置多线程
    new HappyPack({
      // 用 唯一的标识符 id 来来代表当前的 HappyPack 是用来处理一类特定的文件
      id: 'babel',
      // 如果处理 .js 文件，用法和 Loader 配置中一样
      loaders: ['babel-loader?cacehDirectory']
    })
  ]
```

### ParallelUglifyPlugin
- 开启多进程的压缩
  - 使用 webpack 内置 Uglify 工具压缩 JS
  ```js
    npm install -D webpack-paralle-uglify-plugin

    plugins: [
      // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
      new ParallelUglifyPlugin({
        // 传递给 UglifyJS 的参数
        // 还是使用 UglifyJS 压缩，只不过帮助开始了多个进程
        uglifyJS: {
          output: {
            beautify: false, // 是否输出可读性较强的代码
            comments: false, // 删除所有的注释
          },
          compress: {
            // 删除所有的 console 语句
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量，
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true
          }
        }
      })
    ]
  ```

## 关于开启多进程打包
1. 项目较大，打包较慢，开始多进程打包能提高速度
2. 项目较小，打包很快，开始多进程打包会降低速度（因为有进程开销）
- 所有是否开启多进程要 ```按需使用```

## 自动刷新 （不能用于生产环境）
```js
  watch: true, // 开启监听，默认为 false
  // 注意，开启监听之后，webpack-dev-server 会自动开启刷新浏览器

  // 监听配置
  watchOptions: {
    ignored: /node_modules/, // 忽略哪些
    // 监听变化后会等 多少 毫秒去执行，防止文件更新太快导致重新编译的频率太高
    aggregateTimeout: 300, // 默认 300 ms
    // 判断文件是否发生变化，通过不停的询问系统指定文件是否发生改变
    poll: 1000
  }
```
##  热更新 （不能用于生产环境）
- 自动刷新
  - 整个网页都会刷新， 速度较慢，state 也会丢失
- 热更新的好处
  - 代码生效，网页不会刷新，state 不会丢失

``` js
  entry: {
    index: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      path.join(srcPath)
    ]
  }

  plugins: [
    new HotModuleReplacementPlugin()
  ]

  devServer: {
    hot: true
  }

  // 开发环境下，增加，开启热更新的代码
  if (module.hot) {
    module.hot.accept([./xxx.js], () => {
      监听分为内修改，才会触发热更新
    })
  }
```

## DLLPlugin 和 DLLReferencePlugin
- DLLPlugin 和 DLLReferencePlugin 用某种方法实现了拆分 bundles，同时还大大提升了构建的速度。
- 使用：把一些较稳定，不常升级版本的 例如 react， Vue，使用 DLLPlugin 打包，同一个版本只构建一个即可，不用每次都重新构建。

- DLLPlugin 这个插件会生成一个名为 manifest.json 的文件，这个文件是用来让 ```DLLReferencePlugin``` 映射到相关的依赖上去的。

- DLLPlugin 打包出 dll 文件， DLLReference 使用 dll 文件。

```js
  const path = require('path')
  const DllPlugin = require('webpack/lib/DllPlugin')
  const { srcPath, distPath } = require('./paths')

  module.exports = {
    mode: 'development',
    // JS 执行入口文件
    entry: {
      // 把 React 相关模块的放到一个单独的动态链接库
      react: ['react', 'react-dom']
    },
    output: {
      // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称，
      // 也就是 entry 中配置的 react 和 polyfill
      filename: '[name].dll.js',
      // 输出的文件都放到 dist 目录下
      path: distPath,
      // 存放动态链接库的全局变量名称，例如对应 react 来说就是 _dll_react
      // 之所以在前面加上 _dll_ 是为了防止全局变量冲突
      library: '_dll_[name]',
    },
    plugins: [
      // 接入 DllPlugin
      new DllPlugin({
        // 动态链接库的全局变量名称，需要和 output.library 中保持一致
        // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
        // 例如 react.manifest.json 中就有 "name": "_dll_react"
        name: '_dll_[name]',
        // 描述动态链接库的 manifest.json 文件输出时的文件名称
        path: path.join(distPath, '[name].manifest.json'),
      }),
    ],
  }
```
- 打包后的文件，需要 在 .html 文件中引入
```js
<script src="miam.dll.js"></script>
```
## DllReferencePlugin 使用
- 这个插件是在 webpack 主配置文件中设置的， 这个插件把只有 dll 的 bundle(们)(dll-only-bundle(s)) 引用到需要的预编译的依赖。
```js
// 告诉 webpack 使用哪些动态链接库
new DllReferencePlugin({
  // 描述 react 动态链接库的文件内容
  mainfest: require(path.join(distPath, 'main.mainfest.json'))
})
```
- 不需要改变源代码的配置

## 优化产出代码
- 小图片使用 base64 编码
- bundle 加 hash
- 路由懒加载
- 提取公共代码
- 使用 InforePlugin
- 使用 CND 
- 使用 production
- 开启 Scope Hosting

## 使用 production 的好处
  - 默认会开启代码压缩
  - Vue react 等会自动删除掉调试代码 
  - 自动启动 tree-shaking
  
## tree-shaking
- 删除没用的代码（没有引用的）
- 必须使用 ES6Module 才能让 tree-shaking 生效 common.js 不行

## ES6 Module 和 Common.js 的区别
- ES6 Module 静态引入（不允许动态），编译时引入（意思是静态的引用，没有加条件判断的，可以清楚的知道引入的是什么模块）
- Commonjs 动态引入，执行引入（支持动态引入，可以有条件判断来改变引入的模块）

```所以只有 ES6 Module 才能静态分析，实现 tree-shaking```

## Scope Hosting (ModuleConcatenationPlugin)
```此插件仅适用于由webpack直接处理的 ES6 模块```
- 针对 NPM 中的第三方模块优先采用 jsnext:main 中指向的 ES6模块化语法的文件
```js
const Webpack = require('webpack')

resolve: {
  mainFields: ['jsnext:main', 'browser', 'main']
}

plugins: [
  new Webpack.optimize.ModuleConcatenationPlugin()
]
```
- 优点：
  1. 代码体积更小
  2. 创建函数作用域更少
  3. 代码可读性更好

## 介绍下 webpack 热更新原理，是如何做到在不刷新浏览器的前提下更新页面

首先，介绍webpack-dev-server:
webpack-dev-server 主要包含了三个部分：
1. webpack: 负责编译代码
2. webpack-dev-middleware: 主要负责构建内存文件系统，把webpack的 OutputFileSystem 替换成 InMemoryFileSystem。同时作为Express的中间件拦截请求，从内存文件系统中把结果拿出来。
3. express：负责搭建请求路由服务。

其次，介绍工作流程:
1. 启动dev-server，webpack开始构建，在编译期间会向 entry 文件注入热更新代码；
2. Client 首次打开后，Server 和 Client 基于Socket建立通讯渠道；
3. 修改文件，Server 端监听文件发送变动，webpack开始编译，直到编译完成会触发"Done"事件；
4. Server通过socket 发送消息告知 Client；
5. Client根据Server的消息（hash值和state状态），通过ajax请求获取 Server 的manifest描述文件；
6. Client对比当前 modules tree ，再次发请求到 Server 端获取新的JS模块；
7. Client获取到新的JS模块后，会更新 modules tree并替换掉现有的模块；
8. 最后调用 module.hot.accept() 完成热更新；