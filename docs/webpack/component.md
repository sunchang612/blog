# webpack 打包组件和基础库

## 需求
- 打包一个未压缩版和压缩版的库
- 计算大位数相加 （超过 16 位的数字）

## 如果将库暴露出去
- library  指定库的全局变量
- libraryTarget  支持库引入的方式
  - var  暴露为一个变量
  - this
  - window
  - global
  - commonjs

## 编写代码逻辑
- 创建 src/index.js
```js
export default function add(a, b) {
  let i = a.length - 1
  let j = b.length - 1
  // 记录进位
  let carry = 0
  let res = ''
  // 个位数+个位数 十位数 + 十位数
  while(i >= 0 || j >= 0) {
    let x = 0
    let y = 0
    let sum
    if (i >= 0) {
      // string 转成 number
      x = a[i] - '0'
      i --
    }
    if (j >= 0) {
      y = b[j] - '0'
      j --
    }
    // 每次求和必须要把进位加上
    sum = x + y + carry
    // 如果 sum >= 10 进位 = 1， sum - 10
    if(sum >= 10) {
      carry = 1
      sum -= 10
    } else {
      carry = 0
    }
    res += sum
  }
  // 最后判断一下有没有进位
  if (carry) {
    res += carry
  }
  return res
}

console.log(add('1000000000000000000000000', '1'))
```


## 创建项目
- 初始化
```
npm init or npm init -y
```
- 安装 webpack webpack-cli
```
npm webpack webpack-cli -D
```

## 配置文件
- webapck.config.js
```js
module.exports = {
  entry: {
    'large-number': './src/index.js',
    'large-number.min': './src/index.js'
  },
  output: {
    filename: '[name].js',
    library: 'largeNumber',
    libraryTarget: 'umd',
    libraryExport: 'default'
  }
}
```
- 这样就打包出两个文件 都是压缩版

## 安装压缩插件 
- 增加配置文件，.main 文件压缩
```
npm i terser-webpack-plugin -D
```
- 修改 webpack.config.js 文件

```js
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: {
    'large-number': './src/index.js',
    'large-number.min': './src/index.js'
  },
  output: {
    filename: '[name].js',
    library: 'largeNumber',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  mode: 'none',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/
      })
    ]
  }
}

```

## 根据环境设置不同入口文件
- 根据 package.json 的入口 编写入口文件 默认 main: index.js，修改为 main: "main.js" ，创建 main.js 文件
- 添加根据环境设置不同入口
```js
// 通过环境变量来决定入口文件
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/large-number.min.js')
} else {
  module.exports = require('./dist/large-number.js')
}
```
[查看代码](https://github.com/sunchang612/code-snippet/tree/master/webpack/webpack-large-number)