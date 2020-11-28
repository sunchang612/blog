## Vue3.x 组件的渲染过程
- vnode 到真实 DOM 是如何转换的 ？

### 一个组件想要生成 DOM 的过程
- 创建 vnode -----> 渲染 vnode  ------> 生成 DOM
### 组件创建好之后如何初始化 ？
- 先看一下 Vue2 和 Vue3 中的初始化的代码 ?
```js
// vue2
import Vue from 'vue'
import App from './App'
const app = new Vue({
  render: h => h(App)
})
app.$mount('#app')
```
```js
// Vue3 
import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')

```
1. 组件会先从根元素开始初始化 。
2. Vue3 中的初始化和 Vue2 中差别不大，本质上都是把 App 组件挂载到 id 为 app 的 DOM 节点上。
3. Vue3 中导入了一个 createApp 方法主要做了两件事情：创建 app 对象和重写 app.mount 方法

### crateApp 
```js
// 渲染相关的一些配置，比如更新属性的方法，操作 DOM 的方法
const rendererOptions = {
  patchProp,
  ...nodeOps
}
let renderer
// 延时创建渲染器，当用户只依赖响应式包的时候，可以通过 tree-shaking 移除核心渲染逻辑相关的代码
// 这里如果不调用 createAPI 只是用 响应式的的一些 API ，就不会创建这个渲染器
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions))
}
function createRenderer(options) {
  return baseCreateRenderer(options)
}
function baseCreateRenderer(options) {
  function render(vnode, container) {
    // 组件渲染的核心逻辑
  }
  return {
    render,
    createApp: createAppAPI(render)
  }
}
function createAppAPI(render) {
  // createApp createApp 方法接受的两个参数：根组件的对象和 prop
  return function createApp(rootComponent, rootProps = null) {
    const app = {
      _component: rootComponent,
      _props: rootProps,
      mount(rootContainer) {
        // 创建根组件的 vnode
        const vnode = createVNode(rootComponent, rootProps)
        // 利用渲染器渲染 vnode
        render(vnode, rootContainer)
        app._container = rootContainer
        return vnode.component.proxy
      }
    }
    return app
  }
}
```
- Vue3 通过 createRenderer 创建一个渲染器，渲染器内部会有一个 crateApp 方法，是执行 crateAppAPI 方法返回的函数，有 rootComponent 和 rootProps 两个参数，在外部调用 createApp 方法时，会把 App 组件对象作为根组件传递给 rootComponent。 这时，createApp 就创建了一个 app 对象，它里面提供了 mount 方法是用来挂载组件滴。
```js
// Vue3 
import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')
```

### mount 方法的作用
- createApp 函数内部的 app.mount 方法是一个标准的可跨平台的组件渲染流程。标准的跨平台渲染流程是先创建 vnode，再渲染 vnode。
```js
mount(rootContainer) {
  // 创建根组件的 vnode
  const vnode = createVNode(rootComponent, rootProps)
  // 利用渲染器渲染 vnode
  render(vnode, rootContainer)
  app._container = rootContainer
  return vnode.component.proxy
}
```

### 重写 mount 
- 为什么要重写 mount 方法 ？ 在 Web 平台它是一个 DOM 对象，而在其他平台（比如 Weex 和小程序）中可以是其他类型的值。所以这里面的代码不应该包含任何特定平台相关的逻辑，也就是说这些代码的执行逻辑都是与平台无关的。因此我们需要在外部重写这个方法，来完善 Web 平台下的渲染逻辑。
- app.mount 的重写
```js
app.mount = (containerOrSelector) => {
  // 标准化容器
  const container = normalizeContainer(containerOrSelector)
  if (!container)
    return
  const component = app._component
   // 如组件对象没有定义 render 函数和 template 模板，则取容器的 innerHTML 作为组件模板内容
  if (!isFunction(component) && !component.render && !component.template) {
    component.template = container.innerHTML
  }
  // 挂载前清空容器内容
  container.innerHTML = ''
  // 真正的挂载
  return mount(container)
}
```
- 通过 normalizeContainer 标准化容器（可传字符串选择器或者 DOM，如果是字符串转成 DOM）----》 然后 if 判断组件对象有没有定义 render函数和 template 模板，没有则去 innerHTML 作为组件模板内容；------》挂载前清空内容，最后调用 app.mount 方法去走 标准的组件渲染流程。
> 这样的做法就是更灵活，也兼容了 Vue2 的写法。

### 创建 VNode
- vnode 的本质就是用来描述 DOM 的 JavaScript 对象。用来描述普通元素节点或组件节点等。
#### 创建普通元素节点
```js
<div class="container" style="width: 100px; height: 100px">容器</div>
``` 
- 用 vnode 表示
```js
const vnode = {
  type: 'div',
  props: {
    'class': 'container',
    style: {
      width: '100px',
      height: '100px'
    }
  },
  children: '容器'
}
```
> type 表示DOM的标签类型，props表示 DOM 的一些附加信息（用来表示DOM上的属性）， children 表示 DOM 子节点，可以是 vnode 数组，也可以是简单字符串
#### 创建组件节点
```js
<sc-button age="18"></sc-button>
```
- 用 vnode 表示
```js
const ScButton = {
  // 这里定义组件对象
}
const vnode = {
  type: ScButton,
  props: {
    age: '18'
  }
}
```
> 组件 vnode 只是抽象的描述，并不会去渲染这个标签，而是渲染组件内容定义的 HTML。

### vnode 有什么优势？
1. 抽象：引入 vnode 可以把渲染过程抽象化，使组件的抽象能力也得到提升。
2. 跨平台：因为 patch vnode 的过程可以不同平台有自己的实现，基于 vnode 可以在很多方面，例如 服务端渲染，小程序 等。
> ```注意：``` vnode 不意味着不用操作 DOM ，还有 vnode 的性能不一定就比去操作原生的 DOM  好。（在MVVM框架中，每次 render vnode 过程中，渲染组件会有一定的 JavaScript 耗时，特别是大组件，虽然 diff 算法减少了 DOM 操作，但还是避免不了DOM 操作。）

### 渲染 vnode
```js
render(vnode, rootContainer)
const render = (vnode, container) => {
  if (vnode == null) {
    // 销毁组件
    if (container._vnode) {
      unmount(container._vnode, null, null, true)
    }
  } else {
    // 创建或者更新组件
    patch(container._vnode || null, vnode, container)
  }
  // 缓存 vnode 节点，表示已经渲染
  container._vnode = vnode
}
```
- 如果递给参数时空，则执行销毁组件的逻辑，否则执行创建或者更新组件的逻辑

#### patch
- patch 有两个功能： 1是根据 vnode 挂载 DOM，2是根据新旧 vnode 更新 DOM。
```js
const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, optimized = false) => {}
```
  - n1 表示就得 vnode 节点， 当 n1 为 null 时，表示第一次挂载
  - n2 表示新的 vnode 节点，后面会根据这个 vnode 类型执行不同的处理逻辑
  - container 表示 DOM 容器， 也就是 vnode 渲染生成 DOM 后，会挂载到 container 下面
- 对组件的处理
  > 初始渲染主要做两件事情：渲染组件生成 subTree、把 subTree 挂载到 container 中。
- 对普通 DOM 元素
  - 主要做 4 件事：
    1. 创建 DOM 元素节点 （调用底层的 DOM API document.crateElement 创建元素）
    2. 处理 props  （给 DOM 元素添加相关的 class style event 等属性）
    3. 处理 children  （如果是子元素是纯文本，在 WEB 环境下通过 DOM 元素 textContent 属性设置文本, 如果是组件，就遍历 children 获取每个 child，然后执行 patch 挂载每一个 child，如果有父元素建立父子关系）
    4. 挂载 DOM 元素到 container 上。  （挂载的顺序是先子节点，后父节点，最终挂载到最外层的容器上。）
