# Vue 面试题总结

## 什么是 MVVM
- MVVM - 数据驱动视图
    - 不在操作 DOM，只需要改数据
    - M -> <font color="red">model</font>   v -> <font color="red">view</font>  vm -> <font color="red">viewModel 连接层 </font>
    - M -> 存JavaScript对象  V -> DOM  VM - vue
  - 传统组件，只是静态渲染，更新还要依赖于操作 DOM

### View 层
- View 是视图层，也是用户界面。前端主要由HTML 和 CSS 构建
> vue template 可以理解为 View
```html
<div id="app">
  <p>{{message}}</p>
  <button v-on:click="showMessage()">Click me</button>
</div>
```

### Model 层
- Model 是数据模型，泛指后端进行的各种业务逻辑处理和数据操控，对于前端来说就是后端提供的 api 接口。
```js
{
  "url": "/server/data/api",
  "res": {
    "success": true,
    "name": "baidu",
    "domain": "www.baidu.com"
  }
}

```

### ViewModel 层
- 是由前端人员组织生成和维护的视图数据层。
```js
var app = new Vue({
  el: '#app',
  data: {  // 用于描述视图状态   
    message: 'Hello Vue!', 
  },
  
  created(){
    let vm = this;
    // Ajax 获取 Model 层的数据
    ajax({
      url: '/server/data/api',
      success(res){
        vm.message = res;
      }
    });
  }
  methods: {  
    showMessage(){
      let vm = this;
      alert(vm.message);
    }
  },
})
```

## Vue 是如何实现数据双向绑定的
- Vue 数据双向绑定主要是指：<font color="red">数据变化更新视图，视图变化更新数据</font>
  - 输入框内容变化时，Data 中的数据同步变化。即 View => Data 的变化。
  - Data 中的数据变化时，文本节点的内容同步变化。即 Data => View 的变化。
- View 变化更新 Data，可以通过事件监听的方式实现，所以<font color="red"> Vue 的数据双向绑定的工作主要根据如果让 Data 变化更新 View。</font>

### Vue 实现双向绑定的原理
1. <font color="red">实现一个监听器 Observer：</font> <font color="#0000FF">对数据对象进行遍历，包括子属性对象属性，利用 Object.defineProperty 对属性都加上 setter 和 getter。这样之后，给这个对象某个属性赋值，就会触发它的 setter ，那么就能监听到数据变化。</font>

2. <font color="red">实现一个解析器 Compile：</font> <font color="#0000FF">解析 Vue 模板指令，将模板中的变量都替换成数据，然后渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据发生变动，收到通知调用更新函数进行更新.</font>

3. <font color="red">实现一个订阅者 Watcher：</font> <font color="#0000FF">Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要任务是订阅 Observer 中的属性值变化的消息，当收到变化时，触发解析器 Compile 中对应的更新函数。</font>

4. <font color="red">实现一个订阅器 Dep：</font> <font color="#0000FF">订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。</font>

## Vue 中的 computed 和 watch 的区别 ？
- 功能上：<font color="red">computed 是计算属性，也就是依赖其它的属性计算后所得出的值。</font> <font color="#f28500">watch是去监听一个值的变化，然后执行相应的函数</font>
- 使用上：<font color="red">computed 中的函数必须使用 return 返回；</font>，<font color="#f28500">watch 的回调里面传入监听属性的新旧值，通过这两个值可以做一些特定的操作，不是必须要return </font>
- 性能上：<font color="red">computed 中的函数所依赖的属性没有发生变化，那么调用当前函数的时候回从缓存中读取</font>，<font color="#f28500">而 watch 在每次监听值发生变化的时候都会执行回调，支持对属性的深度监听。</font>
- 场景上：computed 当一个属性受多个属性影响的时候，例如：商品结算；watch：当一条数据影响多个数据的时候。例如：分页

## Vue 中 computed 是如何实现的
- <font color="red"> computed 内部实现了一个惰性的 watcher</font>，在实例化的时候不会去求值，<font color="#f28500">其内部通过 dirty 属性标记计算属性是否需要重新求值</font>。当 computed 依赖的任意状态发生改变，都会通知这个惰性的 watcher，让它把 dirty 属性设置为 true，所以，当再次读取这个计算属性的时候，就会重新去求值。
> <font color="red">惰性的watcher 计算属性在创建时不会去求值的，是在使用时去求值</font>。

## Vue $nextTick 的原理
- Vue 在默认情况下，<font color="red">每次触发某个数据的 setter 方法后，对应的 watcher 对象其实会被 push 进入一个队列 Queue 中，在下一个 tick 的时候将这个队列 queue 全部拿出来 run （Watcher 对象的一个方法，用来触发 patch 操作） 一遍。</font>
- <font color="red">nextTick(callback) 优先使用生成 微任务的 promise.then 和 MutationObserver，</font>如果浏览器不支持，才用 setImmediate ， setTimeout 等替代。
- 如果一个变量更新多次，例如：number ++ 从 0 到 100，只需要更新一个视图即可，就是 0 变成 100，<font color="red">在同一 watcher 在同一个 tick 的时候应该只被执行一次，也就是说队列中不应该出现重复的 watcher 对象。用id 来标记每个 watcher 对象。</font>

## SPA 单页面的理解，它的优缺点分别是什么 ？
- sing-page application 仅在 web 页面初始化时加载响应的 HTML JavaScript 和 css。一旦页面加载完成，<font color="red">SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内部的变换，UI与用户的交互，避免页面的重新加载。</font>

### 优点：
1. 用户体验好，快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
2. 基于1的优点，SPA 相对对服务器的压力小；
3. 前后端分离，架构清晰，前端进行交互逻辑，后端负责数据处理；

### 缺点:
1. 初次加载消耗多，问了实现单页 web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 同一加载，部分页面按需加载
2. 前进后退路由管理： 由于单页面应用在一个页面上显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理。
3. SEO 难度较大： 由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上有着天然的劣势。

## Vue 是如何对数组方法进行变异的？ push , pop splice 等
- Vue2 中 用 <font color="red">Object.defineProperty 对数据进行拦截，而这个方法并不能监听数组内部变化，数组长度变化等，所以对数组进行 hack， 让Vue检测到内部的变化.</font>
- <font color="#f28500">本质上就是从写了原型上的方法，在变异的方法中 加入了自定义的逻辑，最后也调用了真正的数组的方法。</font>
> Object.defineProperty 的缺陷导致如果直接改变数组下标是无法 hack 的，因此，Vue 提供了 $set 的方式。新版的 Vue3 中使用了 proxy 的方式，可以支持监听数组，但也带来了兼容性的问题。

## v-show 与 v-if 的区别？
### v-if
- 是真正的条件渲染，因为它会保证在切换过程中条件内的时间监听和子组件适当的被销毁重建；也是惰性的；如果在初始化条件渲染时为 false，则什么都不做，直到条件第一次为真时才会开始渲染条件块。

### v-show
- 不管什么条件，元素总是被渲染，并且用 CSS display 属性记性切换。

> v-if 使用与在运行时很少改变条件，不需要频繁切换条件的场景； v-show 则适用于需要非常频繁切换条件的场景。

## Class 与 Style 如何动态绑定？
### Class
- 可以通过对象语法和数组语法进行动态绑定
  - 对象
  ```js
  <div :class="{ active: isActive}"></div>
  data: {
    isActive: true,
  }
  ```
  - 数组
  ```js
  <div :class="[isActive ? activeClass : '', defaultClass]"></div>
  data: {
    activeClass: 'active',
    defaultClass: 'text-default'
  }

  ```
### Style
- 也可以通过对象语法和数组语法进行动态绑定：
  - 对象：
  ```js
  <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
  data: {
    activeColor: 'blud',
    fontSize: 26
  }
  ```
  - 数组语法
  ```js
    <div :style="[styleColor, styleSize]"></div>

    data: {
      styleColor: {
        color: 'blud'
      },
      styleSize:{
        fontSize:'26px'
      }
    }
  ```

## 怎么理解 Vue 的单向数据流？

- 所有的 props 都是通过父组件的 props 之间形成一个 <font color="red">单向下行绑定</font>：父 props 的更新会向下流动到子组件中，但反过来不行，这样是为了防止子组件意外改变父级组件的状态，从而导致数据流没办法理解。

- <font color="red">父组件更新时，子组件中所有的 props 都将会刷新拿到最新的值，子组件不能改变父组件的 props，会抛出警告。</font> <font color="#f28500">子组件修改父组件，只能通过 $emit 派发一个自定义时间，父组件接收后，由父组件修改。</font>

## 直接给数组某项赋值，Vue 能检测到变化吗？
- 由于JavaScript 的显示，Vue 不能检测一下方式的数组变化：
  - 当利用索引直接修改数组每一项的值时： list[index] = newValue
  - 当你修改数组的长度时：list.length = newLength

> 为了解决这个问题，<font color="red">Vue 提供了 $set 的方式修改，或者使用 Vue封装好的几种数组的方式，例如 splice，因为这是 Object.defineProperty 的缺点，Vue3中使用 proxy 解决了这个问题。</font>

## 谈谈对 Vue 生命周期的理解 ？
- 生命周期是什么 ？
  - Vue 实例有一个完整的 生命周期，从<font color="red">开始创建、初始化数据、编译模板、挂载 DOM、渲染、更新、渲染、卸载等一系列过程，成为生命周期。</font>

### 各个生命周期的作用
1. beforeCreate   <font color="red"> 组件实例被创建之初，组件的属性生效之前</font>
2. created         <font color="red">组件实例已经完全出创建，属性也绑定，但是真实 DOM 没有生成，$el 还不可以用</font>
3. beforeMount     <font color="red">在挂载开始之前被调用，相关的render函数首次被调用</font>
4. mounted         <font color="red">el 被新创建的 vm.$el 替换，并挂载实例上去调动该钩子</font>
5. beforeUpdate    <font color="red">组件数据更新之前调用，发生在虚拟 DOM 打补丁之前</font>
6. update          <font color="red">组件数据更新之后</font>
7. activated       <font color="red">keep-alive 专属，组件被激活时调用</font>
8. deactivated     <font color="red">keep-alive 专属，组件被销毁时调用</font>
9. beforeDestory   <font color="red">组件销毁前调用</font>
10. destroyed      <font color="red">组件销毁后调用</font>

## Vue 的父组件和子组件生命周期钩子函数执行顺序
### 加载渲染过程
  - 生命周期 - <font color="#f28500">创建是从外到内的，渲染是从内到外的</font>
  ```js
    - 先创建 父组件的 created
    - 在创建 子组件的 created
    - 在渲染 子组件的 mounted
    - 然后是 父组件的 mounted
    - 父组件 before update
    - 子组件 before update
    - 子组件 updated
    - 父组件 updated
    - 父组件 beforeDestroy
    - 子组件 beforeDestroy
    - 子组件 destoryed
    - 父组件 destoryed
  ```

## 在哪个生命周期内调用异步请求？
- 在 钩子函数 created 、beforeMount、mounted 中进行调用，因为<font color="#f28500">在这三个钩子函数中，data 已经创建，可以将服务器点的数据返回进行赋值。</font>

## 在什么阶段才能访问操作 DOM
- 在钩子函数 mounted 被调用前，Vue 已经将编译好的模板挂载到页面上，所以可以在 mounted 中访问到 DOM。

## 父组件监听到子组件的生命周期吗？
- 有父组件 Parent 和子组件 Child，如果父组件监听到子组件挂载 mounted 就做一些逻辑处理，可以通过以下写法实现：
```js
// Parent.vue
<Child @mounted="doSomething"/>
    
// Child.vue
mounted() {
  this.$emit("mounted");
}
```

## 谈谈对 keep-alive 的了解
- keep-alive 是 Vue 内置的一个组件，<font color="#f28500">可以使用包含的组件保留状态，避免重复渲染</font>
  1. 一般结合路由和动态组件一起使用，用于缓存组件
  2. 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；
  3. 对应两个钩子函数 <font color="#f28500">activated</font> 和 <font color="#f28500">deactivated</font> ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。

## 组件中 data 为什么是一个函数
- 为什么组件中的 data 必须是一个函数，然后 return 一个对象，而 new Vue 实例里，data 可以直接是一个对象？

- <font color="#f28500">因为组件是用来复用的，且 JS 里对象是引用关系，如果组件中 data 是一个对象，那么这样作用域没有隔离，子组件中的 data 属性值会相互影响，</font>如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响；而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。

## v-model 的原理
```html
<input v-model='something'>
相当于
<input v-bind:value="something" v-on:input="something = $event.target.value">
```
```js
<template>
  <div>
    <input type="text" :value="text" @input="$emit('change', $event.target.value)">
  </div>
</template>
<script>
export default {
  model: {
    prop: 'text',
    event: 'change'
  },
  props: {
    text: String
  }
}
</script>
```


## Vue 组件间通信有哪几种方式 
- 父子组件通信，隔代组件通信、兄弟组件通信

#### props / $emit 父子组件通信

#### ref 与 $parent / $children  父子组件通信
  - ref： 如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就是组件实例
  - $parent / $children 访问 父 / 子 实例

#### $emit / $on  父子、隔代、兄弟组件通信

#### $attrs / $listeners  隔代组件通信
  - $attrs：包含了父作用域中不被 prop 所识别（且获取）的特性绑定 （class 和 style 除外）当一个组件没有申明任何 prop 时，这里会包含所有副作用的绑定 （class 和 style 除外），可以通过 $attrs 传入内部组件。通常配合 
  - $listeners：包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件

#### provide / inject 适用于隔代组件通信
  - 祖先组件中通过 provider 来提供变量，然后在子孙组件中通过 inject 来注入变量。 provide / inject API 主要解决了跨级组件间的通信问题，不过它的使用场景，主要是子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系。
  - 我自己一般那它用来刷新当前页面。

#### Vuex 适用于 父子、隔代、兄弟组件通信
- Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。
  - Vuex 的状态存储是响应式的。当组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也就拿到最新的数据。
  - 改变 store 中的状态唯一途径就是提交（commit）mutation。这能是我们方便跟踪每一个状态的变化。


## 使你用过 Vuex 吗？
- 主要包含一下几种模块：
  #### State
    - 定义了应用状态的数据结构，可以在这里设置默认的初始化状态。
  #### Getter
    - 允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性中。
  #### Mutation
    - 是唯一更改 store 中状态的方法，且必须是同步函数。
  #### Action
    - 用于提交 mutation，而不是直接变更状态，可以任何异步操作。
  #### Module
    - 允许将单一的 Store 拆分为多个 store 且同时保持在单一的状态数中。

## 使用过 Vue SSR 吗？ 说说 SSR
- SSR 将 Vue 在客户端将标签渲染成HTML 片段的工作放到了服务端完成，服务端形成的 HTML 片段直接返回给客户端这个过程，叫做服务端渲染。

### 服务端渲染的有点：
1. 更好的 SEO：因为 SPA 页面的内容是通过 Ajax 获取，而搜索引擎爬取并不会等待异步完成后再去抓取结果，所以在 SPA 中抓取不到页面 Ajax 的请求内容，而 SSR 是结果从服务端渲染，返回时已经渲染好的页面（数据也包含在内），所以搜索引擎爬取可以抓到渲染好的页面;

2. 更快的内容到达时间（首屏加载更快）：SPA 等待所有 Vue 编译后的 js 文件都要下载完成后，才会进行页面的渲染，需要等待一段时间，SSR 直接由服务端渲染好页面直接返回显示，无需等待下载js 过程再去渲染，所以 SSR 更快。

### 服务端渲染的缺点：
1. 更多的开发条件限制： 只能在某些生命周期钩子函数 (lifecycle hook) 中使用；一些外部扩展库 (external library) 可能需要特殊处理，才能在服务器渲染应用程序中运行。
2. 涉及构建设置和部署的更多要求。与可以部署在任何静态文件服务器上的完全静态单页面应用程序 (SPA) 不同，服务器渲染应用程序，需要处于 Node.js server 运行环境。
3. 更多的服务器端负载。在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用 CPU 资源 (CPU-intensive - CPU 密集)，因此如果你预料在高流量环境 (high traffic) 下使用，请准备相应的服务器负载，并明智地采用缓存策略。

## vue-router 路由模式有几种？
- hash:  使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器；

- history :  依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式；

- abstract :  支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.

## v-model 原理
```html
<input v-model='something'>
相当于
<input v-bind:value="something" v-on:input="something = $event.target.value">
```
```vue
<template>
  <div>
    <input type="text" :value="text" @input="$emit('change', $event.target.value)">
  </div>
</template>
<script>
export default {
  model: {
    prop: 'text',
    event: 'change'
  },
  props: {
    text: String
  }
}
</script>
```

## Vue 框架怎么实现对象和数组的监听
- 可能都知道使用 Object.defineProperty() 对数据进行劫持，但它是怎么对整个对象进行劫持的，看它的源码
```js
  /**
   * Observe a list of Array items.
   */
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])  // observe 功能为监测数据的变化
    }
  }

  /**
   * 对属性进行递归遍历
   */
  let childOb = !shallow && observe(val) // observe 功能为监测数据的变化
```
- <font color="red">它是利用遍历数组和递归遍历对象的方式，从而达到利用 Object.defineProperty() 对对象和部分数组的监听。</font>

## Proxy 与 Object.defineProperty 优劣对比
- Proxy 的优势如下:
  1. Proxy <font color="red">可以直接监听对象而非属性；</font>
  2. Proxy <font color="red">可以直接监听数组的变化；</font>
  3. Proxy <font color="red">有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；</font>
  4. Proxy <font color="red">返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；</font>
  5. Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；

- Object.defineProperty 的优势如下:
  - 兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平。


## Vue 怎么用 vm.$set() 解决对象新增属性不能影响的问题
- 受现代 JavaScript 的限制 ，Vue 无法检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化，所以属性必须在 data 对象上存在才能让 Vue 将它转换为响应式的。但是 Vue 提供了 Vue.set (object, propertyName, value) / vm.$set (object, propertyName, value)  来实现为对象添加响应式属性，那框架本身是如何实现的呢？

- 查看对应的 Vue 源码：vue/src/core/instance/index.js
```js
export function set (target: Array<any> | Object, key: any, val: any): any {
  // target 为数组  
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 修改数组的长度, 避免索引>数组长度导致splcie()执行有误
    target.length = Math.max(target.length, key)
    // 利用数组的splice变异方法触发响应式  
    target.splice(key, 1, val)
    return val
  }
  // key 已经存在，直接修改属性值  
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__
  // target 本身就不是响应式数据, 直接赋值
  if (!ob) {
    target[key] = val
    return val
  }
  // 对属性进行响应式处理
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```
- 根据源码可知，vm.$set 的实现原理是：
  - <font color="red">如果目标是数组，直接使用数组的 splice 方法触发响应式.</font>
  - <font color="#0000FF">如果目标是对象，会先判断属性是否存在，对象是否是响应式，如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理（ defineReactive 方法就是 Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）。</font>

## 虚拟 DOM 的优缺点
#### 优点：
1. <font color="red">保证性能下限：</font>框架的虚拟 DOM 需要适配任何上层 API 可能产生的操作，它的一些 DOM 操作的实现必须是普适的，所以它的性能并不是最优的；但相比起直接操作 DOM 性能要好很多，因为框架的虚拟 DOM 至少可以保证你不需要手动优化的情况下，依然可以提供不错的性能，保证性能下限；

2.  <font color="red">无需手动操作 DOM：</font>只要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和数据双向绑定，帮我们可预期的方式更新视图，提高开发效率。

3.  <font color="red">跨平台：</font>虚拟 DOM 本质上是 JavaScript 对象，而 DOM 与平台强相关，相比之下虚拟 DOM 可以进行更方便跨平台操作，例如服务器渲染

#### 缺点：
  - <font color="red">无法进行极致优化：</font> 虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但是一些性能要求极高的应用中虚拟 DOM 无法进行针对性的机制优化。

## 虚拟 DOM 实现原理?
1. 用 JavaScript 对象模拟真实 DOM 数, 对真实 DOM 进行抽象;
2. diff 算法 比较两颗虚拟 DOM 数的差异；
3. pach 算法 将虚拟 DOM对象的差异应用到真正的 DOM 数。

## Vue 中的 key 有什么作用？
- 作用是：<font color="red">key 是为 VUe 中 vnode 的唯一标记，通过这个 key，使 diff 操作可以更准确，更快速。</font>

- 更准确：<font color="red">因为带 key 就不是 就地复用了，在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况，所以会更准确。</font>
- 更快速：<font color="red">利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快。</font>
```js
function createKeyToOldIdx (children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}
```

## 双向绑定和 Vuex 是否冲突
- 在严格模式下，直接使用是会有冲突。

#### 怎么开启严格模式
- 开启严格模式，仅需在创建 store 的时候传入 strict：true
```js
const store = new Vuex.Store({
  // ...
  strict: true
})
```
- <font color="red">在严格模式下，无论何时发生了状态变更且不是右 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。</font>

> 不要在发布环境下启用严格模式！严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。

#### 严格模式同时使用 v-model 和 Vuex
```js
<input v-model="obj.message">
computed: {
  message: {
    set (value) {
        this.$store.dispatch('updateMessage', value);
    },
    get () {
        return this.$store.state.obj.message
    }
  }
}
mutations: {
  UPDATE_MESSAGE (state, v) {
    state.obj.message = v;
  }
}
actions: {
  update_message ({ commit }, v) {
    commit('UPDATE_MESSAGE', v);
  }
}
```
- 这里的 obj 是在计算属性中返回的一个属于 Vuex store 的对象，在用户输入时，v-model 会视图直接修改 obj.message。 而严格模式中，由于修改不在 mutation 函数中执行的，会抛出一个错误。

#### 使用 Vuex 解决这个问题
- 给 `<input>`中绑定 value，然后侦听 input 或者 change 事件，在事件回调中调用一个方法:
```html
<input :value="message" @input="updateMessage">
```
```js
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage (e) {
    this.$store.commit('updateMessage', e.target.value)
  }
}
mutations: {
  updateMessage (state, message) {
    state.obj.message = message
  }
}
```

#### 使用双向绑定解决这个问题
```html
<input v-model="message">
```
```js
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}

```