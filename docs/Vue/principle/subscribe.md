## 模拟 Vue 自定义事件（订阅发布模式）
- Vue 中使用$on、$emit 一般用来使用兄弟组件中的参数传递，其原理就是使用了订阅发布模式
#### Vue 的例子
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue 中发布订阅模式</title>
</head>
<body>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>  
    // Vue 的实例
    let vm = new Vue()
    // 订阅事件
    vm.$on('change', (val) => {
      console.log('change1 ---->', val)
    })
    vm.$on('change', (val) => {
      console.log('change2 ---->', val)
    })

    // 发布事件
    vm.$emit('change', 'hello')
    console.log(vm.$on)
  </script>
</body>
</html>
```

### 使用 JavaScript 模拟订阅发布
```js
function EventElement2 () {
  this.subs = {}
}

EventElement2.prototype.$on = function(event, fn) {
    // 如果有值就直接赋值，如果为空赋值 [] 
  this.subs[event] = this.subs[event] || []
  // 存储事件
  this.subs[event].push(fn)
}
EventElement2.prototype.$emit = function(event, params) {
  // 判断事件是否存在，存在去执行相应的事件
  if (this.subs[event]) {
    this.subs[event].forEach((fn) => {
      fn(params)
    })
  }
}

let em2 = new EventElement2
em2.$on('click', (val) => {
  console.log('click2 ---->', val)
})

em2.$emit('click', 'hello')
```

### 使用 ES6 的方式实现
```js
// 事件触发器
class EventElement {
  constructor() {
    // this.subs = {}
    this.subs = Object.create(null) // 这样写性能会好一点
  }
  // 注册事件
  $on(event, fn) {
    // 如果有值就直接赋值，如果为空赋值 [] 
    this.subs[event] = this.subs[event] || []
    // 存储事件
    this.subs[event].push(fn)
  }
  // 触发事件
  $emit(event, params) {
    // 判断时间是否存在，存在去执行相应的事件
    if (this.subs[event]) {
      this.subs[event].forEach((fn) => {
        fn(params)
      })
    }
  }
}

let em = new EventElement
em.$on('click', (val) => {
  console.log('click1 ---->', val)
})

em.$emit('click', 'hello')

```

### 观察者模式和订阅发布模式的区别
- 观察者模式是由具体的目标调用，例如：当事件触发 Dep 就会去调用观察者的方法，所以订阅者和观察者之间是存在依赖的。
- 发布订阅模式是由统一的调度中心调用，因为发布者和订阅者不需要知道对方的存在。
