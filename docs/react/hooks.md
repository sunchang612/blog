# 学习 React Hooks

#### 动机
- Hook 解决了我们五年来编写和维护成千上万的组件遇到的各种各样看起来不相关的问题。

#### Hooks 的优点
- 组件之间 <font color="red"> Hook 使你在无需修改组件结构的情况下复用状态逻辑。</font>

- 组件周期之间互相关联的代码进行拆分，<font color="red"> Hook 将组件中互相关联的部分拆分成更小的函数 </font> 并非强制按照生命周期划分。还可以使用 reducer 来管理组件的内容状态，使其更加可预测。具体可看 Effect Hook。

- 难以理解的 class，<font color="red">Hook 使你在非 class 的情况下可以使用更多的 React 特性 </font>，React 组件一直更像是函数，而 Hook 则拥抱了函数，同时也解决了 class 常见的 this 的问题。

> 但是 React 官方并不计划从 React 中移除 class

#### 什么是 Hook
- <font color="red"> Hook 是一种特殊的函数，可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。</font>Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。

#### Hook 使用规则
- Hook 就是JavaScript 函数，但是使用他们会有两个额外的规则：
  - 只能在 <font color="red">函数最外层</font>调用 Hook。不要在 <font color="red">循环、条件判断或者子函数中调用</font>
  - 只能在 <font color="red"> React 的函数组件 </font>中调用 Hook。不要在其他 JavaScript 函数中调用。

#### useState
- 调用 useState 方法的时候做了什么？
  - 它定义了一个 state 变量，可以是任何名字。这是一种在函数调用时保存变量的方式，它与 <font color="red">class 里面的 this.state 提供的功能完全相同</font>

- 需要哪些参数？
  - useState() <font color="red">方法里面唯一的参数就是初始化 state。</font>不同于 class 的是，我们使用时可以按照数字或者字符串对其进行复制，对象也可以。

- useState 方法的返回值是什么？
  - 返回值为：<font color="red">当前 state 以及更新 state 的函数。</font>这是写 const [count, setCount] = useState(0) 的原因。

  ```js
  import React, { useState } from 'react';

  function Example() {
    // 声明一个叫 "count" 的 state 变量 0 是初始化默认值
    const [count, setCount] = useState(0);
  }
  ```
- 读取 State
```js
  <p>You clicked {this.state.count} times</p>
```

- 更新 
```js
<button onClick={() => setCount(count + 1)}>
  Click me
</button>
```

#### useEffect
- useEffect Hook 可以看做是  <font color="red"> componentDidMount，componentDidUpdate，componentWillUnmount </font> 这三个函数的组合

##### 无需清理的 effect
- 当我们想在 React 更新 DOM 之后运行一些额外的代码。比如发送网络请求，手动变更 DOM，记录日志，这些都是常见的无需清除的操作

##### 使用 Hook 的示例