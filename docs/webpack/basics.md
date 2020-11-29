# webpack 基础学习

### 为什么选择 webpack
- 社区生态丰富
- 配置灵活和插件化扩展
- 官方更新迭代速度快

### 配置文件名称
- webpack 默认配置文件 webpack.config.js
- 也可以通过 webpack --config 执行配置文件

### webpack 配置组成
```js
module.exports = {
  entry:   ----> 打包文件的入口
	output:  -----> 打包的输出
	mode: 'production'  ----> 环境
	module: {
		rules: [
			{ test: /\.txt$/ }   -----> Loader 配置
		]
	},
	plugins: [      -------> 插件配置
		new HtmlwebpackPlugin({
			template: ''
		})
	]
}
```

### 使用 webpack 打包文件
- 使用 webpack 小案例

#### 准备文件及安装webapck
1. 打开终端 常见文件 及 初始化项目 （注意要先安装 node）
```s
mkdir  my-webpack
cd my-webpack
npm init -y
```
2. 安装 webpack 及 webpack-cli
```
npm install webpack webpack-cli --save-dev
```

3. 新建webpack.config.js
```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  mode: 'production'
}
```

4. 创建src 下的 index.js 文件，简单写一写逻辑代码
5. 然后在项目目录下的终端执行
```js
./node_modules/.bin/webpack
```
- 然后会在 dist 文件夹中找到打包后的 main.js 文件
6. 使用 npm 命令 替代 ./node_modules/.bin/webpack 打包
- 在 package.json 中的 scripts 添加 build 命令
```js
 "scripts": {
	"test": "echo \"Error: no test specified\" && exit 1",
	"build": "webpack"
},
```
- 执行 npm run build 一样可以打包

### entry 和 output
#### 单入口
```js
entry: './src/index.js',
output: {
	path: path.join(__dirname, 'dist'),
  filename: 'build.js'
}
```
#### 多入口
```js
entry: {
	app: './src/index.js'
	app2: './src/main.js'
},
output: {
	path: path.join(__dirname, 'dist'),
	filename: '[name].js'
},
```

### Loaders
- 本身就是一个函数，接收源文件作为参数，返回转换的结果
#### 常用的 Loaders
- babel-loader
- css-loader
- less-loader
- ts-loader
- file-loader

### Plugins
- 插件用于 bundle 文件的优化，资源管理和环境变量注入
- 作用于整个构建构成

#### 常见的 Plugins
- CleanWbpackPlugin     清理构建目录
- CommonsChunkPlugin    讲chunks相同的模块代码提取成公共 js
- HtmlWebpackPlugin     创建 HTML 文件去承载输出的 bundle
- UglifyjsWebpackPlugin 压缩JS

### Mode
- 用来指定当前的构建环境是 production development 还是 none
- 设置 mode 可以使用 webpack 内置函数，默认值是 production
```js
module.exports = {
  mode: 'development'
};
```
- 或者从 cli 参数中传递
```
webpack --mode=development
```
#### 内置函数功能
- 选项 development
> 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development. 为模块和 chunk 启用有效的名。

- production
> 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。为模块和 chunk 启用确定性的混淆名称，FlagDependencyUsagePlugin，FlagIncludedChunksPlugin，ModuleConcatenationPlugin，NoEmitOnErrorsPlugin 和 TerserPlugin 。

- node 
> 不使用任何默认优化选项

### 使用 babel 解析 ES6
- 安装 babel 解析文件
```js
npm i @babel/core @babel/preset-env babel-loader -D
```
- 创建 .babelrc 文件 并添加：
```js
{
  "presets": [
    "@babel/press-env"
  ]
}
```
- webpack.config.js 中添加 rules
```js
module: {
	rules: [
		{
			test: /.js$/,
			use: 'babel-loader'
		}
	]
}
```

### 解析 CSS 文件
- 安装 style-loader 和 css-loader
- 修改 webpack.config.js 文件
```
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
				'css-loader'
			]
		}
	]
}
``` 
> loader 的执行顺序是 从又右到左的

#### url-loader  解析图片
- 安装 url-loader 和 file-loader
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
				'css-loader'
			]
		},
		{
			test: /.(png|jpg|gif|jpeg)$/,
			use: [
				{
					loader: 'url-loader',
					options: { // 图片大小的限制 如果小于 10k 转成 base64 格式
						limit: 10240
					}
				}
			]
		}
	]
}
```

### webpack 文件监听
1. 启动 webpack 命令时，带上 --watch 参数
	- 缺点是： 每次需要手动刷新浏览器
2. 在配置 webpack.config.js 中设置 watch: true
- 文件监听的原理分析
	- 轮询判断文件的最后编译事件是否变化
	- 某个文件发生了变化，并不会立即监听者，而是先缓存起来，等 aggregateTimeout
```js
watch: true,
watchOptions: {
	// 默认为空，不监听文件或文件件，支持正则
	ignored: /node_modules/,
	// 监听发生变化后等待 xxx 毫秒去执行，默认 300
	aggregateTimeout: 300,
	// 判断文件是否发生变化，通过不停的询问系统指定文件有没有变化实现，默认每秒问 1000 次
	poll: 1
}
```

### 热更新 webpack-dev-server
- 特点： 不刷新浏览器，不输出文件，而是放在内存中
- webpack-dev-server --open

### 热更新 使用 webpack-dev-middleware
- 通过 node express/koa 创建一个 server 编写相关逻辑
- 将 webpack 输出文件传输给服务器
- 适用于灵活的定制场景

### 热更新的原理分析
1. Webpack Compile
- 将 JS 编译成 Bundle (打包好输出的文件)
2. HMR (Hot Module Replacement) Server：
- 将热更新文件传输给 HMR Rumtime
3. Bundle Server:
- 提供文件在浏览器的访问 (通过服务器的方式访问，例如 127.0.0.1:8080)
4. HMR Rumtime:
- 打包时会被注入到浏览器中，使浏览器和服务器建立连接，通常的连接方式是用 websocket, 用来更新文件的变化
5. bundle.js
- 构建输出的文件

### 热更新的过程
1. 热更新的启动阶段
- 代码通过 Webpack Compile 进行编译打包，然后将编译好的文件传输给 Bundle Server （服务器），让文件以 server 的方式被 浏览器 访问到。
2. 更新阶段
- 代码通过 Webpack Compile 进行编译打包，将代码发送给 HMR Server 知道哪些 js 文件发生变动，然后通知 HMR Rumtime （HMR Server 在 服务端，HMR Rumtime 在客户端）哪些文件发生变化，通常是已JSON 的方式传输，然后 HMR Rumtime 更新代码.

### 文件指纹
- 打包后输出的文件名的后缀

#### Hash
- 和整个项目的构建相关, 只要项目文件有修改，整个项目构建的 hash 值就会更改

#### Chunkhash
- 和 webpack 打包的 chunk 有关，不同的 entry 会生成不同的 chunkhash 值

#### Contenthash
- 根据文件内容来定义 hash，文件内容不变，则 Contenthash 不变

```js
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name][chunkhash:8].js'
  },
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'img/[name][hash:8].[ext]'
						}
					}
				] 
			},
			{
				test: /.css$/,
				use: [
					// 'style-loader', 这个是把 css 放到 style 里面和用  MiniCssExtractPlugin 有冲突，它是把 css 放到一个独立的文件中
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
		]
	}
  mode: 'production',
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name][contenthash:8].css'
		})
	]
}
```
> :8 意思是只取前 8 位

- 图片文件指纹设置可选参数
	- [ext] : 资源后缀名
	- [name] : 文件名称
	- [path] : 文件相对路径
	- [folder] : 文件所在的文件夹
	- [contenthash]: 文件内容的 hash 默认 MD5 生成
	- [hash] : 文件内容的 hash 默认 MD5 生成
	- [emoji] : 一个随机的指定文件内容的 emoji

### 代码压缩
#### JS 文件的压缩
- uglifyjs-webpack-plugin  webpack4.0 后内置了

#### css 压缩
- 安装
	- npm i optimize-css-assets-webpack-plugin -D
	- npm i cssnano -D
- 代码
```js
new OpeimizeCssAssetsPlugin({
	assetNameEegExp: /\.css$/g,
	cssProcessor: require('cssnano')
}),
```

#### html 压缩
- 安装
```js
npm i html-webpack-plugin -D
```
- 代码
```js
new HtmlWebpackPlugin({
	// 模板 所在的位置
	template: path.join(__dirname, 'src/index.html'),
	// 指定打包后的文件名称
	filename: 'index.html',
	// 声明 HTML 使用什么 chunks
	chunks: ['index'],
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
```