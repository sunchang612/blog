# webpack 构建速度优化

# 构建速度优化
## 使用 webpack 内置的 stats
- stats 构建的统计信息

- package.json 中使用 stats
```js
"scripts": {
  "build:stats": "webpack --env production --json > stats.json"
},
```

- 缺点：颗粒度太粗，看不出问题所在。

## 速度分析
- 使用 speed-measure-webpack-plugin 可以看到每个 loader 和插件执行耗时
- 安装
```
yarn add speed-measure-webpack-plugin -D
```
- 使用
```js
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
 
const smp = new SpeedMeasurePlugin();
 
const webpackConfig = smp.wrap({
  plugins: [
    ...
  ]
});
```

## 分析体积大小 webpack-bundle-analyzer
- 安装
```js
npm install --save-dev webpack-bundle-analyzer
or
yarn add -D webpack-bundle-analyzer
```
- 使用
```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```

## 使用高版本的 webpack 和 node.js
- 因为 webpack 和 node 都在优化和迭代，使用高版本的可以有效优化打包构建速度

### 使用 webpack4 优化原因
- v8 带来的优化（for of 替代 forEach、Map 和 Set 替代 Object，includes 替代 indexOf）
- 默认使用更快的 md4 hash 算法
- webpack AST 可以直接从 loader 传递给 AST ，减少分析时间
- 使用字符串方法替代正则表达式

## 使用 多进程/ 多实例构建

### 使用 HappyPack 解析资源
- 原理： 每次 webapck 解析一个模块，HappyPack 会将它及它的依赖分配给 worker 线程中。
```js
const HappyPack = require('happypack');

exports.module = {
  loaders: {
    test: /.js$/,
    loader: 'happypack/loader',
    include: [
      // ...
    ],
  }
};
```
> 这个库作者已经不维护了，webpack4 后的推荐使用 thread-loader

### 使用 thread-loader 解析资源
- 原理： 每次 webpack 解析一个模块，thread-loader 会将它及它的依赖分配给 worker 线程中
```js
// 安装
npm install --save-dev thread-loader
// webapck.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        use: [
          'thread-loader',
          // your expensive loader (e.g babel-loader)
        ],
      },
    ],
  },
};
```
## 使用 多进程/ 多实例 并行压缩
### 使用 parallel-uglify-plugin 插件
```js
import ParallelUglifyPlugin from 'webpack-parallel-uglify-plugin';

module.exports = {
  plugins: [
    new ParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false,
          comments: false
        },
        comperss: {
          // 是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true
        }
      },
    }),
  ],
};
```

### 使用 uglifyjs-webpack-plugin 开启 parallel 参数
- 安装
```
npm i -D uglifyjs-webpack-plugin
```
- 使用
```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false,
        parse: {},
        compress: {},
        mangle: true,
        output: null,
        toplevel: false,
        nameCache: null,
        ie8: false,
        keep_fnames: false
      },
      parallel: true
    })
  ]
}
```
### terser-webpack-plugin 开启 parallel 参数
- 推荐使用

```js
module.exports = {
  optimization: {
    minimizer: [
      new Terserplugin({
        parallel: true
      })
    ]
  }
}
```

## 分包构建

### 使用 html-webpack-externals-plugin
- 将基础包通过 cdn 引入，不打入 bundle 中
```js
new HtmlWebpackExternalsPlugin({
  externals: [
    {
      module: 'react',
      entry: 'https://cdn.bootcdn.net/ajax/libs/react/17.0.0/cjs/react.production.min.js',
      global: 'React',
    },
  ],
})
```
> 缺点如果需要多个基础包，引入的还是过多

### 使用预编译资源模块
- 思路：将 react react-dom redux  等基础包和业务基础包打成一个文件
- 方法： 使用 DLLPlugin 进行分包，DllReferencePlugin 对 manifest.json 引用

#### 使用
- 创建 webpack.dll.config.js
```js
module.exports = {
  context: process.cwd(),
  entry: {
    library: [
      'react',
      'react-dom',
      'redux',
      'react-redux'
    ],
    // 如果有多个，直接在增加一个
  }
  output: {
    // 这里打包后的文字是 library.dll.js
    filename: '[name].dll.js',
    path: path.resolve(__dirname, 'build/libarary'),
    // 暴露的库的名字
    library: '[name]'
  },
  plugins: [
    // 指定包存放的位置
    new webpack.DllPlugin({
      name: '[name]',
      // 描述动态链接库 mainfest 文件输出时的文件名称
      // path: 'manifest.json'
      path: path.resolve(__dirname, 'build/libarary/[name].json')
    })
  ]
}
    
```
- 在 pageage.json scripts 中增加命令
```js
"scripts": {
  "dll": "webpack --config webpack.dll.js"
}
```
- 执行 npm run dll 分包
- 在 webpack.config.js 引入
```js
module.exports = {
  plugins: [
    new webpack.DllReferencePlugin({
      // 刚打包后的json文件地址
      // manifest: require('xxx.json'),
      manifest: require('./build/library/libary.json'),
    })
    // 如果引入多个，使用多次此插件
  ]
}
```

## 利用缓存提升构建速度
- 目的：提升二次构建速度
- 缓存思路
  - babel-loader 开启缓存
  - terser-webpack-plugin 开启缓存
  - 使用 cache-loader 或者 hard-source-webpack-plugin

- 开启缓存后 node_modules 下会有一个 .cache 目录

### babel-loader 开启缓存
```js
use: [
  {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true
    }
  }
]
```

### terser-webpack-plugin 开启缓存
```js
module.exports = {
  optimization: {
    minimizer: [
      new Terserplugin({
        parallel: true,
        cache: true
      })
    ]
  }
}
```

### 使用 hard-source-webpack-plugin 开启缓存
- 安装
```js
npm install --save-dev hard-source-webpack-plugin or yarn add --dev hard-source-webpack-plugin
```
- 使用
```js
// webpack.config.js

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

plugins: [
  new HardSourceWebpackPlugin()
]
```

## 缩小构建目标来优化构建速度
- 目的：尽可能的少构建模块
  - 如： babel-loader 不解析 node_modules

### 减少文件搜索范围
#### 合理使用 resolve.alias
- 创建 import 或 require 的别名，来确保模块引入变得更简单。例如，一些位于 src/ 文件夹下的常用模块
```js
module.exports = {
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react/dist/react.min.js'),
    }
  }
}
```
#### resolve.modules 配置 (减少模块搜索层级)
- 告诉 webpack 解析模块时应该搜索的目录。
```js
module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")]
  }
}

```

### resolve.mainFields
- 告诉 webpack 入口文件，此选项将决定在 package.json 中使用哪个字段导入模块。
```js
module.exports = {
  resolve: {
    //指定入口文件 main 意思是从 package.json 中 main 字段中查找
    mainFields: ['main']
  }
}
```
### resolve.extensions
- 自定义解析确定的扩展。默认值是：
- 模块路径的查找，例如： import Index from 'index' 没有写后缀，webpack 会先去找 index.js 文件，在去找 index.json
```js
extensions: [".js", ".json"]
```
- 可以避免 webpack 做没意义的查找

# 构建体积优化

## Tree Shaking
- 概念： 1 个模块可能有多个方法，只要其中某个方法使用到了，则整个问价你都会被打包到 bundle 里面去，tree shaking 就是只把用到的方法打入 bundle，没有到的会被 uglify 阶段被擦除掉。
### 无用的 CSS 如何删除掉的？
- PurifyCSS：遍历代码，识别已经用到的 CSS Class （已经不维护了）

- uncss：HTML 需要通过 jsdom 加载，所有的样式通过 PostCss 解析，通过 document.querySelector 来识别在 HTML 文件里面不存在的选择器。

- 使用 purgecss-webpack-plugin 和 mini-css-extract-plugin 配合使用
```js
const path = require('path')
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const PATHS = {
  src: path.join(__dirname, 'src')
}

module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader"
      ]
    }
  ]
},
plugins: [
  new MiniCssExtractPlugin({
    filename: "[name].css",
  }),
  new PurgeCSSPlugin({
    paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
  }),
]
```

## 图片压缩
- 基于 Node 库 imagemin
- 使用 配合 image-webpack-loader

### imagemin 的优点
  - 有很多定制选项
  - 可以引入更多第三方插件，如 pngqeant
  - 可以处理多种图片格式
### 图片压缩的原理 png
- pngquant: 是一款 PNG 压缩器，通过将图像转换为具有 alpha 通道 （通常比24/32位 PNG文件小 60%-80%）的更高效的 8 位 PNG 格式，可以显著减小文件大小。
- pngcrush: 主要目的是通过尝试不同的压缩级别和 PNG 过滤方法来降低 PNG IDAT 数据流的大小。
- optipng: 设计灵感来自于 pngcrush。optipng 可以将图像文件重新压缩更小尺寸，而不会丢失任何信息
- tinypng: 也是将 24 位 PNG 文件转化为更小有索引的 8 位图片，同时所有非必要的 metadata 也会被剥离掉。

### 使用 image-webpack-loader
```
npm install image-webpack-loader --save-dev
```
```js
// webpack.config.js
rules: [{
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    'file-loader',
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          progressive: true,
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: false,
        },
        pngquant: {
          quality: [0.65, 0.90],
          speed: 4
        },
        gifsicle: {
          interlaced: false,
        },
        // the webp option will enable WEBP
        webp: {
          quality: 75
        }
      }
    },
  ],
}]
```

## 动态 Polyfill
### Polyfill 几种方案的优缺点
1. babel-polyfill
  - 优点： React16官方推荐
  - 缺点：体积过大，难以抽离Map、Set。项目中 react 是单独用 CND 引入，使用时需要在 react 前加载。

2. babel-plugin-transform-runtime
  - 优点：只能 polyfill 用到的类和方法，体积相对较小
  - 缺点：不能 polyfill 原型上的方法，不适用于业务复杂项目。

3. 自己map、set的polyfill 
  - 优点：定制化高，体积小
  - 缺点：就算体积小，但是所有用户都需要加载，重复造轮子

4. polyfill-service
  - 优点： 识别 User Agent，只给用户返回需要的 polyfill
  - 缺点：可能国内部分奇葩浏览器 UA 无法识别 （但可以降级返回所需全部）

### 使用
1. polyfill.io 官方提供的服务
```js
https://polyfill.io/v3/polyfill.min.js
```
2. 基于官方自建 polyfill 服务
```js
https://polyfill.io/v3/polyfill.min.js?features=es2015%2Ces2016%2Ces2017
```