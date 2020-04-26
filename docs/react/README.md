# react setState 机制
### 记住这几个字 ```不可变值```
  - 不能直接修改 this.state 的值，例如不能使用数组中的 props push splice 等方法
  - 不能提前对 state 值进行修改，并且设置时不能直接修改 sate 的值

### 数据更新可能是异步的
  - 直接使用可能是异步的
  ```js
    this.setState({
      count: this.state.count + 1
    }, () => {
      // 在回调函数中，可以拿到最新的值
      // 这里相当于使用 Vue 的 $nextTick
      console.log(this.state.count)
    })

    // 这里使用时 异步的，直接获取拿不到最新的值
    console.log(this.state.count) 
  ```
  - 在 setTimeout 中使用 setState 是同步的
  ```js
    setTimeout(() => {
      this.setState({
        count: this.state.count
      })
    })
  ```
  - 在自定义的 DOM 事件中，setState 是同步的
  ```js
    document.body.addEventListener('click', () => {
      this.setState({
        count: this.state.count
      })
    })
  ```
  - 可能会被合并
  ```js
    state = {
    count: 0
  }

  handleClick = () => {
    this.setState({
      count: this.state.count + 1
    })
    this.setState({
      count: this.state.count + 1
    })
    this.setState({
      count: this.state.count + 1
    })
    // 传入对象，会被合并，执行一次结果
    console.log('count---->', this.state.count) // 0 再次执行会是 1，2，3
  }

  render() {
    return (
      <div onClick={this.handleClick}>测试</div>
    )
  }
  ```
  ![image.png](https://upload-images.jianshu.io/upload_images/13129256-35c34dca8bef2303.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 如果传入函数，就不会被合并
```js
  state = {
    count: 0
  }

  handleClick = () => {
    this.setState((prevState, props) => {
      return {
        count: prevState.count + 1
      }
    })
    this.setState((prevState, props) => {
      return {
        count: prevState.count + 1
      }
    })
    this.setState((prevState, props) => {
      return {
        count: prevState.count + 1
      }
    })
    console.log('count ------->', this.state.count) // 0，3，6
  }

  render() {
    return (
      <div onClick={this.handleClick}>测试</div>
    )
  }
```

  ![image.png](https://upload-images.jianshu.io/upload_images/13129256-a0c6e010344a7ca4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### setState 主流程
![主流程.png](https://upload-images.jianshu.io/upload_images/13129256-f10bbcb4db276a65.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### batchUpdate 机制
- setState 异步还是同步 ？
  - setState 无论是异步还是同步，要看是否命中 batchUpdate 机制
  

> 简单理解为: 当函数执行开始时 isBatchingUpdates 是 true 然后执行正常代码逻辑，函数执行结束时，isBatchingUpdates 是 false
```js
  handleClick() {
    // 开始处于 isBatchingUpdates ， isBatchingUpdates = true
    this.setState({
      count: this.state.count + 1
    })
    // 结束 isBatchingUpdates = false
  }
```
> 但如果 setState 是异步时
```js
  handleClick() {
    // 开始处于 isBatchingUpdates ， isBatchingUpdates = true
    setTimeout(() => {
      // 此时运行 setState ， isBatchingUpdates 的值已经是 false
      this.setState({
        count: this.state.count + 1
      })
    })

    // 结束 isBatchingUpdates = false
  }
```

- 哪些能命中 batchUpdate 机制？
  - 生命周期和它调用的函数
  - React 中注册的事件和它调用的函数
  - React 可以管理的入口 (React 提供的)

- 哪些不能命中 batchUpdate 机制 ？ 
  - setTimeout setInterval
  - 自定义的 DOM 事件
  - 总之是 React “管不到” 的入口 (不是 React 提供的)


#### transaction 事务机制
- 它是服务于 batchUpdate 的机制
  下面这种代码写法的机制就是 transaction 事务机制， 当然 react 底层实现并不是这么简单（只是为了快速理解）

```js
  handleClick() {
    // 开始处于 isBatchingUpdates ， isBatchingUpdates = true
    // initialize

    // 自定义的方法 或者业务代码
    this.setState({
      count: this.state.count + 1
    })

    // close
    // 结束 isBatchingUpdates = false
  }
```
![transaction.png](https://upload-images.jianshu.io/upload_images/13129256-6348b961b15d1349.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

每天进步一点点 💪
