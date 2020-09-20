# 手写 Vue 响应式框架 （学习响应式原理） 

## 手写一个简版的 Vue
- 整体的数据结构
  - Vue 
  - Observer 数据劫持
  - Dep 发布者
  - Watcher 观察者
  - Compiler 解析指令

- 模拟实现 vm 实例中的几种方法
1. 把 data 中的数据变成响应式数据，拥有 get set 方法
2. $el
3. $options
4. $data

- 实现解析 v-text v-model 指令
- 实现双向绑定

## 最终效果
![vue-demo.gif](https://upload-images.jianshu.io/upload_images/13129256-d623258fc2c457d3.gif?imageMogr2/auto-orient/strip)

```html
<div id="app">
  <div>{{msg}}</div>
  <div v-text="count"></div>
  <input type="text" v-model="count">
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    count: 1,
    msg: 'hello Vue',
  }
})
console.log(vm)
```

### 实现 Vue
- 主要功能
  - 负责接收初始化的参数
  - 实现 $el $options $data
  - 负责把 data 中的属性转换成 get set 并注入到 Vue 实例中
- vue.js
```js
class Vue {
  // options 
  constructor(options) {
    this.$options = options || {}
    this.$data = options.data || {}
  
    // 获取DOM 元素，这里可能传递的是字符串
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el

    // 把 data 中的成员转换成 getter 和 setter 并注入到 Vue 实例中
    this._proxyData(this.$data)
  }

  // 代理数据
  _proxyData(data) {
    // 遍历所有的 data 属性
    Object.keys(data).forEach(d => {
      Object.defineProperty(this, d, {
        enumerable: true, // 可枚举
        configurable: true, // 可配置
        get() {
          return data[d]
        },
        set(newVal) {
          // 如果新的值和就的值相等，不需要重新赋值
          if (newVal === data[d]) return
          data[d] = newVal
        }
      })
    })
  }
}
```
```js
<script src="./js/Vue.js"></script>
<script>
  let vm = new Vue({
    el: '#app',
    data: {
      msg: 'learn Vue',
      count: 100
    }
  })
  console.log(vm)
</script>
```
- 打印的实例中就出现了刚才我的设定的几个属性，并且data中的属性也已经拥有 get 和 set 方法
![vue.js.png](https://upload-images.jianshu.io/upload_images/13129256-40bd15a4788eb390.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### Observer
- 功能
  - 负责把 data 选项中的属性转换成响应式数据
  - data 中的某个属性也是对象，把该属性转换成响应式数据
  - 数据变化发送通知
- Observer.js
```js
class Observer {
  constructor(data) {
    this.walk(data)
  }

  // 遍历所有的属性
  walk(data) {
    // 判断 data 是否是对象
    if (!data || typeof data !== 'object') return

    // 遍历 data 对象所有属性
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  // 定义响应式数据
  defineReactive(obj, key, val) {
    // 如果 val 是对象，把对象类型数据转换成响应式数据
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        return val
      },
      // 使用箭头函数改变 this 的指向
      set: (newVal) => {
        if (newVal === val) return
        val = newVal
        // 当前属性重新 set 的时候，如果是 Object 类型，让里面的属性变成响应式数据
        this.walk(val)
        // 发送通知
      }
    })
  }
}
```
#### 解释几个地方意思
1. 这里的 为什么要传第三个参数， get 时返回 val, 不直接使用 obj[key]
```js
defineReactive(obj, key, val) {
// 如果 val 是对象，把对象类型数据转换成响应式数据
Object.defineProperty(obj, key, {
  enumerable: true,
  configurable: true,
  get() {
    return val
  },
```
- 如果直接返回 obj[key] 会造成```死递归```
![Observer.png](https://upload-images.jianshu.io/upload_images/13129256-d4926bbf3c8d41ad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2. 直接赋值 val 为什么可以
- 因为这里 obj 是 vue.js 中传递过来的 $data, 是引用数据类型，里面引入了 get 方法，从而发生了闭包，在浏览器中可查看到
![image.png](https://upload-images.jianshu.io/upload_images/13129256-7739b23eabd1e0f0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### Compile
- 功能
  - 负责模板编译，解析指令、差着表达式
  - 负责页面的首次渲染
  - 当数据变化后重新渲染视图

- compile 
  - 编译模板
- compileText
  - 编译文本节点，处理差值表达式
- compileElement
  - 编译元素节点，处理指令
- update
  - 分配调用指令
- textUpdater
  - 处理 v-text 指令
- modelUpdater
  - 处理 v-model 指令
- isDirective
  - 判断是否为指令
- isTextNode
  - 判断是否为文本节点
- isElementNode
  - 判断是否为元素节点

- 解析之后的效果
![compile.png](https://upload-images.jianshu.io/upload_images/13129256-0db4b69f7b0708b3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### Dep (dependency) 收集依赖
- 功能
  - 在 get 时收集依赖，添加观察者
  - 在 set 时通过所有的观察者

```js
class Dep {
  constructor() {
    // 存储所有的观察者
    this.subs = []
  }

  // 添加观察者
  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }

  // 发布通知
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
```

### Watcher 观察者
- 功能
  - 当数据变化触发依赖，dep 通知所有的 Watcher 实例更新视图
  - 自身实例化的时候往 dep 对象中添加自己

```js
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    
    this.cb = cb

    // 当前的 Watcher 对象记录到 Dep 类的静态属性 target 中
    // 触发 get 方法，在 get 方法中会调用 addSub
    Dep.target = this
    this.oldValue = vm[key]
    // 防止重复添加
    Dep.target = null
  }

  // 当数据发生变化的更新视图
  update() {
    let newValue = this.vm[this.key]
    if (newValue === this.oldValue) return
    // 调用回调函数，更新视图
    this.cb(newValue)
  }
}
```
- 这部分结束后，响应式的数据已经实现
![响应式.gif](https://upload-images.jianshu.io/upload_images/13129256-0e68f98f2c2e7b47.gif?imageMogr2/auto-orient/strip)

### 实现双向绑定
- 视图发生变化，数据也发生变化
- 使用 input 事件监听数据变化，然后更新视图
```js
// 处理 v-model 指令
modelUpdater(node, key, value) {
  node.value = value
  new Watcher(this.vm, key, (newValue) => {
    node.value = newValue
  })

  // 双向绑定
  node.addEventListener('input', () => {
    this.vm[key] = node.value
  })
}
```

### 最后的效果
![watcher.gif](https://upload-images.jianshu.io/upload_images/13129256-7eb4b0014b879444.gif?imageMogr2/auto-orient/strip)
