# 代码分割和动态js

## 代码分割的意义
- 对于大的 Web 应用来说，将所有的代码都放到一个文件中，显然是不行的，特别是当有些代码在某个模块用不到或者有特殊情况才能用到的， webpack 有一个功能就是将代码分割成 chunks(语块)，当代码执行到需要加载时才加载。
- 例如：
  - 抽离相同代码到一个共享模块
  - 脚本懒加载，使初始下载的代码更小 （如：首屏懒加载）

## 懒加载 JS 脚本的方式
- CommonJS： require.ensure
- ES6: 动态 import (不支持原生，需要 babel 转换) 
 
## 使用动态import
- 安装 bebal 插件
```js
npm i @babel/plugin-syntax-dynamic-import -D
```
- 修改 .babelrc 文件
```js
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```
- 使用
- 例如通过click 事件去触发
```js
// 声明一个组件
<Text/>

class Index extends React.Component {
  constructor() {
    this.state = {
      Text: null
    }
  }
  // 点击才会加载Test组件
  onLoadComponent() {
    import('./Test.js').then((Text) => {
      this.setState({
        Text: Text.default
      })
    })
  }
  render() {
    const { Text } = this.state
    return <div onClick="onLoadComponent">
      <span>react</span>
      { Text && <Text/> }
    </div>
  }
}
```
> 在 webpack 中是通过 JSONP 的方式将 Test 脚本加载进来
