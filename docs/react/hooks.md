# 学习 React Hooks

## 动机
- Hook 解决了我们五年来编写和维护成千上万的组件遇到的各种各样看起来不相关的问题。

## Hooks 的优点
- 组件之间 <font color="red"> Hook 使你在无需修改组件结构的情况下复用状态逻辑。</font>

- 组件周期之间互相关联的代码进行拆分，<font color="red"> Hook 将组件中互相关联的部分拆分成更小的函数 </font> 并非强制按照生命周期划分。还可以使用 reducer 来管理组件的内容状态，使其更加可预测。具体可看 Effect Hook。

- 难以理解的 class，<font color="red">Hook 使你在非 class 的情况下可以使用更多的 React 特性 </font>，React 组件一直更像是函数，而 Hook 则拥抱了函数，同时也解决了 class 常见的 this 的问题。

> <font color="#ffc53d">但是 React 官方并不计划从 React 中移除 class </font>

## 什么是 Hook
- <font color="red"> Hook 是一种特殊的函数，可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。</font>Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。

## Hook 使用规则
- Hook 就是JavaScript 函数，但是使用他们会有两个额外的规则：
  - 只能在 <font color="red">函数最外层</font>调用 Hook。不要在 <font color="red">循环、条件判断或者子函数中调用</font>
  - 只能在 <font color="red"> React 的函数组件 </font>中调用 Hook。不要在其他 JavaScript 函数中调用。

## useState
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

## useEffect
- useEffect Hook 可以看做是  <font color="red"> componentDidMount，componentDidUpdate，componentWillUnmount </font> 这三个函数的组合

### 无需清理的 effect
- 当我们想在 React 更新 DOM 之后运行一些额外的代码。比如发送网络请求，手动变更 DOM，记录日志，这些都是常见的无需清除的操作

### 使用 Hook 的示例
```js
import React, { useState, useEffect } from 'react'

function Example() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
- 上面代码每次点击都会更新 title

- <font color="red">useEffect 做了什么？ </font> 通过使用这个 Hook，你可以告诉 React 组件需要在渲染后执行某些操作。React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 DOM 更新之后调用它。在这个 effect 中，我们设置了 document 的 title 属性，不过我们也可以执行数据获取或调用其他命令式的 API。

- <font  color="red">为什么在组件内部调用 useEffect？ </font> 将 useEffect 放在组件内部让我们可以在 effect 中直接访问 count state 变量（或其他 props）。我们不需要特殊的 API 来读取它 —— 它已经保存在函数作用域中。Hook 使用了 JavaScript 的闭包机制，而不用在 JavaScript 已经提供了解决方案的情况下，还引入特定的 React API

- <font  color="red"> useEffect 会在每次渲染后都执行吗？</font> <font  color="red"> 是的，默认情况下</font>，它在第一次渲染之后和每次更新之后都会执行。（下面会讲到性能优化如何控制它。）你可能会更容易接受 effect 发生在“渲染之后”这种概念，不用再去考虑“挂载”还是“更新”。React 保证了每次运行 effect 的同时，DOM 都已经更新完毕。

### 需要清理的 Effect
- 之前，我们研究了如何使用不需要清除的副作用，还有一些副作用是需要清除的。例如订阅外部数据源。这种情况下，<font color="red">清除工作是非常重要的，可以防止引起内存泄露！</font>现在让我们来比较一下如何用 Class 和 Hook 来实现。

#### 使用 Class 的示例
- 在 React class 中，通常会在 <font color="red"> componentDidMount 中设置订阅，并在 componentWillUnmount 中清除它。</font>例如，最常见的例如我们绑定 document 事件

```js
componentDidMount() {
  document.addEventListener(
    'mousemove',
    onMoveStart,
    false
  )
}
componentWillUnmount() {
  document.removeEventListener('mousemove', onMoveStart, false)
}
  
```
- 你会注意到 componentDidMount 和 componentWillUnmount 之间相互对应。使用生命周期函数迫使我们拆分这些逻辑代码，即使这两部分代码都作用于相同的副作用。

#### 使用 Effect
```js
useEffect(() => {
  document.addEventListener(
    'mousemove',
    onMoveStart,
    false
  )
  return () => {
    document.removeEventListener('mousemove', onMoveStart, false)
  }
})
```
- <font color="red">为什么要在 effect 中返回一个函数？</font> 这是 effect 可选的清除机制。每个 effect 都可以返回一个清除函数。如此可以将添加和移除订阅的逻辑放在一起。它们都属于 effect 的一部分。

- <font color="red">React 何时清除 effect？</font> React 会在组件卸载的时候执行清除操作。正如之前学到的，effect 在每次渲染的时候都会执行。这就是为什么 React 会在执行当前 effect 之前对上一个 effect 进行清除。

#### 使用多个 Effect 实现关注点分离
- 使用 Hook <font color="red">其中一个目的就是要解决 class 中生命周期函数经常包含不相关的逻辑，但又把相关逻辑分离到了几个不同方法中的问题。</font>

- <font color="red"> Hook 允许我们按照代码的用途分离他们，</font> 而不是像生命周期函数那样。React 将按照  <font color="red"> effect 声明的顺序依次调用组件中的每一个 effect。</font>


### Effect 进行性能优化
- 在某些情况下，<font color="red">每次渲染后都执行清理或者执行 effect 可能会导致性能问题。</font> 在 class 组件中，我们可以通过在 <font color="red">componentDidUpdate 中添加对 prevProps 或 prevState 的比较逻辑解决</font>

- 例如使用 class 优化上面的代码 
```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`
  }
}
```
- useEffect
如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React 跳过对 effect 的调用，只要传递数组作为 useEffect 的第二个可选参数即可： 
```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]);
```
> 传入 [count] 作为第二个参数,这个参数是什么作用呢？ 如果 count 的值是 5，而且我们的组件重渲染的时候 count 还是等于 5，React 将对前一次渲染的 [5] 和后一次渲染的 [5] 进行比较。因为数组中的所有元素都是相等的(5 === 5)，React 会跳过这个 effect，这就实现了性能的优化。<font color="red">如果 count 值改变，React 会比较上一次的值，如果改变，React 会执行 effect</font>, <font color="red">数组是可以有多个元素的，如果其中一个改变，React 也会执行 effect。</font>

- <font color="#fa8c16">如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行, 可以传递一个空数组（[]）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。</font>

## 自定义 Hook
- <font color="red"> 自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook。</font>
##### 创建自定义 Hook
```js
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

#### 使用自定义 Hook
```js
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

> 自定义 Hook 只是将两个函数之间一些共同的代码提取到单独的函数中。<font color="#fa8c16">自定义 Hook 是一种自然遵循 Hook 设计的约定，而并不是 React 的特性。</font>

- <font color="#141414" style="font-weight: 700"> 自定义 Hook 必须以 “use” 开头吗？</font>  <font color="#fa8c16">必须如此。这个约定非常重要。</font> <font color="red">不遵循的话，由于无法判断某个函数是否包含对其内部 Hook 的调用，React 将无法自动检查你的 Hook 是否违反了 Hook 的规则</font>

- <font color="#141414" style="font-weight: 700"> 在两个组件中使用相同的 Hook 会共享 state 吗？</font>  <font color="#fa8c16">不会。</font> <font color="red">自定义 Hook 是一种重用状态逻辑的机制(例如设置为订阅并存储当前值)，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。</font>

- <font color="#141414" style="font-weight: 700"> 自定义 Hook 如何获取独立的 state？</font>  <font color="#fa8c16">每次调用 Hook，它都会获取独立的 state。</font> <font color="red">由于我们直接调用了 useFriendStatus，从 React 的角度来看，我们的组件只是调用了 useState 和 useEffect。我们是可以在一个组件中多次调用 useState 和 useEffect，它们是完全独立的。</font>

#### 在多个 Hook 之间传递信息
- <font color="red">由于 Hook 本身就是函数，因此我们可以在它们之间传递信息。</font>

```js
const [recipientID, setRecipientID] = useState(1);
const isRecipientOnline = useFriendStatus(recipientID);
```

## useContext
```
const value = useContext(MyContext)
```
- 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。<font color="red">当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。</font>

- 当组件上层最近的 <MyContext.Provider> 更新时，该 <font color="red"> Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值。即使祖先使用 React.memo 或 shouldComponentUpdate，也会在组件本身使用 useContext 时重新渲染。</font>

- 别忘记 useContext 的参数必须是 context 对象本身：
  - <font color="#13c2c2"> 正确： useContext(MyContext) </font>
  - <font color="#fa8c16">错误： useContext(MyContext.Consumer)</font>
  - <font color="#fa8c16">错误： useContext(MyContext.Provider)</font>

:::warning

如果你在接触 Hook 前已经对 context API 比较熟悉，那应该可以理解，useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>。

useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context。
:::

- 把如下代码与 Context.Provider 放在一起
```js
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

## useReducer
```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```
- useState 的替代方案。<font color="red">它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。</font>（如果你熟悉 Redux 的话，就已经知道它如何工作了。）

```js
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </div>
  );
}
```

#### 指定初始 state
- <font color="red"> 有两种不同初始化 useReducer state 的方式，</font>你可以根据使用场景选择其中的一种。将初始 state 作为第二个参数传入 useReducer 是最简单的方法：
```js
const [state, dispatch] = useReducer(
  reducer,
  {count: initialCount}
)
```
::: warning
React 不使用 state = initialState 这一由 Redux 推广开来的参数约定。有时候初始值依赖于 props，因此需要在调用 Hook 时指定。如果你特别喜欢上述的参数约定，可以通过调用 useReducer(reducer, undefined, reducer) 来模拟 Redux 的行为，但我们不鼓励你这么做。
:::

#### 惰性初始化
- <font color="red"> 可以选择惰性地创建初始 state。</font>为此，需要 <font color="red">  将 init 函数作为 useReducer 的第三个参数传入</font>，这样初始 state 将被设置为 init(initialArg)。

这么做可以将 <font color="red"> 用于计算 state 的逻辑提取到 reducer 外部，这也为将来对重置 state 的 action 做处理提供了便利：</font>

```js
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init)
  return (
    <div>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </div>
  )
}

```

#### 跳过 dispatch
- 如果 Reducer Hook 的返回值与当前 state 相同，React 将跳过子组件的渲染及副作用的执行。<font color="red">（React 使用 Object.is 比较算法 来比较 state。）</font>
- 需要注意的是，React 可能仍需要在跳过渲染前再次渲染该组件。不过由于 React 不会对组件树的“深层”节点进行不必要的渲染，所以大可不必担心。如果你在渲染期间执行了高开销的计算，则可以使用 useMemo 来进行优化。


## useCallback

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
- 返回一个 memoized 回调函数。

- <font color="red"> 把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。</font> <font color="#fa8c16">当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。</font>

- <font style="background-color: #ffd591">  useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。</font>


## useMemo
```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
- <font color="red"> 把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。</font>这种优化有助于避免在每次渲染时都进行高开销的计算。

- <font color="#ff4d4f"> 传入 useMemo 的函数会在渲染期间执行</font> 。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。

- 如果<font color="#ff4d4f"> 没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。</font>

- <font color="red">注意：</font> <font color="#2f54eb"> 你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证。</font>

## useRef
```
const refContainer = useRef(initialValue);
```
-  useRef 返回一个可变的 ref 对象，其 <font color="red"> .current 属性被初始化为传入的参数（initialValue）。</font>返回的 ref 对象在组件的整个生命周期内保持不变。

- 例如：
```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <div>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </div>
  );
}
```
- <font color="red"> 本质上，useRef 就像是可以在其 .current 属性中保存一个可变值的“盒子”。</font>

- 将 ref 对象以 ``` <div ref={myRef} /> ``` 形式传入组件，则无论该节点如何改变，React 都会将 ref 对象的 ``` .current ``` 属性设置为相应的 DOM 节点。

- <font color="red">useRef() 比 ref 属性更有用。它可以很方便地保存任何可变值，</font>其类似于在 class 中使用实例字段的方式。

- 这是因为它创建的是一个普通 Javascript 对象。而 useRef() 和自建一个 {current: ...} 对象的唯一区别是，useRef 会在每次渲染时返回同一个 ref 对象。

- <font color="red"> 当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现。</font>

## useImperativeHandle
```js
useImperativeHandle(ref, createHandle, [deps])
```
- <font color="red">useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。</font>在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用：
```js
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```
- 上面的例子中 渲染 ```<FancyInput ref={inputRef} /> ```的父组件可以调用 ```inputRef.current.focus()```

## useLayoutEffect
- <font color="#eb2f96"> 其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。</font><font color="red">在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。</font>

- <font color="#eb2f96">但是：</font><font color="red">尽可能使用标准的 useEffect 以避免阻塞视觉更新。</font>

::: warning

如果你正在将代码从 class 组件迁移到使用 Hook 的函数组件，则需要注意 useLayoutEffect 与 componentDidMount、componentDidUpdate 的调用阶段是一样的。但是，我们推荐你一开始先用 useEffect，只有当它出问题的时候再尝试使用 useLayoutEffect。

如果你使用服务端渲染，请记住，无论 useLayoutEffect 还是 useEffect 都无法在 Javascript 代码加载完成之前执行。这就是为什么在服务端渲染组件中引入 useLayoutEffect 代码时会触发 React 告警。解决这个问题，需要将代码逻辑移至 useEffect 中（如果首次渲染不需要这段逻辑的情况下），或是将该组件延迟到客户端渲染完成后再显示（如果直到 useLayoutEffect 执行之前 HTML 都显示错乱的情况下）。

若要从服务端渲染的 HTML 中排除依赖布局 effect 的组件，可以通过使用 showChild && <Child /> 进行条件渲染，并使用 useEffect(() => { setShowChild(true); }, []) 延迟展示组件。这样，在客户端渲染完成之前，UI 就不会像之前那样显示错乱了。
:::
