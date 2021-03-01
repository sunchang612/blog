# 如果避免声明周期中的坑
- 不在恰当的时候调用了不该调用的代码
- 需要调用时，不要忘记调用

主要有下面几种容易造成声明周期的坑
  - getDerivedStateFromProps 容易编写反模式代码，使受控组件与非受控组件区分模糊
  - 不要使用已经标记弃用的生命周期函数。容易导致问题。
  - shouldComponentUpdate 通过返回 true 或者 false 来确定是否需要出发新的渲染，主要用于性能优化。
  - 如果在 componentWillUnmount 函数中忘记解除事件绑定，取消定时器等清理操作，容易引发 bug。
  - componentWillUpdate 同样是由于新的异步渲染机制，而被标记废弃，不推荐使用，原先的逻辑可结合 getSnapshotBeforeUpdate 与 componentDidUpdate 改造使用。
  - 如果没有添加错误边界处理，当渲染发生异常时，用户将会看到一个无法操作的白屏，所有要添加错误处理。


### 什么情况下会触发重新渲染
- 函数组件
  函数组件任何情况下都会重新渲染。它并没有生命周期，可以使用 React.memo优化。React.memo 并不是阻断渲染，而是跳过渲染组件的操作直接复用最近一次渲染的结果，这点与 shouldComponentUpdate 完全不同。
- React.Component 
  如果不实现 shouldComponentUpdate 函数，则有两种情况下会触发重新渲染。
  1. 当 state 发生变化时。
  2. 当父组件的 props 传入时。无论 Props 有没有变化，只要传入就会引发重新渲染。

- React.PureComponent
  PureComponent 默认实现了 shouldComponentUpdate 函数，所以仅在props 与 state 进行浅比较后，确认有变更才会触发重新渲染。

#### 错误边界
但渲染时的报错，只能通过 componentDidCatch 捕获。这是在做线上页面报错监控时，极其容易忽略的点儿。

### React 请求应该放在哪里，为什么？
对于异步请求，应该放在 componentDidMount 中去操作。从时间顺序来看，除了 componentDidMount 还可以有以下选择：
  - constructor：可以放，但从设计上而言不推荐。constructor 主要用于初始化 state 与函数绑定，并不承载业务逻辑。而且随着类属性的流行，constructor 已经很少使用了。
  - componentWillMount：已被标记废弃，在新的异步渲染架构下会触发多次渲染，容易引发 Bug，不利于未来 React 升级后的代码维护。
所以请求都放在 componentDidMount 中。