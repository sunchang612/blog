# 受控组件与非受控组件

## 受控组件
受控组件：在 HTML 表单中，通常我们自己维护一套 state，并随着用户的输入自动进行 UI 上更新，这种行为不受我们程序控制，如果将 React 里的 state 属性和表单元素的值建立依赖关系，在通过 onChange 事件与 setState 结合更新 state 属性，就能达到控制用户输入过程中表单发生的操作，这种方式控制表单取值的方式叫做 “受控组件”。

```js
class Test extends React.Component {
  constructor() {
    this.state = {
      name: 'name'
    }
  }

  onChange(e) {
    this.state({
      name: e.target.value
    })
  }

  render() {
    return (
      <input name='name' value={this.state.name} onChange={(e) => this.onChange(e)}></input>
    )
  }
}
```

## 非受控组件
```js
class Test extends React.Component {
  constructor() {
    this.inputRef = React.createRef()
  }

  handleSubmit() {
    console.log(this.inputRef.current.value)
  }

  render() {
    return (
      <div>
        <input ref={this.inputRef}></input>
        <button onClick={() => this.handleSubmit()}>提交</button>
      </div>
    )
  }
}
```

- 但是：表单里面也有个例外，就是 files 文件，必须要用 非受控组件的 方式